import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { baseUrl } from "../common/constants";

const AddEvent: React.FC = () => {
  const { userId } = useAuth();

  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    foodType: "",
    pickupInstructions: "",
    eventType: "",
    terms: false,
    userId: userId
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [hasEvent, setHasEvent] = useState(false);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/events/user/${userId}`);
        if (response.data.length > 0) {
          setHasEvent(true);
        }
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEventDetails(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleOpenModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasEvent) {
      handleConfirm();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = async () => {
    if (!hasEvent) {
      if (!userName.trim()) {
        console.log("Please enter your name before submitting.");
        return;
      }
      try {
        await axios.put(`${baseUrl}/api/users/update-name/${userId}`, {
          name: userName,
        });
      } catch(err) {
        console.error(err);
      }
    }

    setIsModalOpen(false);

    try {
      const response = await axios.post(
        `${baseUrl}/api/events/create`,
        eventDetails
      );

      alert("Event created successfully!");
      setEventDetails({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        foodType: "",
        pickupInstructions: "",
        eventType: "",
        terms: false,
        userId: userId,
      });
      setUserName("");
      console.log(response);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-lg mt-16">
        
        <form onSubmit={handleOpenModal} className="space-y-4 md:space-y-6">
          {/* Form Fields - Mobile & Desktop Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Event Title</label>
              <input
                type="text"
                name="title"
                value={eventDetails.title}
                onChange={handleChange}
                required
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
                placeholder="Enter event title"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
                required
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
                placeholder="Describe your event"
                rows={3}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={eventDetails.location}
                onChange={handleChange}
                required
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
                placeholder="Event location"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={eventDetails.date}
                onChange={handleChange}
                required
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Time</label>
              <input
                type="time"
                name="time"
                value={eventDetails.time}
                onChange={handleChange}
                required
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Food Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Food Type</label>
              <select
                name="foodType"
                value={eventDetails.foodType}
                onChange={handleChange}
                required
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select food type</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
              </select>
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Event Type</label>
              <select
                name="eventType"
                value={eventDetails.eventType}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select event type</option>
                <option value="wedding">Wedding</option>
                <option value="conference">Conference</option>
                <option value="community">Community Meal</option>
              </select>
            </div>

            {/* Pickup Instructions */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Pickup Instructions</label>
              <textarea
                name="pickupInstructions"
                value={eventDetails.pickupInstructions}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
                placeholder="Enter pickup instructions (optional)"
                rows={2}
              />
            </div>

            {/* Terms & Conditions */}
            <div className="md:col-span-2">
              <label className="inline-flex items-center text-gray-700 font-semibold">
                <input
                  type="checkbox"
                  name="terms"
                  checked={eventDetails.terms}
                  onChange={handleChange}
                  required
                  className="mr-2"
                />
                I agree to the terms and conditions
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full md:w-auto bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && !hasEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Set Up Your Profile
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Please enter your name to start creating events
            </p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Your Name"
              required
            />
            <div className="flex justify-center space-x-4">
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-600 text-white py-2 px-4 rounded-lg"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEvent;