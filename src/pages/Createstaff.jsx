import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Createstaff = () => {
  const [staffid, setstaffid] = useState('');
  const [name, setname] = useState('');
  const [role, setrole] = useState('');
  const [checkin, setcheckin] = useState('');
  const [checkout, setcheckout] = useState('');
  const [status, setstatus] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createstaff', {
      staffid,
      name,
      role,
      checkin,
      checkout,
      status
    })
    .then(result => {
      console.log(result);
      navigate('/staff');
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-100 px-4 py-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-extrabold text-center text-purple-300 mb-6">
          Add New Staff
        </h2>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Staff ID
            </label>
            <input
              type="number"
              placeholder="Enter staff ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-200 text-sm"
              onChange={(e) => setstaffid(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter staff name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-200 text-sm"
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              placeholder="e.g., Chef, Waiter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-200 text-sm"
              onChange={(e) => setrole(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Check-in Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-200 text-sm"
                onChange={(e) => setcheckin(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Check-out Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-200 text-sm"
                onChange={(e) => setcheckout(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Status
            </label>
            <input
              type="text"
              placeholder="Active / Inactive"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-200 text-sm"
              onChange={(e) => setstatus(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-200 hover:bg-purple-300 text-white text-sm font-medium py-2 rounded-lg transition duration-200 shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createstaff;
