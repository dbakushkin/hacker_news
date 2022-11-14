import "./App.css";
import MainPage from "./components/MainPage";
import Container from "@mui/material/Container";
import { Switch, Route } from "react-router-dom";
import CurrentNews from "./components/CurrentNews";

function App() {
  return (
    <Container maxWidth="sm">
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/news/:newsId">
          <CurrentNews />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
