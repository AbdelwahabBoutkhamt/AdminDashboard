
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";

import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

const PasswordManagementPage = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', password: 'student1', newPassword: '' },
    { id: 2, name: 'Jane Smith', password: 'student2', newPassword: '' },
    { id: 3, name: 'Bob Johnson', password: 'student3', newPassword: '' },
  ]);
  const [showPasswords, setShowPasswords] = useState(false);

  const handlePasswordChange = (studentId, newPassword) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, password: newPassword } : student
      )
    );
  };

  const handleNewPasswordChange = (studentId, newPassword) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, newPassword: newPassword } : student
      )
    );
  };

  const handleTogglePasswords = () => {
    setShowPasswords(!showPasswords);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'password',
      headerName: 'Password',
      width: 150,
      valueGetter: (params) => (showPasswords ? params.value : '*****'),
    },
    {
      field: 'newPassword',
      headerName: 'New Password',
      width: 200,
      renderCell: (params) => (
        <input
          type="text"
          placeholder="New Password"
          value={params.row.newPassword}
          onChange={(e) => handleNewPasswordChange(params.row.id, e.target.value)}
        />
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePasswordChange(params.row.id, params.row.newPassword)}
        >
          Edit Password
        </Button>
      ),
    },
  ];

  const rows = students.map((student) => ({
    id: student.id,
    name: student.name,
    password: student.password,
    newPassword: student.newPassword,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Password Management</h1>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTogglePasswords}
          style={{ marginBottom: '16px' }}
        >
          {showPasswords ? 'Hide Passwords' : 'Show Passwords'}
        </Button>
      </div>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default PasswordManagementPage;
