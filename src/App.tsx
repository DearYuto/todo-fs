import './App.css';
import { range } from './lib/mission5/range';

function App() {
  /**
   * 5-1
   */

  for (const n of range(1, 5)) {
    console.log(n); // 1, 2, 3, 4
  }

  // 배열로 변환
  const arr = [...range(0, 10)];
  console.log(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
