import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const Menulist = () => {
  const [foodmenu, setFoodmenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

  const fetchMenu = () => {
    axios.get(`https://restaurant-website-eazx.onrender.com/menu`, {
      params: {
        page: currentPage,
        limit,
        search: searchTerm
      }
    })
      .then(res => {
        setFoodmenu(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMenu();
  }, [currentPage, searchTerm]);

  const handleDelete = (id) => {
    axios.delete(`https://restaurant-website-eazx.onrender.com/deletemenu/${id}`)
      .then(() => fetchMenu())
      .catch(err => console.log(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
  <div className="w-full min-h-screen bg-gradient-to-tr from-pink-200 via-white to-pink-100 py-6 px-4">
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6 border border-pink-200">
      <h2 className="text-2xl font-extrabold text-center text-violet-400 mb-8 tracking-wide">🍽️ Menu List</h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-lg px-3 py-1 w-50 text-gray-700 ms-auto text-sm"
          placeholder="🔍 Search food item"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-violet-400 text-white uppercase text-xs">
            <tr>
              {['Product ID', 'Food Items', 'Image', 'Status', 'Price', 'Description', 'Origin', 'Action'].map((header, idx) => (
                <th key={idx} className="px-4 py-3 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {foodmenu.map((item, index) => (
              <tr key={index} className="border-t hover:bg-pink-50 transition">
                <td className="px-4 py-3 font-semibold">{item.productid}</td>
                <td className="px-4 py-3">{item.fooditems}</td>
                <td className="px-4 py-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded object-cover border"
                    />
                  ) : (
                    <span className="italic text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-3">
                    {item.status}
                </td>
                <td className="px-4 py-3 font-semibold">₹{item.price}</td>
                <td className="px-4 py-3">{item.description}</td>
                <td className="px-4 py-3">{item.origin}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-4 items-center justify-center text-xl">
                    <Link
                      to={`/updatemenu/${item._id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <CiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <RiDeleteBinLine size="15px"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {foodmenu.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-5 text-center text-gray-500">
                  😕 No matching menu found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <nav className="inline-flex space-x-2" aria-label="Pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-1 rounded-md border text-sm font-semibold transition ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-pink-100 border-gray-300'
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
                className={`px-3 py-1 rounded-md border text-sm font-medium transition ${
                  page === currentPage
                    ? 'bg-violet-400 text-white border-gray-500'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-1 rounded-md border text-sm font-semibold transition ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-300'
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

export default Menulist;
