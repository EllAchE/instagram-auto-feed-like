import { generateClientAndLogIn } from './login2';
import { getTimelinePage } from './timeline2';

async function test() {
  const ig = await generateClientAndLogIn();
  const res = await getTimelinePage(ig);
  const res2 = await getTimelinePage(ig);
  await getTimelinePage(ig);
}

test();
