import { Component } from 'react';
import { connect } from 'react-redux';
import '../css/components/PathMeter.module.css';

import PathMeter from '../components/PathMeter';
import PathButtons from '../components/PathButtons';
import PathMeterAbilities from './PathMeterAbilities';
import { setPathMeterA } from '../actions/actionPathMeterA';
import { setPathMeterB } from '../actions/actionPathMeterB';
import { setPathMeterC } from '../actions/actionPathMeterC';
import { setCurrentPoints } from '../actions/actionCurrentPoints';
import { State } from '../reducers';

type Props = {
  points: number;
  currentPoints: number;
  path: 'a' | 'b' | 'c';
  pathMeterA: number;
  pathMeterB: number;
  pathMeterC: number;
  masteryAbilities: number[];
  masteryMorales: number[];
  masteryTactics: number[];
  setCurrentPoints: (points: number) => {
    type: string;
    payload: number;
  };
  setPathMeterA: (points: number) => {
    type: string;
    payload: number;
  };
  setPathMeterB: (points: number) => {
    type: string;
    payload: number;
  };
  setPathMeterC: (points: number) => {
    type: string;
    payload: number;
  };
};

const assertNever = (val: never): never => {
  throw new Error(`Reached unreachable code, val: ${val}`);
};

class PathButtonsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.setPoints = this.setPoints.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.removePoint = this.removePoint.bind(this);
  }

  setPoints(pathPoints: number) {
    const {
      path,
      points,
      pathMeterA,
      pathMeterB,
      pathMeterC,
      setPathMeterA,
      setPathMeterB,
      setPathMeterC,
      setCurrentPoints,
      masteryAbilities,
      masteryMorales,
      masteryTactics,
    } = this.props;
    // Set path and current points depending on which path
    switch (path) {
      case 'a':
        setPathMeterA(pathPoints);
        setCurrentPoints(
          points -
            (pathPoints +
              pathMeterB +
              pathMeterC +
              masteryAbilities.length +
              masteryMorales.length +
              masteryTactics.length),
        );
        return;
      case 'b':
        setPathMeterB(pathPoints);
        setCurrentPoints(
          points -
            (pathPoints +
              pathMeterA +
              pathMeterC +
              masteryAbilities.length +
              masteryMorales.length +
              masteryTactics.length),
        );
        return;
      case 'c':
        setPathMeterC(pathPoints);
        setCurrentPoints(
          points -
            (pathPoints +
              pathMeterA +
              pathMeterB +
              masteryAbilities.length +
              masteryMorales.length +
              masteryTactics.length),
        );
        return;
      default:
        assertNever(path);
    }
  }

  addPoint() {
    const {
      path,
      currentPoints,
      pathMeterA,
      pathMeterB,
      pathMeterC,
      setPathMeterA,
      setPathMeterB,
      setPathMeterC,
      setCurrentPoints,
    } = this.props;
    // Set path points depending on which path
    switch (path) {
      case 'a':
        setPathMeterA(pathMeterA + 1);
        break;
      case 'b':
        setPathMeterB(pathMeterB + 1);
        break;
      case 'c':
        setPathMeterC(pathMeterC + 1);
        break;
      default:
        assertNever(path);
    }
    // Decrement current points
    setCurrentPoints(currentPoints - 1);
  }

  removePoint() {
    const {
      path,
      currentPoints,
      pathMeterA,
      pathMeterB,
      pathMeterC,
      setPathMeterA,
      setPathMeterB,
      setPathMeterC,
      setCurrentPoints,
    } = this.props;
    // Set path points depending on which path
    switch (path) {
      case 'a':
        setPathMeterA(pathMeterA - 1);
        break;
      case 'b':
        setPathMeterB(pathMeterB - 1);
        break;
      case 'c':
        setPathMeterC(pathMeterC - 1);
        break;
      default:
        assertNever(path);
    }
    // Increment current points
    setCurrentPoints(currentPoints + 1);
  }

  render() {
    const { path, pathMeterA, pathMeterB, pathMeterC, currentPoints } =
      this.props;
    let pathPoints = 0;
    // Set path points depending on which path
    switch (path) {
      case 'a':
        pathPoints = pathMeterA;
        break;
      case 'b':
        pathPoints = pathMeterB;
        break;
      case 'c':
        pathPoints = pathMeterC;
        break;
    }
    const meterMax = 15;
    return (
      <div className="row row--justify">
        <div>
          <PathMeter
            points={currentPoints}
            pathPoints={pathPoints}
            setPoints={this.setPoints}
            meterMax={meterMax}
          />
          <PathButtons
            points={currentPoints}
            pathPoints={pathPoints}
            addPoint={this.addPoint}
            removePoint={this.removePoint}
            meterMax={meterMax}
          />
        </div>
        <PathMeterAbilities path={path} />
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
}: State) {
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

export default connect(mapStateToProps, {
  setPathMeterA,
  setPathMeterB,
  setPathMeterC,
  setCurrentPoints,
})(PathButtonsContainer);
