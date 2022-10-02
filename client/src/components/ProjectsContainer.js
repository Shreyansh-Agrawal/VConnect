import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Project from './Project'
import Wrapper from '../assets/wrappers/ProjectsContainer'
import PageBtnContainer from './PageBtnContainer'

const ProjectsContainer = () => {
  const {
    getProjects,
    projects,
    isLoading,
    page,
    totalProjects,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    getProjects()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return <Loading center />
  }

  if (projects.length === 0) {
    return (
      <Wrapper>
        <h2>No projects to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalProjects} project{projects.length > 1 && 's'} found
      </h5>
      <div className='projects'>
        {projects.map((project) => {
          return <Project key={project._id} {...project} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default ProjectsContainer
