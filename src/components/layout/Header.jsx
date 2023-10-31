import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { RiShoppingBasketFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { cart } = useCart();

  return (
    <Navbar expand="lg" className="bg-body-tertiary p-4">
      <Container>
        <div className="d-sm-block d-md-none">
          <Link to="/">RandoStore</Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex gap-3">
            <Link to="/" className="d-none d-md-block">
              RandoStore
            </Link>
            <Link to="/">Home</Link>
            <Link to="/add-product">New Product</Link>
          </Nav>
          <Nav>
            <div className="me-2">
              <Link to="/check-out" style={{ position: "relative" }}>
                <RiShoppingBasketFill size={40} className="text-muted" />{" "}
                {/* Shopping cart icon */}
                <span
                  className="badge bg-success rounded-circle"
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-15px",
                  }}
                >
                  {cart?.length} {/* Display the item count */}
                </span>
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
