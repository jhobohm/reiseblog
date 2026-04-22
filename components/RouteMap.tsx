"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { posts } from "../data/posts";

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
  iconSize: [30, 48], // 👈 größer
  iconAnchor: [15, 48],
});

const routePosts = [...posts].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

const routePositions = routePosts.map(
  (post) => [post.coords.lat, post.coords.lng] as [number, number]
);

const sortedByDateDesc = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const currentPost = sortedByDateDesc[0];

export default function RouteMap() {
  const scrollToPost = (postId: number) => {
    const el = document.getElementById(`post-${postId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border">
      <MapContainer
        center={[52.52, 13.405]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={routePositions} />

        {routePosts.map((post) => (
         <Marker key={post.id} position={[post.coords.lat, post.coords.lng]} icon={post.id === currentPost.id ? currentIcon : markerIcon}>
            <Popup>
              <div>
                {post.id === currentPost.id && (
                 <div style={{ fontSize: "0.8rem", color: "#b56e4d" }}>
                  Aktueller Standort
                </div>
                )}
                <strong>{post.title}</strong>
                <br />
                {post.location} – {post.date}
                <br />
                <button type="button" onClick={() => scrollToPost(post.id)} className="map-popup-button">Zum Beitrag springen</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}