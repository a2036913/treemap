import "./panel.css";
import { useState } from "react";

const Panel = ({inputArray, setInputArray, setRow}) => {
  const [jsonError, setJsonError] = useState("");
  const [rowError, setRowError] = useState("");

  var outputArray = []

  const getInputArray = async (e) => {
    try {
      var arr = e.target.value.split("\n")
      var strArr = arr.slice(1,arr.length-1)
      
      var strName = []
      var strWeight = []
      var strValue = []
      for (let i=0; i < strArr.length; i++){
        var temp = strArr[i].split('name:')[1].split(',')[0].replaceAll('"','').trim()
        strName[i] = temp
        temp = strArr[i].split("weight:")[1].split(',')[0].replaceAll('"','').trim()
        strWeight[i] = temp
        temp = strArr[i].split("value:")[1].split(',')[0].replace('}','').replaceAll('"','').trim()
        strValue[i] = temp
      }


      for(let i=0; i<strName.length; i++){
        outputArray.push({name: strName[i], weight: parseInt(strWeight[i]), value: Number(strValue[i]) })
      }
      setInputArray(outputArray);

    } catch (e) {
      setJsonError("Invalid JSON format");
    }
  };

  const getRowNumber = (e) => {    
    if (e.target.value > inputArray.length){
      setRowError("Input number should not excess length of array");
      return;
    }
    if (!parseInt(e.target.value)){
      setRowError("Input number must be integer");
      return;
    }
    setRow(e.target.value);
  };

  return (
    <div className="panel">
      <h2>Data</h2>
      <textarea
        className="panelInput"
        onBlur={getInputArray}
        cols="40"
        rows="20"
        placeholder='Input JSON here, example: [
          { name: "A", weight: 3, value: -0.02 },
          { name: "B", weight: 3, value: 0.05 },
          { name: "C", weight: 6, value: 0.015 },
          { name: "D", weight: 2, value: -0.01 },
          { name: "E", weight: 3, value: 0.01 }
        ]'
      />
      <p style={{color: 'red', fontWeight: '500'}}>{jsonError}</p>
      <h3>Row Number</h3>
      <input
        className="panelRowNumber"
        onBlur={getRowNumber}
        type="number"
        max=""
      />
      <p style={{color: 'red', fontWeight: '500'}}>{rowError}</p>
    </div>
  );
};

export default Panel;
