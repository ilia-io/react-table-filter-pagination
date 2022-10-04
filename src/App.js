import { useState } from 'react';
import './App.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const USERS = [];

function createRandomUser() {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.recent(180).toLocaleDateString(),
    name: faker.commerce.productName(),
    amount: faker.datatype.number(100),
    distance: faker.datatype.number(),
  };
}

Array.from({ length: 40 }).forEach(() => {
  USERS.push(createRandomUser());
});

function App() {
  const [users, setUsers] = useState(USERS);
  const [sorted, setSorted] = useState({ sorted: 'name', reversed: false });
  const [searchText, setSearchText] = useState('');

  const sortByName = () => {
    const usersCopy = [...users];
    usersCopy.sort((userA, userB) => {
      const fullNameA = userA.name;
      const fullNameB = userB.name;
      if (sorted.reversed) {
        return fullNameB.localeCompare(fullNameA);
      }
      return fullNameA.localeCompare(fullNameB);
    });
    setUsers(usersCopy);
    setSorted({ sorted: 'name', reversed: !sorted.reversed });
  };

  const sortByAmount = () => {
    const usersCopy = [...users];
    usersCopy.sort((userA, userB) => {
      if (sorted.reversed) {
        return userA.amount - userB.amount;
      }
      return userB.amount - userA.amount;
    });
    setUsers(usersCopy);
    setSorted({ sorted: 'amount', reversed: !sorted.reversed });
  };

  const sortByDistance = () => {
    const usersCopy = [...users];
    usersCopy.sort((userA, userB) => {
      if (sorted.reversed) {
        return userA.distance - userB.distance;
      }
      return userB.distance - userA.distance;
    });
    setUsers(usersCopy);
    setSorted({ sorted: 'distance', reversed: !sorted.reversed });
  };

  const search = (event) => {
    const matchedUsers = USERS.filter((user) => {
      return `${user.date}${user.name}${user.amount}${user.distance}`
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setUsers(matchedUsers);
    setSearchText(event.target.value);
  };

  const renderUsers = () => {
    return users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.date}</td>
          <td>{user.name}</td>
          <td>{user.amount}</td>
          <td>{user.distance}</td>
        </tr>
      );
    });
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchText}
          onChange={search}
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <span>Дата</span>
              </th>
              <th onClick={sortByName}>
                <span style={{ marginRight: 10 }}>Название</span>
                {sorted.sorted === 'name' ? renderArrow() : null}
              </th>
              <th onClick={sortByAmount}>
                <span style={{ marginRight: 10 }}>Количество</span>
                {sorted.sorted === 'amount' ? renderArrow() : null}
              </th>
              <th onClick={sortByDistance}>
                <span style={{ marginRight: 10 }}>Дистанция</span>
                {sorted.sorted === 'distance' ? renderArrow() : null}
              </th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
