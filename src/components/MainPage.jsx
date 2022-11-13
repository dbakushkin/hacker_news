import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews, selectNews } from "../features/news/newsSlice";
import NewsBlock from "./NewsBlock";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import CommentsBox from "./CommentsBox";
import CurrentNews from "./CurrentNews";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, []);
  const news = useSelector(selectNews);
  console.log(news);

  return (
    <div>
      <CurrentNews />
      {!news.length ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div>
            <Button fullWidth="true" variant="contained" size="large">
              Обновить новости
            </Button>
          </div>
          <div>
            {news &&
              news.map((news) => (
                <Link to={`news/${news.id}`} style={{ textDecoration: "none" }}>
                  <NewsBlock
                    key={news.id}
                    time={news.time}
                    title={news.title}
                    author={news.by}
                    score={news.score}
                  />
                </Link>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;