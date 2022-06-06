import { IgApiClient } from 'instagram-private-api';

const ig = new IgApiClient();

const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
const items = ig.feed.accountFollowing().items$;

items.forEach((item) => {
  console.dir(item);
  console.log(item);
});
