import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import Button from "../ui/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "@mui/material";
import RegisterModal from "./RegisterModal";

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

const SearchBar = styled.input`
    border: 2px solid rgb(37, 147, 255);
    border-right: 0;
    vertical-align: middle;
    border-radius: 5px 0 0 5px;
    padding: 8px 16px;
    font-size: 17px;
    line-height: 1;

    :focus {
        outline: none;
        border-color: rgb(37, 147, 255);
        box-shadow: 0 0 5px rgba(37, 147, 255, 0.5);
    }
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledSearchIcon = styled(SearchIcon)`
    background-color: rgb(37, 147, 255);
    vertical-align: middle;
    color: white;
    padding: 8px;
    border-radius: 0px 20% 20% 0;
    line-height: 1; /* 추가된 부분 */
    margin-top: -16px;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MainPage = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

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

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Wrapper>
            <Container>
                <HeaderContainer>
                    <Button
                        title="글 작성 ✏️"
                        // onClick={() => {
                        //     navigate("/post-write");
                        // }}
                        onClick={handleModalOpen}
                        backgroundColor="rgb(110, 117, 124)"
                    />
                    <SearchContainer>
                        <SearchBar
                            value={search}
                            onChange={onChangeSearch}
                            placeholder="검색어를 입력하세요"
                        />
                        <StyledSearchIcon />
                    </SearchContainer>
                </HeaderContainer>

                <PostList
                    posts={data.slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                    )} // 현재 페이지에 해당하는 데이터만 표시
                    onClickItem={(item) => {
                        navigate(`/post/${item.idx}`);
                    }}
                    search={search}
                />
            </Container>
            {data.length > 0 && (
                <div>
                    <p></p>
                    <Pagination
                        count={Math.ceil(data.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                    <p></p>
                </div>
            )}
            {isModalOpen && (
                <RegisterModal onClose={() => setIsModalOpen(false)} />
            )}
        </Wrapper>
    );
};

export default MainPage;
