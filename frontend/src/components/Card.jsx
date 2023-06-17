import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: ${(props)=>props.type !== "sm" ? "290px" : "300px"};
  margin-bottom: ${(props)=>props.type === "sm" ? "10px" : "45px"};
  cursor: pointer;
  display: ${(props)=>props.type === "sm" && "flex"};
  gap: 10px;
`;
const Image = styled.img`
  width: ${(props)=>props.type !== "sm" ? "95%" : "100%"};
  height: ${(props)=>props.type === "sm" ? "120px" : "170px"};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display = flex;
  margin-top: ${(props)=>props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props)=>props.type === "sm" && "none"};
`;

const Texts = styled.div`

`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  margin: 9px 0px;
  color: ${({ theme }) => theme.textSoft};
`;
const Info = styled.div`
  font-size: ${(props)=>props.type !== "sm" ? "14px" : "11px"};
  color: ${({ theme }) => theme.textSoft};
  
`;

const Card = ({type}) => {
  return (
    <Link to="/podcast/test" style={{textDecoration:"none"}}>
    <Container type={type}>
      <Image type={type} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjQj5EcguYZuCRq57KNddk-ednw_PjYWOyVQ&usqp=CAU'/>
    <Details type={type}>
    <ChannelImage type={type} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc8tQbVwD-HqBIsnk82HAAjq36qMxNdvcosQ&usqp=CAU'/>
    <Texts>
      <Title>Test Podcast</Title>
      <ChannelName>FLIPR</ChannelName>
      <Info type={type}>660,908 views ● 1 day ago</Info>
    </Texts>
    </Details>
    </Container>
    </Link>
  )
}

export default Card