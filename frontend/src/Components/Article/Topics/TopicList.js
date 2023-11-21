//displays a list of topics

import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

//takes in a title for the list,
//and an array of objects that contain a topic and link
//the objects are of this format
/*
{
    topic: string,
    link: string
}
*/
export default function TopicList({ topicCategory, topicList }) {
  console.log(topicList);
  return (
    <Stack>
      {/*Topic Title*/}
      <Stack direction="horizontal">
        <h4 className="topic-list-title fw-bold">
          {topicCategory.toUpperCase()}
        </h4>
      </Stack>

      {/*Topic Link List */}
      <Stack gap={2} className="ps-4">
        {topicList.map(({ topic, link }) => (
          <Link className="topic-link fw-normal" to={link}>
            {topic}
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
