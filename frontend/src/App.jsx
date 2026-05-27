import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const API_URL = 'http://localhost:5000/api/users';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (userData) => {
    try {
      if (currentUser) {
        await fetch(`${API_URL}/${currentUser._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
      }
      
      setCurrentUser(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });
        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h1>MERN CRUD Application</h1>
      
      <UserForm 
        onSave={handleSave} 
        currentUser={currentUser} 
        onCancel={() => setCurrentUser(null)} 
      />
      
      <UserList 
        users={users} 
        onEdit={setCurrentUser} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;
