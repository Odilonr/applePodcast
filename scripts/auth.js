import { API_URL } from "./utils/config.js";

let accessToken

document.getElementById("header-signin-button").addEventListener("click", ()=> {
  document.querySelector('.authentication').classList.add('signing-in')
})  

document.getElementById('signup-button').addEventListener("click", ()=> {
  document.querySelector('.authentication').classList.remove('signing-in')
  document.querySelector('.authentication').classList.add('signing-up')
})

document.getElementById('login-button').addEventListener("click", ()=> {
  document.querySelector('.authentication').classList.remove('signing-up')
  document.querySelector('.authentication').classList.add('signing-in')
})

document.querySelectorAll('.x-button').forEach((button) => {
  button.addEventListener("click", (e) => {
    const classVal = e.currentTarget.parentElement.classList.value
    if (classVal === "login-form-container") {
      document.querySelector('.authentication').classList.remove('signing-in')
    } else {
      document.querySelector('.authentication').classList.remove('signing-up')
    }
  })
})

document.querySelector('.profile-image-button').addEventListener("click", () => {
  const tooltip = document.querySelector('.profile-tooltip')
  tooltip.style = 'display:initial;'
})

window.addEventListener('click', (e)=>{
  const tooltip = document.querySelector('.profile-tooltip')
  const profileButton = document.querySelector('.profile-image-button')
  if (!tooltip.contains(e.target) && e.target.parentElement !== profileButton) {
    tooltip.style = 'display:none;'
  }
})

function setAccesToken (token) {
  accessToken = token
}

function getAccessToken () {
  return accessToken
}



const signupForm = document.querySelector('.js-signup-form')
const loginForm = document.querySelector('.js-login-form')

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = document.getElementById('new-username').value.trim()
  const email = document.getElementById('new-email').value.trim()
  const password = document.getElementById('new-password').value.trim()
  
  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'email': email,
        'password':password
      })
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    
    document.querySelector('.authentication').classList.remove('signing-up')
    document.querySelector('.authentication').classList.add('signing-in')
  } catch(err) {
    console.log(err.message)
    alert('Registration Failed. Please check your credentials')
  }
})

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = document.getElementById('username').value.trim()
  const password = document.getElementById('password').value.trim()

  try {
    const response = await fetch(`${API_URL}/user/auth`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true, 
      credentials: 'include',
      body:JSON.stringify({
        username, password
      })
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    setAccesToken(data.accessToken)
    window.location.reload()
    document.querySelector('.authentication').classList.remove('signing-in')
    document.querySelector('header').classList.add('user-signed-in')
  } catch (err) {
    console.log(err.message)
    alert('Registration Failed. Please check your credentials')
  }
})

async function refreshToken () {
  try {
    const response = await fetch(`${API_URL}/user/refresh`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true, 
      credentials: 'include'
    })

    if(!response.ok) {
      throw new Error('Refresh Token failed')
    }

    const data = await response.json()
    setAccesToken(data.accessToken)
    document.querySelector('header').classList.add('user-signed-in')
    return data.accessToken
  } catch(err) {
    console.log('User Logged out')
  }
}

async function logout () {
  try {
    const response = await fetch(`${API_URL}/user/logout`, {
      method:'POST', 
      withCredentials:true,
      credentials:'include'
    })

    if (!response.ok) {
      throw new Error(`Try again, an error occured, ${response.status}`)
    }

    document.querySelector('header').classList.remove('user-signed-in')
    setAccesToken(null)
    window.location.reload()
  } catch (e) {
    console.log(e)
  }
}

document.querySelector('.logout-button').addEventListener("click", logout)


async function fetchWithAuth() {
  if (isAuthenticated()) {
    
  }
}


window.addEventListener("DOMContentLoaded", async ()=>{
  try {
    await refreshToken()
    console.log('User Logged in')
  } catch(e) {
    console.log('User Logged Out')
  }
})


export {fetchWithAuth, getAccessToken}





