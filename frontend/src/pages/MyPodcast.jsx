import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import MyCard from "../components/MyCard";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Title2 = styled.h1`
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  
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
const MyPodcast = () => {
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
            return `${days} day${days > 1 ? "s" : ""} ${hours} hour${hours > 1 ? "s" : ""
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
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                <Box >
                    <Title2>New Podcast</Title2>
                </Box>

                <Box sx={{ display: 'flex', alignItems: "center", gap: "5px" }}>
                    <Box>
                        <Link to="/mylibrary" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button variant="contained">Update</Button>
                        </Link>

                    </Box>
                    <Box>
                        <Link to="/mylibrary" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button variant="contained">Delete</Button>
                        </Link>

                    </Box>


                </Box>

            </Box>
            <hr />
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

        </Container>
    );
};

export default MyPodcast;
