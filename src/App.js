import React, { Component } from 'react';
import './App.css';
import { bindActionCreators } from 'redux'
import * as programsActions from './actions/programsActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Programs from './components/Programs'
import CurrentCourse from './components/CurrentCourse'
import Average from './components/Average'


class App extends Component {

  render() {

    return (
        <div className="App">
          {!this.props.selectedProgram &&
            <Programs
              addPrograms={this.props.addPrograms}
              programs={this.props.programs}
              selectProgram={this.props.selectProgram}
            />
          }
          {this.props.selectedProgram &&
            <div>
              <CurrentCourse
                selectedCourse={this.props.currentCourse}
                setCourseInfo={this.props.setCourseInfo}
                courseInfo={this.props.courseInfo}
                currentCourse={this.props.currentCourse}

                selectedProgram={this.props.selectedProgram}
                getCourses={this.props.getCourses}
                courses={this.props.courses}
                selectCourse={this.props.setCurrentCourse}
                addHp={this.props.addHp}
                addHpGradeMultiply={this.props.addHpGradeMultiply}
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
}

App.defaultProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
