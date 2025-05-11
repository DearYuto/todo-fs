import './App.css';
import { add } from './lib/add';
import { isEven } from './lib/isEven';
import { multiply } from './lib/multiply';
import { updateUserName } from './lib/obj';

function App() {
  console.log(`순수 함수 add : ${add(1, 1)}`);
  console.log(`순수 함수 add : ${add(1, 1)}`);

  console.log(`순수 함수 multiply : ${multiply(1, 2)}`);
  console.log(`순수 함수 multiply : ${multiply(2, 2)}`);

  console.log(`순수 함수 isEven : ${isEven(1)}`);
  console.log(`순수 함수 isEven : ${isEven(2)}`);

  const user = {
    name: 'Elie',
    age: 15,
  };

  console.log(updateUserName(user, 'Alice'));

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
