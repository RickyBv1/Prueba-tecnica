import { useEffect, useState } from "react";
import "./App.css";
import getRandomFact from "./services/facts";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstThreeWords}?size=&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  //Para recuperar la cita al cargar la pagina
  useEffect(() => {
    getRandomFact().then(setFact);
  }, []);

  //Para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;

    const firstThreeWords = fact.split(" ", 3).join(" ");

    fetch(
      `https://cataas.com/cat/says/${firstThreeWords}?size=&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  const handleClick = async () => {
    const newFact = await getRandomFact();
    setFact(newFact);
  };

  return (
    <main>
      <h1>Cats app</h1>
      <button onClick={handleClick}>Get a new fact!</button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`Image extracted using the first three words of the fact: ${fact}`}
        />
      )}
    </main>
  );
}

export default App;
