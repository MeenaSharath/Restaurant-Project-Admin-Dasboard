import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Updatepremium = () => {
  const { id } = useParams();
  const [productid, setproductid] = useState('');
  const [fooditems, setfooditems] = useState('');
  const [price, setprice] = useState('');
  const [image, setimage] = useState(null);
  const [imageUrl, setimageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://restaurant-website-eazx.onrender.com/getpremium/' + id)
      .then(result => {
        setproductid(result.data.productid);
        setfooditems(result.data.fooditems);
        setimageUrl(result.data.image);
        setprice(result.data.price);
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

    axios.put("https://restaurant-website-eazx.onrender.com/updatepremium/" + id,
      { productid, fooditems, price, image: finalImageUrl })
      .then(result => {
        navigate("/premium");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex min-h-screen justify-center pt-10 px-4 bg-[#f7f1e3]">
      <div className="w-full max-w-xl bg-[#d9b99b] p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#4e342e]">Update Premium</h2>
        <form onSubmit={update}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#3e2723]">Product ID</label>
            <input
              type="number"
              value={productid}
              placeholder="Enter ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
              onChange={(e) => setproductid(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#3e2723]">Food Item</label>
            <input
              type="text"
              value={fooditems}
              placeholder="Enter food name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
              onChange={(e) => setfooditems(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#3e2723]">Current Image:</label><br />
            {imageUrl ? (
              <img src={imageUrl} alt="Current" className="w-20 h-20 object-cover rounded-md border border-gray-300" />
            ) : (
              <span className="text-sm text-gray-600">No image</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#3e2723]">Change Image:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-[#3e2723]">Price</label>
            <input
              type="number"
              value={price}
              placeholder="Enter price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
              onChange={(e) => setprice(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4e342e] hover:bg-[#3e2723] text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default Updatepremium;
