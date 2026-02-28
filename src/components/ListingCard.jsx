import { updateListingStatus } from "../ListingService";
import "./ListingCard.css";

function ListingCard({ item, refreshListings }) {
  const handleReserve = async () => {
    await updateListingStatus(item.id, "reserved");
    refreshListings();
  };

  return (
    <div className="card">
      <h3>{item.eventName}</h3>
      <p><strong>Food:</strong> {item.foodType}</p>
      <p><strong>Quantity:</strong> {item.quantity}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Status:</strong> {item.status}</p>

      {item.status === "available" && (
        <button className="button" onClick={handleReserve}>Reserve</button>
      )}
    </div>
  );
}

export default ListingCard;