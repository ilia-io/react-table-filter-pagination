import React from 'react';

const Dropdown = ({
  columns,
  condition,
  columnState,
  conditionState,
  setColumnState,
  setConditionState,
}) => {
  return (
    <>
      <label htmlFor={`${columns[0].name} drop-select`}>
      </label>
      <select
        onChange={(e) => setColumnState(e.target.value)}
        value={columnState}
        id={`${columns[0].name} drop-select`}
      >
        {columns.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <label htmlFor={`${condition[0].name} drop-select`}>
      </label>
      <select
        onChange={(e) => setConditionState(e.target.value)}
        value={conditionState}
        id={`${condition[0].name} drop-select`}
      >
        {condition.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
