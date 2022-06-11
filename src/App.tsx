import React from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from './dexie';
import { useLiveQuery } from "dexie-react-hooks"; // Dexie.jsのReact用Hooks

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <AddButton/>
        <ClearButton/>
        <GetAll/>
      </header>
    </div>
  );
}

function AddButton() {
  const count = 999;
  return <span className="addButton" onClick={addData}>Add Data</span>
}

function ClearButton() {
  const count = 999;
  return <span className="clearButton" onClick={clearData}>Clear Data</span>
}


function GetAll() {
  const contents = useLiveQuery(
    () => db.contacts.toArray()
  ) || [];
  return (
    <span className="testGet">
      {contents.map((contents) => (
        <p key={contents.first}>
          {contents.id}: {contents.first}: {contents.last}
        </p>
      ))}
    </span>
  )
  
}

function addData() {
  db.contacts.put({first: "First name", last: "Last name"});
  // db.table("contacts").put({first: "First name", last: "Last name"});
}

function clearData() {
  db.contacts.clear();
  // db.table("contacts").put({first: "First name", last: "Last name"});
}

export default App;
