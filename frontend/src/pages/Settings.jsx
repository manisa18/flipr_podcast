import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, TextField, Button } from "@mui/material";

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
  "&:hover": {
    backgroundColor: "#176B87",
    color: "#ffff",
  },
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
  "&:hover": {
    backgroundColor: "#03C988",
    color: "#ffff",
  },
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
  "&:hover": {
    backgroundColor: "#B70404",
    color: "#ffff",
  },
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
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [editedAccountName, setEditedAccountName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const auth = localStorage.getItem("user");
      const userId = JSON.parse(auth).data.user._id;
      const response = await axios.get(
        `http://localhost:8000/profile/${userId}`
      );

      setAccountName(response.data.user.name);
      setEditedAccountName(response.data.user.name);
      setEmail(response.data.user.email);
      setEditedEmail(response.data.user.email);
      // setPassword(response.data.user.password);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

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

    // Reset the edited values back to the original values
    if (field === "accountName") {
      setEditedAccountName(accountName);
    } else if (field === "email") {
      setEditedEmail(email);
    }
  };

  const handleSaveClick = async (field) => {
    setIsEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));

    try {
      const auth = localStorage.getItem("user");
      const userId = JSON.parse(auth).data.user._id;

      let newData;
      if (field === "accountName") {
        newData = { name: editedAccountName };
      } else if (field === "email") {
        newData = { email: editedEmail };
      }
      await axios.put(
        `http://localhost:8000/profile/${userId}`,
        {
          newData,
          userId,
        },
        { withCredentials: true }
      );
      fetchProfileDetails();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <BigHeading>Account Details</BigHeading>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              sx={textFieldStyle}
              fullWidth
              label="Name"
              value={isEditMode.accountName ? editedAccountName : accountName}
              disabled={!isEditMode.accountName}
              onChange={(e) => setEditedAccountName(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            {isEditMode.accountName ? (
              <Button
                sx={{ ...BtnSave }}
                variant="contained"
                onClick={() => handleSaveClick("accountName")}>
                Save
              </Button>
            ) : (
              <Button
                sx={{ ...Btn }}
                variant="contained"
                onClick={() => handleEditClick("accountName")}>
                Edit
              </Button>
            )}
          </Grid>
          <Grid item xs={2}>
            {isEditMode.accountName && (
              <Button
                sx={{ ...BtnCancel }}
                onClick={() => handleCancelClick("accountName")}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              sx={textFieldStyle}
              fullWidth
              label="Email"
              value={isEditMode.email ? editedEmail : email}
              disabled={!isEditMode.email}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            {isEditMode.email ? (
              <Button
                sx={{ ...BtnSave }}
                variant="contained"
                onClick={() => handleSaveClick("email")}>
                Save
              </Button>
            ) : (
              <Button
                sx={{ ...Btn }}
                variant="contained"
                onClick={() => handleEditClick("email")}>
                Edit
              </Button>
            )}
          </Grid>
          <Grid item xs={2}>
            {isEditMode.email && (
              <Button
                sx={{ ...BtnCancel }}
                onClick={() => handleCancelClick("email")}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
        {/* <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              sx={textFieldStyle}
              fullWidth
              label="Password"
              type="password"
              value={editedPassword}
              disabled={!isEditMode.password}
              onChange={(e) => setEditedPassword(e.target.value)}
            />
          </Grid> */}
        {/* <Grid item xs={2}>
            {isEditMode.password ? (
              <Button
                sx={{ ...BtnSave }}
                variant="contained"
                onClick={() => handleSaveClick("password")}
              >
                Save
              </Button>
            ) : (
              <Button
                sx={{ ...Btn }}
                variant="contained"
                onClick={() => handleEditClick("password")}
              >
                Edit
              </Button>
            )}
          </Grid>
          <Grid item xs={2}>
            {isEditMode.password && (
              <Button
                sx={{ ...BtnCancel }}
                onClick={() => handleCancelClick("password")}
              >
                Cancel
              </Button>
            )}
          </Grid> */}
        {/* </Grid> */}
      </Wrapper>
    </Container>
  );
};

export default Settings;
