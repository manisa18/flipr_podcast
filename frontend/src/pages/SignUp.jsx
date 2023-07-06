import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  margin: "0 10px";
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
const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.hr};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  width: 111%;
  box-sizing: border-box; /* Add this line to include padding and border in the width calculation */
`;

const Option = styled.option`
  color: black;
`;
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
  });

  const handleInputs = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, confirmPassword, gender, dob } = user;
      if (password !== confirmPassword) {
        toast.error("Password do not match !!!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        return;
      } else if (password === confirmPassword) {
        const response = await axios.post("http://localhost:8000/signup", {
          name,
          email,
          password,
          gender,
          dob,
        });
        if (response.status === 201) {
          toast.success("Successful Registration.", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          localStorage.setItem("user", JSON.stringify(response));
          console.log("Successful Registration");
        } else {
          toast.error("Invalid Registration", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.log("Invalid Registration");
        }
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
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleInputs}
        />
        <Select name="gender" value={user.gender} onChange={handleInputs}>
          <Option value="">Select Gender</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
        <Input
          type="date"
          placeholder="Date of Birth"
          name="dob"
          value={user.dob}
          onChange={handleInputs}
        />

        <Button className="signup-button" onClick={handleSignup}>
          Sign Up
        </Button>

        <SmallHeading>Already have an account?</SmallHeading>
        <Link to="/signin" style={{ textDecoration: "none" }}>
          <Button>Sign In</Button>
        </Link>
        <ToastContainer />
      </Wrapper>
    </Container>
  );
};

export default SignUp;
