import React, { useState, useEffect } from 'react';
import '../styles/BugList.css';

const BugList = () => {
  const [bugs, setBugs] = useState({});

  useEffect(() => {
    fetch('http://acnhapi.com/v1/bugs')
      .then((response) => response.json())
      .then((data) => setBugs(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Bugs</h2>
      {Object.keys(bugs).length ? (
        <div className="bug-container">
          {Object.keys(bugs).map((key, index) => (
            <div key={index} className="bug-card">
              <img src={bugs[key].icon_uri} alt={bugs[key].name['name-USen']} />
              <p className="bug-name">{bugs[key].name['name-USen']}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BugList;
