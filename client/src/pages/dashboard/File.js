import React, { useState } from "react";
import CustomInput from "./Input.component/Input.jsx";
import Axios from "axios";
import "./Input.component/app.css"

const File = () => {
  const [fileData, setFileData] = useState();

  const [images, setFile] = useState("");

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0]);
    setFile(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("image", fileData);

    await Axios.post("http://localhost:5000/api/image", formdata)
      .then((res) => console.log("res", res.data))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="images" className="drop-container">
        <span className="drop-title">Drop files here</span>
        or
        <CustomInput
          style={{}}
          type="file"
          value={images}
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          placeholder="upload image"
          isRequired={true}
        />
      </label>

      <button style={{marginTop: "5%"}} className="btn btn-block">submit</button>
    </form>
  );
};

export default File;
