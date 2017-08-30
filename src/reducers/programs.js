import * as types from '../constants'

const initialState = {
  programs: [],
  selectedProgram: null,
  courses: [],
  currentCourse: null,
  courseInfo: null,
  hp: 0,
  hpGradeMultiply: 0
}

export default function programsReducer (state = initialState, action) {
  switch (action.type) {
    case types.ADD_PROGRAMS:
      return {
        ...state,
        programs: [...state.programs, ...action.payload],
      }
    case types.SELECT_PROGRAM:
      return {
        ...state,
        selectedProgram: action.payload,
      }
    case types.GET_COURSES:
      return {
        ...state,
        courses: [...action.payload],
      }
    case types.SET_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: action.payload,
      }
    case types.SET_COURSE_INFO:
      return {
        ...state,
        courseInfo: action.payload,
      }
    case types.ADD_HP:
      return {
        ...state,
        hp: state.hp + action.payload,
      }
    case types.ADD_HP_GRADE_MULTIPLY:
      return {
        ...state,
        hpGradeMultiply: state.hpGradeMultiply + action.payload,
      }
    default:
    return state
  }
}
