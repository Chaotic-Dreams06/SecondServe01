import { useEffect, useState } from "react";
import { getListings } from "./ListingService";
import AddListingForm from "./components/AddListingForm";
import ListingCard from "./components/ListingCard";
import './index.css';

function App() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      const data = await getListings();
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>SecondServe</h1>
        <p>Reduce Food Waste, Save Money</p>
      </header>

      {/* Add Listing Form */}
      <AddListingForm refreshListings={fetchListings} />

      {/* Listings Section */}
      <section>
        <h2>Available Listings</h2>
        <p>Browse and reserve food from nearby events</p>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#718096', fontSize: '1.1rem' }}>Loading listings...</p>
          </div>
        ) : listings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#718096', fontSize: '1.1rem' }}>No listings yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="card-list">
            {listings.map(item => (
              <ListingCard key={item.id} item={item} refreshListings={fetchListings} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', color: '#718096' }}>
        <p>© 2024 SecondServe. Reducing food waste, one event at a time.</p>
      </footer>
    </div>
  );
}

export default App;