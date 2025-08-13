import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Updatemenu = () => {
  const { id } = useParams();
  const [productid, setproductid] = useState('');
  const [fooditems, setfooditems] = useState('');
  const [status, setstatus] = useState('');
  const [price, setprice] = useState('');
  const [image, setimage] = useState(null); 
  const [imageUrl, setimageUrl] = useState('');
  const [description, setdescription] = useState('');
  const [origin, setOrigin] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/getmenu/' + id)
      .then(result => {
        setproductid(result.data.productid);
        setfooditems(result.data.fooditems);
        setimageUrl(result.data.image);
        setstatus(result.data.status);
        setprice(result.data.price);
        setdescription(result.data.description)
        setOrigin(result.data.origin)
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "imageupload1");
    formData.append("cloud_name", "degumncul");
    const res = await axios.post("https://api.cloudinary.com/v1_1/degumncul/image/upload", formData);
    return res.data.secure_url;
  };

  const update = async (e) => {
    e.preventDefault();
    let finalImageUrl = imageUrl;

    if (image) {
      try {
        finalImageUrl = await handleImageUpload(image);
      } catch (err) {
        console.error("Image upload failed", err);
        return;
      }
    }

    axios.put("http://localhost:3001/updatemenu/" + id,
      { productid, fooditems, status, price, image: finalImageUrl, description, origin })
      .then(() => {
        navigate("/menu");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex justify-center items-start pt-5 px-4 bg-[#f5efe6]">
      <div className="w-full max-w-xl bg-[#fffaf3] p-6 rounded-2xl shadow-lg border border-[#d4c2a8]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#7b4f28]">Update Menu</h2>
        <form onSubmit={update}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-[#5c3d23]">Product ID</label>
            <input
              type="number"
              value={productid}
              placeholder="Enter ID"
              className="w-full px-3 py-2 border border-[#bba58c] rounded focus:outline-none focus:ring focus:ring-[#c49e6b]"
              onChange={(e) => setproductid(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-[#5c3d23]">Food Item</label>
            <input
              type="text"
              value={fooditems}
              placeholder="Enter food name"
              className="w-full px-3 py-2 border border-[#bba58c] rounded focus:outline-none focus:ring focus:ring-[#c49e6b]"
              onChange={(e) => setfooditems(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-[#5c3d23]">Current Image</label>
            {imageUrl ? (
              <img src={imageUrl} alt="image" className="w-24 h-24 object-cover rounded border" />
            ) : (
              <span className="text-sm text-gray-500">No image</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-[#5c3d23]">Change Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-[#bba58c] rounded focus:outline-none focus:ring focus:ring-[#c49e6b]"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-[#5c3d23]">Status</label>
            <select
              value={status}
              onChange={(e) => setstatus(e.target.value)}
              className="w-full px-3 py-2 border border-[#bba58c] rounded focus:outline-none focus:ring focus:ring-[#c49e6b]"
            >
              <option value="">Select status</option>
              <option value="in stock">In stock</option>
              <option value="out of stock">Out of stock</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-[#5c3d23]">Price</label>
            <input
              type="number"
              value={price}
              placeholder="Enter price"
              className="w-full px-3 py-2 border border-[#bba58c] rounded focus:outline-none focus:ring focus:ring-[#c49e6b]"
              onChange={(e) => setprice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-[#5c3d23]">Description</label>
            <textarea
              placeholder="Enter dish description"
              className="w-full px-3 py-2 border border-[#bba58c] rounded focus:outline-none focus:ring focus:ring-[#c49e6b]"
              rows={4}
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-semibold text-[#5c3d23]">Country of Origin</label>
            <input
              type="text"
              value={origin}
              placeholder="Enter origin"
              className="w-full px-3 py-2 border border-[#bba58c] rounded focus:outline-none focus:ring focus:ring-[#c49e6b]"
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#a47148] hover:bg-[#8a5e3e] text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatemenu;
