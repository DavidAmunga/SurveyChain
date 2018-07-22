import React, { Component } from "react";
import {
  Grid,
  Segment,
  Header,
  Item,
  Label,
  Dimmer,
  Loader,
  List
} from "semantic-ui-react";
import firebase from "../../../app/config/firebase";
export default class QuestionnaireDetail extends Component {
  state = {
    questionnaire: null
  };

  componentDidMount = async () => {
    const db = firebase.firestore();
    db.collection(`questionnaires`)
      .doc(`${this.props.match.params.id}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ questionnaire: doc.data() });
        }
      });
  };

  render() {
    const { questionnaire } = this.state;

    return (
      <Grid>
        <Grid.Column width={16}>
          {questionnaire ? (
            <div>
              <Segment color="red">
                <Item.Group>
                  <Item>
                    <Item.Image
                      size="small"
                      avatar
                      src={questionnaire.surveyImage}
                    />
                    <Item.Content verticalAlign="bottom">
                      <Header as="h1">{questionnaire.name}</Header>
                      <br />
                      <Header as="h2">{questionnaire.description}</Header>
                      <br />
                      <Header as="h3" style={{ marginTop: "20px" }}>
                        Created by{"  "}
                        <Label size="large" as="a" color="red">
                          {questionnaire.createdByAddr}
                        </Label>
                      </Header>
                      <br />

                      <Header as="h3" style={{ marginTop: "20px" }}>
                        Payout : {questionnaire.payout} eth
                      </Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>

              <Segment color="green">
                <List celled size="massive">
                  {questionnaire.questions &&
                    questionnaire.questions.length > 0 &&
                    questionnaire.questions.map(question => (
                      <List.Item key={question.id}>
                        <List.Content>
                          {question.id}. {question.name}
                        </List.Content>
                      </List.Item>
                    ))}
                </List>
              </Segment>
            </div>
          ) : (
            <Dimmer active inverted>
              <Loader size="large">Loading</Loader>
            </Dimmer>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
