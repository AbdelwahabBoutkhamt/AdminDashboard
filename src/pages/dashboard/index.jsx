import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import React from 'react';


import './SchoolAdminDashboard.css'; 

function SchoolAdminDashboard() {
  return (
    <div className="dashboard-container">
      <h1>School Administrator Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Student Management</h2>
          <p>View, add, and edit student information.</p>
        </div>
        <div className="dashboard-card">
          <h2>Class Management</h2>
          <p>Create, manage, and assign classes.</p>
        </div>
        <div className="dashboard-card">
          <h2>Attendance Tracking</h2>
          <p>Monitor and record student attendance.</p>
        </div>
        <div className="dashboard-card">
          <h2>Gradebook</h2>
          <p>Manage student grades and generate reports.</p>
        </div>
        <div className="dashboard-card">
          <h2>Teacher Management</h2>
          <p>Add, edit, and assign teachers to classes.</p>
        </div>
      </div>
    </div>
  );
}

export default SchoolAdminDashboard;