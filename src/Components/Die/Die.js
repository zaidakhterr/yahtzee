import React, { Component } from 'react';
import './Die.css';
import '@fortawesome/fontawesome-free/css/all.css';

class Die extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.idx);
  }

  render() {
    const faces = ['one', 'two', 'three', 'four', 'five', 'six'];
    let classes = `Die fas fa-dice-${faces[this.props.val - 1]} fa-5x `;
    if (this.props.locked) classes += 'Die-locked';
    else if (this.props.isRolling) classes += 'Die-rolling';
    return (
      <i
        className={classes}
        onClick={this.handleClick}
        disabled={this.props.disabled}></i>
    );
  }
}

export default Die;
