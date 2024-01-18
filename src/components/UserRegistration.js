import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserRegistration = () => {
  const [userName, setUserName] = useState('');
  const [parentUserId, setParentUserId] = useState('');
  const [parentUsers, setParentUsers] = useState([]);

  useEffect(() => {
    const fetchParentUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/parentUsers');
        setParentUsers(response.data);
      } catch (error) {
        console.error(error.response.data.error);
      }
    };

    fetchParentUsers();
  }, []);

  const handleRegister = async () => {
    try {
      if (parentUserId) {
        const response = await axios.get(`http://localhost:8000/api/parentUsers/${parentUserId}`);

        if (response.data.downline.length >= 4) {
          alert('Parent user cannot have more than 4 users.');
          return;
        }
      }

      await axios.post('http://localhost:8000/api/register', { userName, parentUserId });
      alert('User registered successfully!');
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <select onChange={(e) => setParentUserId(e.target.value)}>
        <option value="">Select a parent user</option>
        {parentUsers.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default UserRegistration;
