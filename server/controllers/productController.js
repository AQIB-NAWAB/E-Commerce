const Product=require("../models/productModel")
const CustomError=require("../utils/errorhandler")
const catchAsyncError=require("../middleware/catchAsyncError")
const ApiFeatures = require("../utils/feature")
// create product
exports.createProduct=catchAsyncError(

 async(req,res)=>{
     req.body.user=await  req.user._id
     console.log(req.body.user)
     const product=await new Product(req.body)
    await product.save()
    res.status(201).json({
        success:true,
        product
    })
})


// get all product 
exports.getAllProducts=catchAsyncError( async(req,res)=>{
    const resultPerPage=8;
    const productCount=await Product.countDocuments()

    const apiFeature= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const products=await apiFeature.query


    res.status(200).json({
        success:true,
        products,
        productCount
    })
})


// update product
exports.updateProduct=catchAsyncError( async(req,res)=>{
    let product=Product.findById(req.params.id)

    if(!product){
        return next(CustomError("Product Not Found During Update"),400)
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body)

    res.status(200).json({
        success:true,
        product
    })
})

// delete the products


exports.deleteProduct=catchAsyncError( async(req,res)=>{
    const product=await Product.findById(req.params.id)

    if(!product){
        return res.save(500).json({
            success:false,
            messageg:"Product not found"
        })
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
    const { productID, rating, comment } = req.body;
  
    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productID);
  
    if (!product) {
      return next(new CustomError(`Product not found with id: ${productID}`, 404));
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
  


  // Get All revies of  a Product
  exports.getProductReviews=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.query.id)

    if(!product){
        return next(new CustomError("Product not Found",404))
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews,
        numberOfReviews:product.reviews.length
    })
  })


  // Delete the Review

  exports.deleteReview=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.query.productID)

    if(!product){
        return next(new CustomError("Product not Found",404))
    }

    const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString())

    let avg=0;

    reviews.forEach((rev)=>{
        avg+=rev.rating
    })
const ratings=avg/reviews.length
const numberOfReviews=reviews.length

await Product.findByIdAndUpdate(req.query.productID,{
    reviews,
    ratings,
    numberOfReviews
},{
    new:true,
    runValidators:false,
    useFindAndModify:false
})

res.status(200).json({
    success:true
})

  })