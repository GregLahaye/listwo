import { useContext, useEffect } from "react";
import { db } from "./firebase";
import { UserContext } from "./UserContext";

export const Dashboard = () => {
  const { state } = useContext(UserContext);

  const fetchLists = async () => {
    const ref = db().ref(`users/${state.uid}/lists`);

    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      console.log(value);
    });
  };

  useEffect(() => {
    fetchLists();
  });

  return <p>hello</p>;
};
