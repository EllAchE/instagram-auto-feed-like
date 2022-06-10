import { generateClientAndLogIn } from './login';
import { likeTimelinePostsUntilLastLiked } from './timeline';

async function loginAndLikePosts() {
  const ig = await generateClientAndLogIn();
  await likeTimelinePostsUntilLastLiked(ig);
}

loginAndLikePosts();
