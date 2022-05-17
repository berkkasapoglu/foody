import jwt from "jwt-decode"

const login = async (username, password) => {
  const res = await fetch('api/users/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  const userData = await res.json()
  if(userData.success) {
    localStorage.setItem('token', JSON.stringify(userData.data.token))
  }
  return userData
}

const register = async (username, email, password) => {
  const res = await fetch('api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
  const userData = await res.json()
  if(userData.success) {
    localStorage.setItem('token', JSON.stringify(userData.data.token))
  }
  
  return userData
}

const logout = () => localStorage.removeItem('token')

const getAuthData = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  try {
    const { username, email } = jwt(token)
    return { username, email, token }
  } catch(e) {
    return null
  }
}

export {
  register,
  login,
  logout,
  getAuthData
}
