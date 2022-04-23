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
    localStorage.setItem('user', JSON.stringify(userData.data))
  }
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
    localStorage.setItem('user', JSON.stringify(userData.data))
  }
}

const logout = () => localStorage.removeItem('user')

export {
  register,
  login,
  logout
}
