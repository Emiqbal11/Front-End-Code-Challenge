import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { InputField } from "../components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../config/Constant";
import toast from "react-hot-toast";

const AddNewProduct = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // submit form for addNewProduct post api call
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(BASE_URL + "items", data);
      //   console.log("res", response);
      toast.success("The Product Added Successfully");
      reset();
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <Container>
      <Row className="d-flex justify-content-center mt-3">
        <Col md={5} className="shadow-sm p-3">
          <h3 className="py-4">Add New Product</h3>
          <form
            className="d-flex flex-column gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              label={"Enter Name"}
              name="name"
              type="text"
              placeholder={"enter name here"}
              register={register}
              errors={errors}
              validationSchema={{
                required: "Name required",
              }}
            />
            <InputField
              label={"Enter Price"}
              name="price"
              type="number"
              placeholder={"enter price here"}
              register={register}
              errors={errors}
              validationSchema={{
                required: "Price required",
              }}
            />
            <InputField
              label={"Enter Image Url"}
              name="img"
              type="text"
              placeholder={"enter img-url here"}
              register={register}
              errors={errors}
              validationSchema={{
                required: "Img-url required",
              }}
            />
            <div className="ms-auto pb-4">
              <Button variant="primary" className="px-4" type="submit">
                Add New
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewProduct;
