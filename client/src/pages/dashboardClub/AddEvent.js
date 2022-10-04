import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddEvent = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    namec,
    coursec,
    projectLocationc,
    projectTypec,
    projectTypeOptionsc,
    statusc,
    statusOptionsc,
    handleChange,
    clearCValues,
    createEvent,
    editEvent,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!namec || !coursec || !projectLocationc) {
      displayAlert()
      return
    }
    if (isEditing) {
      editEvent()
      return
    }
    createEvent()
  }
  const handleProjectInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(e.target.name)
    console.log(e.target.value)
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit event" : "add event"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* name */}
          <FormRow
            type="text"
            labelText="name"
            name="name"
            value={namec}
            handleChange={handleProjectInput}
          />
          {/* course */}
          <FormRow
            type="text"
            labelText="date"
            name="course"
            value={coursec}
            handleChange={handleProjectInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="event location"
            name="projectLocation"
            value={projectLocationc}
            handleChange={handleProjectInput}
          />
          {/* project status */}
          <FormRowSelect
            name="status"
            value={statusc}
            handleChange={handleProjectInput}
            list={statusOptionsc}
          />
          {/* project type */}
          <FormRowSelect
            name="projectType"
            labelText="project type"
            value={projectTypec}
            handleChange={handleProjectInput}
            list={projectTypeOptionsc}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              add
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearCValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddEvent
