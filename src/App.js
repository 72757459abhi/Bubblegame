import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState({
    name: "",
    age: "",
  });
  const [messageRep, setMessageRep] = useState({});
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onchangeHandler = (e) => setPostData({ ...postData, [e.target.name]: e.target.value });

  const addHandler = () => {
    let localdata = {
      name: postData.name,
      age: postData.age,
    };
    let checkeditData = data.filter((elem) => elem._id === postData._id);
    if (isEdit) {
      if (JSON.stringify(checkeditData[0]) !== JSON.stringify(postData)) {
        getEditHandller();
        setPostData(localdata);
        setShow(true);
        setIsEdit(false);
        setPostData({
          name: "",
          age: "",
        });
      } else {
        setShow(true);
        setMessageRep({ message: "Plese change something" });
      }
    } else {
      getPostApiData();
      setPostData(localdata);
      setPostData({
        name: "",
        age: "",
      });
    }
  };

  const getApiData = () => {
    Axios.get("./api").then((res) => {
      const resp = res.data;
      setData(resp);
    });
  };

  const getPostApiData = () => {
    Axios.post("./postapi", postData).then((res) => {
      setMessageRep(res.data);
    });
    getApiData();
  };

  const deleteHandller = (item) => {
    Axios.delete("/deleteapi", { data: { id: item._id } }).then((res) => {
      setMessageRep(res.data);
    });
    getApiData();
    setShow(true);
  };

  const editHandller = (item) => {
    let editData = data.filter((elem) => elem._id === item._id && elem);
    setPostData({
      _id: item._id,
      name: editData[0].name,
      age: editData[0].age,
    });
    setIsEdit(true);
  };

  const getEditHandller = () => {
    Axios.put("/updateapi", postData).then((res) => {
      setMessageRep(res.data);
    });
    getApiData();
  };

  useEffect(() =>getApiData(), []);

  return (
    <>
      <div className="wrapper">

        <div className="container">
          <div className="inputBox">
            <label htmlFor="name"> Name: </label>
            <input
              className="input"
              id="name"
              type="text"
              name="name"
              value={postData.name || ""}
              placeholder="Enter Name"
              onChange={onchangeHandler}
            />
          </div>

          <div className="inputBox">
            <label htmlFor="age"> Age: </label>
            <input
              className="input"
              id="age"
              type="text"
              maxLength={3}
              name="age"
              value={postData.age || ""}
              placeholder="Enter Age"
              onChange={onchangeHandler}
            />
          </div>
          <div className="buttonBox">
            <button
              onClick={addHandler}
              disabled={postData.name === "" || postData.age === ""}
            >
              Add
            </button>
          </div>
        </div>

        <div className="App">
          <table className="mainTable">
            <tr className="tableRow">
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Age</th>
              <th colSpan={2}>Action</th>
            </tr>

            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteHandller(item);
                      }}
                    >
                      Delete
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        editHandller(item);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>

      {show && (
        <div className="modalContainer">
          <div className="modalBox">
            <p>{messageRep.message}</p>
            <button
              onClick={() => {
                setShow(false);
                setMessageRep({});
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
