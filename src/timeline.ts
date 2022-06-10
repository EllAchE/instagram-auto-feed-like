import { EndCursor, MappedTimelineItem } from './types';
import { simulateHumanity } from './utils';

// getHome docs https://github.com/jlobos/instagram-web-api#gethome
export async function getTimelinePage(ig: any, endCursor?: string) {
  // if (endCursor) { // may need this
  //   return ig.getHome(endCursor);
  // }
  //return ig.getHome();
  return ig.getHome(endCursor);
}

export async function getTimelineItems(
  ig: any,
  endCursor?: EndCursor
): Promise<{
  mappedTimelineItems: MappedTimelineItem[];
  newEndCursor: EndCursor;
}> {
  const timelinePage = await getTimelinePage(ig, endCursor?.end_cursor);

  // Getting the array of items
  const timelineItems: any[] =
    timelinePage.data.user.edge_web_feed_timeline.edges;
  // Needed for pagination
  const newEndCursor: EndCursor =
    timelinePage.data.user.edge_web_feed_timeline.page_info;

  const mappedTimelineItems = timelineItems.map((item: any) =>
    mapTimelineItem(item)
  );

  return {
    mappedTimelineItems,
    newEndCursor,
  };
}

function mapTimelineItem(timelineItem: any): MappedTimelineItem {
  const post = timelineItem.node;

  const { viewer_has_liked, owner, taken_at_timestamp, id } = post;

  return {
    viewer_has_liked,
    owner,
    taken_at_timestamp,
    id,
  };
}

export async function likeTimelinePostsUntilLastLiked(ig: any) {
  let endCursor: EndCursor | undefined = undefined;
  let i = 0;
  // Pagination loads 20 posts, so this fetches 300 total before termination

  simulateHumanity(1000, 4500);

  while (i < 20) {
    //@ts-ignore
    const { newEndCursor, mappedTimelineItems } = await getTimelineItems(
      ig,
      endCursor
    );
    endCursor = newEndCursor;

    for (const item of mappedTimelineItems) {
      if (!item.viewer_has_liked) {
        await ig.like({ mediaId: item.id });

        console.log(
          `liked post from ${item?.owner?.username}, posted at ${item.taken_at_timestamp}`
        );
      }

      simulateHumanity(1000, 4500);
    }

    // Termination failsafe; can modify this if using it differently
    i += 1;
  }
}
