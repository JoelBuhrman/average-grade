import React, {Component} from 'react'
import {getPrograms} from '../parser'

export default class Programs extends Component{

  constructor(props){
    super(props)

    this.selectProgram= this.selectProgram.bind(this)
  }

  selectProgram(program){
    this.props.selectProgram(program.substring(1, program.indexOf(':')))
  }

  componentDidMount(){
    //getPrograms(this.props.addPrograms)
  }
  render(){
    return(
      <div className="myDropDown">

        <div className="programs">
          {this.props.programs && this.props.programs.map((program) => (
            <div className="programItem" onClick={()=>this.selectProgram(program.name)}>{program.name}</div>
            )
           )}
        </div>
      </div>
    )
  }
}
