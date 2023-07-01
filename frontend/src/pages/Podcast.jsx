import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
// import ShareIcon from "@mui/icons-material/Share";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
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
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
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
const ToggleBtn = styled.button`
  color: #73bbc9;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const Podcast = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [allpodcast, setAllPodcast] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/podcast/${id}`
        );
        const podcastData = response.data.podcast;
        setPodcast(podcastData);
        setIsLoaded(true);
        const auth = localStorage.getItem("user");
        const userId = JSON.parse(auth).data.user._id;
        if (userId) {
          const response = await axios.get(
            `http://localhost:8000/profile/${userId}`
          );
          setIsLiked(podcastData.likes.includes(userId));
          setIsDisliked(podcastData.dislikes.includes(userId));
          setIsSaved(response.data.user.savedPlaylist.includes(id));
        } else {
          console.log("User Not Logged In");
        }
      } catch (error) {
        console.error("Error fetching podcast:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (isLoaded) {
      updateViews();
      setIsLoaded(false);
    }
  }, [isLoaded]);

  const updateViews = async () => {
    try {
      const auth = localStorage.getItem("user");
      let response;
      if (auth) {
        const userId = JSON.parse(auth).data.user._id;
        response = await axios.put(
          `http://localhost:8000/api/podcast/view/${id}`,
          { userId },
          { withCredentials: true }
        );
      } else {
        response = await axios.put(
          `http://localhost:8000/api/podcast/view/${id}`,
          {},
          { withCredentials: true }
        );
      }

      if (response.data.success) {
        console.log("Views updated");
      } else {
        console.log("Error updating views:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating views:", error.message);
    }
  };

  useEffect(() => {
    getAllPodcasts();
  }, []);

  const getAllPodcasts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/podcast");
      const data = response.data.podcasts;
      if (Array.isArray(data)) {
        setAllPodcast(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  const handleLike = () => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const userId = JSON.parse(auth).data.user._id;
      if (!isLiked) {
        // if (auth) {
        axios.put(
          `http://localhost:8000/api/podcast/likes/${id}`,
          { userId },
          { withCredentials: true }
        );
        setIsLiked(true);
        if (isDisliked) {
          setIsDisliked(false);
        }
      } else if (isLiked) {
        axios.put(
          `http://localhost:8000/api/podcast/likes/${id}`,
          { userId },
          { withCredentials: true }
        );
        setIsLiked(false);
      }
    } else {
      console.log("User First Log In");
    }
  };
  const handleDislike = () => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const userId = JSON.parse(auth).data.user._id;
      console.log(userId);
      if (!isDisliked) {
        axios.put(
          `http://localhost:8000/api/podcast/dislikes/${id}`,
          { userId },
          { withCredentials: true }
        );
        setIsDisliked(true);
        if (isLiked) {
          setIsLiked(false);
        }
      } else if (isDisliked) {
        axios.put(
          `http://localhost:8000/api/podcast/dislikes/${id}`,
          { userId },
          { withCredentials: true }
        );
        setIsDisliked(false);
      }
    } else {
      console.log("User First Log In");
    }
  };

  const handleSave = async () => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const userId = JSON.parse(auth).data.user._id;
      console.log(userId);
      if (!isSaved) {
        axios.put(
          `http://localhost:8000/api/podcast/save/${id}`,
          { userId },
          { withCredentials: true }
        );
        setIsSaved(true);
      } else if (isSaved) {
        axios.put(
          `http://localhost:8000/api/podcast/save/${id}`,
          { userId },
          { withCredentials: true }
        );
        setIsSaved(false);
      }
    } else {
      console.log("User First Log In");
    }
  };
  const toggleDescription = () => {
    setShowFullDescription((prevValue) => !prevValue);
  };

  function getTimeDifference(uploadedDate) {
    const currentTime = moment();
    const diffDuration = moment.duration(currentTime.diff(uploadedDate));
    const years = diffDuration.years();
    const months = diffDuration.months();
    const days = diffDuration.days();
    const hours = diffDuration.hours();

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""}`;
    } else if (days > 0 && hours > 0) {
      return `${days} day${days > 1 ? "s" : ""} ${hours} hour${
        hours > 1 ? "s" : ""
      }`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    } else {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    }
  }

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
            title={podcast.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </PodcastWrapper>
        <Title>{podcast.name}</Title>
        <Details>
          <Info>
            {podcast.views} views ● {getTimeDifference(podcast.uploadedDate)}
            ago
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
              Like
            </Button>
            <Button onClick={handleDislike}>
              {isDisliked ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
              Dislike
            </Button>
            {/* <Button>
              <ShareIcon />
              Share
            </Button> */}
            <Button onClick={handleSave}>
              {isSaved ? <LibraryAddIcon /> : <LibraryAddOutlinedIcon />}
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
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />

        {podcast.description && (
          <Description>
            {showFullDescription
              ? podcast.description
              : podcast.description.split(" ").slice(0, 30).join(" ")}
            {podcast.description.split(" ").length > 30 && (
              <span>
                <ToggleBtn onClick={toggleDescription}>
                  {showFullDescription ? "...Less" : "...More"}
                </ToggleBtn>
              </span>
            )}
          </Description>
        )}
      </Content>
      <Recommendation>
        {allpodcast.map((product) => {
          if (product._id !== id) {
            return <Card key={product._id} type="sm" product={product} />;
          }
          return null; // Exclude the product with matching id
        })}
      </Recommendation>
    </Container>
  );
};

export default Podcast;
