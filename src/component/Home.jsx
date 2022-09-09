import React from "react";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  let [eid, setEid] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!input) {
      alert("enter something");
    } else if (input && !isEditing) {
      console.log(!isEditing);
      setItems(
        items.map((elem) => {
          if (elem.id === eid) {
            return { ...elem, value: input };
          }
          return elem;
        })
      );
      setInput("");
      setEid(null);
      setIsEditing(true);
    } else {
      const allinput = { id: new Date().getTime().toString(), value: input };

      setItems([...items, allinput]);
      setInput("");

      setIsEditing(true);
    }
  };
  const handleEdit = (id) => {
    const edit = items.find((element) => id === element.id);
    console.log(edit);
    setInput(edit.value);
    setEid(id);
    setIsEditing(false);
  };

  const hadleDelet = (id) => {
    // items.splice(id, 1);
    // setItems([...items]);

    const dlt = items.filter((elem) => {
      return id !== elem.id;
    });
    console.log(dlt);
    setItems(
      items.filter((elem) => {
        return id !== elem.id;
      })
    );
  };

  const handleClearAll = () => {
    setItems([]);
  };

  return (
    <>
      <div className="container my-5">
        <form>
          <input
            className="form-control"
            onChange={handleChange}
            value={input}
            placeholder="Enter your Todo list"
          />
          <br></br>
          <button className="bn31" onClick={handleClick}>
            <span className="bn31span">
              {isEditing === true ? "Add" : "Update"}
            </span>
          </button>
        </form>

        <div className="row">
          <div className="">
            <ul className="my-3">
              {items !== null &&
                items.map((item, index) => (
                  <li className="list" id={item.id} key={index}>
                    {item.value}
                    <br>  
                    </br>

                    <button
                      className="bn31 mx-2 "
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    >
                      <span className="bn31span">Edit</span>
                    </button>
                    <button
                      className="bn31 mx-2"
                      onClick={() => hadleDelet(item.id)}
                    >
                      <span className="bn31span">Delete</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <button disabled={items.length < 1}
          className="custom-btn"
          onClick={() => {
            handleClearAll();
          }}
        >
          Clear ALL
        </button>
      </div>
    </>
  );
}