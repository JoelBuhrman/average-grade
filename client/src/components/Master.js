import React, {Component} from 'react'
import {getMasterCourses} from '../parser'
import Grades from './Grades'

export default class Master extends Component{

  constructor(props){
    super(props)
  }


  componentDidMount(){
    console.log(this.props.index);
    console.log(this.props.courses.length);
    for(let i = this.props.index; i<this.props.courses.length; i++){
      fetch('/api/courseInfo/'+this.props.courses[i].code+'/'+this.props.selectedYear)
        .then(res => res.json())
        .then(course => this.props.addMasterCourse(course));
    }
  }



  render(){
    return(
      <div>
        <div className="masterHolder">
        {this.props.masterCourses.length>0 && this.props.masterCourses.map((course) =>
           <div>
             <div className="masterLeft">{course.title}, {course.points}HP</div>
             <Grades master/>
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
