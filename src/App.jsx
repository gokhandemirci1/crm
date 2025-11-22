import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import { Users, UserPlus } from 'lucide-react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('list')

  // Sayfa yüklendiğinde authentication durumunu kontrol et
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // localStorage'dan kullanıcıları yükle
  useEffect(() => {
    const savedUsers = localStorage.getItem('adminUsers')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
  }, [])

  // Kullanıcıları localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users))
  }, [users])

  const addUser = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    setUsers([...users, newUser])
  }

  const deleteUser = (userId) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('adminAuthenticated', 'true')
  }

  const handleLogout = () => {
    if (window.confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      setIsAuthenticated(false)
      localStorage.removeItem('adminAuthenticated')
    }
  }

  // Giriş yapılmamışsa login sayfasını göster
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Dashboard onLogout={handleLogout}>
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'list'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Kullanıcı Listesi</span>
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'add'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              <span>Kullanıcı Ekle</span>
            </button>
          </div>
        </div>

        {activeTab === 'list' ? (
          <UserList users={users} onDelete={deleteUser} />
        ) : (
          <UserForm onAdd={addUser} />
        )}
      </Dashboard>
    </div>
  )
}

export default App

