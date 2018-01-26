import React from 'react'
import PropTypes from 'prop-types'

const ChallengeListItem = ({ onClick, text, id }) => (
  <a
    onClick={onClick}
    id={id}
    className="list-group-item list-group-item-action"
  >
    {text}
  </a>
)

ChallengeListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default ChallengeListItem
