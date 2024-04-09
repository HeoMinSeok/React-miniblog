import styled from "styled-components";
import Button from "../ui/Button";
import axios from "axios";
import { useState } from "react";
import TextInput from "../ui/TextInput";

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

const ModifyModal = (props) => {
    const { onClose, post, postId } = props;

    const [modifyTitle, setMoidfyTitle] = useState(post.title);
    const [modiyfyContent, setModifyContent] = useState(post.content);

    const editBlog = () => {
        axios
            .put(`/api/blog/edit/${postId}`, {
                title: modifyTitle,
                content: modiyfyContent,
            })
            .then(() => {
                alert("수정 완료!");
                window.location.reload();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <>
                <Backdrop onClick={onClose} />
                <ModalWrapper>
                    <h2>게시글 수정 🐰</h2>
                    <TextInput
                        value={modifyTitle}
                        onChange={(e) => {
                            setMoidfyTitle(e.target.value);
                        }}
                        height={30}
                    />

                    <TextInput
                        value={modiyfyContent}
                        onChange={(e) => {
                            setModifyContent(e.target.value);
                        }}
                        height={120}
                    />
                    <ButtonContainer>
                        <Button title="확인" onClick={editBlog} />
                        <Button
                            title="취소"
                            onClick={onClose}
                            backgroundColor="white"
                            color="#FF0000"
                            borderStyle="1px solid"
                            borderColor="#FF0000"
                        />
                    </ButtonContainer>
                </ModalWrapper>
            </>
        </>
    );
};

export default ModifyModal;
