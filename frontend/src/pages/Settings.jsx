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
const BigHeading = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin: 10px;
  padding: 5px;
  text-align: center;
`;

const SubHeading = styled.h2`
  font-size: 15px;
  font-weight: 500;
  margin: 0px;
  padding: 5px;
`;



const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.hr};
  border-radius: 3px;
  padding: 10px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  margin: 5px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text};
`;

const Settings = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const handleEditClick = () => {
        setIsEditMode(true);
      };

      const handleCancelClick = () => {
        setIsEditMode(false);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
      
        // Add code to update the user's account information based on the form inputs
      
        setIsEditMode(false); // Set the edit mode back to false after submission
      };
       
      return (
        <Container>
            
          {isEditMode ? (
            <form onSubmit={handleSubmit}>
            <BigHeading>Edit Account Details</BigHeading>
              <Input type="text" placeholder="Account Name" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Button type="submit">Save</Button>
              <Button onClick={handleCancelClick}>Cancel</Button>
            </form>
          ) : (
            <SubHeading>
              <p>Account Name: John Doe</p>
              <p>Email: johndoe@example.com</p>
              <p>Password: ********</p>
              <Button onClick={handleEditClick}>Edit</Button>
              <Link to="/" style={{ textDecoration: "none" }}>
              <Button>Back</Button></Link>
            </SubHeading>
          )}
          
        </Container>
      );
}

export default Settings