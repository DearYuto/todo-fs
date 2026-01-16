import './App.css';
import { range } from './lib/mission5/5-1/range';
import { take } from './lib/mission5/5-2/take';

function App() {
  /**
   * 5-2
   */
  const numbers = range(1, Infinity); // 무한 수열
  console.log(numbers);
  const first5 = [...take(numbers, 5)];

  console.log(first5); // [1, 2, 3, 4, 5]

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
