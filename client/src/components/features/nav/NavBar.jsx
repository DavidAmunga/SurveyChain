import React, { Component } from "react";
import { Menu, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {


  render() {
    

    return (
      <Segment>
        <Menu inverted fixed="top">
          <Menu.Item as={Link} to="/home" header>
            NyumbaKumi
          </Menu.Item>
          <Menu.Item as={Link} to="/stats" name="Statistics" />

          <Menu.Item as={Link} to="/about" name="About" />

          <Menu.Item>
            <Button
              as={Link}
              to="/createQuestionnaire"
              floated="right"
              inverted
              content="Create Questionnaire"
            />
          </Menu.Item>

          <Menu.Item>
           
          </Menu.Item>
        </Menu>
      </Segment>
    );
  }
}
