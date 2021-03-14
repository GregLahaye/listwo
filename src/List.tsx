import { FormEvent, useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { IItem, IList } from "./types";
import { UserContext } from "./UserContext";

interface IListProps {
  list: IList;
}

export const List = ({ list }: IListProps) => {
  const { state } = useContext(UserContext);

  const [items, setItems] = useState<IItem[]>([]);
  const [text, setText] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    db()
      .ref(`users/${state.uid}/lists/${list.id}/items`)
      .push({ title: text, timestamp: Date.now() });

    setText("");
  };

  const update = (id: string | null) => {
    db()
      .ref(`users/${state.uid}/lists/${list.id}/items/${id}`)
      .update({ timestamp: Date.now() });
  };

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
    <div className="col-3">
      <strong>{list.title}</strong>
      <ul className="list-group">
        {items.map((item, index) => (
          <button
            type="button"
            className={`list-group-item list-group-item-action ${
              index === 0 ? "active" : null
            }`}
            key={item.id}
            onClick={() => update(item.id)}
          >
            {item.title}
          </button>
        ))}
        <li className="list-group-item">
          <form onSubmit={handleSubmit} className="form-group">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className="form-control"
            />
          </form>
        </li>
      </ul>
    </div>
  );
};
