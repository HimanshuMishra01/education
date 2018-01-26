import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChallengeListItem from './ChallengeListItem';
import moment from 'moment';
import { Problem } from '../Problem';
import { userActions } from '../_actions';

import { challengeActions } from '../_actions';

class ChallengeList extends React.Component {
  constructor(props) {
      super(props);
      this.onChallengeClick = this.onChallengeClick.bind(this);
      console.log("inside challengelist constr....");
    }

    userRole() {
      const { current_user } = this.props;
      //console.log("this.props " + JSON.stringify(this.props));
      //console.log("user role ..... " + JSON.stringify(current_user));
      if(current_user && current_user.roles) {
        if(current_user.roles.indexOf("ROLE_ADMIN") != -1) {
          return "ADMIN";
        } else if(current_user.roles.indexOf("ROLE_USER") != -1) {
          return "USER";
        }
      }
    }

    componentDidMount() {
      const { dispatch, current_user } = this.props;
      console.log("inside componentDidMount " + JSON.stringify(this.props) + " state " + JSON.stringify(this.state));
      if(this.userRole() == "ADMIN") {
        dispatch(challengeActions.getAllChallenges());
      } else if(this.userRole() == "USER") {
        dispatch(challengeActions.getAllUserChallenges(current_user));
      }
    }

    onChallengeClick(event, duration) {
      const { dispatch } = this.props;
      //console.log("currentuser " + JSON.stringify(current_user));
      localStorage.setItem('challenge_id', event.target.id);
      if(this.userRole() == "ADMIN") {
        dispatch(challengeActions.showProblems(event.target.id));
      } else if(this.userRole() == "USER") {
        dispatch(challengeActions.showUserProblems(duration));
      }
    }


    render() {
      //var challengeListData = this.state.challenge_list;
      var {list} = this.props;
      //console.log("list " + JSON.stringify(list));
      return (

        <div className="list-group">
          <h2>Challenge List</h2>
          {
            list &&
             list.map(challengeData => (
            <ChallengeListItem key={challengeData.id} {...challengeData}
            onClick={(event) => this.onChallengeClick(event, challengeData.duration)}
            challengeName={challengeData.name}
            startTime={moment(challengeData.startTime).format("MM/DD/YYYY HH:mm:ss")}
            endTime={moment(challengeData.endTime).format("MM/DD/YYYY HH:mm:ss")}
            duration={challengeData.duration}
            text={ challengeData.name + " " + challengeData.standard + " " +
            moment(challengeData.startTime).format("MM/DD/YYYY HH:mm:ss") + " - "
            + moment(challengeData.endTime).format("MM/DD/YYYY HH:mm:ss") + " Duration: " + challengeData.duration} />
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
    //console.log("challenge state... " + JSON.stringify(state));
    const { challenge, users } = state;
    const { list, loading } = challenge
    const { current_user } = users;
    return {
        loading,
        list,
        current_user
    };
}

const connectedChallengeListPage = connect(mapStateToProps)(ChallengeList);
export { connectedChallengeListPage as ChallengeList };
