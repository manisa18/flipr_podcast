import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import storage from "../firebase.jsx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const Title = styled.h1`
  color: ${({ theme }) => theme.text};
`;
const AddPodcast = () => {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);
  const [podcast, setPodcast] = useState({
    name: "",
    category: "",
    speaker: "",
    type: "video",
    description: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleThumbnailChange = (e) => {
    const selectedThumbnail = e.target.files[0];
    setThumbnail(selectedThumbnail);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setPodcast((prevPodcast) => ({ ...prevPodcast, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const auth = localStorage.getItem("user");
      const userId = JSON.parse(auth).data.user._id;

      const thumbnailRef = ref(storage, `thumbnails/${thumbnail.name}`);
      const thumbnailUploadTask = uploadBytesResumable(thumbnailRef, thumbnail);
      await thumbnailUploadTask;

      const fileRef = ref(storage, `files/${file.name}`);
      const fileUploadTask = uploadBytesResumable(fileRef, file);
      await fileUploadTask;

      const thumbnailUrl = await getDownloadURL(thumbnailRef);
      const fileUrl = await getDownloadURL(fileRef);

      console.log(podcast);
      console.log(thumbnailUrl);
      console.log(fileUrl);
      const response = await axios.post(
        "http://localhost:8000/api/podcast",
        {
          userId,
          name: podcast.name,
          description: podcast.description,
          category: podcast.category,
          type: podcast.type,
          speaker: podcast.speaker,
          img: thumbnailUrl,
          file: fileUrl,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setUploading(false);
      navigate("/mylibrary");
    } catch (err) {
      // Handle error response
      if (err.response) {
        const errorMessage = err.response.data.message;
        console.log(errorMessage);
        // Display error message to the user or handle it as needed
      } else {
        console.log(err.message);
      }
      setUploading(false);
    }
  };
  return (
    <Container>
      <Dialog open={uploading} onClose={() => {}}>
        <DialogTitle>Uploading...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please wait while the file is being uploaded.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Box>
          <Title>New Podcast</Title>
        </Box>

        <Box>
          {/* <Link
            to="/mylibrary"
            style={{ textDecoration: "none", color: "inherit" }}> */}
          <Button variant="contained" onClick={handleSubmit}>
            Upload
          </Button>
          {/* </Link> */}
        </Box>
      </Box>
      <hr />

      <TextField
        label="Name"
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
          label="Category"
          defaultValue=""
          name="category"
          value={podcast.category}
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
        label="Speaker"
        fullWidth
        margin="normal"
        name="speaker"
        value={podcast.speaker}
        onChange={handleInputs}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { sm: "column", md: "row" },
        }}>
        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            row
            aria-label="type"
            defaultValue="video"
            name="type"
            value={podcast.type}
            onChange={handleInputs}>
            <FormControlLabel value="video" control={<Radio />} label="Video" />
            <FormControlLabel value="audio" control={<Radio />} label="Audio" />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: "flex", gap: "5px" }}>
          <Button
            variant="contained"
            component="label"
            htmlFor="thumbnail-upload"
            margin="normal">
            Thumbnail Upload
            <input
              accept=".jpg,.jpeg,.png"
              id="thumbnail-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleThumbnailChange}
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            htmlFor="file-upload"
            margin="normal">
            File Upload
            <input
              accept=".mp4,.mov,.wmv,.avi,.mkv,.webm,.mp3,.wav,.aac,.wma,.m4a,.m4v,.mpg,.mpeg"
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Button>
        </Box>
      </Box>
      <TextField
        label="Description"
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

export default AddPodcast;
