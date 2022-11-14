import { Paper, Grid, Divider } from "@mui/material";

const ChildComments = ({ text, author }) => {
  return (
    <div>
      <Paper style={{ padding: "40px 20px", marginLeft: "25px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left", fontSize: "15px" }}>
              {author}
            </h4>
            <p style={{ textAlign: "left", fontSize: "10px" }}>{text}</p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    </div>
  );
};

export default ChildComments;
