import React, { Component } from 'react';
import Dice from '../Dice/Dice';
import ScoreTable from '../ScoreTable/ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }).map(
        d => Math.floor(Math.random() * 6) + 1
      ),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scoresLeft: 13,
      isRolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    };
    this.reset = this.reset.bind(this);
    this.roll = this.roll.bind(this);
    this.animateRoll = this.animateRoll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  componentDidMount() {
    this.animateRoll();
  }

  reset() {
    this.setState(() => ({
      dice: Array.from({ length: NUM_DICE }).map(
        d => Math.floor(Math.random() * 6) + 1
      ),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scoresLeft: 13,
      isRolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    }));
    this.animateRoll();
  }

  animateRoll() {
    this.setState({ isRolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      isRolling: false,
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0 && !this.state.isRolling) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1),
        ],
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      scoresLeft: st.scoresLeft - 1,
      locked: Array(NUM_DICE).fill(false),
    }));
    this.animateRoll();
  }

  displayRollInfo() {
    const msgs = [
      '0 Rolls Left',
      '1 Roll Left',
      '2 Rolls Left',
      'Starting Round',
    ];
    return msgs[this.state.rollsLeft];
  }

  render() {
    const { dice, locked, rollsLeft, scores, isRolling } = this.state;
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee</h1>
          {this.state.scoresLeft === 0 ? (
            <section className='Game-reset-section'>
              <button className='Game-reroll' onClick={this.reset}>
                Play Again
              </button>
            </section>
          ) : (
            <section className='Game-dice-section'>
              <Dice
                dice={dice}
                locked={locked}
                handleClick={this.toggleLocked}
                disabled={rollsLeft === 0}
                isRolling={isRolling}
              />
              <div className='Game-button-wrapper'>
                <button
                  className='Game-reroll'
                  disabled={locked.every(x => x) || isRolling}
                  onClick={this.animateRoll}>
                  {this.displayRollInfo()}
                </button>
              </div>
            </section>
          )}
        </header>
        <ScoreTable
          doScore={this.doScore}
          scores={scores}
          isRolling={isRolling}
        />
      </div>
    );
  }
}

export default Game;
