import { useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { IItem, IList } from "./types";
import { UserContext } from "./UserContext";

interface IListProps {
  list: IList;
}

export const List = ({ list }: IListProps) => {
  const { state } = useContext(UserContext);

  const [items, setItems] = useState<IItem[]>([]);

  const fetchItems = async () => {
    const ref = db()
      .ref(`users/${state.uid}/lists/${list.id}/items`)
      .orderByChild("timestamp");

    ref.on("value", (snapshot) => {
      const values: IItem[] = [];

      snapshot.forEach((child) => {
        values.push({
          id: child.key,
          title: child.val().title,
          timestamp: child.val().timestamp,
        });
      });

      setItems(values);
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};
