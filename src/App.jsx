import "./App.css";
import { useCatImage } from "./hooks/useCatImage.js";
import { useCatFact } from "./hooks/useCatFact.js";

function App() {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  const handleClick = async () => {
    refreshFact();
  };

  return (
    <main>
      <h1>Cats app</h1>
      <button onClick={handleClick}>Get a new fact!</button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img id="cat-image"
          src={`${imageUrl}`}
          alt={`Image extracted using the first three words of the fact: ${fact}`}
        />
      )}
    </main>
  );
}

export default App;
