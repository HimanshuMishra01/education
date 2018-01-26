import React from 'react'
import PropTypes from 'prop-types'

const StudentProblemListItem = ({ onClick, text, id, index }) => (

  <a
    onClick={(event) => onClick(event, index)}
    id={id}
    className="list-group-item list-group-item-action"
  >
    {text}
  </a>
);

StudentProblemListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

export default StudentProblemListItem;
