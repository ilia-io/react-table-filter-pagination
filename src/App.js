import { useState } from 'react';
import './App.scss';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import Filter from './components/Filter';
import Dropdown from './components/Dropdown';

const columns = [
  { name: 'дата' },
  { name: 'название' },
  { name: 'количество' },
  { name: 'дистанция' },
];

const condition = [
  { name: 'содержит' },
  { name: '=' },
  { name: '>' },
  { name: '<' },
];

const PRODUCTS = [];

function createRandomItem() {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.recent(360),
    name: faker.commerce.productName(),
    amount: faker.datatype.number(100),
    distance: faker.datatype.number(900000),
  };
}

Array.from({ length: 40 }).forEach(() => {
  PRODUCTS.push(createRandomItem());
});

function App() {
  const [items, setItems] = useState(PRODUCTS);
  const [sorted, setSorted] = useState({ sorted: 'name', reversed: false });
  const [searchText, setSearchText] = useState('');
  const [columnState, setColumnState] = useState(columns[0].name);
  const [conditionState, setConditionState] = useState(condition[0].name);
  const [conditionInput, setConditionInput] = useState('');

  function filterItems() {
    const input = conditionInput.trim();
    if (conditionState === '=') {
      const filteredItems = PRODUCTS.filter((item) => {
        console.log(item.amount, input);
        return columnState === 'дата'
          ? item.date.setHours(0, 0, 0, 0) === compareDate(input).getTime()
          : columnState === 'название'
          ? item.name.toLowerCase() === input.trim().toLowerCase()
          : columnState === 'количество'
          ? item.amount == input
          : item.distance == input;
      });
      setItems(filteredItems);
    } else if (conditionState === '>') {
      const filteredItems = PRODUCTS.filter((item) => {
        return columnState === 'дата'
          ? item.date.setHours(0, 0, 0, 0) > compareDate(input).getTime()
          : columnState === 'название'
          ? item.name.toLowerCase() > input.toLowerCase()
          : columnState === 'количество'
          ? item.amount > input
          : item.distance > input;
      });
      setItems(filteredItems);
    } else if (conditionState === '<') {
      const filteredItems = PRODUCTS.filter((item) => {
        return columnState === 'дата'
          ? item.date.setHours(0, 0, 0, 0) < compareDate(input).getTime()
          : columnState === 'название'
          ? item.name.toLowerCase() < input.toLowerCase()
          : columnState === 'количество'
          ? item.amount < input
          : item.distance < input;
      });
      setItems(filteredItems);
    } else if (conditionState === 'содержит') {
      const filteredItems = PRODUCTS.filter((item) => {
        return columnState === 'дата'
          ? item.date
              .toLocaleDateString()
              .toLowerCase()
              .includes(input.toLowerCase())
          : columnState === 'название'
          ? item.name.toLowerCase().includes(input.toLowerCase())
          : columnState === 'количество'
          ? item.amount.toString().toLowerCase().includes(input.toLowerCase())
          : item.distance
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
      });
      setItems(filteredItems);
    }
  }

  function compareDate(value) {
    const dt = parseInt(value.substring(0, 2));
    const mon = parseInt(value.substring(3, 5));
    const yr = parseInt(value.substring(6, 10));
    const date = new Date(yr, mon - 1, dt);
    return date;
  }

  const sortByName = () => {
    const itemsCopy = [...items];
    itemsCopy.sort((itemA, itemB) => {
      const fullNameA = itemA.name;
      const fullNameB = itemB.name;
      if (sorted.reversed) {
        return fullNameB.localeCompare(fullNameA);
      }
      return fullNameA.localeCompare(fullNameB);
    });
    setItems(itemsCopy);
    setSorted({ sorted: 'name', reversed: !sorted.reversed });
  };

  const sortByAmount = () => {
    const itemsCopy = [...items];
    itemsCopy.sort((itemA, itemB) => {
      if (sorted.reversed) {
        return itemA.amount - itemB.amount;
      }
      return itemB.amount - itemA.amount;
    });
    setItems(itemsCopy);
    setSorted({ sorted: 'amount', reversed: !sorted.reversed });
  };

  const sortByDistance = () => {
    const itemsCopy = [...items];
    itemsCopy.sort((itemA, itemB) => {
      if (sorted.reversed) {
        return itemA.distance - itemB.distance;
      }
      return itemB.distance - itemA.distance;
    });
    setItems(itemsCopy);
    setSorted({ sorted: 'distance', reversed: !sorted.reversed });
  };

  const search = (event) => {
    const matchedItems = PRODUCTS.filter((item) => {
      return `${item.date}${item.name}${item.amount}${item.distance}`
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setItems(matchedItems);
    setSearchText(event.target.value);
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
      <h2>Фильтрация</h2>
      <div className="filter-container">
        <Dropdown
          columns={columns}
          condition={condition}
          columnState={columnState}
          conditionState={conditionState}
          setColumnState={setColumnState}
          setConditionState={setConditionState}
        />
        <Filter
          title={'conditionInput'}
          placeholder={'Введите значение...'}
          items={[...items]}
          conditionInput={conditionInput}
          setConditionInput={setConditionInput}
        />
        <button onClick={filterItems} type="button">
          Фильтр
        </button>

        <button onClick={() => setItems(PRODUCTS)} type="button">
          Сброс
        </button>
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
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.date.toLocaleDateString()}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
