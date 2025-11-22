import { DollarSign, TrendingUp, Calendar, BarChart3 } from 'lucide-react'

function FinancialDashboard({ users }) {
  // Tarih fonksiyonları
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const startOfThreeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1)

  // Satış hesaplama fonksiyonları
  const calculateSales = (startDate) => {
    return users
      .filter(user => {
        const userDate = new Date(user.createdAt)
        return userDate >= startDate
      })
      .reduce((total, user) => {
        const amount = parseFloat(user.amount) || 0
        return total + amount
      }, 0)
  }

  const getSalesCount = (startDate) => {
    return users.filter(user => {
      const userDate = new Date(user.createdAt)
      return userDate >= startDate
    }).length
  }

  // İstatistikler
  const dailySales = calculateSales(startOfToday)
  const dailyCount = getSalesCount(startOfToday)

  const monthlySales = calculateSales(startOfMonth)
  const monthlyCount = getSalesCount(startOfMonth)

  const threeMonthlySales = calculateSales(startOfThreeMonthsAgo)
  const threeMonthlyCount = getSalesCount(startOfThreeMonthsAgo)

  // Toplam satış
  const totalSales = users.reduce((total, user) => {
    const amount = parseFloat(user.amount) || 0
    return total + amount
  }, 0)

  const totalCustomers = users.length

  // Format fonksiyonu
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount)
  }

  // Günlük detaylar
  const dailyDetails = users
    .filter(user => {
      const userDate = new Date(user.createdAt)
      return userDate >= startOfToday
    })
    .map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      camp: user.camp || '-',
      amount: parseFloat(user.amount) || 0,
      date: new Date(user.createdAt).toLocaleDateString('tr-TR')
    }))

  // Aylık detaylar
  const monthlyDetails = users
    .filter(user => {
      const userDate = new Date(user.createdAt)
      return userDate >= startOfMonth
    })
    .map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      camp: user.camp || '-',
      amount: parseFloat(user.amount) || 0,
      date: new Date(user.createdAt).toLocaleDateString('tr-TR')
    }))

  // 3 Aylık detaylar
  const threeMonthlyDetails = users
    .filter(user => {
      const userDate = new Date(user.createdAt)
      return userDate >= startOfThreeMonthsAgo
    })
    .map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      camp: user.camp || '-',
      amount: parseFloat(user.amount) || 0,
      date: new Date(user.createdAt).toLocaleDateString('tr-TR')
    }))

  return (
    <div className="space-y-6">
      {/* Özet Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Toplam Satış</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
              <p className="text-xs text-gray-500 mt-1">{totalCustomers} müşteri</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Günlük Satış</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(dailySales)}</p>
              <p className="text-xs text-gray-500 mt-1">{dailyCount} satış</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Aylık Satış</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlySales)}</p>
              <p className="text-xs text-gray-500 mt-1">{monthlyCount} satış</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">3 Aylık Satış</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(threeMonthlySales)}</p>
              <p className="text-xs text-gray-500 mt-1">{threeMonthlyCount} satış</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Detaylı Satış Listeleri */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Günlük Satış Detayları */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              Günlük Satış Detayları
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Toplam: {formatCurrency(dailySales)} ({dailyCount} satış)
            </p>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            {dailyDetails.length > 0 ? (
              <div className="space-y-3">
                {dailyDetails.map((detail, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-gray-900">{detail.name}</span>
                      <span className="font-semibold text-green-600">{formatCurrency(detail.amount)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span>{detail.camp}</span>
                      <span className="mx-2">•</span>
                      <span>{detail.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">Bugün satış yok</p>
            )}
          </div>
        </div>

        {/* Aylık Satış Detayları */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-purple-50">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
              Aylık Satış Detayları
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Toplam: {formatCurrency(monthlySales)} ({monthlyCount} satış)
            </p>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            {monthlyDetails.length > 0 ? (
              <div className="space-y-3">
                {monthlyDetails.map((detail, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-gray-900">{detail.name}</span>
                      <span className="font-semibold text-purple-600">{formatCurrency(detail.amount)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span>{detail.camp}</span>
                      <span className="mx-2">•</span>
                      <span>{detail.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">Bu ay satış yok</p>
            )}
          </div>
        </div>

        {/* 3 Aylık Satış Detayları */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-orange-50">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 text-orange-600 mr-2" />
              3 Aylık Satış Detayları
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Toplam: {formatCurrency(threeMonthlySales)} ({threeMonthlyCount} satış)
            </p>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            {threeMonthlyDetails.length > 0 ? (
              <div className="space-y-3">
                {threeMonthlyDetails.map((detail, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-gray-900">{detail.name}</span>
                      <span className="font-semibold text-orange-600">{formatCurrency(detail.amount)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span>{detail.camp}</span>
                      <span className="mx-2">•</span>
                      <span>{detail.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">Son 3 ayda satış yok</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancialDashboard

