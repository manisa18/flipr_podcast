import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MyCard from "../components/MyCard";

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 5px solid ${({ theme }) => theme.hr};
`;

const SavedPodcast = () => {
  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    getpodcast();
  }, []);
  const getpodcast = async () => {
    try {
      const auth = localStorage.getItem("user");
      const userId = JSON.parse(auth)?.data?.user?._id;
      // const config = {
      //   { userId }, // Pass the userId in the request body
      //   withCredentials: true,
      // };

      if (!userId) {
        console.log("User Not Logged In");
      } else {
        const response = await axios.get(
          `http://localhost:8000/profile/${userId}`
        );
        const list = response.data.user.playlist;
          console.log(list);
        const podcastArray = await Promise.all(
          list.map(async (id) => {
            // console.log(config);
            console.log(userId);

            const res = await axios.get(
              `http://localhost:8000/api/podcast/library/${id}?userId=${userId}`,
              {
                data: {
                  userId: userId,
                },
                withCredentials: true,
              }
            );
            return res.data.podcast;
          })
        );

        setPodcast(podcastArray);
        console.log(podcastArray);
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
          <Title>My Library</Title>
        </Box>

        <Box>
          <Link
            to="/addpodcast"
            style={{ textDecoration: "none", color: "inherit" }}>
            <Button variant="contained">New</Button>
          </Link>
        </Box>
      </Box>
      <hr />
      {podcast.length > 0 ? (
        podcast.map((product) => (
          <div key={product.id}>
            <MyCard product={product} />
          </div>
        ))
      ) : (
        <div style={{ color: "#fff", fontSize: "20px" }}>
          No Podcasts Uploaded !!!
        </div>
      )}
    </Container>
  );
};

export default SavedPodcast;
