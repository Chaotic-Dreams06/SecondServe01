import { useState } from "react";
import { updateListingStatus } from "../ListingService";
import EventMenuCard from "./EventMenuCard";
import "./ListingCard.css";

function ListingCard({ item, refreshListings }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reserveQuantity, setReserveQuantity] = useState(1);
  const [showReserveInput, setShowReserveInput] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleReserveClick = (e) => {
    e.stopPropagation();
    setShowReserveInput(true);
  };

  const handleReserve = async () => {
    if (reserveQuantity <= 0 || reserveQuantity > item.quantity) {
      alert(`Please enter a valid quantity between 1 and ${item.quantity}`);
      return;
    }
    await updateListingStatus(item.id, `reserved-${reserveQuantity}`);
    setShowReserveInput(false);
    setReserveQuantity(1);
    refreshListings();
  };

  const handleCancelReserve = () => {
    setShowReserveInput(false);
    setReserveQuantity(1);
  };

  return (
    <>
      <div className="card" onClick={handleCardClick}>
        {item.image && (
          <div className="card-image-container">
            <img src={item.image} alt={item.foodType} className="card-image" />
          </div>
        )}
        <h3>{item.eventName}</h3>
        <p><strong>Food:</strong> {item.foodType}</p>
        <p>
          <strong>Available:</strong> {item.quantity} / {item.originalQuantity}
          {item.originalQuantity - item.quantity > 0 && (
            <span className="quantity-reserved"> (Reserved: {item.originalQuantity - item.quantity})</span>
          )}
        </p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Status:</strong> {item.status}</p>

        {item.status === "available" && (
          <>
            {!showReserveInput ? (
              <button 
                className="button" 
                onClick={handleReserveClick}
              >
                Reserve
              </button>
            ) : (
              <div className="reserve-section">
                <label htmlFor="reserve-qty">How many do you want to reserve?</label>
                <div className="reserve-input-group">
                  <input 
                    id="reserve-qty"
                    type="number" 
                    min="1" 
                    max={item.quantity}
                    value={reserveQuantity}
                    onChange={(e) => setReserveQuantity(parseInt(e.target.value) || 1)}
                    className="reserve-input"
                  />
                  <span className="reserve-max">/ {item.quantity}</span>
                </div>
                <div className="reserve-button-group">
                  <button 
                    className="button button-confirm" 
                    onClick={handleReserve}
                  >
                    Confirm Reserve
                  </button>
                  <button 
                    className="button button-cancel" 
                    onClick={handleCancelReserve}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <EventMenuCard 
        item={item} 
        refreshListings={refreshListings}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default ListingCard;