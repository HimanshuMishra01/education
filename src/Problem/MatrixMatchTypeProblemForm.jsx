import React, { Component } from 'react';
import MatrixSolutionRadioOption from './MatrixSolutionRadioOption';

class MatrixMatchTypeProblemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        matrixMatchProblem : {
          statement: '',
          option_a:'',
          option_b:'',
          option_c:'',
          option_d:'',
          option_p:'',
          option_q:'',
          option_r:'',
          option_s:'',
          option_t:'',
          sol_option_a: '',
          sol_option_b: '',
          sol_option_c: '',
          sol_option_d: ''
        },
        submitted: false
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event) {
    //console.log("option change " + event.target.name + " value " + event.target.value);
    const { name, value } = event.target;
    const {matrixMatchProblem} = this.state;
      this.setState({
          matrixMatchProblem: {
              ...matrixMatchProblem,
              [name] : value
          },
          submitted: false
      });
      console.log("state " + JSON.stringify(this.state));
  }

  changeEvent(event) {
    const {matrixMatchProblem} = this.state;
    console.log("name " + event.target.name + " value " + event.target.value);

    this.setState({
        matrixMatchProblem: {
            ...matrixMatchProblem,
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
    const { matrixMatchProblem, submitted } = this.state;
    console.log("single more render " + JSON.stringify(matrixMatchProblem));
    console.log(styles.containerStyle);
    return (
      <div style={styles.mainContainer}>
          <h2>{counter}. Matrix Match Type Problem</h2>
          <form name="matrix_match_prob_form" onSubmit={(event) => handleSubmit(event, matrixMatchProblem)}>
          <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.statement ? ' has-error' : '')}>
              <label htmlFor="statement">Problem Statement</label>
              <textarea className="form-control"
                onChange={(event) => {
                    handleChange(event, 'matrix_match_type');
                    this.changeEvent(event);
                  }
                }
                  value={matrixMatchProblem.statement}
                  name="statement"
                  />
              {submitted && !matrixMatchProblem.statement &&
                  <div className="help-block">Problem Statement is required</div>
              }
          </div>

          <div style={styles.containerStyle}>
            <div style={styles.leftContainer}>

            <p></p>
            <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.option_a ? ' has-error' : '')}>
                <label htmlFor="option_a">A.</label>
                <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'matrix_match_type');
                      this.changeEvent(event);
                    }
                  }
                    value={matrixMatchProblem.option_a}
                    name="option_a"
                    />
                {submitted && !matrixMatchProblem.option_a &&
                    <div className="help-block">Option A is required</div>
                }
            </div>
            <p></p>
            <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.option_b ? ' has-error' : '')}>
                <label htmlFor="option_b">B.</label>
                <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'matrix_match_type');
                      this.changeEvent(event);
                    }
                  }
                    value={matrixMatchProblem.option_b}
                    name="option_b"
                    />

                {submitted && !matrixMatchProblem.option_b &&
                    <div className="help-block">Option B is required</div>
                }
            </div>
            <p></p>
            <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.option_c ? ' has-error' : '')}>
                <label htmlFor="option_c">C.</label>
                <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'matrix_match_type');
                      this.changeEvent(event);
                    }
                  }
                    value={matrixMatchProblem.option_c}
                    name="option_c"
                    />
                {submitted && !matrixMatchProblem.option_c &&
                    <div className="help-block">Option C is required</div>
                }
            </div>
            <p></p>
            <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.option_d ? ' has-error' : '')}>
                <label htmlFor="option_d">D.</label>
                <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'matrix_match_type');
                      this.changeEvent(event);
                    }
                  }
                    value={matrixMatchProblem.option_d}
                    name="option_d"
                    />
                {submitted && !matrixMatchProblem.option_d &&
                    <div className="help-block">Option D is required</div>
                }
            </div>
            <p></p>

            </div>
            <div style={styles.rightContainer}>
            <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.option_p ? ' has-error' : '')}>
                <label htmlFor="option_p">P.</label>
                <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'matrix_match_type');
                      this.changeEvent(event);
                    }
                  }
                    value={matrixMatchProblem.option_p}
                    name="option_p"
                    />
                {submitted && !matrixMatchProblem.option_p &&
                    <div className="help-block">Option P is required</div>
                }
            </div>
            <p></p>
            <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.option_q ? ' has-error' : '')}>
                <label htmlFor="option_q">Q.</label>
                <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'matrix_match_type');
                      this.changeEvent(event);
                    }
                  }
                    value={matrixMatchProblem.option_q}
                    name="option_q"
                    />
                {submitted && !matrixMatchProblem.option_q &&
                    <div className="help-block">Option Q is required</div>
                }
            </div>
            <p></p>
            <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.option_r ? ' has-error' : '')}>
                <label htmlFor="option_r">R.</label>
                <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'matrix_match_type');
                      this.changeEvent(event);
                    }
                  }
                    value={matrixMatchProblem.option_r}
                    name="option_r"
                    />

                {submitted && !matrixMatchProblem.option_r &&
                    <div className="help-block">Option R is required</div>
                }
            </div>
            <p></p>
            <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.option_s ? ' has-error' : '')}>
                <label htmlFor="option_s">S.</label>
                <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'matrix_match_type');
                      this.changeEvent(event);
                    }
                  }
                    value={matrixMatchProblem.option_s}
                    name="option_s"
                    />
                {submitted && !matrixMatchProblem.option_s &&
                    <div className="help-block">Option S is required</div>
                }
            </div>
            <p></p>
            <div className={'form-group col-lg-12' + (submitted && !matrixMatchProblem.option_t ? ' has-error' : '')}>
                <label htmlFor="option_t">T.</label>
                <textarea className="form-control"
                  onChange={(event) => {
                      handleChange(event, 'matrix_match_type');
                      this.changeEvent(event);
                    }
                  }
                    value={matrixMatchProblem.option_t}
                    name="option_t"
                    />
                {submitted && !matrixMatchProblem.option_t &&
                    <div className="help-block">Option T is required</div>
                }
            </div>


            </div>


            <div style={styles.radioContainer}>
              <MatrixSolutionRadioOption
                label="Solution A"
                onChange={this.handleOptionChange}
                checked_a={matrixMatchProblem.sol_option_a == 'option_p'}
                checked_b={matrixMatchProblem.sol_option_a == 'option_q'}
                checked_c={matrixMatchProblem.sol_option_a == 'option_r'}
                checked_d={matrixMatchProblem.sol_option_a == 'option_s'}
                checked_e={matrixMatchProblem.sol_option_a == 'option_t'}
                nameProp='sol_option_a'
               />
               <MatrixSolutionRadioOption
                 label="Solution B"
                 onChange={this.handleOptionChange}
                 checked_a={matrixMatchProblem.sol_option_b == 'option_p'}
                 checked_b={matrixMatchProblem.sol_option_b == 'option_q'}
                 checked_c={matrixMatchProblem.sol_option_b == 'option_r'}
                 checked_d={matrixMatchProblem.sol_option_b == 'option_s'}
                 checked_e={matrixMatchProblem.sol_option_b == 'option_t'}
                 nameProp='sol_option_b'
                />
                <MatrixSolutionRadioOption
                  label="Solution C"
                  onChange={this.handleOptionChange}
                  checked_a={matrixMatchProblem.sol_option_c == 'option_p'}
                  checked_b={matrixMatchProblem.sol_option_c == 'option_q'}
                  checked_c={matrixMatchProblem.sol_option_c == 'option_r'}
                  checked_d={matrixMatchProblem.sol_option_c == 'option_s'}
                  checked_e={matrixMatchProblem.sol_option_c == 'option_t'}
                  nameProp='sol_option_c'
                 />
                 <MatrixSolutionRadioOption
                   label="Solution D"
                   onChange={this.handleOptionChange}
                   checked_a={matrixMatchProblem.sol_option_d == 'option_p'}
                   checked_b={matrixMatchProblem.sol_option_d == 'option_q'}
                   checked_c={matrixMatchProblem.sol_option_d == 'option_r'}
                   checked_d={matrixMatchProblem.sol_option_d == 'option_s'}
                   checked_e={matrixMatchProblem.sol_option_d == 'option_t'}
                   nameProp='sol_option_d'
                  />
            </div>

            <p></p>
            <div>
                <button className="btn btn-primary">Register</button>
                {registering &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
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


export default MatrixMatchTypeProblemForm;
