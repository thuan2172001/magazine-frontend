import React from 'react';

export function Checkbox({ isSelected, onChange, children }: any) {
  return (
    <>
      <input type="checkbox" style={{ display: 'none' }} />

      <label className="checkbox checkbox-lg checkbox-single">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onChange}
          style={{ backgroundColor: 'red', color: 'red' }}
        />

        {children}
        <span />
      </label>
    </>
  );
}
