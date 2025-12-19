import './App.css';
import { add } from './lib/mission1/add';
import { addItem, sumOfSquaredEvens } from './lib/mission1/arr';
import { multiply } from './lib/mission1/multiply';
import { isEven } from './lib/mission1/isEven';
import { updateUserName } from './lib/mission1/obj';
import { withLogging } from './lib/mission2/2-1/withLogging';
import { curry } from './lib/mission2/2-2/curry';
import { pipe } from './lib/mission2/2-3/pipe';

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

  /**
   * 미션 2
   */
  const double = (x: number) => x * 2;
  const loggedDouble = withLogging(double);
  loggedDouble(5);

  const toUpper = (name: string) => name.toUpperCase();
  const loggedToUpper = withLogging(toUpper);
  loggedToUpper('yuto');

  const loggedIsEven = withLogging(isEven);
  loggedIsEven(2);

  /**
   * 미션 2-2 커링
   */

  const curryResult = curry((a: number, b: number, c: number) => a + b + c);

  console.log(curryResult(2)(3)(5));

  /**
   * 미션 2-3 pipe
   */

  const add1 = (n: number) => n + 1;
  const square = (n: number) => n * n;

  const pipeline = pipe(add1, double, square);
  console.log(`[pipe] ${pipeline(2)}`);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
