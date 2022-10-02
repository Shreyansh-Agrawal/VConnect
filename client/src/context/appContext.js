import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  SETUP_CLUB_BEGIN,
  SETUP_CLUB_SUCCESS,
  SETUP_CLUB_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  LOGOUT_CLUB,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_CLUB_BEGIN,
  UPDATE_CLUB_SUCCESS,
  UPDATE_CLUB_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CLEARC_VALUES,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  GET_PROJECTS_BEGIN,
  GET_PROJECTS_SUCCESS,
  SET_EDIT_PROJECT,
  DELETE_PROJECT_BEGIN,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  CREATE_PROJECTC_BEGIN,
  CREATE_PROJECTC_SUCCESS,
  CREATE_PROJECTC_ERROR,
  GET_PROJECTSC_BEGIN,
  GET_PROJECTSC_SUCCESS,
  SET_EDITC_PROJECT,
  DELETE_PROJECTC_BEGIN,
  EDIT_PROJECTC_BEGIN,
  EDIT_PROJECTC_SUCCESS,
  EDIT_PROJECTC_ERROR,
  SHOW_STATSC_BEGIN,
  SHOW_STATSC_SUCCESS,
} from "./actions";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')
const club = localStorage.getItem('club')
const clubLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  club: club ? JSON.parse(club) : null,
  token: token,
  clubLocation: clubLocation || "",
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editProjectId: "",
  position: "",
  company: "",
  projectLocation: userLocation || "",
  projectTypeOptions: ["Web development", "IoT", "AI-ML", "Blockchain"],
  projectType: "Web development",
  statusOptions: ["planned", "ongoing", "completed"],
  status: "planned",
  projects: [],
  totalProjects: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],

  editProjectIdc: "",
  positionc: "c",
  companyc: "c",
  projectLocationc: clubLocation || "",
  projectTypeOptionsc: ["Web development", "IoT", "AI-ML", "Blockchain"],
  projectTypec: "Web development",
  statusOptionsc: ["planned", "ongoing", "completed"],
  statusc: "planned",
  projectsc: [],
  totalProjectsc: 0,
  numOfPagesc: 1,
  pagec: 1,
  statsc: {},
  monthlyApplicationsc: [],

  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutClub();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  // *****CLUB*****
  const addClubToLocalStorage = ({ club, token, location }) => {
    localStorage.setItem("club", JSON.stringify(club));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };
  // *****CLUB*****
  const removeClubFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("club");
    localStorage.removeItem("location");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  // *****CLUB*****
  const setupClub = async ({ currentClub, endPoint, alertText }) => {
    dispatch({ type: SETUP_CLUB_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentClub
      );

      const { club, token, location } = data;
      dispatch({
        type: SETUP_CLUB_SUCCESS,
        payload: { club, token, location, alertText },
      });
      addClubToLocalStorage({ club, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_CLUB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
 // *****CLUB*****
  const logoutClub = () => {
    dispatch({ type: LOGOUT_CLUB });
    removeClubFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  // ******CLUB*******
  const updateClub = async (currentClub) => {
    dispatch({ type: UPDATE_CLUB_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateClub", currentClub);

      const { club, location, token } = data;

      dispatch({
        type: UPDATE_CLUB_SUCCESS,
        payload: { club, location, token },
      });
      addClubToLocalStorage({ club, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_CLUB_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const clearCValues = () => {
    dispatch({ type: CLEARC_VALUES });
  };

  const createProject = async () => {
    dispatch({ type: CREATE_PROJECT_BEGIN });
    try {
      const { position, company, projectLocation, projectType, status } = state;
      await authFetch.post("/projects", {
        position,
        company,
        projectLocation,
        projectType,
        status,
      });
      dispatch({ type: CREATE_PROJECT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getProjects = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/projects?page=${page}&status=${searchStatus}&projectType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_PROJECTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { projects, totalProjects, numOfPages } = data;
      dispatch({
        type: GET_PROJECTS_SUCCESS,
        payload: {
          projects,
          totalProjects,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditProject = (id) => {
    dispatch({ type: SET_EDIT_PROJECT, payload: { id } });
  };
  const editProject = async () => {
    dispatch({ type: EDIT_PROJECT_BEGIN });

    try {
      const { position, company, projectLocation, projectType, status } = state;
      await authFetch.patch(`/projects/${state.editProjectId}`, {
        company,
        position,
        projectLocation,
        projectType,
        status,
      });
      dispatch({ type: EDIT_PROJECT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteProject = async (projectId) => {
    dispatch({ type: DELETE_PROJECT_BEGIN });
    try {
      await authFetch.delete(`/projects/${projectId}`);
      getProjects();
    } catch (error) {
      logoutUser();
    }
  };
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/projects/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

/***********CLUB***********/

  const createProjectClub = async () => {
    dispatch({ type: CREATE_PROJECTC_BEGIN });
    try {
      const { positionc, companyc, projectLocationc, projectTypec, statusc } = state;
      await authFetch.post("/projects-club", {
        positionc,
        companyc,
        projectLocationc,
        projectTypec,
        statusc,
      });
      dispatch({ type: CREATE_PROJECTC_SUCCESS });
      dispatch({ type: CLEARC_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PROJECTC_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getProjectsClub = async () => {
    const { pagec, search, searchStatus, searchType, sort } = state;

    let url = `/projects-club?page=${pagec}&status=${searchStatus}&projectType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_PROJECTSC_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { projectsc, totalProjectsc, numOfPagesc } = data;
      dispatch({
        type: GET_PROJECTSC_SUCCESS,
        payload: {
          projectsc,
          totalProjectsc,
          numOfPagesc,
        },
      });
    } catch (error) {
      // logoutClub();
    }
    clearAlert();
  };

  const setEditProjectClub = (id) => {
    dispatch({ type: SET_EDITC_PROJECT, payload: { id } });
  };
  const editProjectClub = async () => {
    dispatch({ type: EDIT_PROJECTC_BEGIN });

    try {
      const { positionc, companyc, projectLocationc, projectTypec, statusc } = state;
      await authFetch.patch(`/projects-club/${state.editProjectIdc}`, {
        companyc,
        positionc,
        projectLocationc,
        projectTypec,
        statusc,
      });
      dispatch({ type: EDIT_PROJECTC_SUCCESS });
      dispatch({ type: CLEARC_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PROJECTC_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteProjectClub = async (projectId) => {
    dispatch({ type: DELETE_PROJECTC_BEGIN });
    try {
      await authFetch.delete(`/projects-club/${projectId}`);
      getProjects();
    } catch (error) {
      // logoutClub();
    }
  };
  const showStatsClub = async () => {
    dispatch({ type: SHOW_STATSC_BEGIN });
    try {
      const { data } = await authFetch("/projects-club/stats");
      dispatch({
        type: SHOW_STATSC_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      // logoutClub();
    }
    clearAlert();
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        setupClub,
        toggleSidebar,
        logoutUser,
        updateUser,
        logoutClub,
        updateClub,
        handleChange,
        clearValues,
        clearCValues,
        createProject,
        getProjects,
        setEditProject,
        deleteProject,
        editProject,
        showStats,
        createProjectClub,
        getProjectsClub,
        setEditProjectClub,
        deleteProjectClub,
        editProjectClub,
        showStatsClub,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
