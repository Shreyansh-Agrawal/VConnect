import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddProject = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    projectLocation,
    projectType,
    projectTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createProject,
    editProject,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !projectLocation) {
      displayAlert()
      return
    }
    if (isEditing) {
      editProject()
      return
    }
    createProject()
  }
  const handleProjectInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit project" : "add project"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            labelText="Name"
            name="position"
            value={position}
            handleChange={handleProjectInput}
          />
          {/* company */}
          <FormRow
            type="text"
            labelText="Course"
            name="company"
            value={company}
            handleChange={handleProjectInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="Project location"
            name="projectLocation"
            value={projectLocation}
            handleChange={handleProjectInput}
          />
          {/* project status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleProjectInput}
            list={statusOptions}
          />
          {/* project type */}
          <FormRowSelect
            name="projectType"
            labelText="Domain"
            value={projectType}
            handleChange={handleProjectInput}
            list={projectTypeOptions}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
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

export default AddProject
