import React from "react";
import DeleteButton from "./DeleteButton";
import AddWasteButton from "./AddButton";
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
    <div className="d-flex justify-content-between align-items-center border-bottom border-2 shadow p-3 w-100">
      <div className="d-flex gap-3 justify-content-between align-items-center w-100">
        <div className="w-50 d-flex gap-3">
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
