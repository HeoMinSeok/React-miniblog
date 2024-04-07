import styled from "styled-components";
import Button from "../ui/Button";
import axios from "axios";
import { useState } from "react";
import TextInput from "../ui/TextInput";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background-color: white;
`;

const ContentText = styled.p`
    font-size: 14px;
    margin-right: auto;
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    height: 200px;
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
    display: flex;
    justify-content: flex-end;
    gap: 5px;
`;

const CommentListItem = (props) => {
    const { comment} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const handleDeleteComment = (postId) => {
        const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
        if (confirmDelete) {
            axios
                .delete(`/api/replies/delete/${comment.ridx}`)
                .then((response) => {
                    window.location.reload();
                })
                .catch((error) => {
                    alert("댓글 삭제에 실패했습니다.");
                });
        }
    };

    const handleEditComment = () => {
        setIsModalOpen(true);
    };

    const handleModalConfirm = () => {
        axios
            .put(`/api/replies/modify/${comment.ridx}`, {
                content: editedContent,
            })
            .then(() => {
                alert("수정 완료!");
                window.location.reload();
            })
            .catch((err) => console.error(err));

        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setEditedContent(comment.content);
    };

    return (
        <Wrapper>
            <ContentText>📌 {comment.content}</ContentText>
            <div>
                <p></p>
                <Button title="수정" onClick={handleEditComment} />
                <Button
                    title="삭제"
                    onClick={handleDeleteComment}
                    backgroundColor="#FF0000"
                />
            </div>
            {isModalOpen && (
                <>
                    <Backdrop onClick={handleModalCancel} />{" "}
                    {/* 모달 밖 클릭 시 닫기 */}
                    <Modal>
                        <h2>댓글 수정 🐶</h2>
                        <TextInput
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            rows={4}
                            cols={50}
                        />
                        <ButtonContainer>
                            <Button title="확인" onClick={handleModalConfirm} />
                            <Button
                                title="취소"
                                onClick={handleModalCancel}
                                backgroundColor="white"
                                color="#FF0000"
                                borderStyle="1px solid"
                                borderColor="#FF0000"
                            />
                            <p></p>
                        </ButtonContainer>
                    </Modal>
                </>
            )}
        </Wrapper>
    );
};

export default CommentListItem;
