import { generateClientAndLogIn } from './login';
import { likeTimelinePostsUntilLastLiked } from './timeline';

async function test() {
  const ig = await generateClientAndLogIn();
  await likeTimelinePostsUntilLastLiked(ig);
}

test();
