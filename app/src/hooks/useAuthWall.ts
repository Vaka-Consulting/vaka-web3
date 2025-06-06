import { useEffect } from 'react'
import { useAuth } from '@vakaconsulting/react'
import { redirect } from 'next/navigation'

export function useAuthWall() {
  const { authenticated } = useAuth()

  useEffect(() => {
    if (!authenticated) {
      redirect('/login')
    }
  }, [authenticated])
}
