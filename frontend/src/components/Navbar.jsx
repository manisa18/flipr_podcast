import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.navbar};
  height: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #e3f4f4;
  border: 1px solid #526d82;
  color: #27374d;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  align-items: center;
  display: flex;
  gap: 5px;
`;
const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.navbar};
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 1;
`;

const Navbar = ({ setSearchResult, isSearchBarOpen, setIsSearchBarOpen }) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keywords, setKeywords] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (isSearchBarOpen) {
      inputRef.current.focus();
    }
  }, [isSearchBarOpen]);

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.clear();
    setDropdownOpen(false);
    navigate("/");
  };

  const handleSettings = () => {
    setDropdownOpen(false);
    navigate("/settings");
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/podcast/?keyword=${keywords}`
      );
      const data = response.data.podcasts;
      setSearchResult(data);
      setIsSearchBarOpen(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input
            ref={inputRef}
            placeholder="Search"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <Button
            onClick={handleSearchClick || isSearchBarOpen}
            style={{ backgroundColor: "transparent", border: "none" }}>
            <SearchIcon />
          </Button>
        </Search>
        {auth ? (
          <div>
            <Avatar
              sx={{
                bgcolor: "#ffff",
                width: 30,
                height: 30,
                cursor: "pointer",
              }}
              onClick={handleDropdown}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#282c3c", fontSize: 20 }}>
                {JSON.parse(auth).data.user.name[0].toUpperCase()}
              </Typography>
            </Avatar>
            {dropdownOpen && (
              <Dropdown>
                <Button onClick={handleSettings}>Settings</Button>
                <Button onClick={handleSignOut}>Logout</Button>
              </Dropdown>
            )}
          </div>
        ) : (
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button>
              {/* <AccountCircleIcon /> */}
              Sign In
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
