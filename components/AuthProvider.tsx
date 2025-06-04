'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  accessToken: string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const logout = () => {
    const domain = 'https://your-domain.auth.region.amazoncognito.com'
    const clientId = 'your-app-client-id'
    const logoutUri = encodeURIComponent('http://localhost:3000/login')

    localStorage.clear()

    window.location.href = `${domain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`
  }

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) return logout()

    const domain = 'https://genesys-user-pool.auth.us-east-1.amazoncognito.com'
    const clientId = '5g5rdsptri79c98pvuopsv5dta'

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId,
      refresh_token: refreshToken,
    })

    try {
      const response = await fetch(`${domain}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      })

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('access_token', data.access_token)
        if (data.id_token) localStorage.setItem('id_token', data.id_token)
        setAccessToken(data.access_token)
        setIsAuthenticated(true)
      } else {
        logout()
      }
    } catch (err) {
      console.error(err)
      logout()
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setAccessToken(token)
      setIsAuthenticated(true)
    }

    const interval = setInterval(() => {
      refreshToken()
    }, 15 * 60 * 1000) // Every 15 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
