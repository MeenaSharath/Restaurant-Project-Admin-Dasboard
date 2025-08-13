import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Updatecustomer = () => {
  const { id } = useParams();
  const [customerid, setcustomerid] = useState('');
  const [customername, setcustomername] = useState('');
  const [location, setlocation] = useState('');
  const [email, setemail] = useState('');
  const [orderditem, setorderditem] = useState('');
  const [bill, setbill] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://restaurant-website-eazx.onrender.com/getcustomer/' + id)
      .then(result => {
        setcustomerid(result.data.customerid);
        setcustomername(result.data.customername);
        setlocation(result.data.location);
        setemail(result.data.email);
        setorderditem(result.data.orderditem);
        setbill(result.data.bill);
      })
      .catch(err => console.log(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    axios.put("https://restaurant-website-eazx.onrender.com/updatecustomer/" + id, {
      customerid, customername, location, email, orderditem, bill
    })
      .then(() => navigate("/customer"))
      .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#fff7f0] to-[#cbb9a8] px-4 py-6">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-6 border border-[#d7c2af]">
        <h2 className="text-2xl font-bold text-center text-[#6b3e26] mb-6">
          Update Customer Details
        </h2>
        <form onSubmit={update} className="space-y-6">
          {/* Customer ID */}
          <div>
            <label className="block text-[#5a3926] font-semibold mb-1">Customer ID</label>
            <input
              type="number"
              value={customerid}
              placeholder="Enter ID"
              className="w-full px-4 py-2 border border-[#a8836d] rounded-lg focus:ring-2 focus:ring-[#6b3e26] focus:outline-none"
              onChange={(e) => setcustomerid(e.target.value)}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-[#5a3926] font-semibold mb-1">Customer Name</label>
            <input
              type="text"
              value={customername}
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-[#a8836d] rounded-lg focus:ring-2 focus:ring-[#6b3e26] focus:outline-none"
              onChange={(e) => setcustomername(e.target.value)}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-[#5a3926] font-semibold mb-1">Location</label>
            <input
              type="text"
              value={location}
              placeholder="Enter location"
              className="w-full px-4 py-2 border border-[#a8836d] rounded-lg focus:ring-2 focus:ring-[#6b3e26] focus:outline-none"
              onChange={(e) => setlocation(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#5a3926] font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-[#a8836d] rounded-lg focus:ring-2 focus:ring-[#6b3e26] focus:outline-none"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          {/* Ordered Item */}
          <div>
            <label className="block text-[#5a3926] font-semibold mb-1">Ordered Item</label>
            <input
              type="text"
              value={orderditem}
              placeholder="Enter ordered item"
              className="w-full px-4 py-2 border border-[#a8836d] rounded-lg focus:ring-2 focus:ring-[#6b3e26] focus:outline-none"
              onChange={(e) => setorderditem(e.target.value)}
            />
          </div>

          {/* Bill */}
          <div>
            <label className="block text-[#5a3926] font-semibold mb-1">Bill</label>
            <input
              type="number"
              value={bill}
              placeholder="Enter bill amount"
              className="w-full px-4 py-2 border border-[#a8836d] rounded-lg focus:ring-2 focus:ring-[#6b3e26] focus:outline-none"
              onChange={(e) => setbill(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8b5e3c] hover:bg-[#6b3e26] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Update Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatecustomer;
