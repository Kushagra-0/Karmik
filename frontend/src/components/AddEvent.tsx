import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AddEvent = () => {
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
        const response = await axios.get(`http://localhost:5000/api/events/user/${userId}`);
        if (response.data.length > 0) {
          setHasEvent(true);
        }
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleOpenModal = (e: any) => {
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
      } else {
        try {
          await axios.put(`http://localhost:5000/api/users/update-name/${userId}`, {
            name: userName,
          })
        } catch(err) {
          console.error(err);
        }
      }
    }

    setIsModalOpen(false); // Close modal before submitting

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events/create",
        eventDetails
      );

      console.log("Event created successfully:", response.data);
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
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <>
    <div className="container px-4 py-8">
      <h2 className="text-center text-2xl font-bold mb-6">Create Event</h2>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleOpenModal} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Event Title</label>
            <input
              type="text"
              name="title"
              value={eventDetails.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={eventDetails.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={eventDetails.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={eventDetails.time}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select event type</option>
              <option value="wedding">Wedding</option>
              <option value="conference">Conference</option>
              <option value="community">Community Meal</option>
            </select>
          </div>

          {/* Pickup Instructions */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Pickup Instructions</label>
            <textarea
              name="pickupInstructions"
              value={eventDetails.pickupInstructions}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Terms & Conditions */}
          <div>
            <label className="inline-flex items-center text-gray-700 font-semibold mb-2">
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && !hasEvent && (
        <div className="h-screen fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to start creating events?</h3>
            <div className="mt-12">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg mr-4"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AddEvent;
