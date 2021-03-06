import * as types from '../constants'

const initialState = {
  programs: [],
  selectedProgram: null,
  courses: [],
  masterCourses: [],
  currentCourse: null,
  courseInfo: null,
  hp: 0,
  hpGradeMultiply: 0,
  years: [],
  selectedYear: null,
  readyToCalculate: false,
  index: 0,
  specialisations: [],
}

export default function programsReducer (state = initialState, action) {
  switch (action.type) {
    case types.INCREASE_INDEX:
      return {
        ...state,
        index: state.index +1,
      }
    case types.SET_READY_TO_CALCULATE:
      return {
        ...state,
        readyToCalculate: true,
      }
    case types.ADD_PROGRAMS:
      return {
        ...state,
        programs: [...state.programs, ...action.payload],
      }
    case types.ADD_YEARS:
      return {
        ...state,
        years: [...state.years, ...action.payload],
      }
    case types.SELECT_PROGRAM:
      return {
        ...state,
        selectedProgram: action.payload,
      }
    case types.SELECT_YEAR:
      return {
        ...state,
        selectedYear: action.payload,
      }
    case types.GET_COURSES:
      return {
        ...state,
        courses: [...action.payload],
      }
    case types.GET_SPECIALISATIONS:
      return {
        ...state,
        specialisations: [...action.payload],
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
    case types.ADD_MASTER_COURSE:
      return {
        ...state,
        masterCourses: [...state.masterCourses, action.payload],
      }
    case types.ADD_TO_SPECIALISATIONS:
      let temp = state.specialisations
      let course = action.course
      console.log(course);
      for(let i = 0; i< action.specialisations.length; i++){
        let index = getIndex(temp, action.specialisations[i], course)

        if(index > -1){
          temp[index] = {
            ...temp[index],
            courses: [...temp[index].courses, course]
          }
        }
      }
      return {
        ...state,
        specialisations: temp,
      }
    default:
    return state
  }
}

const getIndex = function(array, object, course){
  let index = -1
  
  for(let i = 0; i<array.length; i++){
    if(array[i].title == object){
      return i
    }
  }
  return index
}
