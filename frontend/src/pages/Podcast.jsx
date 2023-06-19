import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Card from "../components/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const PodcastWrapper = styled.div``;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.hr};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
// const Image = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
// `;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
// const ChannelCounter = styled.span`
//   margin-top: 5px;
//   margin-bottom: 20px;
//   color: ${({ theme }) => theme.textSoft};
//   font-size: 13px;
// `;
const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #73bbc9;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Podcast = () => {
  const { id } = useParams();
  console.log(id);
  const [podcast, setPodcast] = useState(null);
  const [allpodcast, setAllPodcast] = useState([]);

  useEffect(() => {
    getpodcast(id);
  }, [id]);

  const getpodcast = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/podcast/${id}`
      );
      const podcastData = response.data.podcast;

      setPodcast(podcastData);
    } catch (error) {
      console.error("Error fetching podcast:", error);
    }
  };

  useEffect(() => {
    getAllpodcast();
  }, []);

  const getAllpodcast = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/podcast");
      const data = response.data.podcasts;

      if (Array.isArray(data)) {
        // if (id !== data._id) {
        setAllPodcast(data);
        // }
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching podcast:", error);
    }
  };

  if (!podcast) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Content>
        <PodcastWrapper>
          <iframe
            width="100%"
            height="350"
            src={podcast.file}
            // src="https://www.youtube.com/embed/tgbNymZ7vqY"
            title={podcast.name}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </PodcastWrapper>
        <Title>{podcast.name}</Title>
        <Details>
          <Info>{podcast.views} ● 1 day ago</Info>
          <Buttons>
            <Button>
              <ThumbUpOffAltIcon />
              Like
            </Button>
            <Button>
              <ThumbDownOffAltIcon />
              Dislike
            </Button>
            <Button>
              <ShareIcon />
              Share
            </Button>
            <Button>
              <LibraryAddIcon />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Avatar
              sx={{
                bgcolor: "#ffff",
                width: 50,
                height: 50,
              }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#282c3c", fontSize: 30 }}>
                {podcast.speaker[0].toUpperCase()}
              </Typography>
            </Avatar>
            <ChannelDetail>
              <ChannelName>{podcast.speaker}</ChannelName>
              {/* <ChannelCounter>200K subscribers</ChannelCounter> */}
              <Description>{podcast.description}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
      </Content>
      <Recommendation>
        {allpodcast.map((product) => (
          <Card key={product._id} type="sm" product={product} />
        ))}
      </Recommendation>
    </Container>
  );
};

export default Podcast;
