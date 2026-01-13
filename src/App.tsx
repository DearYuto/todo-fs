import './App.css';
import { groupBy, groupByMap } from './lib/mission4/4-3/groupBy';

function App() {
  /**
   * 4-3
   */
  const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 },
  ];

  console.log('map 사용해서 풀어봄');
  const groupedMap = groupByMap(users, (user) => user.age);
  console.dir(groupedMap.get(25));

  console.log('일반 객체로');
  const grouped = groupBy(users, (user) => user.age);
  console.log(grouped);
  // {
  //   25: [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
  //   30: [{ name: 'Bob', age: 30 }]
  // }
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
