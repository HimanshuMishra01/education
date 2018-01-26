import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { problemActions } from '../_actions';
import IntegerTypeProblemForm   from './IntegerTypeProblemForm';
import SingleMoreProblemForm   from './SingleMoreProblemForm';
import MatrixMatchTypeProblemForm   from './MatrixMatchTypeProblemForm';

class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: {
                counter: 1,
                problem_type_radio: 'INTEGER_TYPE',
                challengeId: '',
                marks: 1,
                penalty: 0
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderProblemType = this.renderProblemType.bind(this);
        this.handleProblemTypeChange = this.handleProblemTypeChange.bind(this);
        this.handleMarksPenaltyChange = this.handleMarksPenaltyChange.bind(this);
    }

    handleClick(event) {

    }

    renderProblemType() {
      const {problem} = this.state;
      const {count} = this.props;
      console.log("count " + count);

      switch (problem.problem_type_radio) {
        case 'INTEGER_TYPE':
          return <IntegerTypeProblemForm handleSubmit={this.handleSubmit} handleChange={this.handleChange}
          registering={false} counter={count + 1} />;
      case 'SINGLE_MORE_TYPE':
        return <SingleMoreProblemForm handleSubmit={this.handleSubmit} handleChange={this.handleChange}
        registering={false} counter={count + 1} />;
      case 'MATRIX_MATCH_TYPE':
        return <MatrixMatchTypeProblemForm handleSubmit={this.handleSubmit} handleChange={this.handleChange}
        registering={false} counter={count + 1} />;
        default:
          return <div>Invalid Problem Type</div>;
      }
    }

    handleProblemTypeChange(event) {
      const { name, value } = event.target;
      const {problem} = this.state;
      if(name == 'problem_type_radio') {
        this.setState({
            problem: {
                ...problem,
                [name] : value
            },
            submitted: false
        });

        //console.log("state " + JSON.stringify(this.state));
      }
    }

    handleMarksPenaltyChange(event) {
      const { name, value } = event.target;
      console.log("name " + name + " value " + value);
      const {problem} = this.state;
      this.setState({
          problem: {
              ...problem,
              [name] : value
          },
          submitted: false
      });
    }

    handleChange(event, type) {
      const { name, value } = event.target;
        //console.log("inside handleChange name " + name + " type " + type + " value " + value);
        switch (type) {
          case 'integer_type':

            break;
          default:
        }
    }

    handleSubmit(event, problemData) {
      event.preventDefault();
      this.setState({ submitted: true });
      const { dispatch } = this.props;
      const { problem } = this.state;
      console.log("^^^^^^^^^^^^^^ " + event.target.name + " problemData " + JSON.stringify(problemData) + " challengeData " + JSON.stringify(problem));
      dispatch(problemActions.register(problemData, problem));
    }

    componentDidMount() {
      this.props.dispatch(problemActions.getProblemCount(this.props.challengeId));
      const {problem} = this.state;
      this.setState({
        problem: {
          ...problem,
          ['challengeId']: this.props.challengeId
        }
      });
    }

    render() {
        const {problem, submitted} = this.state;


        console.log("problem type radio " + problem.problem_type_radio);

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register Problem</h2>
                <div>
                <label className="radio-inline">
                  <input type="radio" name="problem_type_radio" value="INTEGER_TYPE"
                    onChange={this.handleProblemTypeChange}
                    checked={problem.problem_type_radio == 'INTEGER_TYPE'} />Integer Type
                </label>
                <label className="radio-inline">
                  <input type="radio" name="problem_type_radio" value="SINGLE_MORE_TYPE"
                   onChange={this.handleProblemTypeChange}
                    checked={problem.problem_type_radio == 'SINGLE_MORE_TYPE'}  />Single More Type
                </label>
                <label className="radio-inline">
                  <input type="radio" name="problem_type_radio" value="MATRIX_MATCH_TYPE"
                  onChange={this.handleProblemTypeChange}
                   checked={problem.problem_type_radio == 'MATRIX_MATCH_TYPE'} />Matrix Match Type
                </label>

                <div className={'form-group' + (submitted && !problem.marks ? ' has-error' : '')}>
                    <label htmlFor="marks">Marks</label>

                    <input type="text" className="form-control" name="marks" value={problem.marks} onChange={this.handleMarksPenaltyChange} style={{'width': 50}} />
                    {submitted && !problem.marks &&
                        <div className="help-block">Marks is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !problem.penalty ? ' has-error' : '')}>
                    <label htmlFor="penalty">Penalty</label>

                    <input type="text" className="form-control" name="penalty" value={problem.penalty} onChange={this.handleMarksPenaltyChange} style={{'width': 50}} />
                    {submitted && !problem.penalty &&
                        <div className="help-block">Penalty is required</div>
                    }
                </div>
                    {this.renderProblemType()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  console.log("state " + JSON.stringify(state));
    const { challengeId } = state.challenge;
    const { count } = state.problem
    return {
        challengeId,
        count
    };
}

const connectedProblemPage = connect(mapStateToProps)(Problem);
export { connectedProblemPage as Problem };
