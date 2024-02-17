import React from "react";
import Select from "react-select";
import { useState } from "react";
import axios from 'axios';
import './style.css'

function Register() {
    const [selectedReciept, setSelectedReciept] = useState(null);
    const [uuid, setUuid] = useState(null)
    const [show, setShow] = useState(false)
    const [points, setPoints] = useState(0)
    const records = [
        {
        value: {
        "retailer": "M&M Corner Market",
        "purchaseDate": "2022-03-20",
        "purchaseTime": "14:33",
        "items": [
          {
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          }
        ],
        "total": "9.00"
      }, label: "M&M Corner Market" }, 
      {value : {
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
          {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
          },{
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
          },{
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
          },{
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
          },{
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
          }
        ],
        "total": "35.35"
      }, label:"Target"}
    ]
    
    const handleUpload = () => {
        axios.post('http://localhost:5174/receipts/process', { body :selectedReciept.value })
        .then(result => {
            setUuid(result.data.id)
            setShow(!show);
        })
        .catch(err => console.log(err))
    }

    const handleGetPoints = () => {
        axios.get(`http://localhost:5174/receipts/${uuid}/points`)
        .then(result => {
            setPoints(result.data.points)
            setSelectedReciept(null)
            setShow(false)
            setUuid(null)
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="group">
            <div className="group1">
                <Select
                    defaultValue={selectedReciept}
                    onChange={setSelectedReciept}
                    options={records}
                    className="select"
                />
                <button className="button" type="submit" disabled={!selectedReciept} onClick={handleUpload}>Upload</button>
                { show && <button className="button" type="submit" onClick={handleGetPoints}>Get Points</button> }
            </div>
            <div>
                { points > 0 && <span className="group2">
                    <span>Total Receipt Points: </span><h2>{points}</h2>
                </span> 
                }
            </div>
        </div>
    )
}

export default Register
