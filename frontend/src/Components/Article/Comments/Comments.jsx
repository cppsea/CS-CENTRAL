import CommentCreation from "./CommentCreation";
import CommentsList from "./CommentsList";
import { useEffect, useState } from "react";
import { useGetCommentsByArticles } from "../../../hooks/Comments/useGetCommentsByArticle";
import { useParams } from "react-router-dom";
import "./Comments.scss";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function Comments() {
  const { articleID = "" } = useParams();
  const { getCommentsByArticle } = useGetCommentsByArticles();
  const [comments, setComments] = useState([]);
  const { user } = useAuthContext();

  const fetchComments = async () => {
    try {
      const result = await getCommentsByArticle(articleID);
      if (result?.comments) {
        setComments(result.comments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleID]);
  return (
    <>
      <CommentCreation onCommentPosted={fetchComments} />
      <CommentsList comments={comments} />
    </>
  );
}
