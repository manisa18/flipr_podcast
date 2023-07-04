import React, { useState } from 'react';
import { Box, Button, Container, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
`;

const AddPodcast = () => {
    const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);
  
  const handleThumbnailChange = (event) => {
    const selectedThumbnail = event.target.files[0];
    setThumbnail(selectedThumbnail);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems:"center", justifyContent: 'space-between' }}>
        <Box >
          <Title>New Podcast</Title>
        </Box>

        <Box>
          <Link to="/mylibrary" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button variant="contained">Upload</Button>
          </Link>
        </Box>
      </Box>
      <hr />

      <TextField label="Name" fullWidth margin="normal" />
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          defaultValue=""
        >
          <MenuItem value="music">Music</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="news">News</MenuItem>
          <MenuItem value="education">Education</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>
          <MenuItem value="others">Others</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Speaker" fullWidth margin="normal" />
      <Box sx={{display:"flex", alignItems:"center", justifyContent: "space-between", flexDirection:{sm:"column", md:"row"}}}>
      <FormControl component="fieldset" margin="normal">
        <RadioGroup row aria-label="type" defaultValue="video">
        <FormControlLabel value="video" control={<Radio />} label="Video" />
          <FormControlLabel value="audio" control={<Radio />} label="Audio" />
          
        </RadioGroup>
      </FormControl>
      
<Box sx={{display: "flex", gap:"5px"}}>
<Button variant="contained" component="label" htmlFor="thumbnail-upload" margin="normal">
        Thumbnail Upload
        <input
          accept=".jpg,.jpeg,.png"
          id="thumbnail-upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleThumbnailChange}
        />
      </Button >
      <Button variant="contained" component="label" htmlFor="file-upload" margin="normal">
        File Upload
        <input
          accept=".mp4,.mov,.wmv,.avi,.mkv,.webm,.mp3,.wav,.aac,.wma,.m4a,.m4v,.mpg,.mpeg"
          id="file-upload"
          type="file"
          style={{ display: 'none' }}
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
      />
    
    </Container>
  );
};

export default AddPodcast;
