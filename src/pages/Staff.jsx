import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchStaff = () => {
    axios.get('https://restaurant-website-eazx.onrender.com/staff', {
      params: {
        page: currentPage,
        limit,
        search
      }
    })
      .then(res => {
        setStaff(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStaff();
  }, [search, currentPage]);

  const handleDelete = (id) => {
    axios.delete(`https://restaurant-website-eazx.onrender.com/deletestaff/${id}`)
      .then(() => fetchStaff())
      .catch(err => console.log(err));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // reset to first page on search
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100 py-4 px-4 sm:px-10">
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-center text-purple-300 mb-6">Staffs List</h2>

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          className="w-50 border border-gray-300 rounded-md px-4 py-1 focus:ring-pink-100 ms-auto text-sm mb-4"
          placeholder="🔍 Search By Name"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full text-sm text-center divide-y divide-gray-200">
          <thead className="bg-purple-300 text-white">
            <tr>
              <th className="py-2 px-4 font-semibold">Staff ID</th>
              <th className="py-2 px-4 font-semibold">Name</th>
              <th className="py-2 px-4 font-semibold">Role</th>
              <th className="py-2 px-4 font-semibold">Check In</th>
              <th className="py-2 px-4 font-semibold">Check Out</th>
              <th className="py-2 px-4 font-semibold">Status</th>
              <th className="py-2 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {staff.length > 0 ? (
              staff.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 font-semibold">{item.staffid}</td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.role}</td>
                  <td className="py-2 px-4">{item.checkin}</td>
                  <td className="py-2 px-4">{item.checkout}</td>
                  <td className="py-2 px-4">{item.status}</td>
                  <td className="py-2 px-4 flex justify-center items-center gap-3">
                    <Link
                      to={`/updatestaff/${item._id}`}
                      className="text-[#0077b6] hover:text-blue-700 text-lg"
                    >
                      <CiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 text-lg"
                    >
                      <RiDeleteBinLine size="15px"/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-gray-500">
                  😕 No matching staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center sm:justify-end mt-6">
        <nav className="inline-flex gap-1" aria-label="Pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
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
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  page === currentPage
                    ? 'bg-purple-300 text-white border border-gray'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
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

export default Staff;
