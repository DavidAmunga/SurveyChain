import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import QuestionnaireList from "../questionnaire/QuestionnaireList";
import sampleData from "../../app/data/sampleData";
import firebase from "../../app/config/firebase";

class Dashboard extends Component {


  componentDidMount = async () => {
    const db = firebase.firestore();
    db.collection("questionnaires")
      .get()
      .then(querySnapshot => {
        let questionnaires = [];
        querySnapshot.forEach(doc => {
          
          let q={...doc.data(),contractId:doc.id};
          questionnaires.push(q);
        });

        this.setState({ list: questionnaires });
      });
  };

  state={
      list:[]
  }

  render() {
    const { list } = this.state;
  
    return (
      <div>
        <Grid>
          <Grid.Column width={16}>
            <QuestionnaireList list={list} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default Dashboard;
