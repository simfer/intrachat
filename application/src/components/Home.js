import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        socket.emit('newUser', { userName, socketID: socket.id });
        navigate('/chat');
    };
    return (
        <form className="home__container" onSubmit={handleSubmit}>
            <h2 className="home__header">Inserisci il tuo nome utente</h2>
            <label htmlFor="username">Nome utente</label>
            <input
                type="text"
                minLength={6}
                name="username"
                id="username"
                className="username__input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button className="home__cta">ACCEDI</button>
        </form>
    );
};

export default Home;