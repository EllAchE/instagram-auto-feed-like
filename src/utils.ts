// Random timeout from 1s to 3.5s
export function simulateHumanity(base: number, random: number): void {
  var currentTime = new Date().getTime();
  while (currentTime + base + random * Math.random() >= new Date().getTime()) {}
}
