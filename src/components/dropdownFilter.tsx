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
      <Dropdown.Header>{dropdown_header}</Dropdown.Header>
      <Dropdown.Menu>
        {dropdown_item.map((data) => (
          <Dropdown.Item onClick={data.actions}>{data.label}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Dropdown;
