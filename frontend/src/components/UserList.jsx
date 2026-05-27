import React from 'react';

function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <h2>Users List</h2>
      
      {users.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No users found. Add some above!</p>
      ) : (
        users.map((user) => (
          <div className="user-card" key={user._id}>
            <div className="user-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
            </div>
            
            <div className="actions">
              <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;
