import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBinLine } from "react-icons/ri";

const Enquiry = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:3001/admin/contacts');
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:3001/admin/contacts/${id}`);
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:3001/admin/contacts/${id}/read`);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? res.data : msg))
      );
    } catch (err) {
      console.error('Mark as read error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-300 text-center">📩 Customer Enquiries</h2>
        <div className="overflow-x-auto border border-green-300 rounded-xl">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-green-300 text-white text-left text-sm">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className={`border-t transition duration-200 ${
                      msg.read
                        ? 'bg-green-50 hover:bg-green-100'
                        : 'bg-white hover:bg-green-50'
                    }`}
                  >
                    <td className="px-4 py-2">{msg.name}</td>
                    <td className="px-4 py-2">{msg.email}</td>
                    <td className="px-4 py-2">{msg.phonenumber}</td>
                    <td className="px-4 py-2">{msg.message}</td>
                    <td className="px-4 py-2 text-gray-500 text-xs">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          msg.read
                            ? 'bg-green-200 text-green-800'
                            : 'bg-yellow-200 text-yellow-800'
                        }`}
                      >
                        {msg.read ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td className="px-3 py-2 space-y-1">
                      {!msg.read && (
                        <button
                          onClick={() => markAsRead(msg._id)}
                          className="bg-green-100 text-green-700 hover:bg-green-200 text-xs font-semibold px-2 py-1 rounded transition me-1"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    😕 No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
