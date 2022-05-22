import { /* useEffect */ useState } from 'react'
import { useNavigate } from 'react-router-dom'  
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useGameContext } from '../contexts/GameContextProvider'

const StartGamePage = () => {
	const [username, setUsername] = useState('')
	const { setGameUsername } = useGameContext()
	const navigate = useNavigate()

	const onHandleSubmit = e => {
		e.preventDefault()

		setGameUsername(username)

		navigate('/game')
	}

	return (
		<div className='joinGameWrapper'>
        	<div className="joinGameBox">
				<Form onSubmit={onHandleSubmit}>
					<Form.Group className="mb-3" controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control
							onChange={e => setUsername(e.target.value)}
							placeholder="Enter your username"
							required
							type="text"
							value={username}
						/>
					</Form.Group>

					<div className="d-flex justify-content-between">
						<Button 
							variant="success" 
							type="submit" 
							className="w-100" 
							disabled={!username}>
								Join Game
							</Button>
					</div>
				</Form>
				
       	 	</div>
    	</div>
	)
}

export default StartGamePage

