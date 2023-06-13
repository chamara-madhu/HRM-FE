import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import { toast } from "react-toastify";
import CommonButton from "../../shared/buttons/CommonButton";
import TextField from "../../shared/inputs/TextField";
import TextareaField from "../../shared/inputs/TextareaField";
import FileUpload from "../../shared/inputs/FileUpload";
import {
  addCafeStart,
  updateCafeStart,
} from "../../../redux/actions/cafesActions";
import PageHeader from "../../shared/PageHeader";
import { BASE_API } from "../../../config/constants";

const AddEditCafe = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    nameErr: "",
    descriptionErr: "",
    locationErr: "",
    logoErr: "",
  });
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.cafeList);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const findCafe = data?.find((item) => item.id === id);
      if (findCafe?.name) {
        setFormData((prev) => ({
          ...prev,
          name: findCafe.name,
          location: findCafe.location,
          description: findCafe.description,
        }));
      } else {
        navigate("/cafes/add");
      }

      if (findCafe?.logo) {
        setPreviewImage(`${BASE_API}/api/v1/cafe/${findCafe.id}/logo`);
      }
    }
  }, [id, data]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Err`]: "",
    }));
  }, []);

  const handleUpload = ({ fileList: newFileList }) => {
    console.log("newFileList", newFileList);
    setFileList(newFileList);
    setPreviewImage("");
    setFormData((prev) => ({
      ...prev,
      logoErr: "",
    }));
  };

  const isValidate = useCallback(() => {
    let nameErr = "";
    let descriptionErr = "";
    let locationErr = "";
    let logoErr = "";
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes

    if (!formData.name) {
      nameErr = "Name is required";
    } else if (formData.name.length < 6 || formData.name.length > 10) {
      nameErr =
        "Only a minimum of 6 characters and a maximum of 10 characters are allowed";
    }

    if (!formData.description) {
      descriptionErr = "Description is required";
    } else if (formData.description.length > 256) {
      descriptionErr = "Only a maximum of 256 characters is allowed";
    }

    if (!formData.location) {
      locationErr = "Location is required";
    }

    if ((fileList?.[0]?.size || 0) > maxSizeInBytes) {
      logoErr = "Maximum 2MB photos are allowed";
    }

    if (nameErr || descriptionErr || locationErr || logoErr) {
      setFormData((prev) => ({
        ...prev,
        nameErr,
        descriptionErr,
        locationErr,
        logoErr,
      }));

      return false;
    }

    return true;
  }, [formData, fileList]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isValidate()) return;

      const bodyFormData = new FormData();
      bodyFormData.set("name", formData.name);
      bodyFormData.set("location", formData.location);
      bodyFormData.set("description", formData.description);
      bodyFormData.append("logo", fileList?.[0]?.originFileObj || null);

      try {
        if (!id) {
          await dispatch(addCafeStart(bodyFormData));

          setTimeout(() => {
            toast.success("Cafe has been added successfully.", {
              theme: "colored",
            });
            navigate("/cafes");
          }, 2000);
        } else {
          await dispatch(updateCafeStart({ id, bodyFormData }));

          setTimeout(() => {
            toast.success("Cafe has been updated successfully.", {
              theme: "colored",
            });
            navigate("/cafes");
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [isValidate, formData, dispatch, fileList, id, loading]
  );

  const handleCancel = () => {
    if (
      !id &&
      (formData.name ||
        formData.description ||
        formData.location ||
        fileList.length > 0)
    ) {
      if (
        window.confirm(
          "There are unsaved data. Are you sure you want to cancel this form?"
        )
      ) {
        navigate("/cafes");
      }
    } else {
      navigate("/cafes");
    }
  };

  return (
    <>
      <PageHeader pageTitle="Add Cafe" />
      <Form layout="vertical" className="form-container">
        <FileUpload
          label="Logo (Optional)"
          fileList={fileList}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          handleUpload={handleUpload}
          error={formData.logoErr}
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          handleChange={handleChange}
          error={formData.nameErr}
          isRequired
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          handleChange={handleChange}
          error={formData.locationErr}
          isRequired
        />
        <TextareaField
          label="Description"
          name="description"
          value={formData.description}
          handleChange={handleChange}
          error={formData.descriptionErr}
          isRequired
        />
        <Form.Item>
          <CommonButton
            label="Cancel"
            // handleBtn={() => navigate("/cafes")}
            handleBtn={handleCancel}
            cusStyle={{ marginRight: 10 }}
            size="large"
          />
          <CommonButton
            type="primary"
            label="Submit"
            handleBtn={handleSubmit}
            isLoading={loading}
            size="large"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default AddEditCafe;
