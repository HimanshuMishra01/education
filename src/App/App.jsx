import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
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
            <Router history={history}>
                <div className="container">

                    <header>
                      <Link to="/"><img src="image.jpeg" style={styles.imageStyle} /></Link>
                      YATI EDUCATION
                    </header>
                    <h3 className="logout"><Link to="/login">Logout</Link></h3>
                    <div>
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }

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

                    </div>
                    <footer>&copy; YATI EDUCATION</footer>
                </div>
                </Router>
            </div>
        );
    }
}

const styles = {
  imageStyle: {
    width: '50px',
    height: '50px',
    float: 'left',
    marginTop: '-16px',
    zIndex: '2'
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
