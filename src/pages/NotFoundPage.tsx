import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Sayfa Bulunamadı</h1>
      <p className="mb-4">Aradığınız sayfa mevcut değil.</p>
      <Link 
        to="/" 
        className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  )
}
