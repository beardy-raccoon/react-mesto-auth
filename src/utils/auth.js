const BASE_URl = "https://auth.nomoreparties.co";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.status)
  }
}

export const authorization = (email, password) => {
  return fetch(`${BASE_URl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
}

export const registration = (email, password) => {
  return fetch(`${BASE_URl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(checkResponse)
}

export const getContent = (token) => {
  return fetch(`${BASE_URl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse)
}
