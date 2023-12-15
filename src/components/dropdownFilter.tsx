import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

interface dropdownItem {
  label: String;
  actions: () => {};
}
interface Props {
  dropdown_header: String;
  dropdown_item: dropdownItem[];
}

const DropdownFilter: React.FC<Props> = ({
  dropdown_header,
  dropdown_item,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="danger">{dropdown_header}</Dropdown.Toggle>
      <Dropdown.Menu> 
        {dropdown_item.map(({actions, label}) => (
          <Dropdown.Item key={label as string} onClick={() => actions}>{label}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownFilter;
