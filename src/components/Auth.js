import React, { useEffect, useState } from "react";
import firebaseConfig from "../firebase/client";
import { database } from "../firebase/client";
import md5 from "md5";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [userData, setUserData] = useState(null);

  const getUserData = async (user) => {
    try {
      const res = await database.collection("users").doc(user.uid).get();
      setUserData(res.data());
      const hash = md5(user.email);

      if (res.data() === undefined) {
        const newUser = {
          uID: user.uid,
          rol: "emprendedor",
          username: user.displayName,
          form_complete: false,
          // ruta_asignada: false,
          email: user.email,
          avatar: user.photoURL || `https://www.gravatar.com/avatar/${hash}?d=identicon`
        };
        await database.collection("users").doc(user.uid).set(newUser, { merge: true });
        setUserData(newUser);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user && !userData) {
        getUserData(user);
      }
      setPending(false);
    });
  }, [userData]);

  if (pending) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
