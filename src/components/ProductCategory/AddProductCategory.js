import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./AddProductCategory.css";

const AddProductCategory = () => {
  const [error, setError] = useState(false);
  const [categoryList, setCategoryList] = useState([])
  // const [ratingError,setRatingError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError(false);
    console.log(data);
    if (
      data.title === ""
    ) {
      setError(true);
      return;
    }
    axios.post("http://localhost:5000/addProductCategory", data).then((res) => {
      if (res.data) {
        setCategoryList(res.data)
      }
    });
    reset();
  };
  useEffect(() => {
    axios.get("http://localhost:5000/productCategory").then((res) => {
      if (res.data) {
        setCategoryList(res.data)
      }
    });
  }, [])
  
  return (
    <div className="add-product-container">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div className="addCycle-container">
          <div className="form-container">
            <h2
              style={{
                fontWeight: "bold",
                letterSpacing: "1px",
                textAlign: "center",
                margin: "8px 0 32px 0",
                borderBottom: "4px solid  #198754",
                width: "max-content",
              }}
            >
              ক্যাটাগরি যোগ করুন
            </h2>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "felx", flexDirection: "column" }}
            >
              <div style={{ margin: "10px 0" }}>
                <input
                  {...register("title")}
                  // defaultValue={user?.displayName}
                  placeholder="Product Category's Title"
                  className="input-field"
                />
              </div>

              
              <input type="submit" value="জমা দিন" className="submit-btn" />
              {error && (
                <p style={{ color: "red", letterSpacing: "2px" }}>
                  Input filelds cannot be empty
                </p>
              )}
            </form>
            {categoryList.length==0&& "Categories Loading ..."}
            <ol>
              {categoryList.map((v,k)=><li key={k}>{v.title}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductCategory;
