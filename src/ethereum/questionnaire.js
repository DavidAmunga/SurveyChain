import web3 from  './web3';
import Questionnaire from './build/Questionnaire.json';

export default (address)=>{
    return (new web3.eth.Contract(JSON.parse(Questionnaire.interface)
    ,address));
};

