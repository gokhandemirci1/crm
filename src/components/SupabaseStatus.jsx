import { AlertCircle, CheckCircle, Database, Upload } from 'lucide-react'
import { useState } from 'react'
import { addCustomer } from '../services/supabase'

function SupabaseStatus({ users, onMigrate }) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const isSupabaseConfigured = supabaseUrl && supabaseKey
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrateStatus, setMigrateStatus] = useState('')

  const handleMigrate = async () => {
    if (!isSupabaseConfigured) {
      alert('Önce Supabase kurulumunu yapmanız gerekiyor!')
      return
    }

    if (users.length === 0) {
      alert('Migrate edilecek müşteri yok.')
      return
    }

    if (!window.confirm(`${users.length} müşteriyi Supabase'e migrate etmek istediğinizden emin misiniz?`)) {
      return
    }

    setIsMigrating(true)
    setMigrateStatus('Migrate ediliyor...')

    try {
      let successCount = 0
      let errorCount = 0

      for (const user of users) {
        try {
          await addCustomer({
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            examScore: user.examScore || '',
            promoCode: user.promoCode || '',
            camp: user.camp || '',
            amount: user.amount || '0'
          })
          successCount++
        } catch (error) {
          console.error('Error migrating user:', error)
          errorCount++
        }
      }

      setMigrateStatus(`Tamamlandı! ${successCount} başarılı, ${errorCount} hata`)
      
      if (successCount > 0) {
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      setMigrateStatus('Migrate sırasında hata oluştu!')
      console.error('Migration error:', error)
    } finally {
      setIsMigrating(false)
    }
  }

  if (isSupabaseConfigured) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-green-900 mb-1">
              Supabase Aktif - Çoklu Cihaz Desteği
            </h3>
            <p className="text-xs text-green-700 mb-2">
              Müşterileriniz tüm cihazlardan görüntülenebilir. Veriler bulutta saklanıyor.
            </p>
            {users.length > 0 && localStorage.getItem('adminUsers') && (
              <div className="mt-3 pt-3 border-t border-green-200">
                <button
                  onClick={handleMigrate}
                  disabled={isMigrating}
                  className="flex items-center space-x-2 text-xs bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-3 h-3" />
                  <span>
                    {isMigrating ? 'Migrate ediliyor...' : 'LocalStorage Verilerini Supabase\'e Taşı'}
                  </span>
                </button>
                {migrateStatus && (
                  <p className="text-xs text-green-700 mt-2">{migrateStatus}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-yellow-900 mb-1">
            Supabase Kurulumu Gerekli
          </h3>
          <p className="text-xs text-yellow-700 mb-2">
            Şu an veriler sadece bu cihazda saklanıyor. Farklı cihazlardan erişim için Supabase kurulumu yapın.
          </p>
          <div className="mt-2">
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs bg-yellow-600 text-white px-3 py-1.5 rounded hover:bg-yellow-700"
            >
              <Database className="w-3 h-3" />
              <span>Supabase Kurulum Rehberi</span>
            </a>
          </div>
          <p className="text-xs text-yellow-600 mt-2">
            Detaylı kurulum için <code className="bg-yellow-100 px-1 rounded">SUPABASE_SETUP.md</code> dosyasına bakın.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SupabaseStatus

