import { useState } from 'react'
import { Save, X } from 'lucide-react'

function UserForm({ onAdd }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    examScore: '',
    promoCode: '',
    camp: '',
    amount: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Hata temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'İsim gereklidir'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyisim gereklidir'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon gereklidir'
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gereklidir'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz'
    }
    if (formData.examScore && isNaN(formData.examScore)) {
      newErrors.examScore = 'Sınav derecesi sayı olmalıdır'
    }
    if (!formData.camp.trim()) {
      newErrors.camp = 'Kamp bilgisi gereklidir'
    }
    if (!formData.amount.trim()) {
      newErrors.amount = 'Ödenen tutar gereklidir'
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Geçerli bir tutar giriniz'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onAdd(formData)
      // Formu temizle
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        examScore: '',
        promoCode: '',
        camp: '',
        amount: ''
      })
      alert('Müşteri başarıyla eklendi!')
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      examScore: '',
      promoCode: '',
      camp: '',
      amount: ''
    })
    setErrors({})
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Yeni Müşteri Ekle</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* İsim */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              İsim <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Müşterinin adı"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          {/* Soyisim */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Soyisim <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Müşterinin soyadı"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

          {/* Telefon */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Telefon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0555 123 45 67"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* E-posta */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-posta <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ornek@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Sınav Derecesi */}
          <div>
            <label htmlFor="examScore" className="block text-sm font-medium text-gray-700 mb-2">
              Önceki Sınav Derecesi
            </label>
            <input
              type="text"
              id="examScore"
              name="examScore"
              value={formData.examScore}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.examScore ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Örn: 1250"
            />
            {errors.examScore && (
              <p className="mt-1 text-sm text-red-600">{errors.examScore}</p>
            )}
          </div>

          {/* Promosyon Kodu */}
          <div>
            <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-2">
              Promosyon Kodu
            </label>
            <input
              type="text"
              id="promoCode"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="PROMO2024"
            />
          </div>

          {/* Kamp */}
          <div>
            <label htmlFor="camp" className="block text-sm font-medium text-gray-700 mb-2">
              Aldığı Kamp <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="camp"
              name="camp"
              value={formData.camp}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.camp ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Örn: YKS Hazırlık Kampı"
            />
            {errors.camp && (
              <p className="mt-1 text-sm text-red-600">{errors.camp}</p>
            )}
          </div>

          {/* Ödenen Tutar */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Ödenen Tutar (₺) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Temizle</span>
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Müşteri Ekle</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm

