"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

type MapPost = {
  _id: string;
  title: string;
  date: string;
  location?: string;
  slug?: string;
  coords: {
    lat: number;
    lng: number;
  };
};

type RouteMapProps = {
  posts: MapPost[];
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const currentIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 48],
  iconAnchor: [15, 48],
});

export default function RouteMap({ posts }: RouteMapProps) {
  if (!posts.length) return null;

  const sortedByDateAsc = [...posts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const sortedByDateDesc = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const currentPost = sortedByDateDesc[0];

  const routePositions = sortedByDateAsc.map(
    (post) => [post.coords.lat, post.coords.lng] as [number, number]
  );

  const scrollToPost = (postId: string) => {
    const el = document.getElementById(`post-${postId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const first = sortedByDateAsc[0];

  return (
    <div className="overflow-hidden rounded-xl border">
      <MapContainer
        center={[first.coords.lat, first.coords.lng]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={routePositions} />

        {sortedByDateAsc.map((post) => (
          <Marker
            key={post._id}
            position={[post.coords.lat, post.coords.lng]}
            icon={post._id === currentPost._id ? currentIcon : markerIcon}
          >
            <Popup>
              <div>
                {post._id === currentPost._id && (
                  <div style={{ fontSize: "0.8rem", color: "#b56e4d" }}>
                    Aktueller Standort
                  </div>
                )}
                <strong>{post.title}</strong>
                <br />
                {post.location} · {post.date}
                <br />
                <button
                  type="button"
                  onClick={() => scrollToPost(post._id)}
                  className="map-popup-button"
                >
                  Zum Beitrag springen
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}