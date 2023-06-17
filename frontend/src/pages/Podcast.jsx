import React from 'react'
import styled from 'styled-components'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Card from '../components/Card';

const Container = styled.div` 
  display: flex; 
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const PodcastWrapper = styled.div`

`;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text}
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between
`;
const Info = styled.span`
  color: ${({theme}) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme}) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({theme}) => theme.hr};
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
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%
`
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({theme}) => theme.textSoft};
  font-size: 13px;
`;
const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #73BBC9;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Podcast = () => {
  return (
    <Container>
      <Content>
        <PodcastWrapper>
        <iframe width="100%" height="350"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
        title="Podcast Player"
        frameborder = "0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        >
        </iframe>
        </PodcastWrapper>
        <Title>Test Podcast</Title>
        <Details>
          <Info>660,908 views ● 1 day ago</Info>
          <Buttons>
            <Button><ThumbUpOffAltIcon/>Like</Button>
            <Button><ThumbDownOffAltIcon/>Dislike</Button>
            <Button><ShareIcon/>Share</Button>
            <Button><LibraryAddIcon/>Save</Button>
          </Buttons>
        </Details>
        <Hr/>
        <Channel>
        <ChannelInfo>
          <Image src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc8tQbVwD-HqBIsnk82HAAjq36qMxNdvcosQ&usqp=CAU"/>
        <ChannelDetail>
          <ChannelName>FLIPR</ChannelName>
          <ChannelCounter>200K subscribers</ChannelCounter>
          <Description>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Nihil corporis impedit quibusdam perferendis atque at eos, 
            quaerat voluptas provident suscipit praesentium dignissimos, 
            quis id nostrum modi voluptatibus incidunt tenetur odit.
          </Description>
        </ChannelDetail>
        </ChannelInfo>
        <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        
      </Content>
      <Recommendation>
        <Card type ="sm"/>
        <Card type ="sm"/>
        <Card type ="sm"/>
        <Card type ="sm"/>
        <Card type ="sm"/>
        <Card type ="sm"/>
        <Card type ="sm"/>
        <Card type ="sm"/>
        <Card type ="sm"/>
        <Card type ="sm"/>
        <Card type ="sm"/>
      </Recommendation>
    </Container>
  )
}

export default Podcast