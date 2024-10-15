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
  isInitialized:boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  setAPIUSER: () => {},
  isInitialized:false
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<
    FirebaseAuthTypes.User | undefined
  >();

  const [apiUser,setApiUser]=useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

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
        // auth()
        //   .signOut()
        //   .then(() => console.log("User signed out!"));
        // await clearData("API_USER");
        // await clearData("EXPIRY_DATE");
        // await clearData("USER_DATA");
        // await clearData("USER_TOKEN");
await handleSignOut();
      }
    }
    setIsInitialized(true);
  };
  const setUserAPI = async (data: string) => {
    await storeData("API_USER", data);
  };


  const setAPIUSER = async (value: boolean) => {
    await storeData("API_USER", JSON.stringify(value));
    setApiUser(value);
    setUserAPI(JSON.stringify(value));
  };

  // React.useEffect(() => {
  //   return auth().onAuthStateChanged((user) => {
  //     setFirebaseUser(apiUser);
  //     // setFirebaseUser(apiUser && user ? user : undefined);
  //   });
  // });

  const handleSignOut = async () => {
    await auth().signOut();
    await clearData("API_USER");
    await clearData("EXPIRY_DATE");
    await clearData("USER_DATA");
    await clearData("USER_TOKEN");
    setApiUser(false);
    setFirebaseUser(undefined);
  };
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setFirebaseUser(apiUser && user ? user : undefined);
      if (!isInitialized) {
        getUserAPI();
      }
    });

    return unsubscribe;
  }, [apiUser, isInitialized]);

  const value: AuthContextValue = {
    user: firebaseUser,
    setAPIUSER,
    isInitialized,
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
