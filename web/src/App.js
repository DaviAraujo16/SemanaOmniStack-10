import React, {useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

import DevForm from './components/DevForm/index';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, [])

  async function handleAddDev(data){
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data]);
  }


  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev =>(
            <li key={dev._id} className="dev-item">
                <header>
                    <img src={dev.avatar_url} alt={dev.name}/>
                    <div className="user-info">
                        <strong>{dev.name}</strong>
                        <span>{dev.techs.join(', ')}</span>
                    </div>
                </header>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}


export default App;
