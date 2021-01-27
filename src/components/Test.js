import React, { useState, useEffect } from "react";

const Test = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    //proxy gives first part of the url
    fetch("http://localhost:3000/api")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => setList(json.list));
  }, []);

  return (
    <div>
      {list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </div>
  );
};

export default Test;
