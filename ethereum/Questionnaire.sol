pragma solidity ^0.4.17;

contract QuestionnaireFactory {
    address[] public deployedQuestionnaires;

    function createQuestionnaire(uint minimum) public {
        address newQuestionnaire = new Questionnaire(minimum, msg.sender);
        deployedQuestionnaires.push(newQuestionnaire);
    }

    function getDeployedQuestionnaires() public view returns (address[]) {
        return deployedQuestionnaires;
    }
}

contract Questionnaire{
    address public manager;
    uint public minimumContribution;
    
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum,address creator) public{
        manager=creator;
        minimumContribution=minimum;
    }
    
    function contribute() public payable{
        require(msg.value>minimumContribution);
        
    }
    function payUser(address user,uint value) public restricted{
        user.transfer(value);
    }
    function getSummary() public view returns(uint,uint,address){
        return(
            minimumContribution,
            address(this).balance,
            manager
        );
    }
    
}