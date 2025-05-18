import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RentApp.css';
import RentTable from '../components/RentTable';
import RentModal from '../components/RentModal';

const RentApp = () => {
  const [rents, setRents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    electricityUnit: '',
    electricityBill: '',
  roomRent: '4050', // Set default room rent to 4050
    totalPaidAmount: '',
    status: 'Pending',
    pendingAmount: '',
    remarks: ''
  });

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rents');
      setRents(response.data);
    } catch (error) {
      toast.error('Failed to fetch rents');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculatePendingAmount = () => {
    const { electricityBill, roomRent, totalPaidAmount } = formData;
    if (electricityBill && roomRent && totalPaidAmount) {
      const totalAmount = parseFloat(electricityBill) + parseFloat(roomRent);
      const pending = totalAmount - parseFloat(totalPaidAmount);
      setFormData({
        ...formData,
        pendingAmount: pending.toFixed(2),
        status: pending <= 0 ? 'Paid' : 'Pending'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/rents', formData);
      toast.success('Rent added successfully!');
      setShowModal(false);
      setFormData({
        date: '',
        electricityUnit: '',
        electricityBill: '',
        roomRent: '',
        totalPaidAmount: '',
        status: 'Pending',
        pendingAmount: '',
        remarks: ''
      });
      fetchRents();
    } catch (error) {
      toast.error('Failed to add rent');
    }
  };

  return (
    <div className="container mt-4 rent-app-container">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="room-details">
          <h2>Rent Management</h2>
          <p>Room No - E8</p>
          <p>Sunil Kumar</p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Add Rent Details
        </Button>
      </div>
<hr />
      <RentTable rents={rents} />
      
      <RentModal 
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        calculatePendingAmount={calculatePendingAmount}
      />
    </div>
  );
};

export default RentApp;