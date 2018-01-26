import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { StudentHome } from '../StudentHome';
import { UserAccount } from '../UserAccount';
import { Challenge, ChallengeList } from '../Challenge';
import { Problem, StudentProblem } from '../Problem';
import { StudentScoreSheet, AdminStudentScoreList } from '../ScoreSheet';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/student" component={StudentHome} />
                                <Route path="/user_account" component={UserAccount} />
                                <Route path="/challenge" component={Challenge} />
                                <Route path="/challenge_list" component={ChallengeList} />
                                <Route path="/problem" component={Problem} />
                                <Route path="/student_problem" component={StudentProblem} />
                                <Route path="/student_solution" component={StudentScoreSheet} />
                                <Route path="/admin_solution" component={AdminStudentScoreList} />


                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
