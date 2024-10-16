import './App.css';
import DispositionHandler from './utilities/DispositionHandler';
import { X, LogOut } from 'react-feather';
import { LoopCircleLoading } from 'react-loadingg';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session', {withCredentials: true}).then(({data}) => {
      setAuth(data);
    });
  }, []);

  if (auth === null) {
    return (
      <div className="App">
          <header className="App-header">
              <LoopCircleLoading/>
          </header>
          {dialerElement(true)}
      </div>
    );
  }
  if (auth) {
    DispositionHandler.storeDispositions();
    return (
      <div className="App">
        <header className="App-header">
        </header>
        {dialerElement(false)}
      </div>
    );
  }
  return(
    <div className="App">
      <header className="App-header">
          <p>
              Please sign in to use the dialer
          </p>
          <a
              className="App-link"
              href={"/auth/login"}
          >
              <button className="Login-button">
                Login with HubSpot
              </button>
          </a>
      </header>
      {dialerElement(true)}
    </div>
  )
}

export default App;
