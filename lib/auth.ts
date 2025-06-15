"use client"

// Basit auth sistemi (localStorage tabanlı)
export interface User {
  id: string
  username: string
  email: string
  level: string
  points: number
  rank: number
  streak: number
  successRate: number
  completedLessons: number[]
  testScores: Record<number, number>
  joinDate: string
}

// getCurrentUser fonksiyonunu güncelle
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("kodluyo_user")
  if (!userData) return null

  try {
    return JSON.parse(userData)
  } catch {
    return null
  }
}

export const setCurrentUser = (user: User) => {
  localStorage.setItem("kodluyo_user", JSON.stringify(user))
}

export const logout = () => {
  localStorage.removeItem("kodluyo_user")
  window.location.href = "/"
}

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}

// updateUserProgress fonksiyonunu düzelt
export const updateUserProgress = (lessonId: number, testScore: number) => {
  const user = getCurrentUser()
  if (!user) return

  // Test puanını kaydet
  user.testScores[lessonId] = testScore

  // Test başarılı ise (80% ve üzeri) dersi tamamlanmış olarak işaretle
  if (testScore >= 80) {
    if (!user.completedLessons.includes(lessonId)) {
      user.completedLessons.push(lessonId)
      user.points += 100 // Her ders için 100 puan

      // Seviye güncellemesi
      if (user.points >= 1000) user.level = "Elite Hacker"
      else if (user.points >= 500) user.level = "Advanced Hacker"
      else if (user.points >= 200) user.level = "Intermediate Hacker"
      else if (user.points >= 100) user.level = "Junior Hacker"

      // Sıralama güncellemesi (basit hesaplama)
      user.rank = Math.max(1, 10000 - Math.floor(user.points / 10))

      // Gün serisi güncellemesi
      user.streak = user.completedLessons.length
    }
  }

  // Başarı oranını hesapla
  const totalTests = Object.keys(user.testScores).length
  const totalScore = Object.values(user.testScores).reduce((sum, score) => sum + score, 0)
  user.successRate = totalTests > 0 ? Math.round(totalScore / totalTests) : 0

  setCurrentUser(user)
}
