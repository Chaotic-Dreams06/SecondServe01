import { db } from "./firebase";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

// maintain a local copy of listings so UI reflects added items while using samples
const initialSamples = [
  {
    id: "sample-1",
    eventName: "Tech Conference 2026",
    foodType: "Sandwiches & Wraps",
    quantity: 25,
    originalQuantity: 25,
    location: "Convention Center, Downtown",
    contact: "tech@example.com",
    status: "available",
    safetyConfirmed: true,
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop",
    createdAt: new Date(),
    expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000)
  },
  {
    id: "sample-3",
    eventName: "Corporate Lunch",
    foodType: "Salads & Fresh Bowls",
    quantity: 30,
    originalQuantity: 30,
    location: "Business Park, Mid-town",
    contact: "corporate@example.com",
    status: "available",
    safetyConfirmed: true,
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=400&h=300&fit=crop",
    createdAt: new Date(),
    expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000)
  },
  {
    id: "sample-4",
    eventName: "Charity Gala",
    foodType: "Appetizers & Canapés",
    quantity: 50,
    originalQuantity: 50,
    location: "Grand Hotel, Downtown",
    contact: "charity@example.com",
    status: "available",
    safetyConfirmed: true,
    image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?w=400&h=300&fit=crop",
    createdAt: new Date(),
    expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000)
  },
  {
    id: "sample-5",
    eventName: "Community Gathering",
    foodType: "Pizza & Pasta",
    quantity: 35,
    originalQuantity: 35,
    location: "Community Center, Eastside",
    contact: "community@example.com",
    status: "available",
    safetyConfirmed: true,
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop",
    createdAt: new Date(),
    expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000)
  }
];

// local list that will be returned by getListings() and updated when a new item is added
let localListings = [...initialSamples];

export const addListing = async (data) => {
  try {
    // push to local cache so UI updates immediately
    const newItem = {
      id: `local-${Date.now()}`,
      eventName: data.eventName,
      foodType: data.foodType,
      quantity: data.quantity,
      originalQuantity: data.quantity,
      location: data.location,
      contact: data.contact,
      safetyConfirmed: data.safetyConfirmed,
      status: "available",
      image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop",
      createdAt: new Date(),
      expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000)
    };
    localListings.push(newItem);

    // also attempt to save in Firebase (optional)
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 4);

    await addDoc(collection(db, "listings"), {
      eventName: data.eventName,
      foodType: data.foodType,
      quantity: data.quantity,
      location: data.location,
      contact: data.contact,
      safetyConfirmed: data.safetyConfirmed,
      status: "available",
      createdAt: Timestamp.now(),
      expiryTime: Timestamp.fromDate(expiryTime)
    });
  } catch (error) {
    console.error("Error adding listing:", error);
  }
};

export const getListings = async () => {
  // return the current in-memory list; no network call needed for samples
  return [...localListings];
};

export const updateListingStatus = async (id, newStatus) => {
  // update in local cache as well
  const idx = localListings.findIndex(l => l.id === id);
  if (idx !== -1) {
    // Check if this is a reservation status (format: "reserved-X")
    if (newStatus.startsWith("reserved-")) {
      const reservedCount = parseInt(newStatus.substring(9)); // extract X from "reserved-X"
      const remainingQuantity = localListings[idx].quantity - reservedCount;
      
      // Update quantity and status based on remaining quantity
      localListings[idx].quantity = Math.max(0, remainingQuantity);
      localListings[idx].status = remainingQuantity > 0 ? "available" : "reserved";
    } else {
      localListings[idx].status = newStatus;
    }
  }
  try {
    const listingRef = doc(db, "listings", id);
    let updatePayload = { status: newStatus };
    
    // Also update quantity in Firebase if this is a reservation
    if (newStatus.startsWith("reserved-")) {
      const idx = localListings.findIndex(l => l.id === id);
      if (idx !== -1) {
        updatePayload.quantity = localListings[idx].quantity;
        updatePayload.status = localListings[idx].status;
      }
    }
    
    await updateDoc(listingRef, updatePayload);
  } catch (e) {
    // ignore if sample entry
    console.warn("Unable to update firebase status (possibly sample)", e);
  }
};