import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const RentModal = ({
  showModal,
  setShowModal,
  formData,
  handleInputChange,
  handleSubmit,
  calculatePendingAmount,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Rent Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <div className="electricty-group">
            <Form.Group className="mb-3">
              <Form.Label>Electricity Unit</Form.Label>
              <Form.Control
                type="number"
                name="electricityUnit"
                value={formData.electricityUnit}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Electricity Bill (₹)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="electricityBill"
                value={formData.electricityBill}
                onChange={handleInputChange}
                onBlur={calculatePendingAmount}
                required
              />
            </Form.Group>
          </div>

          <div className="electricty-group">
            <Form.Group className="mb-3">
              <Form.Label>Room Rent (₹)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="roomRent"
                value={formData.roomRent}
                onChange={handleInputChange}
                onBlur={calculatePendingAmount}
                required
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Total Paid Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="totalPaidAmount"
                value={formData.totalPaidAmount}
                onChange={handleInputChange}
                onBlur={calculatePendingAmount}
                required
              />
            </Form.Group>
          </div>

<div className="electricty-group">
<Form.Group className="mb-3 selectstatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pending Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="pendingAmount"
              value={formData.pendingAmount}
              onChange={handleInputChange}
              readOnly
            />
          </Form.Group>
</div>
          

          <Form.Group className="mb-3">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            {/* <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              className="me-2"
            >
              Cancel
            </Button> */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RentModal;
