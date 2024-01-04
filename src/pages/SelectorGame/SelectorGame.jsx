import React, { useEffect } from 'react'
import './selectorGame.css'
import { useNavigate } from 'react-router-dom'

const SelectorGame = ({games}) => {
    const [game, setGame] = React.useState(games[0])

    const navegation = useNavigate()


  return (
    <div className='selector'>
      <div className='interiorTV'>
        <div className='headerRojo'>
          <h3>Menu</h3>
        </div>
        <div className='contentTv'>  
            {
              games.map((gameData, i) => {
                console.log(gameData);
                const style = {
                  backgroundImage: `url(${gameData.attributes.imageJuego?.data?.attributes?.url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  cursor: 'pointer'
                }
                return (
                  <div onClick={()=>{navegation(`/${gameData.attributes.Juego}`)}} style={style} key={i} className={"gameSelect"} ><a href={`/${gameData.attributes.Juego}`}>{gameData.attributes.Juego}</a></div>
                )
              })
            }
          {/* <div className='infoGame'>
            {game?.attributes?.imageJuego !== undefined &&  <img src={`${game.attributes?.imageJuego?.data?.attributes?.url}`} alt=""/> }
            <div className={'imgJuego '+"-game"}/>
            <div className='infoGameText'>
              <p>{game?.attributes?.description}</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SelectorGame