import { useEffect, useState } from "react";
import { getListings } from "./ListingService";
import AddListingForm from "./components/AddListingForm";
import ListingCard from "./components/ListingCard";
import './index.css';

function App() {
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    const data = await getListings();
    setListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="container">
      {/* Floating blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* Animated Gradient Header */}
      <header className="header">
        <h1>SecondServe</h1>
      </header>

      {/* Add Listing Form */}
      <AddListingForm refreshListings={fetchListings} />

      {/* Listings */}
      <section>
        <h2>Available Listings</h2>
        <div className="card-list">
          {listings.map(item => (
            <ListingCard key={item.id} item={item} refreshListings={fetchListings} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;