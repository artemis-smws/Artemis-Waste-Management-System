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
    <div className="d-flex vh-100 w-100">
      <div className="vh-100">
        <Sidebar />
      </div>
      <div
        className="w-100 h-100 overflow-auto"
        style={{ objectFit: "contain" }}
      >
        <div>
          <TrashTable setIsDeleteButtonVisible={handleDeleteButtonVisibility} />
        </div>
      </div>
    </div>
  );
}
