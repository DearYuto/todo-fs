import './App.css';
import { add } from './lib/mission1/add';
import { addItem, sumOfSquaredEvens } from './lib/mission1/arr';
import { isEven } from './lib/mission1/isEven';
import { multiply } from './lib/mission1/multiply';
import { updateUserName } from './lib/mission1/obj';
import { withLogging } from './lib/mission2/withLogging';

function App() {
  /** 미션 1 */
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

  /** 미션 2 */
  console.log('====== 미션 2-1 고차함수 만들기 =======');

  const double = (x: number) => x * 2;
  const loggedDouble = withLogging(double);
  loggedDouble(5);

  console.log('====== 미션 2-1 여러 타입의 함수에 적용 =======');

  const sayHello = (name: string) => `Hi, ${name}!`;
  withLogging(sayHello);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
