import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserData } from "../../hooks/useGetUserData.jsx";
import UserData from "../../Components/UserData/UserData.jsx";
import UserComments from "../../Components/UserData/UserComments.jsx";
import { useGetCommentsByUser } from "../../hooks/useGetCommentsByUser.jsx";
import { useDeleteComment } from "../../hooks/useDeleteComment";

export default function UserDataPage() {
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const params = useParams();
  const { getUserData } = useGetUserData();
  const { getCommentsByUser } = useGetCommentsByUser([]);

  const fetchUserComments = async () => {
    try {
      let fetchedComments = await getCommentsByUser(params.userID);

      if (fetchedComments?.comments) {
        setComments(fetchedComments.comments);
      }
    } catch (err) {
      console.log(err);
      console.log("Error fetching user comments ");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let fetchedUserData = await getUserData(params.userID);

        if (fetchedUserData) {
          setUser(fetchedUserData);
        }
      } catch (err) {
        console.log(err);
        console.log("Error fetching user data ");
      }
    };

    fetchUserData();
    fetchUserComments();
  }, [params.userID]);

  const { deleteComment } = useDeleteComment();

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      fetchUserComments();
    } catch (err) {
      console.log(err);
      console.log("Error fetching deleting comment ");
    }
  };

  return (
    <>
      {/*conditional rendering based on data being fetched*/}
      {user && <UserData user={user} />}
      <hr />
      {comments && (
        <UserComments comments={comments} onDelete={handleDeleteComment} />
      )}
    </>
  );
}
