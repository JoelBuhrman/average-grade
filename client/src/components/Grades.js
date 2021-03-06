import React, {Component} from 'react'
import {getInfoOnCourse} from '../parser'

export default class Grades extends Component{

  constructor(props){
    super(props)

    this.calculateAverage = this.calculateAverage.bind(this)
    this.setCourseInfo = this.setCourseInfo.bind(this)
    this.selectCourse = this.selectCourse.bind(this)
    this.selectNextCourse = this.selectNextCourse.bind(this)


  }

  calculateAverage(grade){
    this.props.addHp(this.props.hp)
    this.props.addHpGradeMultiply(this.props.hp * grade)
    this.selectNextCourse()
  }



  async selectNextCourse(){
    await this.props.increaseIndex()
    await this.selectCourse(this.props.courses[this.props.index].code)
    fetch('/api/courseInfo/'+this.props.selectedCourse+'/'+this.props.selectedYear)
      .then(res => res.json())
      .then(courseInfo => this.props.setCourseInfo(courseInfo));
    //getInfoOnCourse(this.props.selectedCourse, this.setCourseInfo)
  }

  selectCourse(code){
    this.props.selectCourse(code)
  }
  setCourseInfo(info){
    this.props.setCourseInfo(info)
  }

  render(){
    return(
      <div className={this.props.master ? "masterRight" : ''}>
           <button className={this.props.master ? "master failGrade" : "failGrade"} onClick={()=>this.calculateAverage(0)}>U</button>
           <button className={this.props.master ? "master grade" : "grade"} onClick={()=>this.calculateAverage(3)}>3</button>
           <button className={this.props.master ? "master grade" : "grade"} onClick={()=>this.calculateAverage(4)}>4</button>
           <button className={this.props.master ? "master grade" : "grade"} onClick={()=>this.calculateAverage(5)}>5</button>
      </div>
    )
  }
}
