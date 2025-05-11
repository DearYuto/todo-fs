import './App.css';
import { add } from './lib/add';
import { addItem, sumOfSquaredEvens } from './lib/arr';
import { isEven } from './lib/isEven';
import { multiply } from './lib/multiply';
import { updateUserName } from './lib/obj';

function App() {
  console.log(`순수 함수 add : ${add(1, 1)}`);
  console.log(`순수 함수 multiply : ${multiply(2, 2)}`);
  console.log(`순수 함수 isEven : ${isEven(2)}`);

  const user = {
    name: 'Elie',
    age: 15,
  };

  const newUser = updateUserName(user, 'Alice');
  console.log(
    `원본 유저 객체 이름: ${user.name}, 신규 유저 객체: ${newUser.name}`
  );

  const numberList = [1, 2, 3, 4];
  const newNumberList = addItem(numberList, 5);

  console.log(
    `기존 배열: ${numberList}, 신규 요소를 추가한 새 배열 ${newNumberList}`
  );

  const numbers = [1, 2, 4];
  const sumResult = sumOfSquaredEvens(numbers);
  console.log(sumResult);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
