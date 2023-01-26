import React from "react";
import CartSingleProduct from "../CartSingleProduct/CartSingleProduct";
import SummaryCart from "../SummaryCart/SummaryCart";
import "./Cart.css";

const Cart = ({ cart,addToCart,handleCartDecrease }) => {
  return (
    <div className="cart-container  my-5 p-5">
      <div className="details-container">
        {cart.length != 0 ? (
          cart.map((product) => (
            <CartSingleProduct
              key={product._id}
              item={product}
              addToCart={addToCart}
              handleCartDecrease={handleCartDecrease}
            ></CartSingleProduct>
          ))
        ) : (
          <div>
            <p className="h3 text-secondary">আপনার পণ্য কার্ট খালি!!</p>
          </div>
        )}
      </div>
      <div className="summary-container">
        <SummaryCart
          cart={cart}
          // handleBuy={handleBuy}
        ></SummaryCart>
      </div>
    </div>
  );
};

export default Cart;
