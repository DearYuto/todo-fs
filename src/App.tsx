import './App.css';
import { add } from './lib/add';
import { multiply } from './lib/multiply';

function App() {
  console.log(`순수 함수 add : ${add(1, 1)}`);
  console.log(`순수 함수 add : ${add(1, 1)}`);

  console.log(`순수 함수 multiply : ${multiply(1, 2)}`);
  console.log(`순수 함수 multiply : ${multiply(2, 2)}`);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
