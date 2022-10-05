import React from 'react';

const Filter = ({
  title,
  placeholder,
  items,
  conditionInput,
  setConditionInput,
}) => {
  return (
    <div className="filter">
      <input
        list={title}
        onChange={(e) => setConditionInput(e.target.value)}
        placeholder={placeholder}
        value={conditionInput}
      />
      <datalist id={title}>
        {items.map((option, index) => (
          <option key={index}>{option.name}</option>
        ))}
      </datalist>
    </div>
  );
};

export default Filter;
