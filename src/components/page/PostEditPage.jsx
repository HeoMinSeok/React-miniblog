import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import axios from "axios";

const Wrapper = styled.div`
    padding: 16px;
    width: clac(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

const PostEditPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const editBlog = () => {
        axios
            .put(`/api/blog/edit/${postId}`, {
                title: title,
                content: content,
            })
            .then(() => {   
                alert("수정 완료!");
                navigate("/");
            })
            .catch(err => console.error(err));
    };

    return (
        <Wrapper>
            <Container>
                <TextInput
                    height={20}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />

                <TextInput
                    height={480}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />

                <Button title="✏️ 완료" onClick={editBlog} />
            </Container>
        </Wrapper>
    );
};

export default PostEditPage;
