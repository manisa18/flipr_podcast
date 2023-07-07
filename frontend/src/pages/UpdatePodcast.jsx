import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
const Title = styled.h1`
  color: ${({ theme }) => theme.text};
`;
const Hr = styled.hr`
  margin: 10px 0px 20px 0px;
  border: 1px solid ${({ theme }) => theme.hr};
`;
const UpdatePodcast = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [podcast, setPodcast] = useState({
    name: "",
    category: "",
    speaker: "",
    description: "",
  });
  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const auth = localStorage.getItem("user");
      const userId = JSON.parse(auth).data.user._id;
      console.log(id);
      const response = await axios.get(
        `http://localhost:8000/api/podcast/${id}`,
        {
          userId,
        },
        {
          withCredentials: true,
        }
      );
      const { name, category, speaker, description } = response.data.podcast;

      setPodcast({
        name,
        category,
        speaker,
        description,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setPodcast((prevPodcast) => ({ ...prevPodcast, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      const auth = localStorage.getItem("user");
      const userId = JSON.parse(auth).data.user._id;

      const newData = {
        name: podcast.name,
        category: podcast.category,
        speaker: podcast.speaker,
        description: podcast.description,
      };
      console.log(newData);
      await axios.put(
        `http://localhost:8000/api/podcast/${id}`,
        {
          userId,
          newData,
        },
        { withCredentials: true }
      );
      fetchProfileDetails();
      navigate("/mylibrary");
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Box>
          <Title>Update Podcast</Title>
        </Box>

        <Box>
          {/* <Link
            to="/mylibrary"
            style={{ textDecoration: "none", color: "inherit" }}> */}
          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
          {/* </Link> */}
        </Box>
      </Box>
      <Hr />

      <TextField
        fullWidth
        margin="normal"
        name="name"
        value={podcast.name}
        onChange={handleInputs}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={podcast.category}
          name="category"
          onChange={handleInputs}>
          <MenuItem value="Music">Music</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="News">News</MenuItem>
          <MenuItem value="Education">Education</MenuItem>
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Other">Others</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        name="speaker"
        value={podcast.speaker}
        onChange={handleInputs}
      />
      <TextField
        fullWidth
        margin="normal"
        multiline
        rows={4}
        name="description"
        value={podcast.description}
        onChange={handleInputs}
      />
    </Container>
  );
};

export default UpdatePodcast;
