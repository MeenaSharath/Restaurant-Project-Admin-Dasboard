import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Createcustomer = () => {
  const [customerid, setcustomerid] = useState('');
  const [customername, setcustomername] = useState('');
  const [location, setlocation] = useState('');
  const [email, setemail] = useState('');
  const [orderditem, setorderditem] = useState('');
  const [bill, setbill] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios
      .post('https://restaurant-website-eazx.onrender.com/createcustomer', {
        customerid,
        customername,
        location,
        email,
        orderditem,
        bill,
      })
      .then((result) => {
        console.log(result);
        navigate('/customer');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-200 py-4 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-4">
        <h2 className="text-2xl font-extrabold text-center text-orange-300 mb-6">
          Add New Customer
        </h2>
        <form onSubmit={submit} className="grid gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Customer ID</label>
            <input
              type="number"
              placeholder="Enter ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-200 text-sm"
              onChange={(e) => setcustomerid(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-200 text-sm"
              onChange={(e) => setcustomername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-200 text-sm"
              onChange={(e) => setlocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email ID</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-200 text-sm"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ordered Item</label>
            <input
              type="text"
              placeholder="Enter item name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-200 text-sm"
              onChange={(e) => setorderditem(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Bill Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-200 text-sm"
              onChange={(e) => setbill(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-200 hover:bg-orange-300 text-white text-sm font-medium rounded-lg transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createcustomer;
