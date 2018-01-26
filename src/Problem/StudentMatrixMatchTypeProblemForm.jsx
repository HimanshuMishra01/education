import React, { Component } from 'react';
import MatrixSolutionRadioOption from './MatrixSolutionRadioOption';
import StudentMatrixRadioOption from './StudentMatrixRadioOption';
import {InlineTex} from 'react-tex';

class StudentMatrixMatchTypeProblemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        matrixMatchProblem : [
          {
            solution: [],
            option: ''
          }
        ],
        submitted: false
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event, val) {
    console.log("option change " + event.target.name + " value " + event.target.value
     +  " val " + val);
    const { name, value } = event.target;
    const {matrixMatchProblem} = this.state;
    let leftValue = val.split('$$')[0];
    let leftIndex = val.split('$$')[1];
    let rightValue = name.split('$$')[0];
    let rightIndex = name.split('$$')[1];
    console.log("leftValue " + leftValue + " leftIndex " + leftIndex);
    console.log("rightValue " + rightValue + " rightIndex " + rightIndex);
    let matrixMatchProblemCopy = JSON.parse(JSON.stringify(matrixMatchProblem));
    console.log("matrix left " + JSON.stringify(matrixMatchProblemCopy[leftIndex]));
    console.log("matrix right !!!!!!! " + matrixMatchProblemCopy[leftIndex].solution[rightIndex]);
    console.log("name " + name + " value " + value);
    matrixMatchProblemCopy[leftIndex].solution[rightIndex] = rightValue + "$$" + event.target.value;
    console.log("matrix right ******* " + matrixMatchProblemCopy[leftIndex].solution[rightIndex]);
    this.setState({
        matrixMatchProblem: matrixMatchProblemCopy,
        submitted: false
    }, () => console.log("state " + JSON.stringify(this.state)));
    if(event.target.value == "on") {
      event.target.value = "off";
    } else if(event.target.value == "off") {
      event.target.value = "on";
    }
  }

  componentDidMount() {
    const {matrixProblem, handleSubmit} = this.props;
    const {matrixMatchProblem} = this.state;
    let matrixMatchProblemCopy = JSON.parse(JSON.stringify(matrixMatchProblem));
    let solutionOption = [];
    matrixProblem.rightColumn.map((rightCol, rightIndex) => (
      solutionOption[rightIndex] = rightCol.label + "$$off"
    ));
    matrixProblem.leftColumn.map((leftCol, leftIndex) => (
      matrixMatchProblemCopy[leftIndex] = {
          option: leftCol.label,
          solution: solutionOption
        }
    ));
    console.log("matrixMatchProblemCopy " + JSON.stringify(matrixMatchProblemCopy));
    this.setState({
        matrixMatchProblem: matrixMatchProblemCopy,
        submitted: false
    });
  }

  render(props) {
    const {matrixProblem, handleSubmit, clear} = this.props;
    const {matrixMatchProblem} = this.state;
    console.log("matrixProblem " + JSON.stringify(matrixProblem));
    console.log(styles.containerStyle);
    return (
      <div style={styles.mainContainer}>
          <form name="matrix_match_prob_form" onSubmit={(event) => handleSubmit(event, matrixMatchProblem)}>
          <strong>Problem Statement</strong>

          {matrixProblem.problemStatement && <InlineTex texContent={matrixProblem.problemStatement}/>}
          <div style={styles.containerStyle}>
            <div style={styles.leftContainer}>
            {
               matrixProblem.leftColumn.map((leftColumnOption, index) => (
                 <div key={leftColumnOption.label}>
                    <strong>{leftColumnOption.label}</strong>
                    {leftColumnOption.value}
                  </div>
            ))}
            </div>
            <div style={styles.rightContainer}>
            {
               matrixProblem.rightColumn.map((rightColumnOption, index) => (
                 <div key={rightColumnOption.label}>
                    <strong>{rightColumnOption.label}</strong>
                    {rightColumnOption.value}
                  </div>
            ))}
            </div>
            <div style={styles.radioContainer}>
            {
               matrixProblem.leftColumn.map((leftColumn, index) => (
                 <StudentMatrixRadioOption
                  key={leftColumn.label + '' + index}
                   label={leftColumn.label}
                   onChange={this.handleOptionChange}
                   rightColumn={matrixProblem.rightColumn}
                   leftCol={leftColumn.label}
                   clear={clear}
                   labelIndex={index}
                  />
            ))}
            </div>
            <p></p>
            <div>
                <button className="btn btn-primary">Register</button>
            </div>
          </div>
          </form>
      </div>
    );
  }
}

const styles = {
    mainContainer: {
      'position':'relative',
      'height': '100%'
    },
    containerStyle: {
      'width': '100%',
      'position':'relative',
      'margin': '0 auto'
    },
    leftContainer: {
      'width': '50%',
      'display': 'inline',
      'float': 'left'
    },
    rightContainer: {
      'width': '50%',
      'display': 'inline',
      'float': 'right'
    },
    radioContainer: {
      'clear': 'both',
      'width': '100%'
    },
    separator : {
      'width' : '120px'
    }
}

export default StudentMatrixMatchTypeProblemForm;
