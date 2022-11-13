import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const NewsBlock = ({ time, score, title, author }) => {
  console.log(time);
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
