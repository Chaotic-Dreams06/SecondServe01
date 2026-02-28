import { db } from "./firebase";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

export const addListing = async (data) => {
  try {
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
  try {
    const querySnapshot = await getDocs(collection(db, "listings"));
    const listings = [];

    querySnapshot.forEach((doc) => {
      listings.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

export const updateListingStatus = async (id, newStatus) => {
  const listingRef = doc(db, "listings", id);
  await updateDoc(listingRef, {
    status: newStatus
  });
};