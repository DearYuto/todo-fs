import './App.css';
import { partition } from './lib/mission4/4-4/partition';

function App() {
  /**
   * 4-4
   */

  const numbers = [1, 2, 3, 4, 5, 6];
  const [evens, odds] = partition(numbers, (n) => n % 2 === 0);
  console.log(evens); // [2, 4, 6]
  console.log(odds); // [1, 3, 5]
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
