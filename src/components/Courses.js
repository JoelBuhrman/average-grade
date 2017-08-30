import React, {Component} from 'react'
import {getCourses} from '../parser'
import Grades from './Grades'

export default class Courses extends Component{

  constructor(props){
    super(props)

    this.selectCourse = this.selectCourse.bind(this)
  }

  selectCourse(code){
    this.props.selectCourse(code)
  }

  componentDidMount(){
    getCourses(this.props.selectedProgram, this.props.getCourses)
  }

  render(){
    return(
      <div>
        Hej
        {this.props.courses && this.props.courses.map((course) =>
           <div
             onClick={()=>this.selectCourse(course.code)}
             key={course.code}
             >{course.code} 
           </div>
         )}
      </div>
    )
  }
}
