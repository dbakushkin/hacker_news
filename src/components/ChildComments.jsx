import { Paper, Grid, Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubChildComments } from "../features/comments/commentsSlice";

const ChildComments = ({ text, kids, authorName, time, id, fontSize }) => {
  const dispatch = useDispatch();
  console.log(kids);
  useEffect(() => {
    dispatch(getSubChildComments(kids));
  }, [kids]);
  const { subChildComments } = useSelector((store) => store.comments);

  const filteredComments = subChildComments.filter(
    (elem) => elem.parent === id
  );
  console.log(`а есть ли чо${filteredComments}`);

  const date = time ? new Date(+time * 1000).toLocaleString() : "";
  return (
    <div>
      <Paper style={{ padding: "40px 20px", marginLeft: "25px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4
              style={{
                margin: 0,
                textAlign: "left",
                fontSize: `${fontSize}px`,
              }}
            >
              {authorName}
            </h4>
            <p
              style={{
                textAlign: "left",
                fontSize: `${fontSize}px`,
                wordBreak: "break-all",
              }}
            >
              {text}
            </p>
            <p
              style={{
                textAlign: "left",
                fontSize: `${fontSize}px`,
                color: "gray",
              }}
            >
              {date}
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      {filteredComments &&
        filteredComments.map(({ by, time, kids, text, deleted, id }) =>
          !deleted ? (
            <ChildComments
              key={id}
              kids={kids}
              time={time}
              authorName={by}
              text={text}
              fontSize={8}
            />
          ) : null
        )}
    </div>
  );
};

export default ChildComments;
