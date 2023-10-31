import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Loader } from "../components";
import { BASE_URL } from "../config/Constant";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("product", product);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}items/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }
  return (
    <Container className="h-100 mx-auto">
      <Row className="d-flex align-items-center mt-5 justify-content-center">
        <Col md={4}>
          <h3 className="py-3">Product Details</h3>
          <img
            src={product?.img}
            className="img-fluid"
            style={{
              height: "400px",
              maxWidth: "100%",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col md={4} className="d-flex flex-column gap-2">
          <div className="d-flex gap-3">
            <div>
              <h4 className="mb-3">Name</h4>
              <h4>Price</h4>
            </div>
            <div>
              <h4 className="mb-3">{product?.name}</h4>
              <h4>${product?.price}</h4>
            </div>
          </div>

          <Button
            className="w-50 mx-2"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
