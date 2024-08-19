import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LeafletMouseEvent } from 'leaflet';

interface LatLng {
    lat: number;
    lng: number;
}

interface MapSelectorProps {
    onLocationSelect: (location: LatLng) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ onLocationSelect }) => {
    const [position, setPosition] = useState<LatLng | null>(null);

    const LocationMarker = () => {
        useMapEvents({
            click(e: LeafletMouseEvent) {
                const { lat, lng } = e.latlng;
                const newPosition = { lat, lng };
                setPosition(newPosition);
                onLocationSelect(newPosition);
            },
        });

        // Define a custom icon
        const customIcon = new L.Icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png', // URL to default marker icon
            iconSize: [25, 41], // size of the icon
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        });

        return position === null ? null : (
            <Marker position={position} icon={customIcon}></Marker>
        );
    };

    return (
        <MapContainer
            className='z-0'
            center={[51.505, -0.09] as [number, number]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    );
};

export default MapSelector;
