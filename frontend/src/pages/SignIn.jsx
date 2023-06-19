import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 500px;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.hr};
  padding: 20px 50px;
  gap: 10px;
`;
const Title = styled.h1`
  font-size: 23px;
  margin: 0px;
`;

const SubHeading = styled.h2`
  font-size: 20px;
  font-weight: 300;
  margin: 0px;
`;

const SmallHeading = styled.h2`
  font-size: 13px; /* Decreased font size */
  font-weight: 300;
  margin: 20px 0px 0px; /* Added 20px top margin */
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.hr};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text};
`;

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const handleInputs = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      if (response.status === 200) {
        // Handle successful signin
        window.alert("Signin Successful");
        localStorage.setItem("user", JSON.stringify(response));
        console.log("Successful Signin");
        navigate("/");
      } else {
        // Handle unsuccessful signin
        window.alert("Invalid Credentials");
        console.log("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
      // Handle error
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title> Sign In</Title>
        <SubHeading> to continue to ListenUp </SubHeading>
        <Input
          type="email"
          placeholder="email"
          name="email"
          value={user.email}
          onChange={handleInputs}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          value={user.password}
          onChange={handleInputs}
        />
        <Button className="signup-button" onClick={handleSubmit}>
          Sign In
        </Button>

        <SmallHeading>Don't have an account yet?</SmallHeading>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button>Create an Account</Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default SignIn;
