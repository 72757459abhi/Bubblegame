import React, { useState } from "react";
import "./App.css";

const FormBuilder = () => {

  const inputTypes = ["text", "number", "date"];
  const textOption = [
    "name",
    "value",
    "placeholder",
    "maxlength",
    "checked",
    "disabled",
  ];
  const numberOption = [
    "name",
    "value",
    "placeholder",
    "min",
    "max",
    "maxlength",
    "checked",
    "disabled",
  ];

  const dateOption = ["name", "id", "value", "placeholder"];
  const [atr, setAtr] = useState([]);
  const [list, setList] = useState({});
  const [selectedAtr, setSelectedAtr] = useState({});
  const [joinJson, setJoinJson] = useState([])

  const createHandler =()=>{
    let tempJson = [...joinJson]
    tempJson.push({...list, ...selectedAtr})
    setJoinJson(tempJson)
  }
  const ArtHandler = (e) => setSelectedAtr({ ...selectedAtr, [e.target.name]: e.target.value });

  const typeHandler = (event) => {
    if (event.target.value === "text") {
      setAtr(textOption);
    }
    if (event.target.value === "number") {
      setAtr(numberOption);
    }
    if (event.target.value === "date") {
      setAtr(dateOption);
    }
    setList({ type: event.target.value });
  };

  return (
    <>
      <div className="wrapper">
        <div style={{ display: "flex" }}>
          <div className="container">
            <select name="" id="" onChange={typeHandler}>
              <option value="">select</option>
              {inputTypes.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            {atr.map((item) => (
              <div>
                <label htmlFor={item}>{item}</label>
                <input
                  id={item}
                  type="checkbox"
                  value={item}
                  name={item}
                  onClick={ArtHandler}
                />
              </div>
            ))}

            <button onClick={createHandler}>Create</button>
          </div>

          <div className="container">
            {joinJson.map((item) => (
              <div>
                <label >{item.name}</label>
                <input
                  id={item.id}
                  type={item.type}
                  value={item.value}
                  name={item.name}
                  min={item.min}
                  max={item.max}
                  maxlength={item.maxlength}
                  checked={true}
                  disabled={false} 
                  placeholder={item.placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default FormBuilder;
