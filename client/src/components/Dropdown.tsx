import React, { Dispatch, FC, SetStateAction } from 'react';

export interface IDropdownProps {
  dropdownItems: string[];
  setSelected: Dispatch<SetStateAction<string>>;
  title: string;
}

export const Dropdown: FC<IDropdownProps> = ({
  dropdownItems,
  setSelected,
  title,
}) => {
  return (
    <select name='Skill Type' onChange={e => setSelected(e.target.value)}>
      <option selected disabled hidden>
        {title}
      </option>
      {dropdownItems.map(item => (
        <option value={item}>{item}</option>
      ))}
    </select>
  );
};
