import React, { useState, useEffect } from 'react';

function UserForm({ onSave, currentUser, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setAge(currentUser.age);
    } else {
      setName('');
      setEmail('');
      setAge('');
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email, age });
    
    if (!currentUser) {
      setName('');
      setEmail('');
      setAge('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentUser ? 'Edit User' : 'Add New User'}</h2>
      
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      
      <button type="submit">
        {currentUser ? 'Update User' : 'Save User'}
      </button>
      
      {currentUser && (
        <button 
          type="button" 
          onClick={onCancel} 
          style={{ backgroundColor: '#6c757d', marginTop: '5px' }}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default UserForm;
