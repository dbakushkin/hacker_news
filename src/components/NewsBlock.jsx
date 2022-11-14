import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectNews } from "../features/news/newsSlice";

const NewsBlock = ({ time, score, title, author }) => {
  const date = time ? new Date(+time * 1000).toLocaleString() : "";

  return (
    <div>
      {" "}
      <Card sx={{ fullWidth: true, mt: 5 }}>
        <CardHeader title={title} subheader={date}></CardHeader>
        <CardContent>
          <Typography>
            {" "}
            By: {author} Points: {score}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default NewsBlock;
