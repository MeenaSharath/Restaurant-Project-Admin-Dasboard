import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Updateorder = () => {
  const { id } = useParams()
  const [productid, setproductid] = useState('')
  const [ordername, setordername] = useState('')
  const [customername, setcustomername] = useState('')
  const [orderstatus, setorderstatus] = useState('')
  const [deliverdtime, setdeliverdtime] = useState('')
  const [price, setprice] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('https://restaurant-website-eazx.onrender.com/getorder/' + id)
      .then(result => {
        setproductid(result.data.productid)
        setordername(result.data.ordername)
        setcustomername(result.data.customername)
        setorderstatus(result.data.orderstatus)
        setdeliverdtime(result.data.deliverdtime)
        setprice(result.data.price)
      })
      .catch(err => console.log(err))
  }, [id])

  const update = (e) => {
    e.preventDefault()
    axios.put("https://restaurant-website-eazx.onrender.com/updateorder/" + id, {
      productid,
      ordername,
      customername,
      orderstatus,
      deliverdtime,
      price
    })
      .then(() => navigate("/order"))
      .catch(err => console.log(err))
  }

  return (
    <div className="flex min-h-screen justify-center items-center bg-amber-50 px-4">
      <div className="w-full max-w-xl bg-white border border-amber-300 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-amber-800 mb-8">Edit Order</h2>
        <form onSubmit={update} className="space-y-5">
          <div>
            <label className="block mb-1 text-amber-700 font-medium">Product ID</label>
            <input
              type="number"
              value={productid}
              onChange={(e) => setproductid(e.target.value)}
              placeholder="Enter product ID"
              className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-amber-700 font-medium">Order Name</label>
            <input
              type="text"
              value={ordername}
              onChange={(e) => setordername(e.target.value)}
              placeholder="Enter order name"
              className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-amber-700 font-medium">Customer Name</label>
            <input
              type="text"
              value={customername}
              onChange={(e) => setcustomername(e.target.value)}
              placeholder="Enter customer name"
              className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-amber-700 font-medium">Order Status</label>
            <select
              value={orderstatus}
              onChange={(e) => setorderstatus(e.target.value)}
              className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-amber-700 font-medium">Delivered Time</label>
            <input
              type="time"
              value={deliverdtime}
              onChange={(e) => setdeliverdtime(e.target.value)}
              className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-amber-700 font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              placeholder="Enter price"
              className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 rounded transition duration-300"
          >
            Update Order
          </button>
        </form>
      </div>
    </div>
  )
}

export default Updateorder
