import React, { Component } from 'react';
import '../App.css';
import { bindActionCreators } from 'redux'
import * as programsActions from '../actions/programsActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Programs from './Programs'
import CurrentCourse from './CurrentCourse'
import Average from './Average'
import Years from './Years'


class App extends Component {
  // Initialize state

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPrograms();
    this.getYears();
  }

  getPrograms = () => {
    // Get the passwords and store them in state
    fetch('/api/programs')
      .then(res => res.json())
      .then(programs => this.props.addPrograms(programs));
  }

  getYears = () => {
    fetch('/api/years')
      .then(res => res.json())
      .then(years => this.props.addYears(years));
  }


  render() {

    return (
      <div className="App">
        {!this.props.readyToCalculate &&
          <div>
            <Programs
              addPrograms={this.props.addPrograms}
              programs={this.props.programs}
              selectProgram={this.props.selectProgram}
            />
          <Years
              years={this.props.years}
              selectYear={this.props.selectYear}
            />
          <button
            disabled={(!this.props.selectedYear || !this.props.selectedProgram)}
            onClick={()=>this.props.setReadyToCalculate()}>OK

          </button>
          </div>
          }
          {this.props.readyToCalculate &&
            <div>
              <CurrentCourse
                selectedCourse={this.props.currentCourse}
                setCourseInfo={this.props.setCourseInfo}
                courseInfo={this.props.courseInfo}
                currentCourse={this.props.currentCourse}
                selectedYear={this.props.selectedYear}
                selectedProgram={this.props.selectedProgram}
                getCourses={this.props.getCourses}
                courses={this.props.courses}
                selectCourse={this.props.setCurrentCourse}
                addHp={this.props.addHp}
                addHpGradeMultiply={this.props.addHpGradeMultiply}
                points={this.props.hp}
                addMasterCourse={this.props.addMasterCourse}
                masterCourses={this.props.masterCourses}
                index={this.props.index}
                increaseIndex={this.props.increaseIndex}
              />
            {this.props.courseInfo &&
              <Average average={this.props.hp === 0 ? 0: (this.props.hpGradeMultiply/this.props.hp).toFixed(2)}/>
            }

            </div>
          }
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    programs: state.programs.programs,
    selectedProgram: state.programs.selectedProgram,
    courses: state.programs.courses,
    currentCourse: state.programs.currentCourse,
    courseInfo: state.programs.courseInfo,
    hp: state.programs.hp,
    hpGradeMultiply: state.programs.hpGradeMultiply,
    masterCourses: state.programs.masterCourses,
    years: state.programs.years,
    selectedYear: state.programs.selectedYear,
    readyToCalculate: state.programs.readyToCalculate,
    index: state.programs.index,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      ...programsActions,
    },
    dispatch)
}

App.propTypes = {
  programs: PropTypes.arrayOf(PropTypes.any),
  selectedProgram: PropTypes.string,
  courses: PropTypes.arrayOf(PropTypes.any),
  currentCourse: PropTypes.string,
  courseInfo: PropTypes.object,
  masterCourses: PropTypes.arrayOf(PropTypes.any),
  years: PropTypes.arrayOf(PropTypes.any),
  readyToCalculate: PropTypes.bool,
  selectedYear: PropTypes.arrayOf(PropTypes.any),
  index: PropTypes.Integer,
}

App.defaultProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
