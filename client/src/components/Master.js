import React, {Component} from 'react'
import {getMasterCourses} from '../parser'
import Grades from './Grades'

export default class Master extends Component{

  constructor(props){
    super(props)
  }


  componentDidMount(){
    let index = -1
    this.props.courses.map((course, i) => course.code === this.props.currentCourse ? index = i : '')
    getMasterCourses(index+1, this.props.courses, this.props.addMasterCourse)
  }



  render(){
    return(
      <div>
        <div className="masterHolder">
        {this.props.masterCourses.length>0 && this.props.masterCourses.map((course) =>
           <div>
             <span>{course.title}, {course.points}HP</span>
             <Grades/>
           </div>
         )}
         </div>
        {!this.props.masterCourses.length>0 &&
          <div className="loading">
            Fetching master courses
          </div>
        }
      </div>
    )
  }
}
