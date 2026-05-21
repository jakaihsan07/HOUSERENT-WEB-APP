import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const OwnerAllProperties = () => {
  const [image, setImage] = useState(null);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [editingPropertyData, setEditingPropertyData] = useState({
    propertyType: "",
    propertyAdType: "",
    propertyAddress: "",
    ownerContact: "",
    propertyAmt: 0,
    additionalInfo: "",
  });
  const [allProperties, setAllProperties] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleShow = (property) => {
    setEditingPropertyId(property._id);
    setEditingPropertyData(property);
    setShow(true);
  };

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/owner/getallproperties",
        { withCredentials: true }
      );
      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error("Unauthorized access");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch properties");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingPropertyData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async (propertyId, status) => {
    try {
      const formData = new FormData();
      Object.entries(editingPropertyData).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (image) formData.append("propertyImage", image);
      formData.append("isAvailable", status);

      const res = await axios.patch(
        `http://localhost:8001/api/owner/updateproperty/${propertyId}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        message.success(res.data.message);
        handleClose();
        getAllProperty();
      } else {
        message.error(res.data.message || "Unauthorized access");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to save changes");
      }
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8001/api/owner/deleteproperty/${propertyId}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          message.success(response.data.message);
          getAllProperty();
        } else {
          message.error(response.data.message || "Unauthorized access");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 401) {
          message.error("Session expired, please login again");
          navigate("/login");
        } else {
          message.error("Failed to delete property");
        }
      }
    }
  };


  return (
  <div className="p-6">
    <div className="overflow-x-auto rounded-2xl shadow-2xl border border-[#d6a85c]/20 bg-[#2b221d]/95 backdrop-blur-md">
      <table className="w-full text-sm text-left text-stone-300">
        <thead className="bg-[#d6a85c] text-[#1f1a17]">
          <tr>
            <th className="px-4 py-4 font-bold">Property ID</th>
            <th className="px-4 py-4 text-center font-bold">Property Type</th>
            <th className="px-4 py-4 text-center font-bold">Ad Type</th>
            <th className="px-4 py-4 text-center font-bold">Address</th>
            <th className="px-4 py-4 text-center font-bold">Owner Contact</th>
            <th className="px-4 py-4 text-center font-bold">Amount</th>
            <th className="px-4 py-4 text-center font-bold">Availability</th>
            <th className="px-4 py-4 text-center font-bold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {allProperties.length > 0 ? (
            allProperties.map((property, idx) => (
              <tr
                key={property._id}
                className={`border-b border-[#d6a85c]/10 hover:bg-[#1f1a17]/80 transition duration-200 ${
                  idx % 2 === 0 ? "bg-[#1f1a17]/50" : "bg-[#2b221d]/60"
                }`}
              >
                <td className="px-4 py-4 text-stone-300">{property._id}</td>
                <td className="px-4 py-4 text-center text-stone-100 font-medium">
                  {property.propertyType}
                </td>
                <td className="px-4 py-4 text-center">{property.propertyAdType}</td>
                <td className="px-4 py-4 text-center">{property.propertyAddress}</td>
                <td className="px-4 py-4 text-center">{property.ownerContact}</td>
                <td className="px-4 py-4 text-center font-semibold text-[#d6a85c]">
                  ₹{property.propertyAmt}
                </td>

                <td
                  className={`px-4 py-4 text-center font-bold ${
                    property.isAvailable === "Available"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {property.isAvailable}
                </td>

                <td className="px-4 py-4 flex gap-2 justify-center">
                  <button
                    onClick={() => handleShow(property)}
                    className="px-4 py-2 text-sm border border-[#d6a85c] text-[#d6a85c] rounded-lg hover:bg-[#d6a85c] hover:text-[#1f1a17] transition font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(property._id)}
                    className="px-4 py-2 text-sm border border-red-500 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-8 text-center text-stone-400 italic bg-[#1f1a17]/50"
              >
                No properties available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Edit Modal */}
    {show && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm z-50 px-4">
        <div className="bg-[#2b221d]/95 border border-[#d6a85c]/20 text-stone-100 w-full max-w-xl p-7 rounded-2xl shadow-2xl">
          <div className="mb-6">
            <p className="text-[#d6a85c] font-semibold tracking-[0.2em] uppercase text-sm">
              Edit Listing
            </p>
            <h3 className="text-3xl font-bold mt-2 text-stone-100">
              Edit Property
            </h3>
            <p className="text-stone-400 text-sm mt-2">
              Update property information and save your changes.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveChanges(editingPropertyId, editingPropertyData.isAvailable);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="propertyType"
              value={editingPropertyData.propertyType}
              onChange={handleChange}
              placeholder="Property Type"
              className="border border-stone-700 bg-[#1f1a17] text-stone-100 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
            />

            <input
              type="text"
              name="propertyAdType"
              value={editingPropertyData.propertyAdType}
              onChange={handleChange}
              placeholder="Ad Type"
              className="border border-stone-700 bg-[#1f1a17] text-stone-100 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
            />

            <input
              type="text"
              name="propertyAddress"
              value={editingPropertyData.propertyAddress}
              onChange={handleChange}
              placeholder="Property Address"
              className="border border-stone-700 bg-[#1f1a17] text-stone-100 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
            />

            <input
              type="text"
              name="ownerContact"
              value={editingPropertyData.ownerContact}
              onChange={handleChange}
              placeholder="Owner Contact"
              className="border border-stone-700 bg-[#1f1a17] text-stone-100 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
            />

            <input
              type="number"
              name="propertyAmt"
              value={editingPropertyData.propertyAmt}
              onChange={handleChange}
              placeholder="Property Amount"
              className="border border-stone-700 bg-[#1f1a17] text-stone-100 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
            />

            <textarea
              name="additionalInfo"
              value={editingPropertyData.additionalInfo}
              onChange={handleChange}
              placeholder="Additional Info"
              className="border border-stone-700 bg-[#1f1a17] text-stone-100 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-stone-700 bg-[#1f1a17] text-stone-300 px-4 py-3 w-full rounded-lg cursor-pointer file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-[#d6a85c] file:text-[#1f1a17] hover:file:bg-[#c5964b]"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 border border-stone-600 text-stone-300 rounded-lg hover:bg-[#1f1a17] transition font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-[#d6a85c] text-[#1f1a17] rounded-lg hover:bg-[#c5964b] transition shadow-lg font-bold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  );
};

export default OwnerAllProperties;

