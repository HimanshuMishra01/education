import React, {Component} from 'react';

class ProblemList extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    
  }

  render() {
    return <div> ProblemList </div>;
  }

}

function mapStateToProps(state) {
  console.log("state " + JSON.stringify(state));
    const { challengeId } = state.challenge;
    return {
        challengeId
    };
}

const connectedProblemListPage = connect(mapStateToProps)(ProblemList);
export { connectedProblemPage as ProblemList };
