import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({});
  const [newUser, setNewUser] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(data => setUsers(data));
  }, []);

  function addUser() {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        "name": newUser.name,
        "username": "shin",
        "email": newUser.email,
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    }).then(res => res.json()).then(data => setUsers([...users, data]));
    setNewUser({
      name: '',
      email: ''
    });
  }

  function editUserDetails(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...editUser,
        name: editUser.name,
        email: editUser.email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => setUsers(users.map(user => {
        if (user.id === data.id) return data;
        return user;
      })));
    setEditUser({});
  }

  function deleteUser(user) {
    let filteredUsers = users.filter((_, index) => index !== user);
    setUsers(filteredUsers);
  }

  return (
    <>
      <h1>Contacts Management App</h1>
      <div className="flex-container">
        <form onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}>
          <h2>Add new user</h2>
          <label>Name:
            <input type="text" required value={newUser.name} onChange={(e) => setNewUser({
            ...newUser,
            name: e.target.value
          })} />
          </label>
          <br />
          <label>Email :
            <input type="email" required value={newUser.email} onChange={(e) => setNewUser({
            ...newUser,
            email: e.target.value
          })} />
          </label>
          <br />
          <button style={{ marginLeft: '85px', backgroundColor: "#61dafb" }}>Create new user</button>
        </form>
      </div>
      <div className="flex-container">
        {users.map((user, index) => {
          return (
            <div key={index}>
              {user.id === editUser.id ? <input
                type="text"
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                value={editUser.name} /> :
                <div style={{ fontSize: "20px" }}><strong>{user.name}</strong></div>}
              {user.id === editUser.id ? <input
                type="text"
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                value={editUser.email} /> :
                <div>{user.email}</div>}
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {user.id === editUser.id ? <button onClick={() => editUserDetails(user.id)}>Save</button> : <button onClick={() => setEditUser(user)}>Edit Details</button>}
                {user.id === editUser.id ? <button onClick={() => setEditUser({})}>Cancel</button> : <button onClick={() => deleteUser(index)}>Delete User</button>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
