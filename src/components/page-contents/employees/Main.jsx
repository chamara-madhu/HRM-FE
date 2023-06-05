import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../shared/tables/CommonTable";
import {
  deleteEmployeeStart,
  getEmployeesFetchLoad,
} from "../../../redux/actions/employeesActions";
import CommonButton from "../../shared/buttons/CommonButton";
import PageHeader from "../../shared/PageHeader";
import { Spin } from "antd";
import CommonModal from "../../shared/modals/CommonModal";

const Main = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: employees, loading } = useSelector(
    (state) => state.employeeList
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Accessing query parameters
    const queryParams = new URLSearchParams(location.search);
    const cafeParam = queryParams.get("cafe");
    dispatch(getEmployeesFetchLoad(cafeParam));
  }, []);

  const showModal = (employeeId) => {
    setEmployeeId(employeeId);
    setIsDeleteModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await dispatch(deleteEmployeeStart(employeeId));
      setIsDeleteModalOpen(false);
      toast.success("Employee has been deleted successfully.", {
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (employeeId) => {
    navigate(`/employees/edit/${employeeId}`);
  };

  const columnDefs = [
    {
      headerName: "No.",
      valueGetter: "node.rowIndex + 1",
      maxWidth: 60,
    },
    {
      field: "id",
      width: 150,
    },
    { field: "name", sortable: true, width: 200, resizable: true },
    {
      headerName: "Email",
      field: "email_address",
      width: 200,
      resizable: true,
    },
    {
      headerName: "Phone",
      field: "phone_number",
      sortable: true,
      width: 120,
      resizable: true,
    },
    {
      field: "gender",
      sortable: true,
      width: 100,
      resizable: true,
      cellRendererFramework: (params) =>
        params?.data?.gender === "MALE" ? "Male" : "Female",
    },
    {
      headerName: "No of days worked",
      field: "workedDays",
      sortable: true,
      width: 170,
      resizable: true,
    },
    {
      field: "cafe",
      sortable: true,
      filter: true,
      width: 200,
      resizable: true,
      cellRendererFramework: (params) =>
        params?.data?.cafe_id?.[0]?.name || "-",
    },
    {
      field: "actions",
      cellRendererFramework: (params) => (
        <>
          <CommonButton
            label="Edit"
            handleBtn={() => handleEdit(params.data.id)}
            icon={<EditOutlined />}
            cusStyle={{ marginRight: 10 }}
          />
          <CommonButton
            type="primary"
            label="Delete"
            handleBtn={() => showModal(params.data.id)}
            icon={<DeleteOutlined />}
            isDanger
          />
        </>
      ),
      width: 230,
      resizable: true,
    },
  ];

  return (
    <>
      <PageHeader
        pageTitle="Employees"
        btnLabel="Add New Employee"
        handleBtn={() => navigate("/employees/add")}
      />
      {loading ? (
        <Spin size="large" className="table-loading" />
      ) : (
        <CommonTable columnDefs={columnDefs} rowData={employees} />
      )}

      <CommonModal
        title="Delete Employee"
        isModalOpen={isDeleteModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <p>Are you sure that you want to delete this employee?</p>
      </CommonModal>
    </>
  );
};

export default Main;
