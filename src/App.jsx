import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import FinancialDashboard from './components/FinancialDashboard'
import SupabaseStatus from './components/SupabaseStatus'
import { Users, UserPlus, DollarSign } from 'lucide-react'
import { getCustomers, addCustomer, deleteCustomer, subscribeToCustomers } from './services/supabase'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('list')
  const [isLoading, setIsLoading] = useState(true)

  // Sayfa yüklendiğinde authentication durumunu kontrol et
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Müşterileri yükle
  useEffect(() => {
    if (isAuthenticated) {
      loadCustomers()
      
      // Real-time updates için subscription (Supabase kullanılıyorsa)
      const unsubscribe = subscribeToCustomers((payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
          loadCustomers()
        }
      })
      
      return () => {
        if (unsubscribe) unsubscribe()
      }
    }
  }, [isAuthenticated])

  const loadCustomers = async () => {
    setIsLoading(true)
    try {
      const data = await getCustomers()
      // Supabase'den gelen veriyi uygulama formatına çevir
      const formattedData = data.map(item => ({
        id: item.id?.toString() || item.id,
        firstName: item.first_name || item.firstName,
        lastName: item.last_name || item.lastName,
        phone: item.phone,
        email: item.email,
        age: item.age?.toString() || item.age || '',
        grade: item.grade || '',
        examScore: item.exam_score || item.examScore || '',
        promoCode: item.promo_code || item.promoCode || '',
        camp: item.camp,
        amount: item.amount?.toString() || item.amount,
        createdAt: item.created_at || item.createdAt
      }))
      setUsers(formattedData)
    } catch (error) {
      console.error('Error loading customers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addUser = async (userData) => {
    try {
      const newUser = await addCustomer(userData)
      // Supabase formatını uygulama formatına çevir
      const formattedUser = {
        id: newUser.id?.toString() || newUser.id,
        firstName: newUser.first_name || newUser.firstName,
        lastName: newUser.last_name || newUser.lastName,
        phone: newUser.phone,
        email: newUser.email,
        age: newUser.age?.toString() || newUser.age || '',
        grade: newUser.grade || '',
        examScore: newUser.exam_score || newUser.examScore || '',
        promoCode: newUser.promo_code || newUser.promoCode || '',
        camp: newUser.camp,
        amount: newUser.amount?.toString() || newUser.amount,
        createdAt: newUser.created_at || newUser.createdAt
      }
      setUsers([formattedUser, ...users])
      return formattedUser // Başarılı olduğunu belirtmek için
    } catch (error) {
      console.error('Error adding customer:', error)
      const errorMessage = error?.message || 'Müşteri eklenirken bir hata oluştu. Lütfen tekrar deneyin.'
      alert(`Hata: ${errorMessage}`)
      throw error // Hata fırlat ki UserForm'da yakalanabilsin
    }
  }

  const deleteUser = async (userId) => {
    if (window.confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteCustomer(userId)
        setUsers(users.filter(user => user.id !== userId))
      } catch (error) {
        console.error('Error deleting customer:', error)
        alert('Müşteri silinirken bir hata oluştu. Lütfen tekrar deneyin.')
      }
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
        <SupabaseStatus users={users} onMigrate={loadCustomers} />
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
              <span>Müşteri Listesi</span>
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
              <span>Müşteri Ekle</span>
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'financial'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Finansal Dashboard</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        ) : activeTab === 'list' ? (
          <UserList users={users} onDelete={deleteUser} />
        ) : activeTab === 'add' ? (
          <UserForm onAdd={addUser} />
        ) : (
          <FinancialDashboard users={users} />
        )}
      </Dashboard>
    </div>
  )
}

export default App

