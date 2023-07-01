import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import Card from "../components/Card";
import styled from "styled-components";

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.hr};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
`;
const SavedPodcast = () => {
  //   const [podcast, setPodcast] = useState([]);
  const [music, setMusic] = useState([]);
  const [sports, setSports] = useState([]);
  const [news, setNews] = useState([]);
  const [education, setEducation] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [other, setOther] = useState([]);
  const List = ["Music", "Sports", "News", "Education", "Technology", "Other"];
  useEffect(() => {
    getpodcast();
  }, []);

  const getpodcast = async () => {
    try {
      List.map(async (category) => {
        const res = await axios.get(
          `http://localhost:8000/api/podcast/?category=${category}`
        );

        if (category === "Music") {
          setMusic(res.data.podcasts);
        } else if (category === "Sports") {
          setSports(res.data.podcasts);
        } else if (category === "News") {
          setNews(res.data.podcasts);
        } else if (category === "Education") {
          setEducation(res.data.podcasts);
        } else if (category === "Technology") {
          setTechnology(res.data.podcasts);
        } else if (category === "Other") {
          setOther(res.data.podcasts);
        }
      });

      //   setPodcast(podcastArray);
      console.log("music:", music);
      console.log("sports:", sports);
      console.log("news:", news);
      console.log("education:", education);
      console.log("technology:", technology);
      console.log("other:", other);
    } catch (error) {
      console.error("Error fetching podcast:", error);
    }
  };

  return (
    <Container>
      {music.length > 0 ? (
        <div>
          <Title>Music</Title>
          <Hr />
          {music.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      {sports.length > 0 ? (
        <div>
          <Title>Sports</Title>
          <Hr />
          {sports.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}

      {news.length > 0 ? (
        <div>
          <Title>News</Title>
          <Hr />
          {news.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      {education.length > 0 ? (
        <div>
          <div>Education</div>
          <Hr />
          {education.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      {technology.length > 0 ? (
        <div>
          <Title>Technology</Title>
          <Hr />
          {technology.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}

      {other.length > 0 ? (
        <div>
          <Title>Others</Title>
          <Hr />
          {other.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default SavedPodcast;
