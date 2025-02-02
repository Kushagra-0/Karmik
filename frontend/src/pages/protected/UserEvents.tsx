import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Event } from "../../interface/Event";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, AlertCircle, Trash2 } from "react-feather"; // Trash icon for delete
import { format, formatDistanceToNow, parseISO } from "date-fns"; // for date formatting

const MyEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null); // Store event ID for deletion
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        if (!userId) {
          console.error("User ID not found");
          return;
        }

        const response = await axios.get<Event[]>(`http://localhost:5000/api/events/user/${userId}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching user events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [userId]);

  const handleDelete = async () => {
    if (deleteEventId) {
      try {
        await axios.delete(`http://localhost:5000/api/events/event/${deleteEventId}`);
        setEvents(events.filter(event => event._id !== deleteEventId)); // Remove the event from state
        setShowModal(false); // Close the modal after deletion
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleDeleteClick = (eventId: string) => {
    setDeleteEventId(eventId); // Set the event ID to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  return (
    <>
      <Navbar /> {/* Include Navbar */}
      <div className="bg-gray-50">
      <div className="flex justify-center min-h-screen p-8 w-full mt-16">
        <div className="w-1/3">
          {loading ? (
            <p className="text-center text-gray-700 text-lg">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">You have no events.</p>
          ) : (
            <ul className="flex gap-6 flex-col bg-white">
              {events.map((event) => (
                <div key={event._id} className="relative">
                  <Link to={`http://localhost:5173/events/event/${event._id}`}>
                    <li className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer">
                      <h3 className="text-xl flex items-center">{event.title}</h3>
                      <p className="text-gray-700 flex items-center">{event.description}</p>
                      <div className="flex flex-row mt-4">
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="mr-1 w-4" />
                          {event.location}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <Calendar className="mr-1 ml-5 w-4" />
                          {format(parseISO(event.date), "d MMM, yyyy")}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <Clock className="mr-1 ml-5 w-4" />
                          {event.time}
                        </p>
                      </div>
                      <p className="text-gray-600 flex items-center mt-4 bg-orange-200 w-24 p-0.5 rounded-full text-sm">
                        <AlertCircle className="mr-1 ml-1 w-4" />
                        {formatDistanceToNow(parseISO(event.date), { addSuffix: true })}
                      </p>
                    </li>
                  </Link>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteClick(event._id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this event?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)} // Close modal without deleting
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete} // Proceed with deletion
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default MyEvents;
