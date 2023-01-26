import React, { useContext } from "react";
import { RemoveContext } from "../../router/AppRoute";
import "./CartSignleProduct.css";

const CartSingleProduct = (props) => {
  const { title, des, _id, category, picture, price,quantity } = props.item || {};
  const addToCart = props.addToCart || (()=>null)
  const handleCartDecrease = props.handleCartDecrease || (()=>null)
  const [handleRemove] = useContext(RemoveContext);

  function increaseQty(){
    addToCart(_id)
  }
  
  function decreaseQty(){
    handleCartDecrease(_id)
  }

  return (
    <div className="row gx-3 p-3 single-cart">
      <div className="col-md-3">
        <img src={picture} className="img-fluid" alt="" />
      </div>
      <div className="course-details text-start col-md-9">
        <h6 className="fw-bold fs-3">{title}</h6>
        <p className="text-secondary">
          Category:{" "}
          <span className="text-primary fw-bold ms-1">{category}</span>
        </p>

        <div className="d-flex align-items-center">
          <div className="footer-item pe-3">
            <button
              onClick={() => handleRemove(_id)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
          <div className="footer-item pe-3 mt-1">
            <p className="text-success fw-bold mx-4 fs-4 ">৳{price}</p>
          </div>
          <div className="footer-item mt-1">
            <div className="d-flex align-items-center qty-btns">
              <i class="fas fa-minus text-danger cursor-pointer" onClick={decreaseQty}></i>
              <span className="text-success fw-bold">{quantity}</span>
              <i className="fas fa-plus text-primary cursor-pointer" onClick={increaseQty}></i>
            </div>
          </div>
          <div className="ms-4 ">
            {" "}
            <a href="#">
              <i className="far fa-bookmark text-primary"></i>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CartSingleProduct;
