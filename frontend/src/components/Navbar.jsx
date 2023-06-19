import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

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
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to handle user sign out
  const handleSignOut = () => {
    setUser(null);
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchIcon />
        </Search>
        {user ? (
          <div>
            <Button onClick={handleDropdown}>
              <AccountCircleIcon />
              {user.name}
            </Button>
            {dropdownOpen && (
              <Dropdown>
                <Button onClick={handleSignOut}>Logout</Button>
              </Dropdown>
            )}
          </div>
        ) : (
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleIcon />
              Sign In
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
