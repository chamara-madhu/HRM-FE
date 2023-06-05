import React from "react";
import { Modal } from "antd";

const CommonModal = ({
  title,
  children,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
