import logo from './logo.svg';
import './App.css';
import Car from './Car';
import { useState } from 'react';

function App() { //Main Component

  const [username, setUsername] = useState(null);
  const [counter, setCounter] = useState(0);

  const handClick = () => {
    setUsername('Janindu');
  }

  const increaseCounter = () => {
    setCounter(counter+1);
  }

  const decreaseCounter = () => {
    setCounter(counter-1);
  }

  return ( //JSX Output
    <div className="App">

      <h1>UserName is {username}</h1>

      <SampleComponant title="Sample Prop Title" value="25" />

      <Car model="Toyota Corolla" description="A home used vehicle"/>
      <Car model="Toyota Landcruiser"/>

      <button onClick={handClick}>Set Username</button>

      <h1>Counter: {counter}</h1>
      <button onClick={increaseCounter}>Increase</button>
      <button onClick={decreaseCounter}>Decrease</button>

    </div>
  );

}

const SampleComponant = (props) => {

  return (
    <div>
      <h1>{props.title} Value: {props.value}</h1>
    </div>
  )

}

export default App;
