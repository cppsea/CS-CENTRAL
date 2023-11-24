//Component for list of related topics, which displays multiple categories of topic lists

import { Stack } from "react-bootstrap";
import TopicList from "./TopicList";

//accepts an array of objects, which each contain topic category name
//and an array of topics and their corresponding links
//these objects have the following format
/*{
    topicCategory: string,
    topicList: Array of {topic: string, link: string}
}
*/

export default function RelatedTopicsList({ topicLists }) {
  return (
    <Stack className="ps-3" style={{ borderLeft: "1px solid black" }}>
      <h3 className="related-topics-heading">Related Topics</h3>
      <Stack gap={3}>
        {topicLists.map(({ topicCategory, topicList }) => (
          <TopicList
            topicCategory={topicCategory}
            topicList={topicList}
            key={topicCategory}
          />
        ))}
      </Stack>
    </Stack>
  );
}
