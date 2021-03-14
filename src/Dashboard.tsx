import { useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { List } from "./List";
import { IList, IListMap } from "./types";
import { UserContext } from "./UserContext";

export const Dashboard = () => {
  const { state } = useContext(UserContext);

  const [lists, setLists] = useState<IList[]>([]);

  const fetchLists = async () => {
    const ref = db().ref(`users/${state.uid}/lists`);

    ref.on("value", (snapshot) => {
      const values: IList[] = [];

      snapshot.forEach((child) => {
        values.push({
          id: child.key,
          title: child.val().title,
        });
      });

      setLists(values);
    });
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div>
      {lists.map((list) => (
        <List key={list.id} list={list}></List>
      ))}
    </div>
  );
};
