import React from "react";
import "./result.css";
import { useRef, useLayoutEffect, useState } from "react";

const Result = ({inputArray, row}) => {
  const resultRef = useRef(null);
  const [treeWidth, setResultWidth] = useState(0);
  const [treeHeight, setResultHeight] = useState(0);

  useLayoutEffect(() => {
    setResultWidth(resultRef.current.offsetWidth);
    setResultHeight(resultRef.current.offsetHeight);
  }, []);

  const treeMapStyle = {
    height: "500px",
    width: "500px",
  };

  const itemStyle = (item, i) => {
    return {
      width: Math.floor((item.weight / column) * treeWidth),
      height: treeHeight / row,
      backgroundColor: `${colors[Math.round(Math.random() * 10)]}`,
      zIndex: 1,
    };
  };

  const colors = [
    "#fae588",
    "#f79d65",
    "#f9dc5c",
    "#e8ac65",
    "#e76f51",
    "#ef233c",
    "#b7094c",
    "#EEE8AA",
    "#A9A9A9",
    "#FFF0F5",
    "#FF00FF",
  ];
  var totalWeight = inputArray.reduce((total, obj) => total + obj.weight, 0);
  var column = Math.ceil(totalWeight / row);

  class node {
    constructor({ name, weight, value }) {
      this.name = name;
      this.weight = weight;
      this.value = value;
      this.children = [];
    }
  }

  const createTree = (arr) => {
    const clonedArr = [...arr];
    //create branch
    for (let i = 0; i < row; i++) {
      root.children.push(
        new node({ name: `branch${i}`, weight: column, value: null })
      );
    }

    //add nodes
    for (const branch of root.children) {
      var currentWeight = 0;
      var total = branch.weight;
      currentWeight = branch.children.reduce(
        (total, obj) => total - obj.weight,
        total
      );

      for (let i = 0; i < clonedArr.length; i++) {
        if (
          !branch.children.includes(clonedArr[i]) &&
          currentWeight - clonedArr[i].weight >= 0
        ) {
          currentWeight -= clonedArr[i].weight;
          branch.children.push(new node(clonedArr[i]));
          clonedArr.splice(i, 1);
        }
      }
    }
  };

  inputArray.sort((a, b) => b.weight - a.weight);

  const root = new node({ name: "root", weight: null, value: null });
  createTree(inputArray);

  return (
    <div className="result">
      <h2>Result</h2>
      <div className="resultMap" ref={resultRef} style={treeMapStyle}>
        {inputArray.map((item, i) => (
          <div
            className={item.name}
            key={item.name}
            data-item={i}
            style={itemStyle(item, i)}
          >
            <p>{item.name}</p>
            <p>{Math.round(item.value*100)/100}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
