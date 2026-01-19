import './App.css';
import { range } from './lib/mission5/5-1/range';
import { take2 } from './lib/mission5/5-2/take';
import { lazyFilter } from './lib/mission5/5-3/lazyFilter';

function App() {
  const evens = lazyFilter(range(1, 100), (n) => n % 2 === 0);
  const first5Evens = [...take2(evens, 5)];
  console.log(first5Evens); // [2, 4, 6, 8, 10]

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
