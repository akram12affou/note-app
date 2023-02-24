import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Modale({modalOpen,setModalOpen}) {
  const handleClick = () => {
    setModalOpen(false)
  }
  return (
    <div>
      {" "}
      <Modal
        isOpen={modalOpen}
        //toggle={}
      >
        <ModalBody>
         Invalid Note
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => handleClick()} >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Modale;
