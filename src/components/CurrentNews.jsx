import CommentsBox from "./CommentsBox";
import { Card, Link, CardContent, CardHeader, Typography } from "@mui/material";

const CurrentNews = ({
  author = "автор",
  title = "заголовок",
  date = "1111111",
  comments = "25",
  url = "цццюкг",
}) => {
  return (
    <div>
      <Card sx={{ fullWidth: true, mt: 5 }}>
        <CardHeader title={title} subheader={date}></CardHeader>
        <CardContent>
          <Typography> By: {author}</Typography>
          <Typography>
            <Link href="#">{url}</Link>
          </Typography>
          <Typography>Comments: {comments}</Typography>
        </CardContent>
      </Card>
      <CommentsBox />
    </div>
  );
};

export default CurrentNews;
