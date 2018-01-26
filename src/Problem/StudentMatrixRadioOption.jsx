import React, {Component} from 'react';

class StudentMatrixRadioOption extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    const {label, onChange, rightColumn, leftCol, clear, labelIndex} = this.props;
    console.log("matrix checkbox clear " + this.props.clear);
    return (<div>
      <strong>{label}.</strong>
    {
       rightColumn.map((options, index) => (
         <div key={options.label}>
           <label className="checkbox-inline">
             <input type="checkbox" name={(options.label + "$$" + index)}
             onChange={(event) => onChange(event, (leftCol + "$$" + labelIndex))}
              />{options.label}
           </label>
         </div>
    ))}
    </div>);
  }
}
const styles = {
    separator : {
      'width' : '120px'
    }
}

export default StudentMatrixRadioOption;
