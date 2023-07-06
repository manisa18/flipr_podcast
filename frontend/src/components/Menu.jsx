import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
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
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";

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
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Img = styled.img`
  width: 60px;
  height: auto;
  @media (max-width: 768px) {
    width: 40px;
    height: auto;
  }
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

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.hr};
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    padding: 0 0 10px 0;
    align-items: left;
    justify-content: flex-start;
  }
`;
const HamburgerIcon = styled(MenuIcon)`
  font-size: 24px;
`;
const MenuItemsContainer = styled.div`
  display: ${({ showMenu }) => (showMenu ? "block" : "none")};

  @media (min-width: 769px) {
    display: block;
  }
`;
const Menu = ({ darkMode, setDarkMode, handleSearchMenu }) => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Container>
      <Wrapper>
        <HamburgerMenu onClick={handleMenuClick}>
          <HamburgerIcon />
        </HamburgerMenu>

        <MenuItemsContainer showMenu={menuOpen || window.innerWidth > 768}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={ListenUpLogo} />
              ListenUp
            </Logo>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <HomeIcon />
              Home
            </Item>
          </Link>
          {/* <Item>
            <DiscoverIcon />
            Discover
          </Item> */}
          <Link
            to="/mylibrary"
            style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <LibraryIcon />
              My Library
            </Item>
          </Link>
          <Hr />
          {location.pathname === "/" ? (
            <Item onClick={handleSearchMenu}>
              <SearchIcon />
              Search
            </Item>
          ) : (
            <></>
          )}
          <Link
            to="/categories"
            style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <CategoryIcon />
              Categories
            </Item>
          </Link>
          {/* <Item>
            <DownloadIcon />
            Downloads
          </Item> */}
          <Link
            to="/savedpodcast"
            style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <RecentIcon />
              Saved Podcast
            </Item>
          </Link>
          <Item>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
          <Hr />
          <Item onClick={() => setDarkMode(!darkMode)}>
            <DarkModeIcon />
            {darkMode ? "Light" : "Dark"} Theme
          </Item>
          {/* <Item>
            <SettingsIcon />
            Settings
          </Item> */}
          {/* <Item>
            <HelpIcon />
            Help
          </Item> */}
        </MenuItemsContainer>
      </Wrapper>
    </Container>
  );
};

export default Menu;
