import { useState } from "react";
import { FormRow } from "../components";
import axios from "axios";

export function CreateNotes() {
  const [data, setData] = useState({ title: "", description: "" });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    // e.preventDefault();

    const notes = {
      title: data.title,
      description: data.description,
    };

    console.log({ notes });
    axios
      .post("http://localhost:5000/api/v1/notes", data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create NOTES");
        console.log(err.message);
      });
  }

  return (
    <>
      <section className="contents">
        <form onSubmit={handleSubmit} className="form" noValidate>
          <h3>Add Notes</h3>
          <div className="form-center">
            <FormRow
              type="text"
              name="title"
              value={data.title}
              handleChange={handleChange}
            />

            <FormRow
              type="text"
              name="description"
              value={data.description}
              handleChange={handleChange}
            />

            <button type="submit" className="btn btn-block">
              create note
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
