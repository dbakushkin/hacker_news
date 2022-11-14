import CommentsBox from "./CommentsBox";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getCurrentNews } from "../features/news/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  getComments,
  selectComments,
} from "../features/comments/commentsSlice";

const CurrentNews = () => {
  const { newsId } = useParams();
  const dispatch = useDispatch();

  const { currentNews } = useSelector((store) => store.news);
  console.log(currentNews);

  useEffect(() => {
    dispatch(getCurrentNews(newsId));
  }, []);

  const forceUpdate = () => {
    dispatch(getCurrentNews(newsId));
    dispatch(getComments(newsId));
  };

  useEffect(() => {
    dispatch(getComments(newsId));
  }, []);
  const comments = useSelector(selectComments);
  const date = currentNews.time
    ? new Date(+currentNews.time * 1000).toLocaleString()
    : "";

  return (
    <div>
      <div>
        <ArrowBackIcon />{" "}
        <Link to="/">
          <span>Back to news list</span>
        </Link>
      </div>
      <Card sx={{ fullWidth: true, mt: 5 }}>
        <CardHeader title={currentNews.title} subheader={date}></CardHeader>
        <CardContent>
          <Typography> By: {currentNews.by}</Typography>
          <Typography>
            Url:<a href={currentNews.url}>{currentNews.url}</a>
          </Typography>
        </CardContent>
      </Card>
      <h1>
        Comments {currentNews.descendants}
        <Button onClick={forceUpdate}>
          <RefreshIcon color="action" />
        </Button>
      </h1>
      {comments.length &&
        comments.map((comment) => (
          <CommentsBox
            by={comment.by}
            kids={comment.kids}
            text={comment.text}
            time={comment.time}
            key={comment.id}
            id={comment.id}
          />
        ))}
    </div>
  );
};

export default CurrentNews;
