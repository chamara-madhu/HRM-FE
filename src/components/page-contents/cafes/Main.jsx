import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../shared/tables/CommonTable";
import {
  deleteCafeStart,
  getCafesFetchLoad,
} from "../../../redux/actions/cafesActions";
import CommonButton from "../../shared/buttons/CommonButton";
import PageHeader from "../../shared/PageHeader";
import { BASE_API } from "../../../config/constants";
import { Spin } from "antd";

const Main = () => {
  const dispatch = useDispatch();
  const { data: cafes, loading } = useSelector((state) => state.cafeList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCafesFetchLoad());
  }, []);

  const handleEdit = (cafeId) => {
    navigate(`/cafes/edit/${cafeId}`);
  };

  const handleDelete = async (cafeId) => {
    if (window.confirm("Are you sure that you want to delete this cafe?")) {
      try {
        await dispatch(deleteCafeStart(cafeId));
        toast.success("Cafe has been deleted successfully.", {
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
      field: "logo",
      cellRendererFramework: (params) =>
        params.data.logo && (
          <img
            src={`${BASE_API}/api/v1/cafe/${params.data.id}/logo`}
            className="logo-wrapper"
            alt="logo"
          />
        ),
      width: 80,
    },
    { field: "name", sortable: true, width: 250, resizable: true },
    { field: "description", width: 494, resizable: true },
    { field: "employees", sortable: true, width: 120, resizable: true },
    {
      field: "location",
      sortable: true,
      filter: true,
      width: 200,
      resizable: true,
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
        pageTitle="Cafes"
        btnLabel="Add New Cafe"
        handleBtn={() => navigate("/cafes/add")}
      />
      {loading ? (
        <Spin size="large" className="table-loading" />
      ) : (
        <CommonTable columnDefs={columnDefs} rowData={cafes} />
      )}
    </>
  );
};

export default Main;
