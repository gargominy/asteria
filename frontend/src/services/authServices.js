const BASE_URL = 'http://localhost:5000'

export function registerUser(userData) {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }).then(res => res.json())
}

export function loginUser(credentials) {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }).then(res => res.json())
}
