import moment from 'moment'
import { FaMapMarkerAlt, FaBook, FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Project'
import ProjectInfo from './ProjectInfo'

const Project = ({
  _id,
  name,
  course,
  projectLocation,
  projectType,
  createdAt,
  status,
}) => {
  const { setEditProject, deleteProject } = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{course.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{course}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ProjectInfo icon={<FaMapMarkerAlt />} text={projectLocation} />
          <ProjectInfo icon={<FaCalendarAlt />} text={date} />
          <ProjectInfo icon={<FaBook />} text={projectType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-project"
              className="btn edit-btn"
              onClick={() => setEditProject(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteProject(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Project
