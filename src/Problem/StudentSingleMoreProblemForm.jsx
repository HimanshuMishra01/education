import React, { Component } from 'react';
import {InlineTex} from 'react-tex';

class StudentSingleMoreProblemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        studentSingleMoreProblem : {
          solution: ['','','','']
        },
        submitted: false
    };
  }

  changeEvent(event, index) {
    const {studentSingleMoreProblem} = this.state;
    let studentSingleMoreProblemCopy = JSON.parse(JSON.stringify(studentSingleMoreProblem));
    studentSingleMoreProblemCopy.solution[index] = event.target.name + "$$" + event.target.value;
    this.setState({
        studentSingleMoreProblem: studentSingleMoreProblemCopy,
        submitted: false
    }, () => {console.log("change event " + JSON.stringify(this.state));});
    if(event.target.value == "on") {
      event.target.value = "off";
    } else if(event.target.value == "off") {
      event.target.value = "on";
    }
  }

  componentDidMount() {
    const {singleMoreProblem, handleSubmit} = this.props;
    const {studentSingleMoreProblem} = this.state;
    let studentSingleMoreProblemCopy = JSON.parse(JSON.stringify(studentSingleMoreProblem));
    singleMoreProblem.problemOptions.map((options, index) => (
      studentSingleMoreProblemCopy.solution[index] = options.label + "$$off"
    ));
    this.setState({
        studentSingleMoreProblem: studentSingleMoreProblemCopy,
        submitted: false
    });
  }

  render(props) {
    const {singleMoreProblem, handleSubmit} = this.props;
    const { studentSingleMoreProblem } = this.state;
    //console.log("single more render " + JSON.stringify(singleMoreProblem));
    return (
      <div>
        <form name="student_single_more_prob_form" onSubmit={(event) => handleSubmit(event, studentSingleMoreProblem)}>
          <strong>Problem Statement</strong>
          <div>{singleMoreProblem.problemStatement && <InlineTex texContent={singleMoreProblem.problemStatement}/>}</div>
          <strong>Options</strong>
          <div className={'form-group col-lg-12'}>
              {
                 singleMoreProblem.problemOptions.map((options, index) => (
                   <div key={options.label}>
                   <label className="checkbox-inline">
                     <input type="checkbox" name={options.label}
                       onChange={(event) => this.changeEvent(event, index)} />
                   </label>
                   <label htmlFor={options.label}>{options.label}.</label>
                    <div>{options.value}</div>
                    </div>
              ))}
          </div>
          <div className="form-group">
              <button className="btn btn-primary">Register</button>
          </div>
        </form>

      </div>
    );
  }
}

export default StudentSingleMoreProblemForm;
