import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Createpremium = () => {
    const [productid, setproductid] = useState('');
    const [fooditems, setfooditems] = useState('');
    const [image, setimage] = useState(null);
     const [price, setprice] = useState('');
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
      
              const res = await axios.post('https://api.cloudinary.com/v1_1/degumncul/image/upload', formData);
              imageUrl = res.data.secure_url;
            }
      
            await  axios.post('https://restaurant-website-eazx.onrender.com/createpremium',
               { productid, fooditems, price,image:imageUrl })
      
            navigate('/premium');
          } catch (err) {
            console.error('Error submitting form:', err);
          }
        };
      
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-200 via-white to-pink-100 flex items-center justify-center py-10">
      <div className="w-full max-w-xl bg-white p-10 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center text-[#ff6877]">Add premium</h2>
         <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Product ID</label>
            <input
              type="number"
              placeholder="Enter ID"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-300"
              onChange={(e) => setproductid(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Food Item</label>
            <input
              type="text"
              placeholder="Enter food name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-300"
              onChange={(e) => setfooditems(e.target.value)}
            />
          </div>
           <div className="mb-4">
            <label className="block mb-1 font-medium">image</label>
            <input
              type="file"
            
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-300"
                           accept="image/*"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>
           <div className="mb-4">
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-300"
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-200 hover:bg-red-300 text-white font-semibold py-2 px-4 rounded transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
         
  )
}

export default Createpremium