import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Order = () => {
  const [order, setOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchOrders = () => {
    axios.get('https://restaurant-website-eazx.onrender.com/order', {
      params: {
        page: currentPage,
        limit,
        search: searchTerm
      }
    })
      .then(res => {
        setOrder(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-[#ff6877] mb-5">Orders List</h2>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="🔍 Search By Name"
            value={searchTerm}
            onChange={handleSearch}
            className="w-50 px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-pink-100 ms-auto text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-[#ff6877] text-white text-center">
              <tr>
                <th className="px-4 py-2 font-semibold">#</th>
                <th className="px-4 py-2 font-semibold">Dish Name</th>
                <th className="px-4 py-2 font-semibold">Customer</th>
                <th className="px-4 py-2 font-semibold">Address</th>
                <th className="px-4 py-2 font-semibold">Phone</th>
                <th className="px-4 py-2 font-semibold">Customer Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {order.map((item, index) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{(currentPage - 1) * limit + index + 1}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">{item.product}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.address}</td>
                  <td className="px-4 py-2">{item.phone}</td>
                  <td className="px-4 py-2 text-left">
                    <div className="text-sm text-gray-600 leading-snug">
                      <div><span className="font-semibold">Location:</span> {item.location}</div>
                      <div><span className="font-semibold">Pin:</span> {item.pin}</div>
                      <div><span className="font-semibold">District:</span> {item.district}</div>
                      <div><span className="font-semibold">Country:</span> {item.country}</div>
                    </div>
                  </td>
                </tr>
              ))}
              {order.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-gray-500 italic text-center">
                    😕 No matching orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center sm:justify-end mt-6">
          <nav className="inline-flex space-x-1" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md border text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
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
                  className={`px-3 py-1 rounded-md border text-sm font-medium ${
                    page === currentPage
                      ? 'bg-[#ff6877] text-white border-[#ff6877]'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md border text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
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

export default Order;
