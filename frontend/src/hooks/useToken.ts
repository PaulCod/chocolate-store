import { useEffect, useState } from "react"
import Cookies from "universal-cookie"

const useToken = () => {
  const [token, setToken] = useState<string | null>(null)
  const cookie = new Cookies()

  useEffect(() => {
    const token = cookie.get("token")
    setToken(token)
  }, [cookie])

  return token
}

export default useToken