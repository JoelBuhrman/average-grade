import React, {Component} from 'react'

export default class Average extends Component{

  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="average">
           {this.props.average}
      </div>
    )
  }
}
