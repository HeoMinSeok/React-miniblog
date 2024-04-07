import styled from "styled-components";
import CommentListItem from "./CommentListIem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

const CommentList = (props) => {
    const { comments, postId, comment } = props;

    return (
        <Wrapper>
            {comments.map((comment) => {
                return <CommentListItem key={comment.ridx} comment={comment} postId={postId} />;
            })}
        </Wrapper>
    );
};

export default CommentList;
