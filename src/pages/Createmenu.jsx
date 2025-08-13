import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Createmenu = () => {
  const [productid, setproductid] = useState('');
  const [fooditems, setfooditems] = useState('');
  const [status, setstatus] = useState('');
  const [price, setprice] = useState('');
  const [image, setimage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [description, setdescription] = useState('');
  const [origin, setOrigin] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'imageupload1');
        formData.append('cloud_name', 'degumncul');
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/degumncul/image/upload',
          formData
        );
        imageUrl = res.data.secure_url;
      }

      await axios.post('http://localhost:3001/createmenu', {
        productid,
        fooditems,
        status,
        price,
        image: imageUrl,
        description,
        origin,
      });

      navigate('/menu');
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-pink-200 via-white to-pink-100 flex items-center justify-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-4 border border-pink-200">
        <h2 className="text-2xl font-bold text-center text-violet-400 mb-3">
          Add New Menu Item
        </h2>
        <form onSubmit={submit} className="space-y-2">
          <div>
            <label className="block text-sm font-semibold mb-1">Product ID</label>
            <input
              type="number"
              placeholder="Enter ID"
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-sm"
              onChange={(e) => setproductid(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Food Item</label>
            <input
              type="text"
              placeholder="Enter food name"
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-sm"
              onChange={(e) => setfooditems(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Image Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setimage(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-1 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-violet-400 file:text-white hover:file:bg-violet-200 text-sm"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 rounded-md h-40 w-full object-cover border"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              onChange={(e) => setstatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-sm"
            >
              <option value="">Select status</option>
              <option value="In stock">In stock</option>
              <option value="Out of stock">Out of stock</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-sm"
              onChange={(e) => setprice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              rows={4}
              placeholder="Enter dish description"
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-sm"
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Country of Origin</label>
            <input
              type="text"
              placeholder="Enter origin"
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-sm"
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-400 hover:bg-violet-500 text-white font-semibold py-1 rounded-lg transition duration-300"
          >
            Submit Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createmenu;
