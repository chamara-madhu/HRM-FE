import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import CommonButton from "../../shared/buttons/CommonButton";
import TextField from "../../shared/inputs/TextField";
import {
  addEmployeeStart,
  updateEmployeeStart,
} from "../../../redux/actions/employeesActions";
import { getCafesFetchLoad } from "../../../redux/actions/cafesActions";
import PageHeader from "../../shared/PageHeader";
import RadioButtons from "../../shared/inputs/RadioButtons";
import PhoneNumberInput from "../../shared/inputs/PhoneNumberInput";
import SelectInput from "../../shared/inputs/SelectInput";
import { isValidateEmail } from "../../../helpers/utilityHelper";
import DatePickerInput from "../../shared/inputs/DatePickerInput";

const AddEditEmployee = () => {
  const [cafeOptions, seCafeOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "MALE",
    cafeId: "",
    startDate: "",
    nameErr: "",
    emailErr: "",
    phoneErr: "",
    startDateErr: "",
  });
  const dispatch = useDispatch();
  const { data: cafes } = useSelector((state) => state.cafeList);
  const { data: employees, loading } = useSelector(
    (state) => state.employeeList
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const optionsArr = useMemo(() => {
    return [
      { value: "MALE", name: "Male" },
      { value: "FEMALE", name: "Female" },
    ];
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getCafesFetchLoad());
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const options = cafes?.map((item) => ({
      label: item.name,
      value: item._id,
    }));
    seCafeOptions(options);
  }, [cafes]);

  useEffect(() => {
    if (id) {
      const findEmployee = employees?.find((item) => item.id === id);
      if (findEmployee?.name) {
        setFormData((prev) => ({
          ...prev,
          name: findEmployee.name,
          phone: findEmployee.phone_number,
          email: findEmployee.email_address,
          startDate: findEmployee.start_date,
          gender: findEmployee.gender,
          cafeId: findEmployee?.cafe_id?._id || "",
        }));
      } else {
        navigate("/employees/add");
      }
    }
  }, [id, employees]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Err`]: "",
    }));
  }, []);

  const handleChangeV2 = useCallback((name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Err`]: "",
    }));
  }, []);

  const isValidate = useCallback(() => {
    let nameErr = "";
    let emailErr = "";
    let phoneErr = "";
    let startDateErr = "";

    if (!formData.name) {
      nameErr = "Name is required";
    } else if (formData.name.length < 6 || formData.name.length > 10) {
      nameErr =
        "Only a minimum of 6 characters and a maximum of 10 characters are allowed";
    }

    if (!formData.email) {
      emailErr = "Email is required";
    } else if (!isValidateEmail(formData.email)) {
      emailErr = "Invalid email";
    }

    if (!formData.phone) {
      phoneErr = "Phone number is required";
    } else if (
      !(formData.phone.charAt(2) === "8" || formData.phone.charAt(2) === "9") ||
      formData.phone.length !== 10
    ) {
      phoneErr =
        "The number should start with either 8 or 9 and have a total of 10 digits, including the country code";
    }

    if (!formData.startDate) {
      startDateErr = "Employment start date is required";
    }

    if (nameErr || emailErr || phoneErr || startDateErr) {
      setFormData((prev) => ({
        ...prev,
        nameErr,
        emailErr,
        phoneErr,
        startDateErr,
      }));

      return false;
    }

    return true;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isValidate()) return;

      const JSONData = {
        name: formData.name,
        email_address: formData.email,
        phone_number: formData.phone,
        gender: formData.gender,
        cafe_id: formData.cafeId || null,
        start_date: formData.startDate,
      };

      try {
        if (!id) {
          await dispatch(addEmployeeStart(JSONData));

          setTimeout(() => {
            toast.success("Employee has been added successfully.", {
              theme: "colored",
            });
            navigate("/employees");
          }, 2000);
        } else {
          await dispatch(updateEmployeeStart({ id, JSONData }));

          setTimeout(() => {
            toast.success("Employee has been updated successfully.", {
              theme: "colored",
            });
            navigate("/employees");
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [isValidate, formData, dispatch, id, loading]
  );

  const handleCancel = () => {
    if (
      !id &&
      (formData.name ||
        formData.email ||
        formData.phone ||
        formData.startDate ||
        formData.cafeId)
    ) {
      if (
        window.confirm(
          "There are unsaved data. Are you sure you want to cancel this form?"
        )
      ) {
        navigate("/employees");
      }
    } else {
      navigate("/employees");
    }
  };

  return (
    <>
      <PageHeader pageTitle="Add Employee" />
      <Form layout="vertical" className="form-container">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          handleChange={handleChange}
          error={formData.nameErr}
          isRequired
        />
        <TextField
          type="email"
          label="Email address"
          name="email"
          value={formData.email}
          handleChange={handleChange}
          error={formData.emailErr}
          isRequired
        />
        <PhoneNumberInput
          label="Phone number"
          name="phone"
          value={formData.phone}
          handlePhone={handleChangeV2}
          disableDropdown
          countryCodeEditable={false}
          error={formData.phoneErr}
          isRequired
        />
        <RadioButtons
          label="Gender"
          name="gender"
          value={formData.gender}
          optionsArr={optionsArr}
          handleChange={handleChange}
          isRequired
        />
        <DatePickerInput
          label="Date of joined"
          name="startDate"
          value={
            formData.startDate ? moment.utc(formData.startDate).local() : ""
          }
          handleChange={handleChangeV2}
          error={formData.startDateErr}
          isRequired
        />
        <SelectInput
          label="Assigned Café (optional)"
          name="cafeId"
          value={formData.cafeId}
          optionsArr={cafeOptions}
          handleChange={handleChangeV2}
        />
        <Form.Item>
          <CommonButton
            label="Cancel"
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

export default AddEditEmployee;
