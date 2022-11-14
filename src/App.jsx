import "./App.css";
import MainPage from "./components/MainPage";
import Container from "@mui/material/Container";
import { Switch, Route } from "react-router-dom";
import NewsItem from "./components/NewsItem";

function App() {
  return (
    <Container maxWidth="sm">
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/news/:newsId">
          <NewsItem />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
