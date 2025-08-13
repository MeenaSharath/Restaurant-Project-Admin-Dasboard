import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const Customerlist = () => {
  const [customer, setCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchCustomers = () => {
    axios.get('https://restaurant-website-eazx.onrender.com/customer', {
      params: {
        page: currentPage,
        limit,
        search: searchTerm
      }
    })
      .then(res => {
        setCustomer(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, currentPage]);

  const handleDelete = (id) => {
    axios.delete(`https://restaurant-website-eazx.onrender.com/deletecustomer/${id}`)
      .then(() => fetchCustomers())
      .catch(err => console.log(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 to-orange-200 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4">
        <h2 className="text-2xl font-bold text-center text-orange-300 mb-6">Customers List</h2>

        {/* Top actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search By Name"
            value={searchTerm}
            onChange={handleSearch}
            className="w-50 px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 text-sm ms-auto"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-md">
            <thead className="bg-orange-300 text-white text-sm">
              <tr>
                {["Customer ID", "Customer Name", "Location", "Email", "Ordered Item", "Bill", "Action"].map((header, idx) => (
                  <th key={idx} className="px-4 py-2 text-center font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center text-sm bg-white divide-y divide-gray-200">
              {customer.map((item, index) => (
                <tr key={index} className="hover:bg-pink-50 transition">
                  <td className="px-4 py-1">{item.customerid}</td>
                  <td className="px-4 py-1">{item.customername}</td>
                  <td className="px-4 py-1">{item.location}</td>
                  <td className="px-4 py-1">{item.email}</td>
                  <td className="px-4 py-1">{item.orderditem}</td>
                  <td className="px-4 py-1 font-semibold">₹{item.bill}</td>
                  <td className="px-4 py-1">
                    <div className="flex justify-center items-center gap-3">
                      <Link to={`/updatecustomer/${item._id}`} className="text-blue-600 text-xl hover:text-blue-800 transition">
                        <CiEdit />
                      </Link>
                      <button onClick={() => handleDelete(item._id)} className="text-red-600 text-xl hover:text-red-800 transition">
                        <RiDeleteBinLine size="15px"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {customer.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-6 text-gray-500">😕 No matching customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6">
          <nav className="flex space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-1 rounded-lg border text-sm font-medium transition ${
                currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-lg border text-sm font-medium transition ${
                    page === currentPage ? 'bg-orange-300 text-white border--orange-200' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-1 rounded-lg border text-sm font-medium transition ${
                currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Customerlist;
