import './App.css';
import { add } from './lib/add';

function App() {
  console.log(add(1, 2));
  console.log(add(1, 1));

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
