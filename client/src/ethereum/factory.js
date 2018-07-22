import web3 from './web3';
import QuestionnaireFactory from  './build/QuestionnaireFactory.json';

const instance=new web3.eth.Contract
(JSON.parse(QuestionnaireFactory.interface),'0xb99C9f6B2270B1Be011f2D453d8352c4a080FC5e');

export default instance;
