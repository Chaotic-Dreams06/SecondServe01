import { useState } from "react";
import { addListing } from "../ListingService";
import "./AddListingForm.css";

function AddListingForm({ refreshListings }) {
  const [formData, setFormData] = useState({
    eventName: "",
    foodType: "",
    quantity: "",
    location: "",
    contact: "",
    safetyConfirmed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addListing(formData);
    refreshListings();
  };

  return (
    <div className="add-listing-form">
      <h2>Add Food Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="eventName">Event Name</label>
          <input
            id="eventName"
            name="eventName"
            placeholder="Enter event name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="foodType">Food Type</label>
          <input
            id="foodType"
            name="foodType"
            placeholder="e.g. Sandwiches, Desserts"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            placeholder="Number of servings"
            type="number"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            placeholder="Pickup location"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact">Contact Email</label>
          <input
            id="contact"
            name="contact"
            placeholder="you@example.com"
            type="email"
            onChange={handleChange}
            required
          />
        </div>

        <label className="checkbox-field">
          <input type="checkbox" name="safetyConfirmed" onChange={handleChange} />
          Safety Confirmed
        </label>

        <button type="submit" className="button">Add Listing</button>
      </form>
    </div>
  );
}

export default AddListingForm;