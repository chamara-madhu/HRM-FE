import React, { useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

const Main = () => {
  const dispatch = useDispatch();
  const { data: employees, loading } = useSelector(
    (state) => state.employeeList
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployeesFetchLoad());
  }, []);

  const handleEdit = (cafeId) => {
    navigate(`/employees/edit/${cafeId}`);
  };

  const handleDelete = async (cafeId) => {
    if (window.confirm("Are you sure that you want to delete this employee?")) {
      try {
        await dispatch(deleteEmployeeStart(cafeId));
        toast.success("Employee has been deleted successfully.", {
          theme: "colored",
        });
      } catch (error) {
        console.error(error);
      }
    }
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
      field: "noOfDays",
      sortable: true,
      width: 170,
      resizable: true,
      cellRendererFramework: (params) =>
        moment().diff(moment(params?.data?.start_date), "days"),
    },
    {
      field: "cafe",
      sortable: true,
      filter: true,
      width: 200,
      resizable: true,
      cellRendererFramework: (params) => params?.data?.cafe_id?.name || "-",
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
            handleBtn={() => handleDelete(params.data.id)}
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
    </>
  );
};

export default Main;
