import { useEffect, useState } from 'react';
import './App.css';

export const App = () => {

  const [gifs, setGifs] = useState([])

  const mainUrl = "https://api.giphy.com/v1/gifs/search";
  const apiKey = "?api_key=dK7mx9PWkyBS24yv9rjBECWzgNg21ni2";
  const [query, setQuery] = useState("software")

  const getGifs = () => {

    let url = mainUrl + apiKey + "&q=" + query + "&limit=10"
    fetch( url )
    .then( resp => resp.json())
    .then( data => setGifs(data.data))

  }

  useEffect(() => {

    getGifs();

  }, [query])

  const handleInput = ( {target} ) => {

    setQuery(target.value);
  } 

  const lightON = ( {target} ) => {
    target.nextElementSibling.src = "https://cdn-icons-png.flaticon.com/512/702/702797.png";

  }

  const lightOFF = ( {target} ) => {
    target.nextElementSibling.src = "https://cdn-icons-png.flaticon.com/512/702/702814.png";

  }


  return (
    <>
    <header>
      <h1>Práctica para el consumo de  
      <a href='https://giphy.com/' target="blank">
        <span className='letter_move letter_G'> G</span>
        <span className='letter_move letter_I'>I</span>
        <span className='letter_move letter_P'>P</span>
        <span className='letter_move letter_H'>H</span>
        <span className='letter_move letter_Y'>Y</span>
      </a>
      </h1>
      <div className='div__input'><input onBlur={lightOFF} onFocus={lightON} onChange={handleInput} type="text" placeholder='¿En qué estas pensando?' /><img alt='light' src='https://cdn-icons-png.flaticon.com/512/702/702814.png' /></div>
      
    </header>
    <div className='gifs'>
      {
        gifs.map( gif => (
          <img key={gif.images.id} src={gif.images.downsized.url} alt={gif.images.id} />
        ))
      }
      {
        (!query) && <p>¡Type something good!<br/></p>
      }
    </div>
    </>
  )
}
