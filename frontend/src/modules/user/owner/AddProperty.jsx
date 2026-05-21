import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import {useNavigate} from "react-router-dom"

axios.defaults.withCredentials = true; 

function AddProperty() {
  const [image, setImage] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: "residential",
    propertyAdType: "rent",
    propertyAddress: "",
    ownerContact: "",
    propertyAmt: 0,
    additionalInfo: "",
  });
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setPropertyDetails((prev) => ({
      ...prev,
      propertyImages: image,
    }));
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("propertyType", propertyDetails.propertyType);
    formData.append("propertyAdType", propertyDetails.propertyAdType);
    formData.append("propertyAddress", propertyDetails.propertyAddress);
    formData.append("ownerContact", propertyDetails.ownerContact);
    formData.append("propertyAmt", propertyDetails.propertyAmt);
    formData.append("additionalInfo", propertyDetails.additionalInfo);

    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append("propertyImages", image[i]);
      }
    }

    try {
      const res = await axios.post(
        "http://localhost:8001/api/owner/postproperty",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        message.success(res.data.message);
        setPropertyDetails({
          propertyType: "residential",
          propertyAdType: "rent",
          propertyAddress: "",
          ownerContact: "",
          propertyAmt: 0,
          additionalInfo: "",
        });
        setImage(null);
      } else {
        message.error(res.data.message || "Unauthorized access");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to add property");
      }
    }
  };;

  return (
  <div className="max-w-5xl mx-auto bg-[#2b221d]/95 border border-[#d6a85c]/20 backdrop-blur-md shadow-2xl rounded-2xl p-8 mt-12 text-stone-100">
    <div className="text-center mb-10">
      <p className="text-[#d6a85c] font-semibold tracking-[0.25em] uppercase text-sm">
        Owner Panel
      </p>

      <h2 className="text-4xl font-extrabold text-stone-100 mt-3 tracking-wide">
        Add New Property
      </h2>

      <p className="text-stone-400 mt-3">
        Create a new rental listing and publish it for renters.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Row 1 */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block font-medium mb-2 text-stone-300">
            Property Type
          </label>
          <select
            name="propertyType"
            value={propertyDetails.propertyType}
            onChange={handleChange}
            className="w-full bg-[#1f1a17] border border-stone-700 rounded-lg px-4 py-3 text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#d6a85c]"
          >
            <option disabled>Choose...</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land/plot">Land/Plot</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2 text-stone-300">
            Property Ad Type
          </label>
          <select
            name="propertyAdType"
            value={propertyDetails.propertyAdType}
            onChange={handleChange}
            className="w-full bg-[#1f1a17] border border-stone-700 rounded-lg px-4 py-3 text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#d6a85c]"
          >
            <option disabled>Choose...</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2 text-stone-300">
            Property Full Address
          </label>
          <input
            type="text"
            name="propertyAddress"
            value={propertyDetails.propertyAddress}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full bg-[#1f1a17] border border-stone-700 rounded-lg px-4 py-3 text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block font-medium mb-2 text-stone-300">
            Property Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            required
            onChange={handleImageChange}
            className="w-full bg-[#1f1a17] border border-stone-700 rounded-lg px-4 py-3 cursor-pointer text-stone-300 file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-[#d6a85c] file:text-[#1f1a17] hover:file:bg-[#c5964b]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-stone-300">
            Owner Contact No.
          </label>
          <input
            type="tel"
            name="ownerContact"
            value={propertyDetails.ownerContact}
            onChange={handleChange}
            placeholder="Contact number"
            required
            className="w-full bg-[#1f1a17] border border-stone-700 rounded-lg px-4 py-3 text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-stone-300">
            Property Amount
          </label>
          <input
            type="number"
            name="propertyAmt"
            value={propertyDetails.propertyAmt}
            onChange={handleChange}
            placeholder="Amount"
            required
            className="w-full bg-[#1f1a17] border border-stone-700 rounded-lg px-4 py-3 text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div>
        <label className="block font-medium mb-2 text-stone-300">
          Additional Details for the Property
        </label>
        <textarea
          name="additionalInfo"
          value={propertyDetails.additionalInfo}
          onChange={handleChange}
          rows={4}
          placeholder="Add any details here..."
          className="w-full bg-[#1f1a17] border border-stone-700 rounded-lg px-4 py-3 text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#d6a85c] placeholder-stone-500"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#d6a85c] text-[#1f1a17] font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-[#c5964b] transition duration-200"
        >
          Submit Form
        </button>
      </div>
    </form>
  </div>
);
}

export default AddProperty;
