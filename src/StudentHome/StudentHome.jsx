import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { ChallengeList } from '../Challenge';

class StudentHome extends React.Component {
    componentWillMount() {
      const { dispatch } = this.props;
      dispatch(userActions.getCurrentUser());
        console.log("student home componentWillMount");
    }

    render() {
        const { user, users } = this.props;
        //console.log("user " + JSON.stringify(user) + " users " + JSON.stringify(users));
        console.log("student home render")
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {users.current_user && users.current_user.firstName} {users.current_user && users.current_user.lastName}!</h1>
                <p>
                    <Link to="/challenge_list">My Challenges</Link>
                </p>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    console.log("user " + user);
    return {
        user,
        users
    };
}

const connectedStudentHome = connect(mapStateToProps)(StudentHome);
export { connectedStudentHome as StudentHome };
