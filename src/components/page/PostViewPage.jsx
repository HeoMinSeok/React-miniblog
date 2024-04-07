import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import axios from "axios";
import PostWritePage from "./PostWritePage";

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

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid rgb(37, 147, 255);
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 30px;
    font-weight: 500;
    color: rgb(37, 147, 255);
`;

const ContentText = styled.p`
    font-size: 20px
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px
    font-weight: 500;
    margin-top: 30px;
`;

const PostViewPage = (props) => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState("");
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const handleDeletePost = () => {
        const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
        
        if (confirmDelete) {
            axios
                .delete(`/api/blog/delete/${postId}`)
                .then((response) => {
                    alert(response.data);
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Error deleting post:", error);
                    alert("게시글 삭제에 실패했습니다.");
                });
        }
    };

    useEffect(() => {
        const fetchGetList = async () => {
            try {
                const postResponse = await axios.get(`/api/blog/get/${postId}`);
                setPost(postResponse.data);

                const commentsResponse = await axios.get(
                    `/api/replies/list/${postId}`
                );
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("Error fetching post and comments:", error);
            }
        };

        fetchGetList();
    }, [postId]);

    const submitReply = () => {
        if (!comment) {
            alert("댓글을 입력해주세요.");
            return;
        }

        axios
            .post(`/api/replies/new/${postId}`, {
                content: comment,
            })
            .then(() => {
                setComment("");
                

                alert("댓글 등록 완료!");
                navigate(`/post/${postId}`);

                // 댓글을 등록한 후에 새로운 댓글 목록을 다시 가져옴.
                axios
                    .get(`/api/replies/list/${postId}`)
                    .then((response) => {
                        setComments(response.data);
                    })
                    .catch((error) => {
                        console.error(
                            "Error fetching comments after reply:",
                            error
                        );
                    });
            })
            .catch((err) => console.error(err));
    };

    return (
        <Wrapper>
            <Container>
                <Button
                    title="⬅️"
                    onClick={() => {
                        navigate("/");
                    }}
                    backgroundColor="rgb(60, 60, 60)"
                />
                <Button
                    title="수정"
                    onClick={() => {
                        navigate(`/post-edit/${postId}`);
                    }}
                />
                <Button
                    title="삭제"
                    onClick={handleDeletePost}
                    backgroundColor="#FF0000"
                />

                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                    <Button title=" 댓글 ✏️" onClick={submitReply} />
                    <TextInput
                        height={40}
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                    />
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList
                    key={postId}
                    comments={comments}
                    comment={comment}
                    postId={postId}
                />
            </Container>
        </Wrapper>
    );
};

export default PostViewPage;
