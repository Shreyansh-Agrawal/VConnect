import { useState } from "react";
import { FormRow } from "../components";
import axios from "axios";
import { useAppContext } from "../context/appContext";

export function CreateNotes() {
  const { user, club } = useAppContext();
  const [data, setData] = useState({
    title: "",
    description: "",
    createdBy: user?.name || club?.name,
    madeBy: user?._id || club?._id,
  });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    // e.preventDefault();

    const notes = {
      title: data.title,
      description: data.description,
      createdBy: user?.name || club?.name,
      madeBy: user?._id || club?._id,
    };

    console.log({ notes });
    axios
      .post("http://localhost:5000/api/v1/notes", data)
      .then((res) => {
        setData({
          title: "",
          description: "",
          createdBy: user?.name || club?.name,
          madeBy: user?._id || club?._id,
        });
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
          {club ? <h1>New Announcement</h1> : <h1>Add Notes</h1>}
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
              {club ?<>create announcement</>:<>create note</>}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
