import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Eğer Supabase credentials yoksa, localStorage fallback kullan
const useSupabase = supabaseUrl && supabaseAnonKey

let supabase = null

if (useSupabase) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

// Müşterileri getir
export const getCustomers = async () => {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching customers:', error)
      // Fallback to localStorage
      const savedUsers = localStorage.getItem('adminUsers')
      return savedUsers ? JSON.parse(savedUsers) : []
    }
  } else {
    // Fallback to localStorage
    const savedUsers = localStorage.getItem('adminUsers')
    return savedUsers ? JSON.parse(savedUsers) : []
  }
}

// Müşteri ekle
export const addCustomer = async (customerData) => {
  if (useSupabase && supabase) {
    try {
      const insertData = {
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        phone: customerData.phone,
        email: customerData.email,
        camp: customerData.camp,
        amount: parseFloat(customerData.amount) || 0,
        created_at: new Date().toISOString()
      }
      
      // Opsiyonel alanları ekle (sadece varsa)
      if (customerData.examScore) {
        insertData.exam_score = customerData.examScore || null
      }
      if (customerData.promoCode) {
        insertData.promo_code = customerData.promoCode || null
      }
      
      // Age ve grade - eğer değer varsa ekle
      // NOT: Eğer Supabase tablosunda bu kolonlar yoksa, önce ADD_COLUMNS.sql'i çalıştırın
      if (customerData.age && customerData.age.toString().trim() !== '') {
        const ageValue = parseInt(customerData.age)
        if (!isNaN(ageValue)) {
          insertData.age = ageValue
        }
      }
      if (customerData.grade && customerData.grade.trim() !== '') {
        insertData.grade = customerData.grade
      }
      
      const { data, error } = await supabase
        .from('customers')
        .insert([insertData])
        .select()
      
      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message || 'Veritabanı hatası')
      }
      
      if (!data || data.length === 0) {
        throw new Error('Müşteri eklenemedi')
      }
      
      return data[0]
    } catch (error) {
      console.error('Error adding customer:', error)
      throw error
    }
  } else {
    // Fallback to localStorage
    const newCustomer = {
      id: Date.now().toString(),
      ...customerData,
      createdAt: new Date().toISOString()
    }
    const savedUsers = localStorage.getItem('adminUsers')
    const users = savedUsers ? JSON.parse(savedUsers) : []
    users.push(newCustomer)
    localStorage.setItem('adminUsers', JSON.stringify(users))
    return newCustomer
  }
}

// Müşteri sil
export const deleteCustomer = async (customerId) => {
  if (useSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting customer:', error)
      throw error
    }
  } else {
    // Fallback to localStorage
    const savedUsers = localStorage.getItem('adminUsers')
    const users = savedUsers ? JSON.parse(savedUsers) : []
    const filtered = users.filter(user => user.id !== customerId)
    localStorage.setItem('adminUsers', JSON.stringify(filtered))
    return true
  }
}

// Real-time subscription (opsiyonel)
export const subscribeToCustomers = (callback) => {
  if (useSupabase && supabase) {
    const subscription = supabase
      .channel('customers-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'customers' },
        (payload) => {
          callback(payload)
        }
      )
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }
  return () => {}
}

