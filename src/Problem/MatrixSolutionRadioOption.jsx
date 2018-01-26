import React, {Component} from 'react';

class MatrixSolutionRadioOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrixRadioOption : {
        sol_option_a: '',
        sol_option_b: '',
        sol_option_c: '',
        sol_option_d: ''
      }
    }
  }


  render(props) {
    const {onChange, checked_a, checked_b, checked_c, checked_d, checked_e, nameProp, label} = this.props;
    return (<div>
      <label style={styles.separator}>{label} </label>
      <label className="radio-inline">
        <input type="radio" name={nameProp} value="option_p"
        onChange={onChange}
          checked={checked_a} />P
      </label>
      <label className="radio-inline">
        <input type="radio" name={nameProp} value="option_q"
        onChange={onChange}
          checked={checked_b}   />Q
      </label>
      <label className="radio-inline">
        <input type="radio" name={nameProp} value="option_r"
        onChange={onChange}
          checked={checked_c}  />R
      </label>
      <label className="radio-inline">
        <input type="radio" name={nameProp} value="option_s"
        onChange={onChange}
          checked={checked_d}  />S
      </label>
      <label className="radio-inline">
        <input type="radio" name={nameProp} value="option_t"
        onChange={onChange}
          checked={checked_e}  />T
      </label>
    </div>);
  }
}
const styles = {
    separator : {
      'width' : '120px'
    }
}

export default MatrixSolutionRadioOption;
