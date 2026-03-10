import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="px-4 py-2 bg-success text-white rounded-md shadow-sm hover:bg-green-700 transition font-medium focus:outline-none focus:ring-2 focus:ring-green-500">
          {dropdown_header as string}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[150px] bg-white rounded-md shadow-lg border border-gray-200 p-1 z-50 flex flex-col">
          {dropdown_item.map(({ actions, label }) => (
            <DropdownMenu.Item
              key={label as string}
              onClick={actions}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded flex outline-none text-gray-700 font-medium"
            >
              {label as string}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownFilter;
