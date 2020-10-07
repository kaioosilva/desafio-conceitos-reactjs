import React, { useState, useEffect} from "react";
import "./styles.css";
import api from './services/api'

function App() {

  const [repositories , setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {

      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    try{
      const result = await api.post('repositories', {
        title: "Desafio ReactJS",
        url: "https://github.com/kaioosilva/desafio-conceitos-node",
        techs: ["Reac Native", "ReactJs", "VueJS"]
      });

      setRepositories([...repositories, result.data]);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemoveRepository(id) {
      try{
        await api.delete(`repositories/${id}`);
        setRepositories(repositories.filter(
          repository => repository.id != id
        ));
      } catch(e) {
        console.log(e);
      }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
