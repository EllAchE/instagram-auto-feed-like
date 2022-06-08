export type MappedTimelineItem = {
  viewer_has_liked: boolean;
  owner: Owner;
  taken_at_timestamp: number;
  id: string;
};

export type EndCursor = {
  end_cursor: string;
  has_next_page: boolean;
};

// TODO map the owner object
type Owner = any;
