import { Stack } from "react-bootstrap";
import ArticleHeaderDesc from "./ArticleHeaderDesc";
import ArticleHeaderTitle from "./ArticleHeaderTitle";
import ArticleHeaderAuthorDate from "./ArticleHeaderAuthorDate";

//Component for the article header
/*
takes in:

string representing article title,
string representing article description,
string of author's name,
string containing date of creation 
(for now this is simply normal data like "Oct 9, 2023",
 but if we use a postgres time date it will need to be converted)
*/

export default function ArticleHeader({ title, description, author, date }) {
  return (
    <Stack gap={2}>
      <ArticleHeaderTitle title={title} />
      <ArticleHeaderDesc desc={description} />
      <ArticleHeaderAuthorDate author={author} date={date} />
    </Stack>
  );
}
