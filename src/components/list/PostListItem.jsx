import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    border-radius: 8px;
    cursor: pointer;
    background-color: rgb(37, 147, 255);
    color: white;

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* 수직, 수평으로 2px씩 그림자, 흐린 정도 0.2 */

    transition: box-shadow 0.3s ease-in-out;
    &:hover {
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 15);
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

const CommentCount = styled.span`
    font-size: 14px;
    font-weight: 400;
`;

const PostListItem = (props) => {
    const { post, onClick, postId } = props;

    return (
        <Wrapper onClick={onClick}>
            <TitleText>{post.title}</TitleText>
        </Wrapper>
    );
};

export default PostListItem;
