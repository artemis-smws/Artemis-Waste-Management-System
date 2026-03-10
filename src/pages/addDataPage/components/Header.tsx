import React from "react";
import DeleteButton from "./DeleteButton";
import AddWasteButton from "./AddWaste";
import DropdownComponent from "./DropdownFilter";
import CalendarButton from "./Calendar";

interface HeaderProps {
  isDeleteButtonVisible: boolean;
  handleDelete: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDeleteButtonVisible,
  handleDelete,
}) => {
  return (
    <div className="flex justify-between items-center border-b-2 border-gray-200 shadow-sm p-4 w-full bg-white z-10">
      <div className="flex gap-4 justify-between items-center w-full">
        <div className="w-1/2 flex items-center gap-4">
          <CalendarButton />
          {isDeleteButtonVisible && <DeleteButton onClick={handleDelete} />}
          <DropdownComponent />
        </div>
        <div>
          <AddWasteButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
