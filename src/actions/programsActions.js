import * as types from '../constants'

export function addPrograms (programs) {
  return (dispatch) => {
    dispatch({
      type: types.ADD_PROGRAMS,
      payload: programs,
    })
  }
}

export function selectProgram (program) {
  return (dispatch) => {
    dispatch({
      type: types.SELECT_PROGRAM,
      payload: program,
    })
  }
}

export function getCourses (courses) {
  return (dispatch) => {
    dispatch({
      type: types.GET_COURSES,
      payload: courses,
    })
  }
}

export function setCurrentCourse (course) {
  return (dispatch) => {
    dispatch({
      type: types.SET_CURRENT_COURSE,
      payload: course,
    })
  }
}

export function setCourseInfo (info) {
  return (dispatch) => {
    dispatch({
      type: types.SET_COURSE_INFO,
      payload: info,
    })
  }
}

export function addHp (hp) {
  return (dispatch) => {
    dispatch({
      type: types.ADD_HP,
      payload: hp,
    })
  }
}

export function addHpGradeMultiply (multi) {
  return (dispatch) => {
    dispatch({
      type: types.ADD_HP_GRADE_MULTIPLY,
      payload: multi,
    })
  }
}
