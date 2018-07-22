import React, { Component } from "react";
import {
  Segment,
  Grid,
  Form,
  Header,
  Label,
  Button,
  Icon,
  Message
} from "semantic-ui-react";
import { notify } from "react-notify-toast";
import factory from "../../../ethereum/factory";
import web3 from "../../../ethereum/web3";
import firebase from "../../app/config/firebase";

class QuestionnaireForm extends Component {
  state = {
    questionNo: null,
    name: "",
    description: "",
    questions: [{ name: "" }],
    price: null,
    errorMessage: null,
    loading: false,
    color: "green"
  };

  componentDidMount = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({
      createdByAddr: accounts[0]
    });
  };
  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "", color: "blue" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createQuestionnaire(this.state.price).send({
        from: accounts[0]
      });

      const address = await factory.methods.getLatestQuestionnaire().call();

      console.log(address);

      const newQuestionnaire = {
        name: this.state.name,
        description: this.state.description,
        questions: this.state.questions,
        created: Date.now(),
        createdByAddr: this.state.createdByAddr,
        payout: this.state.price
      };

      const db = firebase.firestore();
      db.collection("questionnaires")
        .doc(`${address}`)
        .set(newQuestionnaire);

      let myColor = { background: "#00C22C", text: "#FFFFFF" };
      await notify.show("Questionnaire Added!", "success", 1000, myColor);

      this.props.history.goBack();
    } catch (error) {
      if (error.message.includes("User denied transaction signature")) {
        this.setState({ errorMessage: "User has rejected the transaction" });
      } else if (
        error.message.includes(
          "address specified in neither the given options, nor the default options."
        )
      ) {
        this.setState({
          errorMessage: "Please log in to Metamask on your browser"
        });
      } else {
        this.setState({ errorMessage: error.message });
      }
    }

    this.setState({ loading: false, color: "green" });
  };

  handleAddQuestion = () => {
    this.setState({
      questions: this.state.questions.concat([{ name: "" }])
    });
  };
  handleRemoveQuestion = idx => () => {
    if (idx !== 0) {
      const finalPrice = this.state.questions.length - 1;
      this.setState({
        questions: this.state.questions.filter((q, qidx) => idx !== qidx),
        price: finalPrice * 0.01
      });
    }
  };

  handleQuestionNameChange = idx => e => {
    const newQuestions = this.state.questions.map((question, qidx) => {
      if (idx !== qidx) return question;
      return { ...question, name: e.target.value,id:idx+1 };
    });

    this.setState({
      questions: newQuestions,
      price: this.state.questions.length * 0.01
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // onDrop = files => {
  //   this.setState({
  //     preview: files[0].preview,
  //     files,
  //     fileName: files[0].name
  //   });
  // };

  render() {
    const { questions, price, loading, color, errorMessage } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          {errorMessage && (
            <Message error header="Oops!" content={this.state.errorMessage} />
          )}
          <Segment>
            <Header sub color="blue" content="Questions" />
            <Form>
              {questions.map((question, idx) => (
                <div key={idx}>
                  <Form.Group>
                    <Form.Input
                      name="name"
                      width={14}
                      value={question.name}
                      onChange={this.handleQuestionNameChange(idx)}
                      placeholder={`Enter Survey Question ${idx + 1}`}
                    />

                    <Form.Button onClick={this.handleRemoveQuestion(idx)}>
                      Remove
                    </Form.Button>
                  </Form.Group>
                </div>
              ))}
              <Form.Button onClick={this.handleAddQuestion}>Add</Form.Button>
            </Form>
          </Segment>
        </Grid.Column>

        <Grid.Column width={6}>
          <Segment>
            <Label as="a" color="red" ribbon>
              Total Cost : {price ? price : "0"} eth
            </Label>
            <Label as="a" color="blue" style={{ marginTop: "20px" }}>
              Done By
              <Label.Detail>{this.state.createdByAddr}</Label.Detail>
            </Label>
            <Header sub color="blue" content="Questionnaire Details" />
            <Form onSubmit={this.handleSubmit}>
              {/* <Form.Field>
                <Dropzone
                  onDrop={this.onDrop}
                  multiple={false}
                  accept="image/jpeg,image/jpg,image/tiff,image/gif"
                >
                  <div style={{ paddingTop: "30px", textAlign: "center" }}>
                    <Icon name="upload" size="huge" />
                    <Header content="Drop image here or click to add" />
                  </div>
                </Dropzone>
                {preview && (
                  <img
                    style={{
                      "max-width": "200px",
                      "max-height": "100%",
                      margin: "10px"
                    }}
                    src={preview}
                  />
                )}
              </Form.Field> */}

              <Form.Input
                label="Survey Name"
                name="name"
                placeholder="Enter Survey Name..."
                onChange={this.handleChange}
              />
              <Form.TextArea
                label="Survey Description"
                name="description"
                placeholder="Enter Survey Description....."
                onChange={this.handleChange}
              />
              <Form.Input
                type="number"
                label="Question Number"
                name="questionNo"
                value={questions.length}
                placeholder="Enter Question Number..."
              />

              <Button animated color={color} loading={loading}>
                <Button.Content visible>Create!</Button.Content>
                <Button.Content hidden>
                  <Icon name="add" />
                </Button.Content>
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default QuestionnaireForm;
