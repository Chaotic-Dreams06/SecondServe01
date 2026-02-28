import { useState } from "react";
import { updateListingStatus } from "../ListingService";
import EventMenuCard from "./EventMenuCard";
import "./ListingCard.css";

function ListingCard({ item, refreshListings }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleReserve = async () => {
    await updateListingStatus(item.id, "reserved");
    refreshListings();
  };

  return (
    <>
      <div className="card" onClick={handleCardClick}>
        <h3>{item.eventName}</h3>
        <p><strong>Food:</strong> {item.foodType}</p>
        <p><strong>Quantity:</strong> {item.quantity}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Status:</strong> {item.status}</p>

        {item.status === "available" && (
          <button 
            className="button" 
            onClick={(e) => {
              e.stopPropagation();
              handleReserve();
            }}
          >
            Reserve
          </button>
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