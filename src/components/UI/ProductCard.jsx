import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaBasketShopping, FaEye } from "react-icons/fa6";
import { BsFillEyeFill } from "react-icons/bs";

import { Link } from "react-router-dom";

const ProductCard = ({ data, onDelete }) => {
  const { addToCart, cart, increaseQuantity, decreaseQuantity } = useCart();
  // for showing the delete icon on top of product image that's why use events
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  let isProductInCart = cart?.find((item) => item?.id === data?.id);
  return (
    <Card
      className="card-class"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Card.Img variant="top" src={data?.img} className="card-img-class p-1" />
      {isHovering && (
        <div className="icon-class-img">
          <span className="delete-icon" role="button" onClick={onDelete}>
            <RiDeleteBin6Fill />
          </span>
          <Link to={`/product-details/${data?.id}`} className="edit-icon">
            <span>
              <BsFillEyeFill />
            </span>
          </Link>
        </div>
      )}
      <Card.Body>
        <Card.Title>{data?.name}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <span>Price : ${data?.price}</span>
          {isProductInCart ? (
            <div className="d-flex align-items-center gap-2 pb-2">
              <button
                className="px-2 inc-class"
                onClick={() => increaseQuantity(data?.id)}
              >
                +
              </button>
              <p className="mb-1">{isProductInCart?.quantity}</p>
              <button
                className="px-2 dec-class"
                onClick={() => decreaseQuantity(data?.id)}
              >
                -
              </button>
            </div>
          ) : (
            <span
              className="cart-icon"
              role="button"
              onClick={() => addToCart(data)}
            >
              <FaBasketShopping />
            </span>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
