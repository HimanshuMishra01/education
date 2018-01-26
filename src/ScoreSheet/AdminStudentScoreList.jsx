import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tex, InlineTex} from 'react-tex';

class AdminStudentScoreList extends Component {
  constructor() {
    super();
    this.state = {text: ''};
    this.updateText = this.updateText.bind(this);
  }

  updateText(event) {
    var nText = event.target.value;
    this.setState(function () {
      return {text: nText};
    });
  }

  render() {
    var text = this.state.text;

    let latexString = "This is inline $$\\leftrightarrow \\sum_{3}^{22} \\sum_{3}^{22} f(x)dx = F(b) - F(a)$$ latex string";
    return(
      <div>
        <InlineTex texContent={latexString}/>
      </div>
    )

  }
}
function mapStateToProps(state) {
  console.log("state " + JSON.stringify(state));
}

const connectedAdminStudentScoreList = connect(mapStateToProps)(AdminStudentScoreList);
export { connectedAdminStudentScoreList as AdminStudentScoreList }
