import React from "react";

export const DropdownTopbarItemToggler = React.forwardRef((props: any, ref: any) => {
    return (
        <div
            ref={ref}
            className="topbar-item"
            onClick={e => {
                e.preventDefault();
                props.onClick(e);
            }}
        >
            {props.children}
        </div>
    );
});

DropdownTopbarItemToggler.displayName = 'DropdownTopbarItemToggler';
