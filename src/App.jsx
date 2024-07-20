import { useEffect, useState } from "react"
import Animals from "./Components/Animals";

function App() {

  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, [])

  const search = async (q) => {
    const response = await fetch('http://localhost:8080?' + new URLSearchParams({q}));
    const data = await response.json();
    setAnimals(data)

    localStorage.setItem('lastQuery', q)
  }

  return (
    <main>
      <h1>Animal Farm</h1>
      <input type="text" placeholder="Search" onChange={(e) => search(e.target.value)}/>

      <ul>
        {animals.map((animal) => (
          <Animals key={animal.id} type={animal.type} name={animal.name} age={animal.age}/>
        ))}

        {animals.length === 0 && 'No Animals Found'}
      </ul>
    </main>
  )
}

export default App
