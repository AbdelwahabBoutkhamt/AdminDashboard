
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

import {  GridToolbar } from "@mui/x-data-grid";

import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";

import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 100px)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
}));

const RoomManagement = () => {
  const classes = useStyles();

  const [rooms, setRooms] = useState([
    { id: 1, name: 'Room 1', capacity: 10, type: 'lecture', isAvailable: true },
    { id: 2, name: 'Room 2', capacity: 20, type: 'laboratory', isAvailable: false },
    { id: 3, name: 'Room 3', capacity: 15, type: 'lecture', isAvailable: true },
    { id: 4, name: 'Room 4', capacity: 30, type: 'laboratory', isAvailable: true },
  ]);

  const [open, setOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    capacity: '',
    type: '',
    isAvailable: true,
  });

  const toggleAvailability = (roomId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          return { ...room, isAvailable: !room.isAvailable };
        }
        return room;
      })
    );
  };

  const deleteRoom = (roomId) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "isAvailable") {
      setNewRoom((prevRoom) => ({
        ...prevRoom,
        isAvailable: value === "available" ? true : false,
      }));
    } else {
      setNewRoom((prevRoom) => ({
        ...prevRoom,
        [name]: value,
      }));
    }
  };




  
  const handleAddRoom = () => {
    setRooms((prevRooms) => [
      ...prevRooms,
      {
        ...newRoom,
        id: prevRooms.length + 1,
        isAvailable: newRoom.isAvailable === "available" ? true : false, // Convert to boolean
      },
    ]);
    setNewRoom({
      name: "",
      capacity: "",
      type: "",
      isAvailable: true,
    });
    handleClose();
  };
  





  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'capacity', headerName: 'Capacity', width: 120 },
    { field: 'type', headerName: 'Type', width: 120 },
    {
      field: 'availability',
      headerName: 'Availability',
      width: 150,
      renderCell: (params) => (
        <Button
          onClick={() => toggleAvailability(params.row.id)}
          variant="outlined"
          color={params.row.isAvailable ? 'primary' : 'secondary'}
        >
          {params.row.isAvailable ? 'Available' : 'Unavailable'}
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: (params) => (
        <Button
          onClick={() => deleteRoom(params.row.id)}
          className={classes.deleteButton}
          startIcon={<DeleteIcon />}
          variant="outlined"
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = rooms.map((room) => ({
    id: room.id,
    name: room.name,
    capacity: room.capacity,
    type: room.type,
    availability: room.isAvailable ? 'Available' : 'Unavailable',
  }));

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Room Management</h1>
      <Button
        className={classes.addButton}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add Room
      </Button>
      <DataGrid rows={rows} columns={columns} pageSize={10} autoHeight />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            value={newRoom.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="capacity"
            label="Capacity"
            type="number"
            value={newRoom.capacity}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            type="text"
            value={newRoom.type}
            onChange={handleInputChange}
            fullWidth
          />
          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              row
              name="isAvailable"
              value={newRoom.isAvailable ? 'available' : 'unavailable'}
              onChange={handleInputChange}
            >
              <FormControlLabel value="available" control={<Radio color="primary" />} label="Available" />
              <FormControlLabel value="unavailable" control={<Radio color="primary" />} label="Unavailable" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRoom} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomManagement;
