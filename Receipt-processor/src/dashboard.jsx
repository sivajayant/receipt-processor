import React from "react";
import Register from "./register";
import './style.css'

function Dashboard() {
    return (
        <div className="container">
            <div className="dashboard">Receipt Processor</div>
            <span className="dashboard-sub">Please select a receipt and upload</span>
            <div className="register">
                <Register></Register>
            </div>
        </div>
    )
}

export default Dashboard