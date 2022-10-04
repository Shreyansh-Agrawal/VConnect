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

  CREATE_EVENT_BEGIN,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  GET_PROJECTSC_BEGIN,
  GET_PROJECTSC_SUCCESS,
  SET_EDITC_PROJECT,
  DELETE_EVENT_BEGIN,
  EDIT_EVENT_BEGIN,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_ERROR,
  SHOW_STATSC_BEGIN,
  SHOW_STATSC_SUCCESS,

  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";

import { initialState } from './appContext'
// import { initialStateClub } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      projectLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  // *****CLUB*****
  if (action.type === SETUP_CLUB_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_CLUB_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      club: action.payload.club,
      clubLocation: action.payload.location,
      projectLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_CLUB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      projectLocation: '',
      userLocation: '',
    }
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      projectLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  // *****CLUB*****
  if (action.type === LOGOUT_CLUB) {
    return {
      ...initialState,
      club: null,
      token: null,
      projectLocation: '',
      clubLocation: '',
    }
  }
  if (action.type === UPDATE_CLUB_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === UPDATE_CLUB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      club: action.payload.club,
      clubLocation: action.payload.location,
      projectLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Club Profile Updated!',
    }
  }
  if (action.type === UPDATE_CLUB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    }
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editProjectId: "",
      name: "",
      course: "",
      projectLocation: state.userLocation,
      projectType: "Web development",
      status: "planned",
    };

    return {
      ...state,
      ...initialState,
    }
  }

  if (action.type === CLEARC_VALUES) {
    const initialState = {
      isEditing: false,
      editProjectIdc: "",
      name: "",
      course: "",
      projectLocation: state.clubLocation,
      projectType: "Web development",
      status: "planned",
    };

    return {
      ...state,
      ...initialState,
    }
  }

  if (action.type === CREATE_PROJECT_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === CREATE_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Project Created!',
    }
  }
  if (action.type === CREATE_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === GET_PROJECTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_PROJECTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      projects: action.payload.projects,
      totalProjects: action.payload.totalProjects,
      numOfPages: action.payload.numOfPages,
    }
  }
  if (action.type === SET_EDIT_PROJECT) {
    const project = state.projects.find((project) => project._id === action.payload.id)
    const { _id, name, course, projectLocation, projectType, status } = project
    return {
      ...state,
      isEditing: true,
      editProjectId: _id,
      name,
      course,
      projectLocation,
      projectType,
      status,
    }
  }
  if (action.type === DELETE_PROJECT_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === EDIT_PROJECT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Project Updated!',
    }
  }
  if (action.type === EDIT_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    }
  }

  if (action.type === CREATE_EVENT_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === CREATE_EVENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Project Created!',
    }
  }
  if (action.type === CREATE_EVENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === GET_PROJECTSC_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_PROJECTSC_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      projectsc: action.payload.projectsc,
      totalProjectsc: action.payload.totalProjectsc,
      numOfPagesc: action.payload.numOfPagesc,
    }
  }
  if (action.type === SET_EDITC_PROJECT) {
    const project = state.projects.find((project) => project._id === action.payload.id)
    const { _id, namec, coursec, projectLocationc, projectTypec, statusc } = project
    return {
      ...state,
      isEditing: true,
      editProjectIdc: _id,
      namec,
      coursec,
      projectLocationc,
      projectTypec,
      statusc,
    }
  }
  if (action.type === DELETE_EVENT_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === EDIT_EVENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_EVENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Project Updated!',
    }
  }
  if (action.type === EDIT_EVENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === SHOW_STATSC_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }
  if (action.type === SHOW_STATSC_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      statsc: action.payload.statsc,
      monthlyApplicationsc: action.payload.monthlyApplicationsc,
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'latest',
    }
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default reducer
