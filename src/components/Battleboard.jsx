import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ id, hasShip }) {
	const [hit, /* setHit */] = useState(false)
	const [miss, /* setMiss */] = useState(false)
	/* const [currentShot, setCurrentShot] = useState(id) */
	const { player, ships, socket, thisPlayerName, setPlayerNumberOfShips, ids } = useGameContext()
	//const playerShips = [...ships]


	// const shipA = playerShips[0]
	// const shipB = playerShips[1]
	// const shipC = playerShips[2]
	// const shipD = playerShips[3]


	// // function to remove hitten object
	// const removeOneplayerShipsPos = (playerShipsArr, pos) => {
	// 	let index = playerShipsArr.toString().indexOf(pos)
	// 	playerShipsArr.position.splice(index, 1)
	// 	return
	// }

	/* const shotData = {
		player: player,
		ships: ships,
	} */

	
  /* 	const handleShotFired = (e, currentShot) => {
		e.preventDefault()
		console.log('CURRENT SHOT', currentShot)
	} */


	const handleReceiveShot = () => {
		// här inne kollar vi om det var en träff eller miss. Om det var en träff kollar vi om hela skeppet träffats eller bara en del, samt kallar på funktionen som ska uppdatera skeppens längd och visa rätt på spelplanen. 

		socket.emit('shot:result', /* data */)
	}

	socket.on('receive:shot', handleReceiveShot)

	//********** UPDATE SHIPS **********/
 	/* const handleUpdateShips = (playerNumberOfShips, opponentNumberOfShips) => {
		console.log('Got new amount of ships for player: ',playerNumberOfShips, 'opponent: ', opponentNumberOfShips) 
		setOpponentNumberOfShips(opponentNumberOfShips)
	}  */

	/* socket.on('player:ships', handleUpdateShips)   */

	useEffect(() => {

		const data = {
			player,
			ships,
		}

		socket.emit('place:ships', data, status => {
			console.log("STATUS from callback after placing ships on Player Battleboard:", status)

			if (status.success) {
				socket.emit('get-number-of-ships', ships, status => {
				console.log(`Successully got number of ships for player: ${thisPlayerName}`, status) 

				setPlayerNumberOfShips(status.numberOfShips) 
				console.log("Status on player number of ships: ", status.numberOfShips )  
				})
			}
		})
	},[ships, setPlayerNumberOfShips, player, socket, thisPlayerName])

	/* useEffect(() => {
		// listen to shot fired from server -handleShotFired 

		//ta emot från socket_controller (e.target.classname) (find?)

		socket.on('receive:hit', (data) => {

			// console.log('DATA FROM USEEFFECT: ', data)
			// console.log('playerShipsS FROM BATTLEBOARD', playerShips)
			setCurrentShot((shot) => [...shot, data])
			return
		})
	},[socket]) */

	
	

 	return (
		<div className='cell'>
			{ids && ids.map((id, i) => {
					const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return ( 
						<div className='defaultCellColor'>
							<div hasShip = {hasShip}
								className={
								hit ? 'hit' 
								: miss ? 'miss'
								: hasShip ? 'isShip'
								: 'defaultCellColor'}
								key = {i} 
								id = {id}								
							>
							</div>
						</div>
					)
				}
			)}			
		</div> 
    )
}