import React from "react";
import "./result.css";
import { useRef, useLayoutEffect, useState } from "react";

const Result = () => {
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
      backgroundColor: `${colors[Math.round(Math.random() *10 )]}`,
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
    "#00BFFF",
    "#EEE8AA",
  ];
  var inputArray = [
    { "name": "A", "weight": 3, "value": -0.02 },
    { "name": "B", "weight": 3, "value": 0.05 },
    { "name": "C", "weight": 6, "value": 0.015 },
    { "name": "D", "weight": 2, "value": -0.01 },
    { "name": "E", "weight": 3, "value": 0.01 }
    ]
  var row = 5;
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
    const clonedArr = [...arr]
    
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
  }

  inputArray.sort((a, b) => b.weight - a.weight);

  // checkWeight(inputArray);
  const root = new node({ name: "root", weight: null, value: null });
  createTree(inputArray);

  const showItemInfo = () => {
    
  }

  return (
    <div className="result">
      <h2>Result</h2>
      <div className="resultMap" ref={resultRef} style={treeMapStyle}>
        {/* {
          root.children?.map(branch=>branch.children?.map((node,i) => (
            <div key={node.name} data-item={node.name} style={itemStyle(node,)}></div>
          )))
        } */}
        {inputArray.map((item, i) => (
          <div key={i} data-item={i} style={itemStyle(item, i)} onMouseOver={showItemInfo} ></div>
        ))}
      </div>
    </div>
  );
};

export default Result;
