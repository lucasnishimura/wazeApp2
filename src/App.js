import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

// Component   = fun��o que retorna conte�do
// Propriedade = atributo
// Estado      = Informa��o que vai ser lida pelo component (ou mantida pelo component)

//useEffect = Executa uma fun��o a partir da variavel que eu defini no segundo parametro, se quiser apenas uma unica vez, o segundo parametro precisa ser um array vazio
function App() {
  const [devs, setDevs] = useState([]);

  useEffect(()=>{
     async function loadDevs(){
       const response = await api.get('/devs');

       setDevs(response.data); 
     }

     loadDevs();
  }, []);
  
  async function handleAddDev(data){
    const response = await api.post('/devs', data)
    
    setDevs([...devs, response.data]); 
  }

  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
          <ul>          
            {devs.map(dev =>(
              <DevItem key={dev._id} dev={dev} />
            ))} 

          </ul>
      </main>
    </div>
  );
}

export default App;
