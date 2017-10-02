import React, {Component} from 'react'
import {getInfoOnCourse, getCourses} from '../parser'
import Grades from './Grades'
import Average from './Average'
import Master from './Master'

export default class CurrentCourse extends Component{

  constructor(props){
    super(props)

    this.setCourseInfo = this.setCourseInfo.bind(this)
    this.selectCourse = this.selectCourse.bind(this)
    this.updateCourseInfo = this.updateCourseInfo.bind(this)
    this.selectNextCourse = this.selectNextCourse.bind(this)

  }

  async selectNextCourse(){
    await this.selectCourse(this.props.courses[this.props.index].code)
    getInfoOnCourse(this.props.selectedCourse, this.setCourseInfo)
  }

  setCourseInfo(info){
    this.props.setCourseInfo(info)
  }

  selectCourse(code){
    this.props.selectCourse(code)
  }

  updateCourseInfo(){
    if(this.props.courses[0] && !this.props.courseInfo){
      this.selectCourse(this.props.courses[0].code)
      fetch('/api/courseInfo/'+this.props.selectedCourse+'/'+this.props.selectedYear)
        .then(res => res.json())
        .then(courseInfo => this.props.setCourseInfo(courseInfo));
      //getInfoOnCourse(this.props.selectedCourse, this.setCourseInfo)
    }
  }


  async componentDidMount(){
    fetch('/api/courses/'+this.props.selectedProgram+'/'+this.props.selectedYear)
      .then(res => res.json())
      .then(courses => this.props.getCourses(courses));
    //await getCourses(this.props.selectedProgram, this.props.getCourses)
  }

  render(){
    this.updateCourseInfo()
    return(
      <div className="courseInfo">
        {(this.props.courseInfo && this.props.points<180) &&
          <div>
           <div onClick={this.selectNextCourse}>
             <div className="courseCode">{this.props.currentCourse}, {this.props.courseInfo.points} HP</div>
              <div className="courseTitle">{this.props.courseInfo.title}</div>
           </div>

         <Grades
           index={this.props.index}
           increaseIndex={this.props.increaseIndex}
           setAverage={this.props.setAverage}
           hp={this.props.courseInfo && this.props.courseInfo.points}
           addHp={this.props.addHp}
           addHpGradeMultiply={this.props.addHpGradeMultiply}
           courses={this.props.courses}
           selectedCourse={this.props.selectedCourse}
           selectCourse={this.props.selectCourse}
           selectCourseInfo={this.props.selectCourseInfo}
           setCourseInfo={this.props.setCourseInfo}
           selectedYear={this.props.selectedYear}
          />
        </div>
      }
      {!this.props.courseInfo &&
        <div className="loading">
          Fetching courses
        </div>
      }
      {this.props.points>=180 &&
        <Master
          index={this.props.index}
          currentCourse={this.props.currentCourse}
          courses={this.props.courses}
          addMasterCourse={this.props.addMasterCourse}
          masterCourses={this.props.masterCourses}
          selectedYear={this.props.selectedYear}
        />
      }
      </div>
    )
  }
}
