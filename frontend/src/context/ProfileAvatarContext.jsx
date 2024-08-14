import { createContext, useEffect, useState } from "react";

export const ProfileAvatarContext = createContext();

export const ProfileAvatarProvider = ({ children }) => {
  const defaultImg = "./default_avatar.jpg";
  const [profileImg, setProfileImg] = useState(defaultImg);
  
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (profileImg === defaultImg && storedImage) {
      setProfileImg(storedImage);
    }

    if (profileImg !== defaultImg && profileImg !== storedImage) {
      localStorage.setItem("profileImage", profileImg);
    }
  }, [profileImg]);

  return (
    <ProfileAvatarContext.Provider value={{ profileImg, setProfileImg }}>
      {children}
    </ProfileAvatarContext.Provider>
  );
};
