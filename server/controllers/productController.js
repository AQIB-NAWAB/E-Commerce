const Product=require("../models/productModel")
const CustomError=require("../utils/errorhandler")
const catchAsyncError=require("../middleware/catchAsyncError")
const ApiFeatures = require("../utils/feature")
const cloudinary=require("cloudinary")
// create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get all product 
exports.getAllProducts=catchAsyncError( async(req,res)=>{
    const resultPerPage=8;
    
    const apiFeature= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const productCount=await Product.countDocuments()
    const products=await apiFeature.query


    res.status(200).json({
        success:true,
        products,
        productCount
    })
})
//get all admin products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
// update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});
// delete the products


exports.deleteProduct=catchAsyncError( async(req,res)=>{
    const product=await Product.findById(req.params.id)

    if(!product){
        return res.save(500).json({
            success:false,
            messageg:"Product not found"
        })
    }
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"Product delete Successfuly"
        })
})


// get the details of single product

exports.getProductDetails=catchAsyncError( async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
      return next(new CustomError("Product Not Found ",500))    }
    res.status(200).json({
        success:true,
        product
    })
})

// create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { productId ,rating, comment } = req.body;
  
    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    if (!product) {
      return next(new CustomError(`Product not found with id: ${productId}`, 404));
    }
  
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {

          (rev.rating = rating),
          (rev.comment = comment)
        }
      });
    } else {
      product.reviews.push(review);
    }
  
    product.numOfReviews = product.reviews.length;
  
    let avg = 0;
  
    if (product.reviews.length !== 0) {
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
  
      avg /= product.reviews.length;
      product.ratings = Math.round(avg * 100) / 100; // round to two decimal places
    } else {
      product.ratings = 0;
    }
  
    try {
      await product.save({validateBeforeSave:false});
    } catch (err) {
      return next(new CustomError(`An error occurred while saving the product: ${err.message}`, 500));
    }
  
    res.status(200).json({
      success: true,
    });
  });
  


  exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
  