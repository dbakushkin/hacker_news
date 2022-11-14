import { Paper, Grid, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChildComments } from "../features/comments/commentsSlice";
import ChildComments from "./ChildComments";

const CommentsBox = ({ by, time, text, id, kids }) => {
  console.log(kids, id);
  const [showComments, setShowComments] = useState(false);
  const { childComments } = useSelector((store) => store.comments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChildComments(kids, id));
  }, []);
  const handleOpen = () => {
    setShowComments(!showComments);
  };

  console.log(childComments);

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
        {showComments &&
          childComments[id] &&
          childComments[id].map(({ by, text, id }) => (
            <ChildComments key={id} author={by} text={text} />
          ))}
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </div>
  );
};

export default CommentsBox;
