import React, { Component } from "react";
import sampleData from "../../../app/data/sampleData";
import {
  Grid,
  Segment,
  Header,
  Item
} from "semantic-ui-react";

export default class QuestionnaireDetail extends Component {
  state = {
    questionnaire: null
  };

  componentDidMount() {
    const singleQuestionnaire = sampleData.questionnaires.filter(
      questionnaire => questionnaire.contractId === this.props.match.params.id
    );
   console.log(singleQuestionnaire)
    this.setState({
      questionnaire:singleQuestionnaire[0]
    });
  }

  render() {
    const { questionnaire } = this.state;
   
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            {questionnaire && ( 
              <Item.Group>
                <Item>
                  <Item.Image size="small" avatar src={questionnaire.surveyImage} />
                  <Item.Content verticalAlign='bottom'>
                    <Header as='h1'>{questionnaire.name}</Header>
                    <br/>
                    <Header as='h2'>{questionnaire.description}</Header>
                    <br/>
                    <Header  as='h3'>Created by{questionnaire.createdByUser}</Header>
                  </Item.Content>
                </Item>
              </Item.Group>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
