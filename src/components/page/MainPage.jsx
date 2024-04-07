import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import Button from "../ui/Button";
import axios from "axios";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
    padding: 16px;
    width: clac(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 500px;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

const MainPage = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/api/blog/list");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Wrapper>
            <Container>
                <Button
                    title="글 작성 ✏️"
                    onClick={() => {
                        navigate("/post-write");
                    }}
                    backgroundColor="rgb(110, 117, 124)"
                />
                <PostList
                    posts={data}
                    onClickItem={(item) => {
                        navigate(`/post/${item.idx}`);
                    }}
                />
            </Container>
        </Wrapper>
    );
};

export default MainPage;
