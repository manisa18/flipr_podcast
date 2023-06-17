import React from "react";
import { useState } from "react";
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
  font-size: 13px;
  font-weight: 300;
  margin: 20px 0px 0px;
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

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleInputs = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = user;
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        window.alert("Registration Successful");
        console.log("Successful Registration");
      } else {
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      }
    } catch (err) {
      // Handle error response
      if (err.response) {
        const errorMessage = err.response.data.message;
        console.log(errorMessage);
        // Display error message to the user or handle it as needed
      } else {
        console.log(err.message);
      }
    }
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <SubHeading>Join ListenUp today</SubHeading>
        <Input
          type="text"
          placeholder="name"
          name="name"
          value={user.name}
          onChange={handleInputs}
        />
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
        <Button className="signup-button" onClick={handleSignup}>
          Sign Up
        </Button>

        <SmallHeading>Already have an account?</SmallHeading>
        <Link to="/signin" style={{ textDecoration: "none" }}>
          <Button>Sign In</Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
