import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import IsNotConnectedApp from './page/IsNotConnectedApp';
import IsConnectedApp from './page/IsConnectedApp';
import Welcome from './components/Welcome';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/auth' component={IsNotConnectedApp} />
          <Route path='/v1' component={IsConnectedApp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
