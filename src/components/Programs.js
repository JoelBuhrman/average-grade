import React, {Component} from 'react'
import {getPrograms} from '../parser'

export default class Programs extends Component{

  constructor(props){
    super(props)

    this.selectProgram= this.selectProgram.bind(this)
  }

  selectProgram(){
    const program = document.getElementById("mySelect").value
    this.props.selectProgram(program.substring(1, program.indexOf(':')))
  }

  componentDidMount(){
    getPrograms(this.props.addPrograms)
  }
  render(){
    return(
      <div className="myDropDown">
        <select id="mySelect" onChange={()=> this.selectProgram()}>
        {this.props.programs && this.props.programs.map((program) =>
           <option
             value={program.name}
             >{program.name}
           </option>
         )}
         </select>
      </div>
    )
  }
}
