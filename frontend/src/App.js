import "./App.css";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import SavedPodcast from "./pages/SavedPodcast";
import MyLibrary from "./pages/MyLibrary";
import Category from "./pages/Category";
import AddPodcast from "./pages/AddPodcast";
import MyPodcast from "./pages/MyPodcast";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchResult, setSearchResult] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const handleSearchMenu = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            handleSearchMenu={handleSearchMenu}
          />
          <Main>
            <Navbar
              setSearchResult={setSearchResult}
              isSearchBarOpen={isSearchBarOpen}
              setIsSearchBarOpen={setIsSearchBarOpen}
            />
            <Wrapper>
              <Routes>
                <Route
                  path="/"
                  element={<Home searchResult={searchResult} />}
                />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="podcast/:id" element={<Podcast />} />
                <Route path="settings" element={<Settings />} />
                <Route path="savedpodcast" element={<SavedPodcast />} />
                <Route path="mylibrary" element={<MyLibrary />} />
                <Route path="categories" element={<Category />} />
                <Route path="addpodcast" element={<AddPodcast />} />
                <Route path="mylibrary/:id" element={<MyPodcast />} />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
