import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getAllProducts } from "../../store/reducers/AllProductReducer";
import { FiTrash2, FiEdit } from "react-icons/fi"
import {toast,ToastContainer} from "react-toastify"
import "./ProductList.css"
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate()
  const all_products = useSelector((state) => state.AllProducts.totalProducts);
  const isDeleted = useSelector(state => state?.AllProducts.isDeleted)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  

  const delete_product = (id) => {
    dispatch(deleteProduct({ id }))
    navigate("/dashboard")
  }

  return (
    <div>
      <ToastContainer />
      <div className="productList">
        <Sidebar />
        <div className="productListContainer">
          <table>
            <thead>
              <tr>
                <th>Product Id </th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {all_products && all_products?.products?.map(item => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.price}</td>
                  <td className="actions">
                    <span>
                      <Link to={`/admin/product/update/${item?._id}`}>  <FiEdit /> </Link>
                    </span>
                    <span onClick={() => delete_product(item._id)}>
                      <FiTrash2 />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
