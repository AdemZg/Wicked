import { Modal } from 'antd';


const CustomModal = ({title, open, hideModal, performAction, top }) => {
  return (
    <Modal
        title={top}
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="Yes"
        cancelText="Cancel"
        okType='danger'
      >
        <p>{title}</p>
      </Modal>
  )
}

export default CustomModal