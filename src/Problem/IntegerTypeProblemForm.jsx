import React, { Component } from 'react';

class IntegerTypeProblemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        integerProblem : {
          statement: '',
          solution: ''
        },
        submitted: false
    };
  }

  changeEvent(event) {
    const {integerProblem} = this.state;
    this.setState({
        integerProblem: {
            ...integerProblem,
            [event.target.name]: event.target.value
        },
        submitted: false
    });
  }

  render(props) {
    const {handleSubmit, handleChange, registering, counter} = this.props;
    const { integerProblem, submitted } = this.state;
    return (
      <div>
          <h2>{counter}. Integer Type Problem</h2>
          <form name="integer_prob_form" onSubmit={(event) => handleSubmit(event, integerProblem)}>
              <div className={'form-group col-lg-12' + (submitted && !integerProblem.statement ? ' has-error' : '')}>
                  <label htmlFor="statement">Problem Statement</label>
                  <textarea className="form-control"
                    onChange={(event) => {
                        handleChange(event, 'integer_type');
                        this.changeEvent(event);
                      }
                    }
                      value={integerProblem.statement}
                      name="statement"
                      />
                  {submitted && !integerProblem.statement &&
                      <div className="help-block">Problem Statement is required</div>
                  }
              </div>
              <div className={'form-group col-lg-12' + (submitted && !integerProblem.solution ? ' has-error' : '')}>
                  <label htmlFor="solution">Problem Solution [Use comma(,) for multiple answer]</label>
                  <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'integer_type');
                      this.changeEvent(event);
                    }
                  }
                      value={integerProblem.solution}
                      name="solution"
                      />
                  {submitted && !integerProblem.solution &&
                      <div className="help-block">Problem Solution is required</div>
                  }
              </div>

              <div className="form-group">
                  <button className="btn btn-primary">Register</button>
                  {registering &&
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
              </div>
          </form>
      </div>
    );
  }
}

export default IntegerTypeProblemForm;
