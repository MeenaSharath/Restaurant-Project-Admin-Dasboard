import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Updatestaff = () => {
  const { id } = useParams();
  const [staffid, setstaffid] = useState('');
  const [name, setname] = useState('');
  const [role, setrole] = useState('');
  const [checkin, setcheckin] = useState('');
  const [checkout, setcheckout] = useState('');
  const [status, setstatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://restaurant-website-eazx.onrender.com/getstaff/${id}`)
      .then(result => {
        const data = result.data;
        setstaffid(data.staffid);
        setname(data.name);  // Fixed: should be `data.name` not `data.setname`
        setrole(data.role);
        setcheckin(data.checkin);
        setcheckout(data.checkout);  // Fixed: `data.checkout` instead of `data.ordesetcheckout`
        setstatus(data.status);
      })
      .catch(err => console.log(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    axios.put(`https://restaurant-website-eazx.onrender.com/updatestaff/${id}`, {
      staffid,
      name,
      role,
      checkin,
      checkout,
      status
    })
      .then(() => navigate("/staff"))
      .catch(err => console.log(err));
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-[#f3e5ab] to-[#d2b48c] px-4 py-6">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-6 border border-[#8b5e3c]">
        <h2 className="text-2xl font-bold text-center text-[#5c4033] mb-6">
          Update Staff Details
        </h2>
        <form onSubmit={update} className="space-y-4">
          <div>
            <label className="block font-medium text-[#4b2e1f] mb-1">Staff ID</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-[#b08d57] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a47449]"
              value={staffid}
              onChange={(e) => setstaffid(e.target.value)}
              placeholder="Enter Staff ID"
            />
          </div>

          <div>
            <label className="block font-medium text-[#4b2e1f] mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#b08d57] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a47449]"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter Name"
            />
          </div>

          <div>
            <label className="block font-medium text-[#4b2e1f] mb-1">Role</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#b08d57] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a47449]"
              value={role}
              onChange={(e) => setrole(e.target.value)}
              placeholder="Enter Role"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#4b2e1f] mb-1">Check-in</label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-[#b08d57] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a47449]"
                value={checkin}
                onChange={(e) => setcheckin(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium text-[#4b2e1f] mb-1">Check-out</label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-[#b08d57] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a47449]"
                value={checkout}
                onChange={(e) => setcheckout(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#4b2e1f] mb-1">Status</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#b08d57] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a47449]"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
              placeholder="Active / Inactive"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8b5e3c] hover:bg-[#734d32] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Update Staff
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatestaff;
