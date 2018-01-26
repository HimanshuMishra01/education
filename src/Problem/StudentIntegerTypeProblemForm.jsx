import React, { Component } from 'react';

class StudentIntegerTypeProblemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        studentIntegerProblem : {
          statement: '',
          solution: '',
          
        },
        submitted: false
    };
  }

  changeEvent(event) {
    const {studentIntegerProblem} = this.state;
    this.setState({
        studentIntegerProblem: {
            ...studentIntegerProblem,
            [event.target.name]: event.target.value
        },
        submitted: false
    });
  }

  render(props) {
    const {handleSubmit, handleChange, registering, counter, probStatement, clear} = this.props;
    const { studentIntegerProblem, submitted } = this.state;
    console.log("props ******************** " + JSON.stringify(this.props));

    return (
      <div>
          <form name="student_integer_prob_form" onSubmit={(event) => handleSubmit(event, studentIntegerProblem)}>
              <div className={'form-group col-lg-12' + (submitted && !studentIntegerProblem.statement ? ' has-error' : '')}>
                  <label htmlFor="statement">Problem Statement</label>
                  <div>{ probStatement }</div>
              </div>
              <div className={'form-group col-lg-12' + (submitted && !studentIntegerProblem.solution ? ' has-error' : '')}>
                  <label htmlFor="solution">Problem Solution [Use comma(,) for multiple answer]</label>
                  <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'integer_type');
                      this.changeEvent(event);
                    }
                  }
                      value={clear ? '' : studentIntegerProblem.solution}
                      name="solution"
                      />
                  {submitted && !studentIntegerProblem.solution &&
                      <div className="help-block">Problem Solution is required</div>
                  }
              </div>

              <div className="form-group">
                  <button className="btn btn-primary">Submit</button>
                  {registering &&
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
              </div>
          </form>
      </div>
    );
  }
}

export default StudentIntegerTypeProblemForm;
