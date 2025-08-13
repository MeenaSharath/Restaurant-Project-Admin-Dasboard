import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const Premiummenu = () => {
  const [premium, setpremium] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchMenu = () => {
    axios.get(`https://restaurant-website-eazx.onrender.com/premium`, {
      params: {
        page: currentPage,
        limit,
        search: searchTerm
      }
    })
      .then(res => {
        setpremium(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMenu();
  }, [currentPage, searchTerm]);

  const handleDelete = (id) => {
    axios.delete(`https://restaurant-website-eazx.onrender.com/deletepremium/${id}`)
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
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-violet-400 mb-6">Premium Menu</h2>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Link
            to="/createpremium"
            className="bg-violet-400 hover:bg-violet-500 text-white px-5 py-2 rounded-md transition text-sm font-medium"
          >
            + Add Premium
          </Link>
          <input
            type="text"
            placeholder="🔍 Search food item"
            value={searchTerm}
            onChange={handleSearch}
            className="w-50 sm:w-50 border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-violet-400 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Product ID</th>
                <th className="px-4 py-2 text-left">Food Item</th>
                <th className="px-4 py-2 text-center">Image</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {premium.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 font-semibold">{item.productid}</td>
                  <td className="px-4 py-2">{item.fooditems}</td>
                  <td className="px-4 py-2 text-center">
                    {item.image ? (
                      <img src={item.image} alt={item.fooditems} className="w-16 h-16 object-cover rounded mx-auto" />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 font-semibold">₹{item.price}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-4">
                      <Link to={`/updatepremium/${item._id}`} title="Edit">
                        <CiEdit className="text-xl text-blue-600 hover:text-blue-800 transition" />
                      </Link>
                      <button onClick={() => handleDelete(item._id)} title="Delete">
                        <RiDeleteBinLine className="text-red-600 hover:text-red-800 transition" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {premium.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                    No matching menu found.
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
                      ? 'bg-violet-400 text-white'
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

export default Premiummenu;
