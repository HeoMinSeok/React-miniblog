import styled, { keyframes } from "styled-components";
import PostListItem from "./PostListItem";
import noPostsIamge from "../../assets/cat.jpg";

const Wrapper = styled.div`
    diplay: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

const typingAnimation = keyframes`
    from { width: 0 }
    to { width: 100% }
`;

const NoListText = styled.p`
    font-size: 20px;
    min-width: 11px;
    white-space: nowrap;
    margin: 0;
    position: fixed;
    color: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;

    &::before {
        content: "⭐️ 등록된 게시글이 없습니다. ⭐️";
        position: absolute;
        top: -30px;
        left: 22%;
        width: 100%;
        height: 100%;
        // background-image: linear-gradient(
        //     to right,
        //     #ff0000,
        //     #ffa500,
        //     #ffff00,
        //     #008000,
        //     #0000ff,
        //     #4b0082,
        //     #800080
        // );
        background-color: rgb(37, 147, 255);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        animation: ${typingAnimation} 3s steps(200) infinite;
    }
`;

const NoPostsImage = styled.img`
    transform: translateX(-65%);
    width: 200px;
    height: auto;
`;

const PostList = ({ posts, onClickItem }) => {

    return (
        <Wrapper>
            {posts.length === 0 ? (
                <NoListText>
                    ⭐️ 등록된 게시글이 없습니다. ⭐️
                    <NoPostsImage src={noPostsIamge} alt="No Posts Image" />
                </NoListText>
            ) : (
                posts.map((post) => (
                    <PostListItem
                        key={post.idx}
                        post={post}
                        onClick={() => onClickItem(post)}
                    />
                ))
            )}
        </Wrapper>
    );
};
export default PostList;
