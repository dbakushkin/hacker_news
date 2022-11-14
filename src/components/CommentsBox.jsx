import { Paper, Grid, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getComments } from "../features/comments/commentsSlice";

const CommentsBox = ({ by, time, text }) => {
  const [showComments, setShowComments] = useState(false);

  const handleOpen = () => {
    setShowComments(!showComments);
  };
  const date = time ? new Date(+time * 1000).toLocaleString() : "";
  return (
    <div style={{ padding: 14 }} className="App">
      <Paper onClick={handleOpen} style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{by}</h4>
            <p style={{ textAlign: "left" }}>{text}</p>
            <p style={{ textAlign: "left", color: "gray" }}>{date}</p>
          </Grid>
        </Grid>

        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </div>
  );
};

export default CommentsBox;
