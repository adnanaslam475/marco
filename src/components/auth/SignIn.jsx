import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignIn = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    
    // Fetch the JSON file containing usernames and passwords
    const response = await fetch('../../data/users.json');
    const users = await response.json();

    // Check if the entered username and password match any of the stored usernames and passwords
    const match = users.find(user => user.username === username && user.password === password);
    if (match) {
      // If there's a match, set the authenticated user in local storage and redirect to the home page
      localStorage.setItem('currentUser', JSON.stringify(match));
      setAuthenticated(true);
      navigate('/');
    } else {
      // If there's no match, display an error message
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Accedi</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Accedi</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default SignIn;
