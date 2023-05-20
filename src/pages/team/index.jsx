import { Box, Typography, useTheme } from "@mui/material";

import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

import React, { useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

const TeamPage = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      cne: '123456789',
      firstName: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
      sector: 'Science',
      semestre: '3rd',
    },
    {
      id: 2,
      cne: '987654321',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '987-654-3210',
      sector: 'Arts',
      semestre: '2nd',
    },
    // Add more student objects as needed
  ]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
    id: '',
    cne: '',
    firstName: '',
    lastName: '',
    phone: '',
    sector: '',
    semestre: ''
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'cne', headerName: 'CNE', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'sector', headerName: 'Sector', width: 150 },
    { field: 'semestre', headerName: 'Semestre', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleOpenEditDialog(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteStudent(params.row.id)}
            style={{ marginLeft: '8px' }}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  const handleOpenAddDialog = () => {
    setEditedStudent({
      id: '',
      cne: '',
      firstName: '',
      lastName: '',
      phone: '',
      sector: '',
      semestre: ''
    });
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleSaveStudent = () => {
    const newStudent = {
      ...editedStudent,
      id: rows.length + 1
    };

    setRows([...rows, newStudent]);
    setAddDialogOpen(false);
  };

  const handleOpenEditDialog = (student) => {
    setEditedStudent(student);
    setAddDialogOpen(true);
  };

  const handleDeleteStudent = (id) => {
    const updatedRows = rows.filter((student) => student.id !== id);
    setRows(updatedRows);
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAddDialog}
        style={{ marginBottom: '10px' }}
      >
        Add Student
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: CustomToolbar,
        }}
        disableSelectionOnClick
        disableColumnMenu
      />

      {/* Add Student Dialog */}
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="CNE"
            fullWidth
            value={editedStudent.cne}
            onChange={(e) => setEditedStudent({ ...editedStudent, cne: e.target.value })}
          />
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            value={editedStudent.firstName}
            onChange={(e) => setEditedStudent({ ...editedStudent, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={editedStudent.lastName}
            onChange={(e) => setEditedStudent({ ...editedStudent, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={editedStudent.phone}
            onChange={(e) => setEditedStudent({ ...editedStudent, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Sector"
            fullWidth
            value={editedStudent.sector}
            onChange={(e) => setEditedStudent({ ...editedStudent, sector: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Semestre"
            fullWidth
            value={editedStudent.semestre}
            onChange={(e) => setEditedStudent({ ...editedStudent, semestre: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveStudent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Custom Toolbar Component
const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};

export default TeamPage;
