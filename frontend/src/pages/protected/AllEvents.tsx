import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Event } from "../../interface/Event";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { Calendar, MapPin, Clock, AlertCircle, Home, Filter, X } from "react-feather";

const AllEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  
  // New state for mobile filter toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  // Mobile filter component
  const MobileFilter = () => (
    <div className="md:hidden fixed inset-0 z-50 bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={() => setIsMobileFilterOpen(false)}
          className="text-gray-600"
        >
          <X />
        </button>
      </div>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={mobileSearchTerm}
        onChange={(e) => setMobileSearchTerm(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
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

      <button 
        onClick={() => {
          setSearchTerm(mobileSearchTerm)
          setIsMobileFilterOpen(false)
        }}
        className="w-full bg-orange-200 text-black p-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="bg-gray-50">
        {/* Mobile Filter Button */}
        <div className="md:hidden pt-24">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center ml-12  rounded-full p-2 bg-orange-200 justify-center w-52 shadow-md"
          >
            <Filter className="mr-2" />
            Open Filters
          </button>
        </div>

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && <MobileFilter />}

        {loading ? (
          <div className="min-h-screen flex justify-center items-center">
            <div className="spinner-border animate-spin w-5 h-5 border-4 border-gray-700 rounded-full border-t-transparent" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-start min-h-screen p-4 md:p-8 md:w-2/3 mt-16 md:ml-20 lg:ml-36 xl:ml-56">
            {/* Desktop Filter Sidebar - Hidden on mobile */}
            <div className="hidden md:block w-1/3 p-6 border shadow-md sticky top-20 bg-white rounded-lg">
              <div className="flex flex-row justify-center">
                <Filter className="w-5 mr-1"/>
                <h2 className="text-base font-medium mb-4">Filters</h2>
              </div>  

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

            {/* Event List */}
            <div className="w-full lg:w-2/3 md:ml-10">
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
                        <div className="flex flex-col md:flex-row mt-4 space-y-2 md:space-y-0">
                          <p className="text-gray-600 flex items-center mr-4">
                            <MapPin className="mr-1 w-4" />
                            {event.location}
                          </p>
                          <p className="text-gray-600 flex items-center mr-4">
                            <Calendar className="mr-1 w-4" />   
                            {format(parseISO(event.date), "d MMM, yyyy")}
                          </p>
                          <p className="text-gray-600 flex items-center">
                            <Clock className="mr-1 w-4" />
                            {event.time}
                          </p>
                        </div>
                        <p className="text-gray-600 inline-flex items-center mt-4 bg-orange-200 p-0.5 rounded-full text-sm whitespace-nowrap pr-2">
                          <AlertCircle className="mr-1 ml-1 w-4" />
                          {formatDistanceToNow(parseISO(event.date), { addSuffix: true })}
                        </p>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;