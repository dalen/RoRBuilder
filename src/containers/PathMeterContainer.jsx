import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/components/PathMeter.module.css';

import PathMeter from '../components/PathMeter';
import PathButtons from '../components/PathButtons';
import PathMeterAbilities from './PathMeterAbilities';
import { setPathMeterA } from '../actions/actionPathMeterA';
import { setPathMeterB } from '../actions/actionPathMeterB';
import { setPathMeterC } from '../actions/actionPathMeterC';
import { setCurrentPoints } from '../actions/actionCurrentPoints';

class PathButtonsContainer extends Component {
  constructor(props) {
    super(props);
    this.setPoints = this.setPoints.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.removePoint = this.removePoint.bind(this);
  }

  setPoints(pathPoints) {
    // Set path and current points depending on which path
    switch (this.props.path) {
      case 'a':
        this.props.setPathMeterA(pathPoints);
        this.props.setCurrentPoints(
          this.props.points -
            (pathPoints +
              this.props.pathMeterB +
              this.props.pathMeterC +
              this.props.masteryAbilities.length +
              this.props.masteryMorales.length +
              this.props.masteryTactics.length),
        );
        break;
      case 'b':
        this.props.setPathMeterB(pathPoints);
        this.props.setCurrentPoints(
          this.props.points -
            (pathPoints +
              this.props.pathMeterA +
              this.props.pathMeterC +
              this.props.masteryAbilities.length +
              this.props.masteryMorales.length +
              this.props.masteryTactics.length),
        );
        break;
      case 'c':
        this.props.setPathMeterC(pathPoints);
        this.props.setCurrentPoints(
          this.props.points -
            (pathPoints +
              this.props.pathMeterA +
              this.props.pathMeterB +
              this.props.masteryAbilities.length +
              this.props.masteryMorales.length +
              this.props.masteryTactics.length),
        );
        break;
    }
  }

  addPoint() {
    // Set path points depending on which path
    switch (this.props.path) {
      case 'a':
        this.props.setPathMeterA(this.props.pathMeterA + 1);
        break;
      case 'b':
        this.props.setPathMeterB(this.props.pathMeterB + 1);
        break;
      case 'c':
        this.props.setPathMeterC(this.props.pathMeterC + 1);
        break;
    }
    // Decrement current points
    this.props.setCurrentPoints(this.props.currentPoints - 1);
  }

  removePoint() {
    // Set path points depending on which path
    switch (this.props.path) {
      case 'a':
        this.props.setPathMeterA(this.props.pathMeterA - 1);
        break;
      case 'b':
        this.props.setPathMeterB(this.props.pathMeterB - 1);
        break;
      case 'c':
        this.props.setPathMeterC(this.props.pathMeterC - 1);
        break;
    }
    // Increment current points
    this.props.setCurrentPoints(this.props.currentPoints + 1);
  }

  render() {
    let pathPoints = 0;
    // Set path points depending on which path
    switch (this.props.path) {
      case 'a':
        pathPoints = this.props.pathMeterA;
        break;
      case 'b':
        pathPoints = this.props.pathMeterB;
        break;
      case 'c':
        pathPoints = this.props.pathMeterC;
        break;
    }
    const meterMax = 15;
    return (
      <div className="row row--justify">
        <div>
          <PathMeter
            points={this.props.currentPoints}
            pathPoints={pathPoints}
            setPoints={this.setPoints}
            meterMax={meterMax}
          />
          <PathButtons
            points={this.props.currentPoints}
            pathPoints={pathPoints}
            addPoint={this.addPoint}
            removePoint={this.removePoint}
            meterMax={meterMax}
          />
        </div>
        <PathMeterAbilities path={this.props.path} />
      </div>
    );
  }
}

function mapStateToProps({
  points,
  currentPoints,
  pathMeterA,
  pathMeterB,
  pathMeterC,
  masteryAbilities,
  masteryMorales,
  masteryTactics,
}) {
  return {
    points,
    currentPoints,
    pathMeterA,
    pathMeterB,
    pathMeterC,
    masteryAbilities,
    masteryMorales,
    masteryTactics,
  };
}

export default connect(
  mapStateToProps,
  { setPathMeterA, setPathMeterB, setPathMeterC, setCurrentPoints },
)(PathButtonsContainer);
