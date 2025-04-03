import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstThreeWords}?size=&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

function App() {

  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  //Para recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  //Para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const firstThreeWords = fact.split(' ', 3).join(' ')

        fetch(`https://cataas.com/cat/says/${firstThreeWords}?size=&color=red&json=true`)
          .then(res => res.json())
          .then(response => {
            const { url } = response
            setImageUrl(url)
          })
  }, [fact])

  return (
    <main>
      <h1>Cats app</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words of the fact: ${fact}`} />}
    </main>
  )
}

export default App
