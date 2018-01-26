import React, { Component } from 'react';

class SingleMoreProblemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        singleMoreProblem : {
          statement: '',
          option_a:'',
          option_b:'',
          option_c:'',
          option_d:'',
          sol_option_a: "off",
          sol_option_b: "off",
          sol_option_c: "off",
          sol_option_d: "off"
        },
        submitted: false
    };
  }

  changeEvent(event) {
    const {singleMoreProblem} = this.state;
    console.log("name " + event.target.name + " value " + event.target.value);

    this.setState({
        singleMoreProblem: {
            ...singleMoreProblem,
            [event.target.name]: event.target.value
        },
        submitted: false
    });
    if(event.target.value == "on") {
      event.target.value = "off";
    } else if(event.target.value == "off") {
      event.target.value = "on";
    }
    console.log("change event " + JSON.stringify(this.state));
  }



  render(props) {
    const {handleSubmit, handleChange, registering, counter} = this.props;
    const { singleMoreProblem, submitted } = this.state;
    console.log("single more render " + JSON.stringify(singleMoreProblem));
    return (
      <div>
          <h2>{counter}. Single and More Than Type Problem</h2>
          <form name="single_more_prob_form" onSubmit={(event) => handleSubmit(event, singleMoreProblem)}>
              <div className={'form-group col-lg-12' + (submitted && !singleMoreProblem.statement ? ' has-error' : '')}>
                  <label htmlFor="statement">Problem Statement</label>
                  <textarea className="form-control"
                    onChange={(event) => {
                        handleChange(event, 'single_more_type');
                        this.changeEvent(event);
                      }
                    }
                      value={singleMoreProblem.statement}
                      name="statement"
                      />
                  {submitted && !singleMoreProblem.statement &&
                      <div className="help-block">Problem Statement is required</div>
                  }
              </div>
              <p></p>
              <div className={'form-group col-lg-12' + (submitted && !singleMoreProblem.option_a ? ' has-error' : '')}>
                  <label htmlFor="option_a">A.</label>
                  <textarea className="form-control"
                    onChange={(event) => {
                        handleChange(event, 'single_more_type');
                        this.changeEvent(event);
                      }
                    }
                      value={singleMoreProblem.option_a}
                      name="option_a"
                      />
                      <label className="checkbox-inline">
                        <input type="checkbox" name="sol_option_a"
                        checked={singleMoreProblem.sol_option_a == "on"}
                          onChange={(event) => this.changeEvent(event, !singleMoreProblem.sol_option_a)} />Is Correct?
                      </label>
                  {submitted && !singleMoreProblem.option_a &&
                      <div className="help-block">Option A is required</div>
                  }
              </div>
              <p></p>
              <div className={'form-group col-lg-12' + (submitted && !singleMoreProblem.option_b ? ' has-error' : '')}>
                  <label htmlFor="option_b">B.</label>
                  <textarea className="form-control"
                    onChange={(event) => {
                        handleChange(event, 'single_more_type');
                        this.changeEvent(event);
                      }
                    }
                      value={singleMoreProblem.option_b}
                      name="option_b"
                      />
                      <label className="checkbox-inline">
                        <input type="checkbox" name="sol_option_b"
                        checked={singleMoreProblem.sol_option_b == "on"}
                          onChange={(event) => this.changeEvent(event, !singleMoreProblem.sol_option_b)} />Is Correct?
                      </label>
                  {submitted && !singleMoreProblem.option_b &&
                      <div className="help-block">Option B is required</div>
                  }
              </div>
              <p></p>
              <div className={'form-group col-lg-12' + (submitted && !singleMoreProblem.option_c ? ' has-error' : '')}>
                  <label htmlFor="option_c">C.</label>
                  <textarea className="form-control"
                    onChange={(event) => {
                        handleChange(event, 'single_more_type');
                        this.changeEvent(event);
                      }
                    }
                      value={singleMoreProblem.option_c}
                      name="option_c"
                      />
                      <label className="checkbox-inline">
                        <input type="checkbox" name="sol_option_c"
                        checked={singleMoreProblem.sol_option_c == "on"}
                          onChange={(event) => this.changeEvent(event, !singleMoreProblem.sol_option_c)} />Is Correct?
                      </label>
                  {submitted && !singleMoreProblem.option_c &&
                      <div className="help-block">Option C is required</div>
                  }
              </div>
              <p></p>
              <div className={'form-group col-lg-12' + (submitted && !singleMoreProblem.option_d ? ' has-error' : '')}>
                  <label htmlFor="option_d">D.</label>
                  <textarea className="form-control"
                    onChange={(event) => {
                        handleChange(event, 'single_more_type');
                        this.changeEvent(event);
                      }
                    }
                      value={singleMoreProblem.option_d}
                      name="option_d"
                      />
                      <label className="checkbox-inline">
                        <input type="checkbox" name="sol_option_d"
                          checked={singleMoreProblem.sol_option_d == "on"}
                          onChange={(event) => this.changeEvent(event, !singleMoreProblem.sol_option_d)} />Is Correct?
                      </label>
                  {submitted && !singleMoreProblem.option_d &&
                      <div className="help-block">Option D is required</div>
                  }
              </div>
              <p></p>

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

export default SingleMoreProblemForm;
