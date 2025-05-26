'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CallbackPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchTokens = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      if (!code) {
        setError('Authorization code not found in URL.')
        setLoading(false)
        return
      }

      const domain = 'https://genesys-user-pool.auth.us-east-1.amazoncognito.com'
      const clientId = '5g5rdsptri79c98pvuopsv5dta'
      const clientSecret = '1a7u8tlbqhgo625ihqofm512mfm7vuprjkrkh8oi0q3cpft6h4mn'
      const redirectUri = 'http://localhost:3000/idpresponse'

      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        redirect_uri: redirectUri,
      })

      const authHeaderVal = 'Basic ' + btoa(`${clientId}:${clientSecret}`)
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authHeaderVal,
      }

      try {
        const response = await fetch(`${domain}/oauth2/token`, {
          method: 'POST',
          headers: headers,
          body,
        })

        const data = await response.json()

        if (response.ok) {
            console.log('Tokens:', data)

          // Store tokens securely (e.g., in localStorage or cookies)
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('id_token', data.id_token)
          localStorage.setItem('refresh_token', data.refresh_token)

          // Redirect to your app's main page
          router.push('/workflows')
        } else {
          console.error(data)
          setError(data.error_description || 'Failed to retrieve tokens.')
        }
      } catch (err) {
        console.error(err)
        setError('An unexpected error occurred while fetching tokens.')
      }

      setLoading(false)
    }

    fetchTokens()
  }, [router])

  if (loading) return <div>Logging in, please wait...</div>
  if (error) return <div>Error: {error}</div>

  return null
}
