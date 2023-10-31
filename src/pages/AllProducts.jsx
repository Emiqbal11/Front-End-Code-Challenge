import React, { useEffect, useState } from "react";
import { Loader, ProductCard } from "../components";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../config/Constant";
import toast from "react-hot-toast";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get products
  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "items");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error", error);
    }
  };

  // delete product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure to delete this Product?")) {
      try {
        await axios.delete(`${BASE_URL}items/${id}`);
        toast.success("Product Delete Successfully");
        setData(data?.filter((item) => item?.id !== id));
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // for search filter product
  const filteredProducts = data?.filter((item) => {
    return item?.name?.toLowerCase().includes(searchTerm?.toLowerCase());
  });

  // for sorting product sorted products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLowToHigh") {
      return a?.price - b?.price;
    } else if (sortOption === "priceHighToLow") {
      return b?.price - a?.price;
    } else if (sortOption === "alphabeticalAZ") {
      return a?.name?.localeCompare(b?.name);
    } else if (sortOption === "alphabeticalZA") {
      return b?.name?.localeCompare(a?.name);
    }
    return 0;
  });

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Container>
      <h3 className="">All Products</h3>
      <Row className="my-4 d-flex justify-content-between">
        <Col xs={6} sm={6} md={3}>
          <Form.Control
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={6} sm={6} md={{ offset: 6, span: 3 }}>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="alphabeticalAZ">Alphabetical: A to Z</option>
            <option value="alphabeticalZA">Alphabetical: Z to A</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {sortedProducts?.map((item) => {
          return (
            <Col className="mb-4" xs={6} sm={4} md={3} key={item?.id}>
              <ProductCard
                data={item}
                key={item?.id}
                onDelete={() => deleteProduct(item?.id)}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default AllProducts;
