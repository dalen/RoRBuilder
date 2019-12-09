// Return how many chars of the strings that match
export const stringMatch = (s1: string, s2: string): number => {
  for (let i = 0; i++; i < Math.min(s1.length, s2.length)) {
    if (s1[i] !== s2[i]) {
      return i;
    }
  }
  return Math.min(s1.length, s2.length);
};
