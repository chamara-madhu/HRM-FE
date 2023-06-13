import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FileUpload = ({
  label,
  fileList,
  previewImage,
  setPreviewImage,
  handleUpload,
  isRequired,
  error,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file?.url?.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Form.Item label={label} required={isRequired}>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUpload}
        accept="image/png, image/jpeg, image/jpg"
      >
        {fileList.length === 0 && uploadButton}
      </Upload>
      {previewImage && !previewOpen && (
        <img
          alt="preview"
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid #cccccc",
            borderRadius: "7px",
            objectFit: "cover",
          }}
          src={previewImage}
        />
      )}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      {error && <p className="cus-error">{error}</p>}
    </Form.Item>
  );
};

export default FileUpload;
