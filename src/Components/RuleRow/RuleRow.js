import React, { Component } from 'react';
import './RuleRow.css';

class RuleRow extends Component {
  render() {
    const { score, name, doScore, description } = this.props;
    const enabled = score === undefined;
    return (
      <tr
        className={`RuleRow RuleRow-${enabled ? 'active' : 'disabled'}`}
        onClick={enabled ? doScore : null}>
        <td className='RuleRow-name'>{name}</td>
        <td className='RuleRow-score'>{enabled ? description : score}</td>
      </tr>
    );
  }
}

export default RuleRow;
