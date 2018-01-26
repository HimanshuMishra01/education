import React from 'react'
import PropTypes from 'prop-types'

const ChallengeListItem = ({ onClick, text, id, challengeName, startTime, endTime, duration }) => (
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

let styles = {
  container: {
    width: '100%'
  },
  challenge: {
    fontWeight: 'bold',
    fontSize: '15pt'
  },
  duration: {
    float: 'right',
    fontWeight: 'bold'
  }
};

export default ChallengeListItem
