import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
// AiOutlineCloseCircle;
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const navigate = useNavigate();

  return (
    <Container>
      {cart?.length > 0 ? (
        <Row>
          <h3 className="py-3">Cart</h3>
          <Col md={8}>
            <CheckOutProduct
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          </Col>
          <Col md={{ offset: 0, span: 4 }}>
            <CartTotal cart={cart} />
          </Col>
        </Row>
      ) : (
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={6} className="border text-center">
            <div className="p-5">
              <h2>Your Cart is Currently Empty.</h2>
              <Button
                className="mt-4 w-75"
                type="button"
                onClick={() => navigate("/")}
              >
                RETURN TO SHOP
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};
const CheckOutProduct = ({
  cart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
}) => {
  return (
    <Table className="border table-class">
      <thead>
        <tr>
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cart?.map((item) => {
          return (
            <tr key={item?.id}>
              <td>
                <div className="d-flex justify-content-center">
                  <img
                    src={item?.img}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </td>
              <td>{item?.name}</td>
              <td>${item?.price}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="px-2 inc-class"
                    onClick={() => increaseQuantity(item?.id)}
                  >
                    +
                  </button>
                  <p className="mb-1">{item?.quantity}</p>
                  <button
                    className="px-2 dec-class"
                    onClick={() => decreaseQuantity(item?.id)}
                  >
                    -
                  </button>
                </div>
              </td>
              <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
              <td>
                <span className="px-2">
                  <AiOutlineCloseCircle
                    size={25}
                    style={{ color: "gray", cursor: "pointer" }}
                    onClick={() => removeFromCart(item.id)}
                  />
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
const CartTotal = ({ cart }) => {
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);
  const total = subtotal;
  return (
    <Card className="border remove-border">
      <Card.Header as="h5">Cart totals</Card.Header>
      <Card.Body className="">
        <p className="d-flex justify-content-evenly border-bottom py-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
        <p className="d-flex justify-content-evenly border-bottom py-2">
          <span>Total</span>
          <span className="ms-4">${total.toFixed(2)}</span>
        </p>
      </Card.Body>
      <div className="d-flex justify-content-center py-2">
        <Button className="w-50 mx-2" type="button">
          CheckOut
        </Button>
      </div>
    </Card>
  );
};

export default CheckOut;
