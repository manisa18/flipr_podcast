import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: auto;
`;
const Home = ({ searchResult }) => {
  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    getpodcast();
  }, []);

  console.log(searchResult);
  const getpodcast = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/podcast");
      const data = response.data.podcasts;
      console.log(data);
      if (Array.isArray(data)) {
        setPodcast(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching podcast:", error);
    }
  };

  return (
    <Container>
      {searchResult.length > 0
        ? searchResult.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))
        : podcast.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))}
    </Container>
  );
};

export default Home;
