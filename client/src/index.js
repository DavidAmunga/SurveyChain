import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/app/layout/App';
import registerServiceWorker from './registerServiceWorker';

const root=document.getElementById('root');

ReactDOM.render(

    <BrowserRouter>
        <App />
    </BrowserRouter>

,root);


// if (module.hot) {
//     module.hot.accept('./components/app/layout/App', () => {
//         setTimeout(render);
//     });
// }

registerServiceWorker();
