import React, {Component} from 'react'

export default class Average extends Component{

  constructor(props){
    super(props)

  }

  render(){
    return(
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          textAlign: 'center',
          fontSize: 30
        }}
      >
           {this.props.average}
      </div>
    )
  }
}
