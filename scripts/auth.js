import { API_URL } from "./config.js";

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

const signinForm = document.querySelector('.js-signup-form')
const loginForm = document.querySelector('.js-login-form')

signinForm.addEventListener('submit', async (e) => {
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

    accessToken = data.accessToken
    console.log(accessToken)
    const cookie = document.cookie
    console.log(cookie)

    document.querySelector('.authentication').classList.remove('signing-in')
  } catch (err) {
    console.log(err.message)
    alert('Registration Failed. Please check your credentials')
  }

})