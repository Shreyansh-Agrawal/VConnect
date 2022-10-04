import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Project from "./Project";
import Wrapper from "../assets/wrappers/ProjectsContainer";
import PageBtnContainer from "./PageBtnContainer";

const EventsContainer = () => {
  const {
    getEvents,
    projectsc,
    isLoading,
    pagec,
    totalProjectsc,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPagesc,
  } = useAppContext();
  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, [pagec, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <Loading center />;
  }

  if (projectsc.length === 0) {
    return (
      <Wrapper>
        <h2>No events to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalProjectsc} project{projectsc.length > 1 && "s"} found
      </h5>
      <div className="projects">
        {projectsc.map((project) => {
          return <Project key={project._id} {...project} />;
        })}
      </div>
      {numOfPagesc > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default EventsContainer;
