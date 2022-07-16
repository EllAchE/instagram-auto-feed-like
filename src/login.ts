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

    try {
      await ig.login();
    } catch (err: any) {
      if (err.error && err.error.message === 'checkpoint_required') {
        const reader = require('readline');
        const challengeUrl = err.error.checkpoint_url;

        // await ig.updateChallenge({ challengeUrl, choice: 1 });
        const a = 2;

        //const code = reader.question('Insert Code: ');

        // await ig.updateChallenge({ challengeUrl, securityCode: code });
      } else {
        console.log(err);
      }
    }

    await ig.login();
    console.log('logged in');

    return ig;
  } else {
    throw new Error('Must have values for IG_USERNAME and IG_PASSWORD');
  }
}
