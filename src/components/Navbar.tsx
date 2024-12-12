import { Link } from 'react-router-dom'
import { useAppStore } from '../stores/app-store'

export default function Navbar() {
  const { theme, toggleTheme } = useAppStore()

  return (
    <nav className={`
      ${theme === 'dark' ? 'bg-dark-primary text-dark-text' : 'bg-primary-500 text-white'}
      p-4 shadow-md transition-colors duration-300
    `}>
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-xl font-bold hover:opacity-80 transition-opacity"
        >
          Deprem İzleme Sistemi
        </Link>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className={`
              ${theme === 'dark' 
                ? 'bg-dark-secondary text-dark-text hover:bg-dark-primary' 
                : 'bg-primary-600 hover:bg-primary-700'}
              px-4 py-2 rounded transition-colors duration-300 flex items-center space-x-2
            `}
          >
            {theme === 'dark' ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
            <span>{theme === 'dark' ? 'Açık Mod' : 'Koyu Mod'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
