import React, { useState, useEffect } from 'react';
import "./App5.css";

const SearchComponent = () => {
  // Set up state for users and search term
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Mock data for demonstration
  useEffect(() => {
    // Fetch users or set them from some data source
    const mockUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Bob Johnson' }
    ];
    setUsers(mockUsers);
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle input change
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  // Render the component
  return (
    <div>
     
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="80" height="30">
        <path fill="#7ED957" d="M224 512c35.3 0 64-28.7 64-64H160c0 35.4 28.7 64 64 64zm215.4-149.7c-19.3-20.8-55.5-52-55.5-154.3 0-77.7-54.5-139.9-127.9-155.2V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v20.8C118.6 68.1 64.1 130.3 64.1 208c0 102.3-36.2 133.5-55.5 154.3-6 6.5-8.7 14.2-8.6 21.7 .1 16.4 13 32 32.1 32h383.8c19.1 0 32-15.6 32.1-32 .1-7.6-2.6-15.3-8.6-21.7z"/>
        </svg>

    <input
    value={search}
    type="text"
    placeholder="Cargo"
    className="form-control rounded-pill" 
    onChange={handleInputChange}
    style={{ marginRight: '10px' }}
    />


    <input
    value={search}
    type="text"
    placeholder="Lugar"
    className="form-control rounded-pill" 
    onChange={handleInputChange}
    style={{ marginRight: '10px' }}
    />

    <button  className="boton2" type="submit"  >Buscar</button>
     
    </div>
  );
};

export default SearchComponent;
