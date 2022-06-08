import { EndCursor, MappedTimelineItem } from './types';

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
  const timelinePage = await getTimelinePage(ig, endCursor);

  // Getting the array of items
  const timelineItems: any[] =
    timelinePage.data.user.edge_web_feed_timeline.edges;
  // Needed for pagination
  const newEndCursor: string =
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
  while (i < 3) {
    //@ts-ignore
    const { newEndCursor, mappedTimelineItems } = await getTimelineItems(
      ig,
      endCursor
    );
    endCursor = newEndCursor;
    //
    mappedTimelineItems.sort(
      (obja: MappedTimelineItem, objb: MappedTimelineItem) => {
        if (obja.taken_at_timestamp > objb.taken_at_timestamp) {
          return 1;
        }
        return 0;
      }
    );

    for (const item of mappedTimelineItems) {
      console.dir(`${item.owner} ${item.taken_at_timestamp}`);
      // Exit loop if encountering a liked photo. Assumes that the
      if (item.viewer_has_liked) {
        return;
      }

      // like it if if not liked
      // await ig.like({ mediaId: item.id });
    }

    // Termination failsafe; can modify this if using it differently
    i += 1;
  }
}
