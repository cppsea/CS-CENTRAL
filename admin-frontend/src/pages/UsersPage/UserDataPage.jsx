import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserData } from "../../hooks/useGetUserData.jsx";
import UserData from "../../Components/UserData/UserData.jsx";

export default function UserDataPage() {
  const [user, setUser] = useState();
  const params = useParams();
  const { getUserData } = useGetUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let fetchedUserData = await getUserData(params.userID);
        console.log("Fetched user:", fetchedUserData);

        if (fetchedUserData) {
          setUser(fetchedUserData);
        }
      } catch (err) {
        console.log(err);
        console.log("Error fetching user data ");
      }
    };

    fetchUserData();
  }, [params.userID]);
  return (
    <>
      {/*conditional rendering based on data being fetched*/}
      {user && <UserData user={user} />}
    </>
  );
}
