import React, { Component } from "react";


class HomePage extends Component {
  
  render() {
    const {history}=this.props;
    return (
      
        <div>
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui inverted stackable header">
              {/* <img
                src="/assets/images/logo-large.png"
                alt="logo"
               
              /> */}
              <div className="content" style={{display:'block'}}>NyumbaKumi</div>
            </h1>
            <h2>Blockchain Questionnaire</h2>
            <div onClick={()=>history.push('/home')} className="ui huge white inverted button">
              Get Started
              <i className="right arrow icon" />
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}
export default HomePage;
