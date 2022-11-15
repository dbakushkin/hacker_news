import { Paper, Grid, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChildComments } from "../features/comments/commentsSlice";
import ChildComments from "./ChildComments";

const CommentsBox = ({ by, time, text, id, kids }) => {
  console.log(kids, id);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    dispatch(getChildComments(kids, id));
  }, []);

  const dispatch = useDispatch();
  const { childComments } = useSelector((store) => store.comments);
  const handleOpen = () => {
    setShowComments(!showComments);
  };
  const filteredComments = childComments.filter((elem) => elem.parent === id);

  console.log(filteredComments);

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
          filteredComments &&
          filteredComments.map(({ by, text, deleted, id }) =>
            !deleted ? (
              <ChildComments key={id} authorName={by} text={text} />
            ) : null
          )}
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </div>
  );
};

export default CommentsBox;
