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
    <div className="flex min-h-screen w-full bg-[var(--color-light)]">
      <div className="h-screen shrink-0 sticky top-0">
        <Sidebar />
      </div>
      <div className="flex-1 w-full p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <TrashTable setIsDeleteButtonVisible={handleDeleteButtonVisibility} />
        </div>
      </div>
    </div>
  );
}
