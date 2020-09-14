import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [name, setName] = useState('');
  const config = {
    method: 'get',
    url: 'http://localhost:7001/users',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };

  useEffect(() => {
    axios(config)
      .then((response) => {
        setName(response.data.name);
      })
      .catch(() => {
        window.location.href = '/Login';
      })
      .then(() => {
      });
  });

  const logout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/logout';
  };
  return (
    <div>
      <title>A Dashboard</title>
      <h1>
        You are
        {name}
        !  <button type="button" onClick={logout}>Logout</button>
      </h1>
      <img src="https://media.giphy.com/media/j6aoUHK5YiJEc/source.gif" alt="image" />
    </div>
  );
}

export default Dashboard;
