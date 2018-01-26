import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import StudentProblemListItem from '../Problem/StudentProblemListItem';
import {studentActions, alertActions} from '../_actions';
import styles from '../style/student.home.css';

class StudentScoreSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: {
        problemId: '',
        index: 0
      }
    }
    this.onProblemClick = this.onProblemClick.bind(this);
    this.onNextPreviousClick = this.onNextPreviousClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(studentActions.getProblemList(true, true));
  }

  renderProblemStatement(currProb, index) {
    switch (currProb.questionType) {
      case 'INTEGER_TYPE':
        return (index + '. ' + currProb.integerProblem.problemStatement);
      case 'SINGLE_MORE_TYPE':
        return (index + '. ' + currProb.singleMoreProblem.problemStatement);
      case 'MATRIX_MATCH_TYPE':
        return (index + '. ' + currProb.matrixProblem.problemStatement);
        default:
        return "select problem";
      }
  }

  onProblemClick(event, probIndex) {
    const { score } = this.state;
    const { dispatch } = this.props;
    console.log("problem clicked " + JSON.stringify(event.target.id) + " probIndex " + probIndex);
    this.setState({
        score: {
            ...score,
            ['problemId'] : event.target.id,
            ['index'] : probIndex
        }
    });
    dispatch(alertActions.clear());
    dispatch(studentActions.getSolution(event.target.id));
  }

  onNextPreviousClick(event) {
    const { score } = this.state;
    const { student, dispatch } = this.props;

    let probIndex = 0;
    if(event.target.id === "next") {
      if(score.index === student.problemList.length - 1) {
        return;
      }
      probIndex = score.index + 1;
    } else if(event.target.id === "prev") {
      if(score.index === 0) {
        return;
      }
      probIndex = score.index - 1;
    }

    this.setState({
      score: {
          ...score,
          ['problemId'] : student.problemList[probIndex].id,
          ['index'] : probIndex
        }
    });
    dispatch(alertActions.clear());
    dispatch(studentActions.getSolution(student.problemList[probIndex].id));
  }

  renderProblemOptions() {
    const { score } = this.state;
    const { problemList } = this.props.student;
    if(problemList) {
      if(problemList[score.index].singleMoreProblem) {
        let options = "";
        (problemList[score.index].singleMoreProblem.problemOptions).map((option) => {
          options += option.label + ". " + option.value + "           ";
        });
        return options;
      } else if(problemList[score.index].matrixProblem) {
        let options = "";
        (problemList[score.index].matrixProblem.leftColumn).map((option) => {
          options += option.label + ". " + option.value + "           ";
        });

        (problemList[score.index].matrixProblem.rightColumn).map((option) => {
          options += option.label + ". " + option.value + "           ";
        });
        return options;
      }
      return "";
    } else {
      return "";
    }
  }



  render() {
    const { problemList } = this.props.student;
    const { solution } = this.props;
    const { score } = this.state;
    if(problemList) {
      console.log(" current Problem " + JSON.stringify(problemList[score.index]));
    }
    return (
      <div className="container">



      <nav>
      {
        problemList &&
         problemList.map((problem, index) => (
        <StudentProblemListItem text={ this.renderProblemStatement(problem, index) } key={problem.id} {...problem}
          onClick={this.onProblemClick} index={index}
           />
      ))}

      </nav>

      <article>
        <div>
        <div>
          <b>Score: </b>{problemList && problemList[score.index].score}
        </div>
        <div>
          <b> Penalty: </b> {problemList && problemList[score.index].penalty}
          </div>
          <div>
            <b> Marks Obtained: </b> {solution && solution.marksObtained}
            </div>
        </div>
        <p></p>
        <b>Problem Statement</b>
        {problemList && problemList[score.index].integerProblem && problemList[score.index].integerProblem.problemStatement}
        {problemList && problemList[score.index].singleMoreProblem && problemList[score.index].singleMoreProblem.problemStatement}
        {problemList && problemList[score.index].matrixProblem && problemList[score.index].matrixProblem.problemStatement}


        <p></p>
        <b>Problem Option</b>
        {this.renderProblemOptions()}
        <p></p>

        <b>User Solution </b>
        {solution && solution.integerSolution && solution.integerSolution[0]}
        {solution && solution.singleMoreSolution &&
          solution.singleMoreSolution.map((sol) => ((sol.value == "on") ? sol.label + "  ": ""))}

          {solution && solution.matrixSolution &&
            solution.matrixSolution.map((sol) => (sol.leftColumn + ". " + JSON.stringify(sol.rightColumn)))}
        <div className="prev_next_container">
          <div className="btn btn-success prev" id="prev" onClick={this.onNextPreviousClick}>
            Previous
          </div>
          <div className="btn btn-success next" id="next" onClick={this.onNextPreviousClick}>
            Next
          </div>
        </div>
      </article>


      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log("state " + JSON.stringify(state));
  const { student, solution } = state;
  return { student, solution };
}

const connectedStudentScoreSheet = connect(mapStateToProps)(StudentScoreSheet);
export { connectedStudentScoreSheet as StudentScoreSheet }
