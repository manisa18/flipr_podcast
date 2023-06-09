import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box } from "@mui/material";
import Card from "../components/Card";
import styled from "styled-components";

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
`;
const SavedPodcast = () => {
  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    getpodcast();
  }, []);

  const getpodcast = async () => {
    try {
      const auth = localStorage.getItem("user");
      const userId = JSON.parse(auth).data.user._id;
      if (userId) {
        const response = await axios.get(
          `http://localhost:8000/profile/${userId}`
        );
        const List = response.data.user.savedPlaylist;
        if (List.length > 0) {
          const podcastArray = await Promise.all(
            List.map(async (id) => {
              const res = await axios.get(
                `http://localhost:8000/api/podcast/${id}`
              );
              return res.data.podcast;
            })
          );
          setPodcast(podcastArray);
          console.log(podcast);
        }
      } else {
        console.log("User Not Logged In");
      }
    } catch (error) {
      console.error("Error fetching podcast:", error);
    }
  };

  return (
    <Container>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Box>
          <Title>Saved Podcast</Title>
        </Box>
      </Box>
      <hr />

      {podcast.length > 0 ? (
        podcast.map((product) => (
          <div key={product.id}>
            <Card product={product} />
          </div>
        ))
      ) : (
        <div style={{ color: "#fff", fontSize: "20px" }}>
          No Saved Podcast Found !!!
        </div>
      )}
      {/* Saved Podcast */}
    </Container>
  );
};

export default SavedPodcast;
