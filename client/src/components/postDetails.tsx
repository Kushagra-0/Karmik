import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';


// Fix Leaflet marker icon issue
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
    iconUrl: 'leaflet/dist/images/marker-icon.png',
    shadowUrl: 'leaflet/dist/images/marker-shadow.png',
  });

const PostDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`);
                setPost(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    const customIcon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png', // URL to default marker icon
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    });

    const position: LatLngTuple = [post.location.lat, post.location.lng];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-6 mt-20 px-28">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-3xl font-bold text-black">Heading</p>
                    <p className="text-xl text-black mb-8">{post.heading}</p>
                    <p className="text-3xl font-bold text-black">Contact Number</p>
                    <p className="text-xl text-black mb-8">{post.phoneNumber}</p>
                    <p className="text-3xl font-bold text-black">City</p>
                    <p className="text-xl text-black mb-8">{post.city}</p>
                    <p className="text-3xl font-bold text-black">Description</p>
                    <p className="text-xl text-black mb-8">{post.description}</p>
                    <p className="text-3xl font-bold text-black">User</p>
                    <p className="text-xl text-black mb-8">{post.createdBy.username}</p>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-black">Location</h2>
                        <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position} icon={customIcon}>
                                <Popup>
                                    {post.heading} <br /> {post.phoneNumber}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetails;
