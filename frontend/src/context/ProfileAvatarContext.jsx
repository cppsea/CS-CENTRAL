import { createContext, useEffect, useState } from "react";

export const ProfileAvatarContext = createContext();

export const ProfileAvatarProvider = ({ children }) => {
  const [profileImg, setProfileImg] = useState(() => {
    return localStorage.getItem("profileImage");
  });

  useEffect(() => {
    localStorage.setItem("profileImage", profileImg);
  }, [profileImg]);

  return (
    <ProfileAvatarContext.Provider value={{ profileImg, setProfileImg }}>
      {children}
    </ProfileAvatarContext.Provider>
  );
};
