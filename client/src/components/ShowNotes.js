import { useState, useEffect } from "react";
import axios from "axios";
import {UpdateNotes} from '../components'
import Wrapper from "../assets/wrappers/Project";
import { useAppContext } from "../context/appContext";

function NotesCard({ data, handleEdit, handleDelete }) {
  // updated
  const { _id, title, description, createdBy, madeBy } = data;
  const { user, club } = useAppContext();

  return (
    <Wrapper style={{marginBottom:"2%"}}>
      <li key={_id}>
        <header style={{padding:30}}>
          <div className="info">
            <h3>{title}</h3>
            <p>{description}</p>
            <br />
            <p>-{createdBy}</p>
          </div>
        </header>

        {user?._id===madeBy || club?._id===madeBy?
          (<div className="content">
          <div className="content-center">
            
              <div className="actions">
                <button
                  className="btn edit-btn"
                  name={_id}
                  onClick={handleEdit}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="btn delete-btn"
                  name={_id}
                  onClick={handleDelete}
                >
                  delete
                </button>
              </div>
            
          </div>
        </div>) : ""}

      </li>
    </Wrapper>
  );
}

export function ShowNotes() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false); // added
  const [id, setId] = useState(""); // added
  const [update, setUpdate] = useState(false); // added
  const { club } = useAppContext();

  useEffect(
    function () {
      axios
        .get("http://localhost:5000/api/v1/notes")
        .then((res) => {
          console.log(res.data);
          setNotes(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [update] // updated
  );

  function handleEdit(e) {
    // added
    setId(e.target.name);
    setOpen(true);
  }

  function handleUpdate() {
    // added
    console.log("update:", update, !update);
    setUpdate(!update);
  }

  function handleDelete(e) {
    // added
    axios.delete(`http://localhost:5000/api/v1/notes/${e.target.name}`);

    setNotes((data) => {
      return data.filter((notes) => notes._id !== e.target.name);
    });
  }

  function handleClose() {
    // added
    setId("");
    setOpen(false);
  }

  return (
    <section className="container">
      <section className="contents">
        {club ? <h1>Announcements</h1> : <h1>Notes</h1>}
        <ul className="list-container">
          {notes.map((data) => (
            <NotesCard
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </section>
      {open ? (
        <section className="update-container">
          <div className="update-contents">
            <p onClick={handleClose} className="close">
              &times;
            </p>

            <UpdateNotes
              _id={id}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
            />
          </div>
        </section>
      ) : (
        ""
      )}
    </section>
  );
}
