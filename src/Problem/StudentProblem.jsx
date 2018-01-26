import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../style/student.home.css';
import {studentActions, alertActions} from '../_actions';
import StudentProblemListItem from './StudentProblemListItem';
import StudentIntegerTypeProblemForm from './StudentIntegerTypeProblemForm';
import StudentSingleMoreProblemForm from './StudentSingleMoreProblemForm';
import StudentMatrixMatchTypeProblemForm from './StudentMatrixMatchTypeProblemForm';

class StudentProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        problem: {
          problemId: '',
          problemList: [],
          problemIndex: -1,
          problemType: ''
        },
        submitted: false,
        clear: false
    };
    this.onProblemClick = this.onProblemClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onNextPreviousClick = this.onNextPreviousClick.bind(this);
    //this.renderFirstProblem = this.renderFirstProblem.bind(this);
  }

  onProblemClick(event, probIndex) {
    const { problem } = this.state;
    const { student, dispatch } = this.props;
    console.log("problem clicked " + JSON.stringify(event.target.id) + " probIndex " + probIndex);
    this.setState({
        problem: {
            ...problem,
            ['problemId'] : event.target.id,
            ['problemIndex'] : probIndex,
            ['problemType'] : student.problemList[probIndex].questionType
        },
        submitted: false,
        clear: true
    });
    dispatch(alertActions.clear());
    dispatch(studentActions.getCurrentProblem(event.target.id));
  }

  onNextPreviousClick(event) {
    const { problem } = this.state;
    const { student, dispatch } = this.props;
    console.log("student " + JSON.stringify(student) + " problemIndex "
                + problem.problemIndex + " length " + student.problemList.length
               + " id " + event.target.id
             );
    let probIndex = 0;
    if(event.target.id === "next") {
      if(problem.problemIndex === student.problemList.length - 1) {
        return;
      }
      probIndex = problem.problemIndex + 1;
    } else if(event.target.id === "prev") {
      if(problem.problemIndex === 0) {
        return;
      }
      probIndex = problem.problemIndex - 1;
    }

    this.setState({
        problem: {
            ...problem,
            ['problemId'] : student.problemList[probIndex].id,
            ['problemIndex'] : probIndex,
            ['problemType'] : student.problemList[probIndex].questionType
        },
        submitted: true,
        clear: true
    });
    console.log("problemList.get(problemIndex + 1).id " + JSON.stringify(student.problemList[probIndex].id));
    dispatch(alertActions.clear());
    dispatch(studentActions.getCurrentProblem(student.problemList[probIndex].id));
  }

  componentDidMount() {
    const { problem } = this.state;
    const { dispatch, student } = this.props;
    const { problemList } = this.props.student;
    dispatch(studentActions.getProblemList());

    this.setState({
        problem: {
            ...problem,
            [problemList] : problemList
        },
        submitted: false,
        clear: false
    });

  }

  handleSubmit(event, problemData) {
    event.preventDefault();
    this.setState({ submitted: true, clear: false });
    const { dispatch, student } = this.props;
    const { problem } = this.state;
    console.log("^^^^^^^^^^^^^^ " + event.target.name + " problemData " + JSON.stringify(problemData)
    + " problem " + JSON.stringify(problem));
    if(problem.problemIndex === -1) {
      console.log("problemIndex " + problem.problemIndex);
      let initProblem = {
          problemId : student.problemList[0].id,
          problemIndex : 0,
          problemType : student.problemList[0].questionType
      };
      dispatch(studentActions.registerSolution(problemData, initProblem));
    } else {
      dispatch(studentActions.registerSolution(problemData, problem));
    }
  }

  handleChange(event, type) {
    this.setState({ submitted: false, clear: false });
    const { name, value } = event.target;
      //console.log("inside handleChange name " + name + " type " + type + " value " + value);
      switch (type) {
        case 'integer_type':

          break;
        default:
      }
  }

  renderProblem(currProb) {
    console.log("curProb $$$$$ " + JSON.stringify(currProb) + " clear " + this.state.clear);

    switch (currProb.questionType) {
      case 'INTEGER_TYPE':
        return <StudentIntegerTypeProblemForm probStatement={currProb.integerProblem.problemStatement}
        handleSubmit={this.handleSubmit} handleChange={this.handleChange}
        registering={false} counter={1} clear={this.state.clear}

        />;
      case 'SINGLE_MORE_TYPE':
        return <StudentSingleMoreProblemForm clear={this.state.clear}
            singleMoreProblem={currProb.singleMoreProblem} handleSubmit={this.handleSubmit} />;
      case 'MATRIX_MATCH_TYPE':
        return <StudentMatrixMatchTypeProblemForm clear={this.state.clear}
            matrixProblem={currProb.matrixProblem} handleSubmit={this.handleSubmit} />;
      default:
        return <div></div>;
    }
  }

  renderProblemStatement(currProb, index) {
    switch (currProb.questionType) {
      case 'INTEGER_TYPE':
        return ((index + 1) + '. ' + currProb.integerProblem.problemStatement);
      case 'SINGLE_MORE_TYPE':
        return ((index + 1) + '. ' + currProb.singleMoreProblem.problemStatement);
      case 'MATRIX_MATCH_TYPE':
        return ((index + 1) + '. ' + currProb.matrixProblem.problemStatement);
        default:
        return "select problem";
      }
  }

  /*renderFirstProblem() {
    const { student, dispatch } = this.props;
    const { problem } = this.state;
    //console.log("")
    if(student && student.problemList &&  problem.problemIndex === -1) {
      this.setState({
          problem: {
              ...problem,
              ['problemId'] : student.problemList[0].id,
              ['problemIndex'] : 0,
              ['problemType'] : student.problemList[0].questionType
          },
          submitted: true
      });
      dispatch(alertActions.clear());
      dispatch(studentActions.getCurrentProblem(student.problemList[0].id));
    }
  }*/

  render() {
    const { problem } = this.state;
    const { problemList } = this.props.student;
    const challengeId = localStorage.getItem('challenge_id');
    //console.log("problemid " + problem.problemId);

    //JSON.stringify("current " + questionType);
    const { problemId } = this.props;
    let currentProblem = {};
    if(problemList) {
      //this.renderFirstProblem();
      currentProblem = problemList.filter((prob) => problemId == prob.id)[0];
    }
    return (
        <div className="container">
        <nav>
        {
          problemList &&
           problemList.map((problem, index) => (
          <StudentProblemListItem text={ this.renderProblemStatement(problem, index) } key={problem.id} {...problem} onClick={this.onProblemClick}
            index={index}
             />
        ))}

        </nav>

        <article>
          <div>
            <div>
              <b>Score: </b>{currentProblem && currentProblem.score}
            </div>
            <div>
              <b> Penalty: </b> {currentProblem && currentProblem.penalty}
            </div>
          </div>

          {
            currentProblem && this.renderProblem(currentProblem)
          }
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
  //console.log("!!!!!! state " + JSON.stringify(state));
    const { student } = state;
    const { challengeId, users} = state.challenge;
    const { problemId } = state.problem;
    return {
        challengeId,
        users,
        student,
        problemId
    };
}

const connectedStudentProblemPage = connect(mapStateToProps)(StudentProblem);
export { connectedStudentProblemPage as StudentProblem };
