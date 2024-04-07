import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Pages
import MainPage from "./components/page/MainPage";
import PostWritePage from "./components/page/PostWritePage";
import PostViewPage from "./components/page/PostViewPage";
import PostEditPage from "./components/page/PostEditPage";
import axios from "axios";

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: rgb(37, 147, 255);
    cursor: pointer;
`;

function App(props) {
    return (
        <BrowserRouter>
            <div>
                <MainTitleText
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    MINDDO BLOG 🐥
                </MainTitleText>
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="post-write" element={<PostWritePage />} />
                    <Route path="post-edit/:postId" element={<PostEditPage />} />
                    <Route path="post/:postId" element={<PostViewPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
