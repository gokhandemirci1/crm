import { useState } from 'react'
import { DollarSign, TrendingUp, Calendar, BarChart3, Share2, Building2, Receipt, Wallet, UserCircle } from 'lucide-react'

function FinancialDashboard({ users }) {
  const [selectedPeriod, setSelectedPeriod] = useState('total')
  // Tarih fonksiyonları
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
  const startOfLast24Hours = new Date(today.getTime() - 24 * 60 * 60 * 1000)
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
  const hourlySales = calculateSales(startOfLast24Hours)
  const hourlyCount = getSalesCount(startOfLast24Hours)

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

  // Saatlik verileri hesapla (son 24 saat)
  const getHourlyData = () => {
    const hourlyData = {}
    
    // Son 24 saat içindeki satışları saatlere göre grupla
    users
      .filter(user => {
        const userDate = new Date(user.createdAt)
        return userDate >= startOfLast24Hours
      })
      .forEach(user => {
        const userDate = new Date(user.createdAt)
        const hour = userDate.getHours()
        const hourKey = `${hour}:00`
        
        if (!hourlyData[hourKey]) {
          hourlyData[hourKey] = {
            hour: hourKey,
            count: 0,
            amount: 0
          }
        }
        
        hourlyData[hourKey].count++
        hourlyData[hourKey].amount += parseFloat(user.amount) || 0
      })
    
    // 24 saatlik array oluştur (boş saatler için de)
    const hours = []
    for (let i = 0; i < 24; i++) {
      const hourKey = `${i}:00`
      if (hourlyData[hourKey]) {
        hours.push(hourlyData[hourKey])
      } else {
        hours.push({
          hour: hourKey,
          count: 0,
          amount: 0
        })
      }
    }
    
    return hours.sort((a, b) => {
      const hourA = parseInt(a.hour.split(':')[0])
      const hourB = parseInt(b.hour.split(':')[0])
      return hourA - hourB
    })
  }

  const hourlyData = getHourlyData()

  // Gider Kalemleri Hesaplama Fonksiyonu
  const calculateExpenses = (salesAmount) => {
    // 1. Öğretmene Giden: Toplam satışın %50'si
    const teacherPayment = salesAmount * 0.50
    
    // 2. Sosyal Medya: (Toplam satış - Öğretmene giden) değerinin %30'u
    const remainingAfterTeacher = salesAmount - teacherPayment
    const socialMedia = remainingAfterTeacher * 0.30
    
    // 3. Şirkete Kar: Toplam Satış - Öğretmene Giden - Sosyal Medya
    const companyProfit = salesAmount - teacherPayment - socialMedia
    
    // 4. Vergi: Şirkete Karın %20'si
    const tax = companyProfit * 0.20
    
    // 5. Net Kar: Şirkete Kar - Vergi
    const netProfit = companyProfit - tax
    
    return {
      teacherPayment,
      socialMedia,
      companyProfit,
      tax,
      netProfit,
      total: salesAmount
    }
  }

  // Toplam (Tüm Zamanlar)
  const totalExpenses = calculateExpenses(totalSales)

  // Saatlik (Son 24 saat)
  const hourlyExpenses = calculateExpenses(hourlySales)

  // Günlük
  const dailyExpenses = calculateExpenses(dailySales)

  // Aylık
  const monthlyExpenses = calculateExpenses(monthlySales)

  // 3 Aylık
  const threeMonthlyExpenses = calculateExpenses(threeMonthlySales)

  // Format fonksiyonu
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount)
  }

  // Yüzde formatı
  const formatPercentage = (value, total) => {
    if (total === 0) return '0%'
    return `${((value / total) * 100).toFixed(1)}%`
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Saatlik Satış</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(hourlySales)}</p>
              <p className="text-xs text-gray-500 mt-1">{hourlyCount} satış (24s)</p>
            </div>
            <div className="bg-cyan-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-cyan-600" />
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

      {/* Gider Kalemleri ve Kar Dağılımı */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
          Gider Kalemleri ve Kar Dağılımı
        </h2>

        {/* Periyot Seçimi */}
        <div className="mb-6 flex space-x-2 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setSelectedPeriod('hourly')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              selectedPeriod === 'hourly'
                ? 'border-cyan-500 text-cyan-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Saatlik (24 Saat)
          </button>
          <button
            onClick={() => setSelectedPeriod('daily')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              selectedPeriod === 'daily'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Günlük
          </button>
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              selectedPeriod === 'monthly'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Aylık
          </button>
          <button
            onClick={() => setSelectedPeriod('threeMonthly')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              selectedPeriod === 'threeMonthly'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            3 Aylık
          </button>
          <button
            onClick={() => setSelectedPeriod('total')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              selectedPeriod === 'total'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Toplam
          </button>
        </div>

        {/* Seçili Periyoda Göre Hesaplamalar */}
        {(() => {
          const expenses = selectedPeriod === 'hourly' ? hourlyExpenses
            : selectedPeriod === 'daily' ? dailyExpenses
            : selectedPeriod === 'monthly' ? monthlyExpenses
            : selectedPeriod === 'threeMonthly' ? threeMonthlyExpenses
            : totalExpenses

          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                {/* Öğretmene Giden */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-indigo-500 p-3 rounded-lg">
                      <UserCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-indigo-700 bg-indigo-200 px-3 py-1 rounded-full">
                      {formatPercentage(expenses.teacherPayment, expenses.total)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Öğretmene Giden</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(expenses.teacherPayment)}</p>
                  <p className="text-xs text-gray-500 mt-2">Toplam satışın %50'si</p>
                </div>

                {/* Sosyal Medya */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-pink-500 p-3 rounded-lg">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-pink-700 bg-pink-200 px-3 py-1 rounded-full">
                      {formatPercentage(expenses.socialMedia, expenses.total)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Sosyal Medya</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(expenses.socialMedia)}</p>
                  <p className="text-xs text-gray-500 mt-2">Kalanın %30'u</p>
                </div>

                {/* Şirkete Kar */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-500 p-3 rounded-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-blue-700 bg-blue-200 px-3 py-1 rounded-full">
                      {formatPercentage(expenses.companyProfit, expenses.total)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Şirkete Kar</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(expenses.companyProfit)}</p>
                  <p className="text-xs text-gray-500 mt-2">Toplam - Öğretmen - Sosyal Medya</p>
                </div>

                {/* Vergi */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-500 p-3 rounded-lg">
                      <Receipt className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-red-700 bg-red-200 px-3 py-1 rounded-full">
                      {formatPercentage(expenses.tax, expenses.companyProfit)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Vergi</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(expenses.tax)}</p>
                  <p className="text-xs text-gray-500 mt-2">Karın %20'si</p>
                </div>

                {/* Net Kar */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-500 p-3 rounded-lg">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-700 bg-green-200 px-3 py-1 rounded-full">
                      {formatPercentage(expenses.netProfit, expenses.total)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Net Kar</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(expenses.netProfit)}</p>
                  <p className="text-xs text-gray-500 mt-2">Kalan kar</p>
                </div>
              </div>

              {/* Detaylı Hesaplama Tablosu */}
              {/* Saatlik Grafik (Sadece saatlik seçildiğinde) */}
              {selectedPeriod === 'hourly' && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Saatlik Satış Dağılımı (Son 24 Saat)</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {hourlyData.map((data, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-16 text-sm font-medium text-gray-700">{data.hour}</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                            {data.amount > 0 && (
                              <div
                                className="bg-cyan-500 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                                style={{ width: `${(data.amount / hourlySales) * 100}%` }}
                              >
                                {data.amount > 0 && (
                                  <span className="text-xs font-semibold text-white">
                                    {formatCurrency(data.amount)}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="w-24 text-sm text-gray-600 text-right">
                            {data.count} satış
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Toplam (24 Saat)</span>
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">{formatCurrency(hourlySales)}</span>
                          <span className="text-sm text-gray-500 ml-2">({hourlyCount} satış)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedPeriod === 'hourly' ? 'Saatlik (24 Saat)' :
                   selectedPeriod === 'daily' ? 'Günlük' : 
                   selectedPeriod === 'monthly' ? 'Aylık' : 
                   selectedPeriod === 'threeMonthly' ? '3 Aylık' : 'Toplam'} Hesaplama Detayları
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kalem</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tutar</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Oran</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {selectedPeriod === 'hourly' ? 'Saatlik (24 Saat)' :
                           selectedPeriod === 'daily' ? 'Günlük' : 
                           selectedPeriod === 'monthly' ? 'Aylık' : 
                           selectedPeriod === 'threeMonthly' ? '3 Aylık' : 'Toplam'} Satış
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-right text-gray-900">{formatCurrency(expenses.total)}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-500">100%</td>
                      </tr>
                      <tr className="bg-indigo-50">
                        <td className="px-4 py-3 text-sm text-gray-900">- Öğretmene Giden</td>
                        <td className="px-4 py-3 text-sm font-semibold text-right text-indigo-700">{formatCurrency(expenses.teacherPayment)}</td>
                        <td className="px-4 py-3 text-sm text-right text-indigo-700">50%</td>
                      </tr>
                      <tr className="bg-pink-50">
                        <td className="px-4 py-3 text-sm text-gray-900">- Sosyal Medya Gideri</td>
                        <td className="px-4 py-3 text-sm font-semibold text-right text-pink-700">{formatCurrency(expenses.socialMedia)}</td>
                        <td className="px-4 py-3 text-sm text-right text-pink-700">{formatPercentage(expenses.socialMedia, expenses.total)}</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="px-4 py-3 text-sm text-gray-900">= Şirkete Kar</td>
                        <td className="px-4 py-3 text-sm font-semibold text-right text-blue-700">{formatCurrency(expenses.companyProfit)}</td>
                        <td className="px-4 py-3 text-sm text-right text-blue-700">{formatPercentage(expenses.companyProfit, expenses.total)}</td>
                      </tr>
                      <tr className="bg-red-50">
                        <td className="px-4 py-3 text-sm text-gray-900">- Vergi (Karın %20'si)</td>
                        <td className="px-4 py-3 text-sm font-semibold text-right text-red-700">{formatCurrency(expenses.tax)}</td>
                        <td className="px-4 py-3 text-sm text-right text-red-700">{formatPercentage(expenses.tax, expenses.total)}</td>
                      </tr>
                      <tr className="bg-green-50 font-semibold">
                        <td className="px-4 py-3 text-sm text-gray-900">= Net Kar</td>
                        <td className="px-4 py-3 text-sm font-bold text-right text-green-700">{formatCurrency(expenses.netProfit)}</td>
                        <td className="px-4 py-3 text-sm text-right text-green-700">{formatPercentage(expenses.netProfit, expenses.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )
        })()}
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

