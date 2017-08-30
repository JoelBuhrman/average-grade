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
    let index = 0
    this.props.courses.map((c, i) => c.code === this.props.selectedCourse ? index = i+1 : '')
    await this.selectCourse(this.props.courses[index].code)
    getInfoOnCourse(this.props.selectedCourse, this.setCourseInfo)
  }

  selectCourse(code){
    this.props.selectCourse(code)
  }
  setCourseInfo(info){
    this.props.setCourseInfo(info)
  }

  render(){
    return(
      <div>
           <button onClick={()=>this.calculateAverage(0)}>U</button>
           <button onClick={()=>this.calculateAverage(3)}>3</button>
           <button onClick={()=>this.calculateAverage(4)}>4</button>
           <button onClick={()=>this.calculateAverage(5)}>5</button>
      </div>
    )
  }
}
