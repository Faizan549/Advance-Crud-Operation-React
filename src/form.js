import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css";
function App() {
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const dataInitValue = {
    id: "",
    name: "",
    description: "",
    quantity: "",
  };
  let [result, setResult] = useState([]);
  let [err, setErr] = useState(false);
  let [value, setVal] = useState(dataInitValue);
  function Handler(e) {
    let { name, value: eventValue } = e.target;
    // console.log(name, eventValue);
    setVal({
      ...value,
      [name]: eventValue,
    });
  }
  function addItem() {
    if (
      value.name === "" ||
      value.description === "" ||
      value.quantity === ""
    ) {
      setErr(true);
    } else {
      setResult([...result, { ...value }]);
      setVal({
        name: "",
        description: "",
        quantity: "",
      });
      setErr(false);
    }
  }

  function deleteItem(id) {
    let data = [...result];
    data = data.filter((col) => {
      return id !== col.id;
    });
    setVal({
      name: "",
      description: "",
      quantity: "",
    });
    console.log(data);
    setResult(data);
  }
  function updateItem(items) {
    setVal(items);
  }

  function updated() {
    let data2 = [...result];
    //finding index of an array (of objects) element on the basis of object property value
    let index = data2
      .map((Item) => {
        return Item.id;
      })
      .indexOf(value.id);
    console.log(data2);
    data2[index].name = value.name;
    data2[index].description = value.description;
    data2[index].quantity = value.quantity;
    setResult(data2);
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>CRUD OPERATION</h1>
      <div className="form-container">
        <label>Name:</label>
        <input
          value={value.name}
          name="name"
          type="text"
          className={`form-input${err && value.name === "" ? " error" : ""}`}
          onChange={Handler}
        />
        <label>Description:</label>
        <input
          value={value.description}
          name="description"
          type="text"
          className={`form-input${
            err && value.description === "" ? " error" : ""
          }`}
          onChange={Handler}
        />
        <label>Quantity:</label>
        <input
          name="quantity"
          value={value.quantity}
          type="number"
          className={`form-input${
            err && value.quantity === "" ? " error" : ""
          }`}
          onChange={Handler}
        />
        <div className="form-buttons">
          <button onClick={addItem}>Add</button>
          <button onClick={updated}>Update</button>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {result.map((items) => {
          return (
            <div key={items.id} className="item-container">
              <br />
              {items.name}
              <br />
              {items.description}
              <br />
              {items.quantity}
              <br />
              <button onClick={() => deleteItem(items.id)}>Delete</button>
              <button onClick={() => updateItem(items)}>Edit</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default App;
