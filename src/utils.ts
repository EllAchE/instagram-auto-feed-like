// Random timeout from 1s to 3.5s
export async function simulateHumanity(): Promise<void> {
  await setTimeout(() => {}, Math.random() * 2500 + 1000);
}
