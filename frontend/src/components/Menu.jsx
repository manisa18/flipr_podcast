import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ListenUpLogo from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import DiscoverIcon from "@mui/icons-material/WifiFind";
import LibraryIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import DownloadIcon from "@mui/icons-material/FileDownload";
import RecentIcon from "@mui/icons-material/EventRepeat";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Container = styled.div`
  flex: 1.3;
  background-color: ${({ theme }) => theme.bgLighter};
  height: auto;
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px 18px 25px;
  position: sticky;
  top: 0;
  left: 0;
  height: auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
    height = 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.navbar};
  }
`;

const Login = styled.div`
  font-weight: 350;
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: #e3f4f4;
  border: 1px solid #526d82;
  color: #27374d;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  align-items: center;
  display: flex;
  gap: 5px;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.hr};
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={ListenUpLogo} style={{ width: "60px", height: "auto" }} />
            ListenUp
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Item>
          <DiscoverIcon />
          Discover
        </Item>
        <Item>
          <LibraryIcon />
          My Library
        </Item>
        <Hr />
        <Item>
          <SearchIcon />
          Search
        </Item>
        <Item>
          <CategoryIcon />
          Categories
        </Item>
        <Item>
          <DownloadIcon />
          Downloads
        </Item>
        <Item>
          <RecentIcon />
          Recently Played
        </Item>
        <Item>
          <SubscriptionsIcon />
          Subscriptions
        </Item>
        <Hr />
        <Item onClick={() => setDarkMode(!darkMode)}>
          <DarkModeIcon />
          {darkMode ? "Light" : "Dark"} Theme
        </Item>
        <Item>
          <SettingsIcon />
          Settings
        </Item>
        <Item>
          <HelpIcon />
          Help
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
