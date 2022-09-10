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
    setInput(edit.value);
    setEid(id);
    setIsEditing(false);
  };

  const hadleDelet = (id) => {
    setItems(items.filter((elem) => id !== elem.id));
  };

  const handleClearAll = () => {
    setItems([]);
  };
  // let Time = new Date().getHours();
  let Time = 21
  let msg = (Time <12 ? "Good Morning" : Time < 19 && Time > 12 ? "Good Afternoon" : Time > 19 && Time < 22 ? "Good Evening" :"Good Night" )

//   if(Time < 12)
// {
//   msg ="good morning"
// }else if(Time < 19 && Time > 12)
// {
//   msg ="Good Afternoon"
// }else if(Time > 19 && Time < 22)
// {
//   msg ="Good evening"
// }else
// {
//   msg ="Good Night"
// }

  return (
    <>
      <div className="container my-5">
       <p style={{color : "white" , fontSize:"20px"}}> Hello , <span style={{color : Time <12  ? "yellow" : Time < 19 && Time > 12 ? "Orange" : Time >= 19 && Time <= 22 ? "#ffa9" :" grey " , fontSize:"20px" }}> {msg}</span></p>
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
                  <li className="list my-2" id={item.id} key={index}>
                    {item.value}
                    <br></br>

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
        <center>
          <button style={{ cursor: items.length < 1 ? "" : "pointer"}}
            disabled={items.length < 1}
            className="custom-btn"
            onClick={() => {
              handleClearAll();
            }}
          >
            Clear ALL
          </button>
        </center>
      </div>
    </>
  );
}
