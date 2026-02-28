import { useState } from "react";
import { updateListingStatus } from "../ListingService";
import "./EventMenuCard.css";

function EventMenuCard({ item, refreshListings, isOpen, onClose }) {
  const [isReserving, setIsReserving] = useState(false);

  // Sample food items with pricing
  const foodItems = [
    {
      id: 1,
      name: "Main Course Special",
      price: 25
    },
    {
      id: 2,
      name: "Appetizer Combo",
      price: 20
    },
    {
      id: 3,
      name: "Dessert Platter",
      price: 15
    },
    {
      id: 4,
      name: "Beverage Package",
      price: 10
    }
  ];

  const calculateSavings = (actual, offer) => {
    return Math.round(((actual - offer) / actual) * 100);
  };

  const handleReserve = async () => {
    setIsReserving(true);
    try {
      await updateListingStatus(item.id, "reserved");
      refreshListings();
      onClose();
    } catch (error) {
      console.error("Error reserving listing:", error);
    } finally {
      setIsReserving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="event-info">
            <h2>{item.eventName}</h2>
            <p className="location">📍 {item.location}</p>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Food Items Grid */}
        <div className="modal-body">
          <h3>Available Items</h3>
          <div className="food-items">
            {foodItems.map((food) => (
              <div key={food.id} className="food-item">
                <div className="item-header">
                  <h4>{food.name}</h4>
                </div>
                
                <div className="price-section">
                  <div className="price">
                    <span className="offer-price">₹{food.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          {item.status === "available" && (
            <button 
              className="btn btn-primary" 
              onClick={handleReserve}
              disabled={isReserving}
            >
              {isReserving ? "Reserving..." : "Reserve Event"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventMenuCard;
