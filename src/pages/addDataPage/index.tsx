import Sidebar from "../../components/layout/sidebar";
import Header from "./components/Header";
import { useState } from "react";
import TrashTable from "./components/DataTable";

export default function AddPage() {
  const [isDeleteButtonVisible, setDeleteButtonVisible] =
    useState<boolean>(false);

  const handleDeleteButtonVisibility = (isVisible: boolean) => {
    setDeleteButtonVisible(isVisible);
  };

  const handleDelete = () => {};
  
  return (
    <div className="flex h-screen w-full">
      <div className="h-screen shrink-0">
        <Sidebar />
      </div>
      <div className="w-full h-full object-contain">
        <div>
          <TrashTable setIsDeleteButtonVisible={handleDeleteButtonVisibility} />
        </div>
      </div>
    </div>
  );
}
