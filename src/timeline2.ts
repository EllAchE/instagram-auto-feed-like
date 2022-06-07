// getHome docs https://github.com/jlobos/instagram-web-api#gethome
export async function getTimelinePage(ig: any, endCursor?: string) {
  if (endCursor) {
    return ig.getHome(endCursor);
  }
  return ig.getHome();
}
