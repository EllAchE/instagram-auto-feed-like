const Instagram = require('instagram-web-api');
const FileCookieStore = require('tough-cookie-filestore2');
require('dotenv').config();

export async function generateClientAndLogIn(): Promise<typeof Instagram> {
  const { IG_USERNAME, IG_PASSWORD } = process.env;
  if (IG_USERNAME && IG_PASSWORD) {
    const cookieStore: typeof FileCookieStore = new FileCookieStore(
      '../cookies.json'
    );
    const ig: typeof Instagram = new Instagram({
      username: IG_USERNAME,
      password: IG_PASSWORD,
      cookieStore,
    });

    const { user, authenticated, username, password, cookies } =
      await ig.login();
    return ig;
  } else {
    throw new Error('Must have values for IG_USERNAME and IG_PASSWORD');
  }
}
