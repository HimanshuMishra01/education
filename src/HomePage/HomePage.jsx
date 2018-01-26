import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getCurrentUser());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    checkAdmin(current_user) {
      if(current_user && (current_user.roles.indexOf("ROLE_ADMIN") != -1)) {
        return (

            <div className="col-md-6 col-md-offset-3">
                {
                  current_user &&
                  <h1>Hi {JSON.stringify(current_user.username)}!</h1>

                }
                <p>
                    <Link to="/user_account">User Account Management</Link>
                </p>
                <p>
                    <Link to="/challenge">Challange Management</Link>
                </p>
                <p>
                    <Link to="/challenge_list">Problem Management</Link>
                </p>
                <p>
                    <Link to="/admin_solution">Student Solution</Link>
                </p>
            </div>
        );
      } else {
        return <div>Loading....</div>;
      }
    }

    render() {
        const { current_user, username, authentication } = this.props;
        console.log("authentication " + JSON.stringify(authentication));
        console.log( " current_user " + JSON.stringify(current_user));
        return (this.checkAdmin(current_user));
    }
}

function mapStateToProps(state) {
    //console.log("state " + JSON.stringify(state));
    const { users, authentication } = state;
    const { current_user } = users;
    return {
        current_user,
        authentication
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
