import styled from "styled-components";
import Button from "../ui/Button";
import axios from "axios";
import { useState } from "react";
import TextInput from "../ui/TextInput";
import { useNavigate } from "react-router-dom";

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    height: 360px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    background-color: white;
    z-index: 150;
    padding: 20px;
    border: 1px solid white;
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* 어두운 배경색과 투명도 설정 */
    z-index: 100; /* 모달 뒤에 배치 */
`;

const ButtonContainer = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
`;

const RegisterModal = (props) => {
    const { onClose } = props;

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
                window.location.reload();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <>
                <Backdrop onClick={onClose} />
                <ModalWrapper>
                    <h2>게시글 등록 🐻</h2>
                    <TextInput
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        height={30}
                        placeholder="제목"
                    />

                    <TextInput
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        height={120}
                        placeholder="내용"
                    />
                    <ButtonContainer>
                        <Button title="✔︎ 완료" onClick={submitBlog} />
                        <Button
                            title="✘ 취소"
                            onClick={onClose}
                            backgroundColor="#FF5E00"
                        />
                    </ButtonContainer>
                </ModalWrapper>
            </>
        </>
    );
};

export default RegisterModal;
