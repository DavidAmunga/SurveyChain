import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";

class AboutPage extends Component {
  render() {
    return (
      <Segment>
        <Header
          as="h1"
          icon="info circle"
          content="Instructions"
          textAlign="center"
        />

        <p>
          The following are instructions on getting started with NyumbaKumi
          Blockchain Questionnaire
        </p>

        <p>
          <ul>
            <li>
             
              Install Metamask on Google Chrome
              <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"> 
                here
              </a>
            </li>
            <li>Set a password and remember/save the passphrase seed word that you get.</li>
            <li>Ensure that you have selected Rinkeby from the dropdown in Metamask
                <br/>
              
            </li>
           
            <li>Get Free Rinkeby ether using <a href="https://faucet.rinkeby.io/">here</a></li>
          </ul>
        </p>
      </Segment>
      
    );
  }
}

export default AboutPage;
