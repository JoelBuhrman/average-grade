import React, {Component} from 'react'

export default class Years extends Component {

  render(){
    return(
      <div className="myDropDown">

        <div className="programs">
          {this.props.years && this.props.years.map((year) => (
            <div className="programItem" onClick={()=> this.props.selectYear(year)}>{year}</div>
            )
           )}
        </div>
      </div>
    )
  }
}
