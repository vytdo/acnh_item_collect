import React, { useState, useEffect } from 'react';
import '../styles/BugList.css';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [collectedBugsCount, setCollectedBugsCount] = useState(
    JSON.parse(localStorage.getItem('collectedBugsCount')) || 0
  );
  const [showCheckedBugs, setShowCheckedBugs] = useState(false);
  const [showUncheckedBugs, setShowUncheckedBugs] = useState(false);

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

  const handleShowCheckedBugs = () => {
    setShowCheckedBugs(!showCheckedBugs);
    setShowUncheckedBugs(false);
  };

  const handleShowUncheckedBugs = () => {
    setShowUncheckedBugs(!showUncheckedBugs);
    setShowCheckedBugs(false);
  };

  return (
    <div>
      <h2>Bugs</h2>
      <button onClick={handleShowCheckedBugs}>
        {showCheckedBugs ? 'Show All Bugs' : 'Show Only Checked Bugs'}
      </button>
      <button onClick={handleShowUncheckedBugs}>
        {showUncheckedBugs ? 'Show All Bugs' : 'Show Only Unchecked Bugs'}
      </button>
      <p>Total Bugs: {Object.keys(bugs).length}</p>
      <p>Collected Bugs: {collectedBugsCount}</p>
      {Object.keys(bugs).length ? (
        <div className="bug-container">
          {Object.keys(bugs).map((key, index) => {
            if (
              (!showCheckedBugs && !showUncheckedBugs) ||
              (showCheckedBugs && initialCheckedState[key]) ||
              (showUncheckedBugs && !initialCheckedState[key])
            ) {
              return (
                <div key={index} className="bug-card">
                  <input
                    type="checkbox"
                    className="checkbox"
                    defaultChecked={initialCheckedState[key] || false}
                    onChange={(e) => handleCheckboxChange(e, key)}
                  />
                  <img
                    src={bugs[key].icon_uri}
                    alt={bugs[key].name['name-USen']}
                  />
                  <p className="bug-name">{bugs[key].name['name-USen']}</p>
                  <p className="bug-price">{bugs[key].price}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BugList;
