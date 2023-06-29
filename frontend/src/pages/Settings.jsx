import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {Grid, TextField, Button} from "@mui/material";


const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 500px;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start; /* Left-align the items */
  flex-direction: column;
  background-color: ${({ theme }) => theme.setting};
  border: 1px solid ${({ theme }) => theme.hr};
  padding: 70px 70px;
  gap: 10px;
`;

const BigHeading = styled.h1`
  font-size: 30px;
  font-weight: 500;
  margin: 10px;
  padding: 5px;
  text-align: center;
  color: black;
`;

const Btn = {
  padding: "5px 10px",
  backgroundColor: "#e3f4f4",
  border: "1px solid #526d82",
  color: "#27374d",
  borderRadius: "3px",
  fontWeight: 500,
  cursor: "pointer",
  alignItems: "center",
  display: "flex",
  gap: "5px",
  "&:hover":{
    backgroundColor: "#176B87",
    color: "#ffff"
  }
};

const BtnSave = {
  padding: "5px 10px",
  backgroundColor: "#e3f4f4",
  border: "1px solid #526d82",
  color: "#27374d",
  borderRadius: "3px",
  fontWeight: 500,
  cursor: "pointer",
  alignItems: "center",
  display: "flex",
  gap: "5px",
  "&:hover":{
    backgroundColor: "#03C988",
    color: "#ffff"
  }
};

const BtnCancel = {
  padding: "5px 10px",
  backgroundColor: "#e3f4f4",
  border: "1px solid #526d82",
  color: "#27374d",
  borderRadius: "3px",
  fontWeight: 500,
  cursor: "pointer",
  alignItems: "center",
  display: "flex",
  gap: "5px",
  "&:hover":{
    backgroundColor: "#B70404",
    color: "#ffff"
  }
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black !important", 
    },
  },
};


const Settings = () => {
  const [isEditMode, setIsEditMode] = useState({
    accountName: false,
    email: false,
    password: false,
  });
  const [editedAccountName, setEditedAccountName] = useState("John Doe");
  const [editedEmail, setEditedEmail] = useState("johndoe@example.com");
  const [editedPassword, setEditedPassword] = useState("********");

  const navigate = useNavigate();

  const handleEditClick = (field) => {
    setIsEditMode((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleCancelClick = (field) => {
    setIsEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleSaveClick = (field) => {
    // Add code to save the edited account details
    setIsEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleSubmit = (e, field) => {
    e.preventDefault();
    // Add code to update the user's account information based on the form inputs
    setIsEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  return (
    <Container>
      <Wrapper>
        <BigHeading>Account Details</BigHeading>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
            sx={
        textFieldStyle
      }
              fullWidth
              label="Name"
              value={editedAccountName}
              disabled={!isEditMode.accountName}
              onChange={(e) => setEditedAccountName(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            {isEditMode.accountName ? (
              <Button sx={{...BtnSave}}
                variant="contained"
                
                onClick={() => handleSaveClick("accountName")}
              >
                Save
              </Button>
            ) : (
              <Button sx={{...Btn}}
                variant="contained"
                
                onClick={() => handleEditClick("accountName")}
              >
                Edit
              </Button>
            )}
          </Grid>
          <Grid item xs={2}>
            {isEditMode.accountName && (
              <Button sx={{ ...BtnCancel}} onClick={() => handleCancelClick("accountName")}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
           sx={
            textFieldStyle
          }
              fullWidth
              label="Email"
              value={editedEmail}
              disabled={!isEditMode.email}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            {isEditMode.email ? (
              <Button sx={{...BtnSave}}
                variant="contained"
                
                onClick={() => handleSaveClick("email")}
              >
                Save
              </Button>
            ) : (
              <Button sx={{...Btn}}
                variant="contained"
                
                onClick={() => handleEditClick("email")}
              >
                Edit
              </Button>
            )}
          </Grid>
          <Grid item xs={2}>
            {isEditMode.email && (
              <Button sx={{ ...BtnCancel}} onClick={() => handleCancelClick("email")}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
            sx={
              textFieldStyle
            }
              fullWidth
              label="Password"
              type="password"
              value={editedPassword}
              disabled={!isEditMode.password}
              onChange={(e) => setEditedPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            {isEditMode.password ? (
              <Button sx={{...BtnSave}}
                variant="contained"
                
                onClick={() => handleSaveClick("password")}
              >
                Save
              </Button>
            ) : (
              <Button sx={{...Btn}}
                variant="contained"
                
                onClick={() => handleEditClick("password")}
              >
                Edit
              </Button>
            )}
          </Grid>
          <Grid item xs={2}>
            {isEditMode.password && (
              <Button sx={{ ...BtnCancel}} onClick={() => handleCancelClick("password")}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default Settings;
