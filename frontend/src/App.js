import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/HomePage";
import LoginForm from "./components/LoginPage";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default App;
