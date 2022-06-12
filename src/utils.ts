// Random timeout from 1s to 3.5s
export function simulateHumanity(base: number, random: number): void {
  var currentTime = new Date().getTime();
  const waitTime = base + random * Math.random()
  while (currentTime + waitTime >= new Date().getTime()) {}
  console.log('waiting for ' + waitTime / 1000) 
}
