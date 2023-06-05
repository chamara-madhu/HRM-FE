import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../shared/tables/CommonTable";
import {
  deleteCafeStart,
  getCafesFetchLoad,
  getCafesLocationsFetchStart,
} from "../../../redux/actions/cafesActions";
import CommonButton from "../../shared/buttons/CommonButton";
import PageHeader from "../../shared/PageHeader";
import { BASE_API } from "../../../config/constants";
import { Spin } from "antd";
import SelectInput from "../../shared/inputs/SelectInput";
import CommonModal from "../../shared/modals/CommonModal";

const Main = () => {
  const [cafeOptions, setCafeOptions] = useState([]);
  const [filterByLocation, setFilterByLocation] = useState("");
  const [cafeId, setCafeId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    data: cafes,
    loading,
    uniqueLocations,
  } = useSelector((state) => state.cafeList);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Accessing query parameters
    const queryParams = new URLSearchParams(location.search);
    const locationParam = queryParams.get("location");
    dispatch(getCafesFetchLoad(locationParam));
  }, [location]);

  useEffect(() => {
    // fetching unique cafe locations
    dispatch(getCafesLocationsFetchStart());
  }, []);

  useEffect(() => {
    const options = uniqueLocations?.map((item) => ({
      label: item,
      value: item,
    }));
    setCafeOptions(options);
  }, [uniqueLocations]);

  const showModal = (cafeId) => {
    setCafeId(cafeId);
    setIsDeleteModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await dispatch(deleteCafeStart(cafeId));
      setIsDeleteModalOpen(false);
      setTimeout(() => {
        toast.success("Cafe has been deleted successfully.", {
          theme: "colored",
        });
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleFilter = (_, value) => {
    setFilterByLocation(value);
    navigate(`/cafes?location=${value}`);
  };

  const handleEdit = (cafeId) => {
    navigate(`/cafes/edit/${cafeId}`);
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
        params?.data?.logo && (
          <img
            src={`${BASE_API}/api/v1/cafe/${params.data.id}/logo`}
            className="logo-wrapper"
            alt="logo"
          />
        ),
      width: 80,
    },
    { field: "name", sortable: true, width: 150, resizable: true },
    { field: "description", width: 594, resizable: true },
    {
      field: "employees",
      sortable: true,
      width: 120,
      resizable: true,
      cellStyle: { "justify-content": "center" },
      cellRendererFramework: (params) =>
        params?.data?.name && (
          <Link
            to={`/employees?cafe=${params.data.name}`}
            className="table-links"
          >
            {params.data.employees}
          </Link>
        ),
    },
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
            handleBtn={() => showModal(params.data._id)}
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
        pageTitle="Cafés"
        btnLabel="Add New Café"
        handleBtn={() => navigate("/cafes/add")}
      >
        <SelectInput
          label="Filter by location"
          name="filterByLocation"
          value={filterByLocation}
          optionsArr={cafeOptions}
          handleChange={handleFilter}
          cusStyle={{ minWidth: 150 }}
        />
      </PageHeader>
      {loading ? (
        <Spin size="large" className="table-loading" />
      ) : (
        <CommonTable columnDefs={columnDefs} rowData={cafes} />
      )}

      <CommonModal
        title="Delete Café"
        isModalOpen={isDeleteModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <p>Are you sure that you want to delete this Café?</p>
      </CommonModal>
    </>
  );
};

export default Main;
