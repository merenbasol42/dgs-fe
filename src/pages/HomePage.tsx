import React, { useState } from 'react'
import EarthquakeMap from '../components/EarthquakeMap'

export default function HomePage() {
  const [showMap, setShowMap] = useState(true)

  const colorCodes = [
    { 
      color: 'bg-green-500', 
      range: '2.5 - 3.0', 
      description: 'Düşük Şiddet' 
    },
    { 
      color: 'bg-yellow-500', 
      range: '3.0 - 4.0', 
      description: 'Orta Şiddet' 
    },
    { 
      color: 'bg-orange-500', 
      range: '4.0 - 5.0', 
      description: 'Yüksek Şiddet' 
    },
    { 
      color: 'bg-red-500', 
      range: '5.0 ve Üzeri', 
      description: 'Çok Yüksek Şiddet' 
    }
  ]

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Türkiye Deprem İzleme Sistemi
        </h1>
        <button 
          onClick={() => setShowMap(!showMap)}
          className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors dark:bg-dark-primary dark:hover:bg-dark-secondary"
        >
          {showMap ? 'Haritayı Gizle' : 'Haritayı Göster'}
        </button>
      </div>
      
      {showMap && (
        <div className="bg-white dark:bg-dark-primary shadow-lg rounded-lg overflow-hidden mb-6">
          <EarthquakeMap />
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-dark-secondary p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Deprem Renk Kodu Açıklaması
          </h2>
          <div className="space-y-4">
            {colorCodes.map((item) => (
              <div key={item.range} className="flex items-center space-x-4">
                <div 
                  className={`
                    w-10 h-10 rounded-full 
                    ${item.color}
                    border-4 border-white 
                    shadow-md 
                    flex items-center justify-center
                  `}
                ></div>
                <div>
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {item.range}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-dark-secondary p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Deprem Bilgilendirmesi
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Bu harita, Kandilli Rasathanesi'nin sağladığı güncel deprem verilerini 
            kullanmaktadır. Haritada 2.5 büyüklüğü ve üzerindeki depremler 
            gösterilmektedir.
          </p>
          <div className="flex items-center space-x-2 bg-primary-100 dark:bg-dark-primary p-3 rounded">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-primary-500 dark:text-primary-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            <span className="text-primary-700 dark:text-primary-200">
              Deprem anında panik yapmayın, sakin ve hazırlıklı olun.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
