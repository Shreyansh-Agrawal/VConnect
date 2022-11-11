import { useState } from "react";
import axios from "axios";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";

export function UpdateNotes({ _id, handleClose, handleEdited }) {
  const [data, setData] = useState({ title: "", description: "" });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    // e.preventDefault();

    console.log({ _id }, { data });

    axios
      .put(`http://localhost:5000/api/v1/notes/${_id}`, data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Failed to update notes");
        console.log(err.message);
      });
  }

  return (
    <Wrapper>
      <form
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
          handleEdited();
          handleClose();
        }}
      >        <h3>Update Notes</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="title"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="description"
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block">
            Update
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
