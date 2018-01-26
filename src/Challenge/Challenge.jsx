import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Datetime from 'react-datetime';
import styles from '../style/react-datetime.css';
import { challengeActions } from '../_actions';

import {
  Button,
} from 'react-bootstrap';

class Challenge extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          challenge: {
              startTime: 0,
              endTime: 0,
              standard: '',
              name: '',
              duration: 0
          },
          submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if(event.target.name === 'reset') {
      this.setState(
        {
            challenge: {
                startTime: -1,
                endTime: -1,
                standard: '',
                name: '',
                duration: -1
            },
            submitted: false
        });
    }
  }

    handleChange = (event) => {
        const { name, value } = event.target;
        const {challenge} = this.state;
        this.setState({
            challenge: {
                ...challenge,
                [name]: value
            }
        });

    }

    handleDateChange = (changedTime, targetElementName) => {
      console.log("changedTime " + changedTime + " name " + targetElementName);
      const {challenge} = this.state;
      this.setState({
          challenge: {
              ...challenge,
              [targetElementName]: moment(changedTime).format("x")
          }
      });
    }

    handleFocusDate = (event) => {
      console.log("inside handle focus " + event);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { challenge } = this.state;
        console.log("challenge " + JSON.stringify(challenge) );
        console.log("this.state.selectedDate || this.state.inputValue " + this.state.selectedDate + "  " + this.state.inputValue)
        //user.roles = [user.roles];
        const { dispatch } = this.props;
        if (challenge.startTime && challenge.endTime && challenge.standard && challenge.name) {
            dispatch(challengeActions.register(challenge));
        }
    }

    render() {
      //const {date, format, mode, inputFormat} = this.state;
      const { registering  } = this.props;
      const { challenge, submitted } = this.state;
      return (

        <div className="col-md-6 col-md-offset-3">
            <h2>Register Challenge</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !challenge.name ? ' has-error' : '')}>
                    <label htmlFor="name">Name</label>

                    <input type="text" className="form-control" name="name" value={challenge.name} onChange={this.handleChange} />
                    {submitted && !challenge.name &&
                        <div className="help-block">Name is required</div>
                    }
                </div>

                <div className={'form-group' + (submitted && !challenge.startTime ? ' has-error' : '')}>
                    <label htmlFor="startTime">Start Time</label>
                    <Datetime name="startTime" onChange={this.handleDateChange} />
                    {submitted && !challenge.startTime &&
                        <div className="help-block">Start Time is required</div>
                    }
                </div>

                <div className={'form-group' + (submitted && !challenge.endTime ? ' has-error' : '')} onClick={this.handleClick} name="endtimecontainer">
                    <label htmlFor="endTime">End Time</label>
                    <Datetime name="endTime"  onChange={this.handleDateChange} />
                    {submitted && !challenge.endTime &&
                        <div className="help-block">End Time is required</div>
                    }
                </div>

                <div className={'form-group' + (submitted && !challenge.standard ? ' has-error' : '')}>
                    <label htmlFor="standard">Standard</label>

                    <input type="text" className="form-control" name="standard" value={challenge.standard} onChange={this.handleChange} />
                    {submitted && !challenge.standard &&
                        <div className="help-block">Standard is required</div>
                    }
                </div>

                <div className={'form-group' + (submitted && !challenge.duration ? ' has-error' : '')}>
                    <label htmlFor="duration">Duration(seconds)</label>

                    <input type="text" className="form-control" name="duration" value={challenge.duration} onChange={this.handleChange} />
                    {submitted && !challenge.duration &&
                        <div className="help-block">Duration is required</div>
                    }
                </div>

                <div className="form-group">
                    <button className="btn btn-primary">Register</button>
                    {registering &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                    <Link to="/register" className="btn btn-link" onClick={this.handleClick} name="reset">Reset</Link>
                </div>
            </form>
        </div>
    );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedChallengePage = connect(mapStateToProps)(Challenge);
export { connectedChallengePage as Challenge };
