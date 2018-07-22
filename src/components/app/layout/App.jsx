import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Notifications from "react-notify-toast";
import NavBar from "../../features/nav/NavBar";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/About";
import Dashboard from "../../features/dashboard/Dashboard";
import QuestionnaireDetail from "../../features/questionnaire/questionnaireDetail/QuestionnaireDetail";
import QuestionnaireForm from "../../features/questionnaire/QuestionnaireForm";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Notifications />
              <Container className="main">
                <Route path="/home" exact component={Dashboard} />
                <Route
                  path="/questionnaire/:id"
                  component={QuestionnaireDetail}
                />
                <Route
                  path="/createQuestionnaire"
                  component={QuestionnaireForm}
                />
                <Route path="/about" component={AboutPage} />
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
