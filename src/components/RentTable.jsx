import React, { useState } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import loaderr from '../assets/spinner.gif'

const RentTable = ({ rents, isLoading }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  // Function to format date as dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Get current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = rents.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(rents.length / recordsPerPage);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">
          <img src={loaderr} alt="Loading rend data" />
        </p>
      </div>
    );
  }

  if (!rents || rents.length === 0) {
    return (
      <div className="text-center my-5">
          <img src={loaderr} alt="Loading rend data"  height={80}/><br />
          <p className='rent-data-loadinggg'>Loading rend data...</p>

      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="rent-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Electricity Units</th>
            <th>Electricity Bill</th>
            <th>Room Rent</th>
            <th>Total Paid</th>
            <th>Status</th>
            <th>Pending </th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((rent) => (
            <tr key={rent._id}>
              <td>{formatDate(rent.date)}</td>
              <td>{rent.electricityUnit}</td>
              <td>₹{rent.electricityBill}</td>
              <td>₹{rent.roomRent}</td>
              <td>₹{rent.totalPaidAmount}</td>
              <td>
                {rent.status === 'Paid' ? (
                  <span className="badge bg-success">
                    <FaCheck className="me-1" /> Paid
                  </span>
                ) : (
                  <span className="badge bg-warning text-dark">
                    <FaTimes className="me-1" /> Pending
                  </span>
                )}
              </td>
              <td>₹{rent.pendingAmount}</td>
              <td>{rent.remarks}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      {rents.length > recordsPerPage && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            <Pagination.Prev 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default RentTable;