import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Event } from "../../interface/Event";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { Calendar, MapPin, Clock, AlertCircle, Home } from "react-feather"; // React Feather icons

const AllEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Fetch all events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        const reversedEvents = response.data.reverse();
        setEvents(reversedEvents);
        setFilteredEvents(reversedEvents);
        setLoading(false);
      } catch (err) {
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search term and location
  useEffect(() => {
    const filtered = events.filter((event) => {
      return (
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (locationFilter === "" || event.location.toLowerCase() === locationFilter.toLowerCase())
      );
    });
    setFilteredEvents(filtered);
  }, [searchTerm, locationFilter, events]);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="bg-gray-50">
      <div className="flex justify-center items-start min-h-screen p-8 w-2/3 mt-16 ml-40">
        {/* Left Side - Search & Filter */}
        <div className="w-1/3 p-6 border shadow-md sticky top-20 bg-white rounded-lg"> {/* Added sticky positioning */}
          <h2 className="text-xl font-bold mb-4">Filter Events</h2>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          {/* Location Filter */}
          <select
            className="w-full p-2 border rounded mb-4"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {[...new Set(events.map((event) => event.location))].map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Right Side - Event List */}
        <div className="w-2/3 ml-10">
          {filteredEvents.length === 0 ? (
            <p className="text-center">No events found.</p>
          ) : (
            <ul className="grid gap-6">
              {filteredEvents.map((event) => (
                <Link key={event._id} to={`event/${event._id}`}>
                  <li className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer gap-4 bg-white">
                    <div className="flex w-full justify-between">
                      <h3 className="text-xl flex items-center">    
                        {event.title}
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <Home className="text-gray-400"/>
                      </div>  
                    </div>
                    <p className="text-gray-700 flex items-center">
                      {event.description}
                    </p>
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
                    <p className="text-gray-600 flex items-center mt-4 bg-orange-200 w-20 p-0.5 rounded-full text-sm">
                      <AlertCircle className="mr-1 ml-1 w-4" />   
                      {formatDistanceToNow(parseISO(event.date))}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AllEvents;
