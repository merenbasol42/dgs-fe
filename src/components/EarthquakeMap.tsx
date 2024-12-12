import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import axios from 'axios'

// Türkiye'nin koordinatları
const TURKEY_CENTER: [number, number] = [39, 35]

interface Earthquake {
  id: string
  location: string
  magnitude: number
  coordinates: [number, number]
  depth: number
  timestamp: string
}

// Deprem büyüklüğüne göre marker rengi ve boyutu
const getMarkerIcon = (magnitude: number) => {
  const size = Math.max(10, magnitude * 7)
  const color = magnitude >= 5 ? 'red' : 
                magnitude >= 4 ? 'orange' : 
                magnitude >= 3 ? 'yellow' : 'green'

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px; 
        height: ${size}px; 
        background-color: ${color}; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        color: black; 
        font-weight: bold;
        border: 2px solid rgba(0,0,0,0.3);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      ">
        ${magnitude.toFixed(1)}
      </div>
    `,
    iconSize: [size, size],
  })
}

const EarthquakeMap: React.FC = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        // Kandilli Rasathanesi API'si
        const response = await axios.get(
          'https://api.orhanaydogdu.com.tr/deprem/son-depremler'
        )
        
        const filteredEarthquakes = response.data.result
          .filter((eq: any) => 
            eq.mag >= 2.5 && // Sadece 2.5 üzeri depremleri göster
            eq.lat && eq.lng // Koordinatları olan depremleri al
          )
          .map((eq: any): Earthquake => ({
            id: eq.id,
            location: eq.location,
            magnitude: eq.mag,
            coordinates: [eq.lat, eq.lng],
            depth: eq.depth,
            timestamp: eq.date
          }))
          .slice(0, 50) // İlk 50 depremi göster

        setEarthquakes(filteredEarthquakes)
        setLoading(false)
      } catch (err) {
        // Hata durumunda statik veriler kullanılacak
        const sampleEarthquakes: Earthquake[] = [
          { 
            id: '1', 
            location: 'İstanbul', 
            magnitude: 4.5, 
            coordinates: [41.0082, 28.9784],
            depth: 10,
            timestamp: new Date().toISOString()
          },
          { 
            id: '2', 
            location: 'Ankara', 
            magnitude: 3.2, 
            coordinates: [39.9334, 32.8597],
            depth: 15,
            timestamp: new Date().toISOString()
          },
          { 
            id: '3', 
            location: 'İzmir', 
            magnitude: 5.1, 
            coordinates: [38.4237, 27.1428],
            depth: 8,
            timestamp: new Date().toISOString()
          }
        ]

        setEarthquakes(sampleEarthquakes)
        setError('Canlı deprem verileri yüklenemedi. Örnek veriler gösteriliyor.')
        setLoading(false)
      }
    }

    fetchEarthquakes()
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000) // 5 dakikada bir güncelle

    return () => clearInterval(interval)
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center h-[600px]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-primary-500"></div>
    </div>
  )

  return (
    <div className="relative">
      {error && (
        <div className="absolute top-2 left-2 z-10 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
      <MapContainer 
        center={TURKEY_CENTER} 
        zoom={6} 
        scrollWheelZoom={true} 
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {earthquakes.map((earthquake) => (
          <Marker
            key={earthquake.id}
            position={earthquake.coordinates}
            icon={getMarkerIcon(earthquake.magnitude)}
          >
            <Popup>
              <div>
                <strong>Konum:</strong> {earthquake.location}<br />
                <strong>Büyüklük:</strong> {earthquake.magnitude}<br />
                <strong>Derinlik:</strong> {earthquake.depth} km<br />
                <strong>Tarih:</strong> {new Date(earthquake.timestamp).toLocaleString()}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default EarthquakeMap
