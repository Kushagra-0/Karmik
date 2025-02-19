import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Calendar, MapPin, Clock, Home } from "react-feather"; 
import { format, parseISO } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import { baseUrl } from "../../common/constants";

const Event = () => {
  const { eventId } = useParams<{ eventId: string }>(); 
  const [event, setEvent] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { userId } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/events/event/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load event details");
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleContact = async() => {
    try {
      const response = await axios.post(`${baseUrl}/api/conversation`, {
        senderId: userId,
        receiverId: event.userId,  // Assuming event.ownerId holds the event creator's ID
      });
  
      if (response.status === 200) {
        navigate(`/chat`); // Redirect to chat page with conversation ID
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      alert("Failed to create conversation. Please try again.");
    }
  }

  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {loading ? (
          <div className="min-h-screen flex justify-center items-center">
            <div className="spinner-border animate-spin w-5 h-5 border-4 border-gray-700 rounded-full border-t-transparent" />
          </div>
        ) : (
          <>
          <div className="pt-24 font-semibold text-4xl flex justify-center">{event.title} event</div>
        <div className="p-8 w-1/2 mx-auto bg-white rounded-lg shadow-lg mt-8">
          <div className="flex w-full justify-between">
            <h2 className="text-2xl flex items-center font-semibold">{event.title}</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Home className="text-gray-400"/>
            </div>  
          </div>
          <p className="text-lg text-gray-700 mb-6">{event.description}</p>

          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4" />
            <span>{event.location}</span>
          </div>

          <div className="flex flex-row mt-10">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-row text-gray-600">
                <Calendar className="w-3 mr-2" />
                <span className="text-sm">DATE OF EVENT</span>
              </div>
              <span>{format(parseISO(event.date), "d MMM, yyyy")}</span>
            </div>
            <div className="flex flex-col items-center justify-center ml-12">
              <div className="flex flex-row text-gray-600">
                <Clock className="w-3 mr-2" />
                <div className="text-sm">TIME OF EVENT</div>
              </div>
              <span>{event.time}</span>
            </div>
            <div className="flex flex-col items-center justify-center ml-12">
              <div className="flex flex-row text-gray-600">
                <Clock className="w-3 mr-2" />
                <div className="text-sm">TYPE OF EVENT</div>
              </div>
              <span>{event.eventType}</span>
            </div>
          </div>
          
          <hr className="mt-10"/>
          <div className="items-center mt-10">
            <div className="text-lg font-semibold">Additional Information</div>
            <div className="font-normal text-gray-700 mt-4">{event.pickupInstructions || "N/A"}</div>
          </div>
          <hr className="mt-10"/>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleContact}
              className="inline-block bg-orange-600 text-white px-6 py-2 rounded-full text-center hover:bg-orange-700"
            >
              Contact Now
            </button>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Event;