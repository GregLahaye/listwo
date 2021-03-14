import { FormEvent, useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { List } from "./List";
import { IList } from "./types";
import { UserContext } from "./UserContext";

export const Dashboard = () => {
  const { state } = useContext(UserContext);

  const [lists, setLists] = useState<IList[]>([]);
  const [text, setText] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    db().ref(`users/${state.uid}/lists/`).push({ title: text });

    setText("");
  };

  useEffect(() => {
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

    fetchLists();
  }, [state.uid]);

  return (
    <div className="container">
      <div className="row">
        {lists.map((list) => (
          <List key={list.id} list={list}></List>
        ))}

        <div className="col-3 my-3">
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Add List</strong>
            </li>
            <li className="list-group-item">
              <form onSubmit={handleSubmit} className="form-row">
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
      </div>
    </div>
  );
};
