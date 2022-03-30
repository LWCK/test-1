import React from "react";

export default function ToggleDark(props) {
  return (
    <div>
      <span class="wrapper">
        <label class="switch">
          <input
            type="checkbox"
            id="checkbox-toggle"
            onClick={() => {
              props.toggleDark();
            }}
          />
        </label>
      </span>
    </div>
  );
}
