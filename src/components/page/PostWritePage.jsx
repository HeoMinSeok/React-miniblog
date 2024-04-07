import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end; 
`;

const PostWritePage = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const submitBlog = () => {
        axios
            .post("/api/blog/write", {
                title: title,
                content: content,
            })
            .then(() => {
                setTitle("");
                setContent("");

                alert("등록 완료!");
                navigate("/");
            })
            .catch((err) => console.error(err));
    };

    return (
        <Wrapper>
            <Container>
                <h2>제목</h2>
                <TextInput
                    height={20}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <h2>내용</h2>
                <TextInput
                    height={150}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />

                <ButtonContainer>
                    <Button title="✔︎ 완료" onClick={submitBlog} />
                    <Button
                        title="✘ 취소"
                        onClick={() => {
                            navigate("/");
                        }}
                        backgroundColor="#FF5E00"
                    />
                    <p></p>
                </ButtonContainer>
            </Container>
        </Wrapper>
    );
};

export default PostWritePage;
