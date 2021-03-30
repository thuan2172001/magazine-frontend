import React from "react";

export function HeaderCheckbox({isChecked, onChange}: any) {
    return (
        <label className="checkbox checkbox-lg checkbox-single">
            <input type="checkbox" checked={isChecked} onChange={onChange}/>
            <span/>
        </label>
    );
}