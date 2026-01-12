import './App.css';
import { filterWithReduce } from './lib/mission4/4-2/filterWithReduce';

function App() {
  /**
   * 4-2
   */
  const numbers = [1, 2, 3, 4, 5, 6];
  const evens = filterWithReduce(numbers, (n) => n % 2 === 0);
  console.log(evens); // [2, 4, 6]
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
