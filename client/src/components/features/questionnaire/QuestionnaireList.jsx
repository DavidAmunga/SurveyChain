import React, { Component } from "react";
import { Card, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

class QuestionnaireList extends Component {
  render() {
    const { list } = this.props;

    return (
      <div>
        <Card.Group>
          {list &&
            list.map(questionnaire => (
              <Card
                as={Link}
                to={`/questionnaire/${questionnaire.contractId}`}
                key={questionnaire.contractId}
              >
                <Label color="red" floating>
                  {questionnaire.payout} 
                </Label>
                <Card.Content>
                  <Card.Header>{questionnaire.name}</Card.Header>
                  <Card.Meta>
                    <Label as="a" color="blue">
                      {format(questionnaire.created, "hh:mm a")}
                      <Label.Detail>
                        {" "}
                        {format(questionnaire.created, "DD-MM-YYYY")}
                      </Label.Detail>
                    </Label>
                  </Card.Meta>
                  <Card.Description>
                    {questionnaire.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <br />
                  <a>
                    <Icon name="question circle" />
                    {questionnaire.questions.length} questions
                  </a>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </div>
    );
  }
}
export default QuestionnaireList;
