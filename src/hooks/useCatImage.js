import { useEffect, useState } from "react";

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

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

  return { imageUrl };
}
