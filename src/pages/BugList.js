import React, { useState, useEffect } from 'react';
import '../styles/BugList.css';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [collectedBugsCount, setCollectedBugsCount] = useState(
    JSON.parse(localStorage.getItem('collectedBugsCount')) || 0
  );

  useEffect(() => {
    localStorage.setItem(
      'collectedBugsCount',
      JSON.stringify(collectedBugsCount)
    );
    return () => {
      localStorage.setItem(
        'collectedBugsCount',
        JSON.stringify(collectedBugsCount)
      );
    };
  }, [collectedBugsCount]);

  useEffect(() => {
    fetch('http://acnhapi.com/v1/bugs')
      .then((response) => response.json())
      .then((data) => setBugs(data))
      .catch(console.error);
  }, []);

  const initialCheckedState =
    JSON.parse(localStorage.getItem('checkboxes')) || {};

  const handleCheckboxChange = (e, key) => {
    const isChecked = e.target.checked;

    // Update the state
    if (isChecked) {
      setCollectedBugsCount(collectedBugsCount + 1);
    } else {
      setCollectedBugsCount(collectedBugsCount - 1);
    }
    // Save the state in localStorage
    localStorage.setItem(
      'checkboxes',
      JSON.stringify({
        ...initialCheckedState,
        [key]: isChecked,
      })
    );
  };

  return (
    <div>
      <h2>Bugs</h2>
      <p>Total Bugs: {Object.keys(bugs).length}</p>
      <p>Collected Bugs: {collectedBugsCount}</p>
      {Object.keys(bugs).length ? (
        <div className="bug-container">
          {Object.keys(bugs).map((key, index) => (
            <div key={index} className="bug-card">
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked={initialCheckedState[key] || false}
                onChange={(e) => handleCheckboxChange(e, key)}
              />
              <img src={bugs[key].icon_uri} alt={bugs[key].name['name-USen']} />
              <p className="bug-name">{bugs[key].name['name-USen']}</p>
              <p className="bug-price">{bugs[key].price}</p>
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
