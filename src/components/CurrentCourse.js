import React, {Component} from 'react'
import {getInfoOnCourse, getCourses} from '../parser'
import Grades from './Grades'
import Average from './Average'

export default class CurrentCourse extends Component{

  constructor(props){
    super(props)

    this.setCourseInfo = this.setCourseInfo.bind(this)
    this.selectCourse = this.selectCourse.bind(this)
    this.updateCourseInfo = this.updateCourseInfo.bind(this)
    this.selectNextCourse = this.selectNextCourse.bind(this)
  }

  async selectNextCourse(){
    let index = 0
    this.props.courses.map((c, i) => c.code === this.props.selectedCourse ? index = i+1 : '')
    await this.selectCourse(this.props.courses[index].code)
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
      getInfoOnCourse(this.props.selectedCourse, this.setCourseInfo)
    }
  }


  async componentDidMount(){
    await getCourses(this.props.selectedProgram, this.props.getCourses)
  }

  render(){
    this.updateCourseInfo()
    return(
      <div className="courseInfo">
        {this.props.courseInfo &&
          <div>
           <div onClick={this.selectNextCourse}>
             <div className="courseCode">{this.props.currentCourse}, {this.props.courseInfo.points} HP</div>
              <div className="courseTitle">{this.props.courseInfo.title}</div>
           </div>

         <Grades
           setAverage={this.props.setAverage}
           hp={this.props.courseInfo && this.props.courseInfo.points}
           addHp={this.props.addHp}
           addHpGradeMultiply={this.props.addHpGradeMultiply}
           courses={this.props.courses}
           selectedCourse={this.props.selectedCourse}
           selectCourse={this.props.selectCourse}
           selectCourseInfo={this.props.selectCourseInfo}
           setCourseInfo={this.props.setCourseInfo}
          />
        </div>
      }
      {!this.props.courseInfo &&
        <div className="loading">
          Fetching courses
        </div>
      }
      </div>
    )
  }
}
