import React, {
  RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { clearData, getData, hasTimestampPassed, storeData } from "../utils";

export interface AuthContextValue {
  user: FirebaseAuthTypes.User | undefined;
  setAPIUSER: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  setAPIUSER: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = React.useState<
    FirebaseAuthTypes.User | undefined
  >();
  const getUserAPI = async () => {
    const apiUser = await getData("API_USER");
    const userSessionExpiryString = await getData("EXPIRY_DATE");

    if (apiUser && userSessionExpiryString) {
      const apiUserOb = JSON.parse(apiUser);
      const userSessionExpiryunixTimestamp = JSON.parse(
        userSessionExpiryString
      );
      //console.log("apiUserOb", apiUserOb);
      //console.log("userSessionExpiry", userSessionExpiryunixTimestamp);
      const isSessionExpire = hasTimestampPassed(
        userSessionExpiryunixTimestamp
      );
      if (!isSessionExpire) {
        setAPIUSER(true);
      } else {
        auth()
          .signOut()
          .then(() => console.log("User signed out!"));
        await clearData("API_USER");
        await clearData("EXPIRY_DATE");
        await clearData("USER_DATA");
        await clearData("USER_TOKEN");
      }
    }
  };
  const setUserAPI = async (data: string) => {
    await storeData("API_USER", data);
  };

  const [apiUser, setApiUser] = useState(false);

  const setAPIUSER = async (value: boolean) => {
    await storeData("API_USER", JSON.stringify(value));
    setApiUser(value);
    setUserAPI(JSON.stringify(value));
  };

  React.useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      setFirebaseUser(apiUser);
      // setFirebaseUser(apiUser && user ? user : undefined);
    });
  });

  useEffect(() => {
    getUserAPI();
  }, []);
  const value: AuthContextValue = {
    user: firebaseUser,
    setAPIUSER,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export { AuthContextProvider, useAuthContext };
