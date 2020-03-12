// Calculate mastery points available based on char level and renown level
// eslint-disable-next-line import/prefer-default-export
export function calculateMasteryPoints(level: number, renown: number) {
  let points = 0;
  if (level > 10) {
    if (level > 20) {
      points = level - 15;
    } else if (level > 18) {
      points = 5;
    } else if (level > 16) {
      points = 4;
    } else if (level > 14) {
      points = 3;
    } else if (level > 12) {
      points = 2;
    } else {
      points = 1;
    }
    switch (renown) {
      case 40:
        points += 1;
        break;
      case 50:
        points += 2;
        break;
      case 60:
        points += 3;
        break;
      case 70:
        points += 4;
        break;
      case 80:
        points += 6;
        break;
      default:
        break;
    }
  }
  // return mastery points
  return points;
}
