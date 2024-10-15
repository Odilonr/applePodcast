import { API_URL } from "./config.js";
import { formatDate, formatDuration } from "./utils/formatTime.js";
import { renderHeaderData } from "./header.js";
import { fetchWithAuth, getAccessToken} from "./auth.js";

const currentEpPlaying = {
  episodeID:null
}

let timeout


const audio = document.querySelector('audio')

async function fetchEpisodes(type) {
  try {
    const response = await fetch(`${API_URL}/episodes?type=${type}`)

    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const episodes = await response.json()
    if (type === 'Hero') {
      renderHeroEpisodes(episodes)
    }
    else {
      renderLatestEpisodes(episodes)
    }
  } catch(err) {
    console.log(err.message)
  }
}

async function fetchShows(type) {
  try {
    const response = await fetch(`${API_URL}/shows?type=${type}`)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const shows = await response.json()
    if (type === 'Popular') {
      renderPopularShows(shows)
    }
  } catch (err) {
    console.log(err.message)
  }
}

async function fetchPlayback(episodeID) {
  try {
    const accessToken = getAccessToken()
    const response = await fetch(`${API_URL}/episodes/${episodeID}/timestamp`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      withCredentials: true, 
      credentials: 'include'
    })

    if(!response.ok) {
      throw new Error(`Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (e) {
    console.log(e.message)
    return null
  }
}

async function updatePlayBackTime(episodeID, currenTime) {
  //const currenTime = audio.currentTime
  try {
    const accessToken = getAccessToken()
    const response = await fetch(`${API_URL}/episodes/updatetime?episodeID=${episodeID}&new=${currenTime}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      withCredentials: true, 
      credentials: 'include'
    }
    )

    if(!response.ok) {
      throw new Error(`Status: ${response.status}`)
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (e) {
    console.log(e.message)
  }
}

async function fetchaudioAndPlay (episodeID) {
  if (currentEpPlaying.episodeID) {
    //update previously playing ep
    await updatePlayBackTime(currentEpPlaying.episodeID, audio.currentTime)
  }

  let currentTime
  if (getAccessToken()) {
    const playbackTimeObj = await fetchPlayback(episodeID)
    currentTime = playbackTimeObj.currentplaytime
  }

  try {
    const response = await fetch(`${API_URL}/episodes/ep/${episodeID}`)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const episode = await response.json()
    audio.crossOrigin="anonymous"
    audio.setAttribute("src", `${API_URL}/episodes/audio?path=${episode.audio_link}`)
    audio.setAttribute("controls", "")
    
    audio.addEventListener('loadedmetadata', ()=> {
      playAudio(episodeID, currentTime)
    })
  } catch (err) {
    console.log(err.message)
  }
}

async function playAudio (episodeID, currentTime) {
  if (currentEpPlaying.episodeID) {
    document.querySelectorAll(`.js-episode-${currentEpPlaying.episodeID}`).forEach((element) => {
      element.classList.remove('audio-playing')
    })
  }

  audio.currentTime = currentTime ? currentTime : 0
  audio.play()
  currentEpPlaying.episodeID = episodeID
  document.querySelectorAll(`.js-episode-${episodeID}`).forEach((element) => {
    element.classList.add('audio-playing')
  })
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setInterval( async () => {
    if (currentEpPlaying.episodeID) {
      const updateMessage = await updatePlayBackTime(currentEpPlaying.episodeID, audio.currentTime)
      console.log(updateMessage)
    }
  }, 5000)
}


async function pauseAudio (episodeID) {
  if (getAccessToken()) {
    await updatePlayBackTime(episodeID, audio.currentTime)
  }

  if (timeout) {
    clearTimeout(timeout)
  }

  audio.pause()
  const playingEpContainers = document.querySelectorAll(`.js-episode-${episodeID}`)
  playingEpContainers.forEach((element) => {
    element.classList.remove('audio-playing')
  })
  currentEpPlaying.episodeID = null
}


function renderHeroEpisodes(episodes) {
  const backgroundColors = ['#3d1b30', '#1b3f45', '#0060cb', '#625143', '#412560','#467b9e', '#997942', '#456966']
  let episodesHTML = ''
  let countBg = 0
  episodes.forEach((episode) => {
    episodesHTML += `
        <div class="hero-episode js-episode-${episode.id}"
            data-audio-playing = "false"
            style = "background-color: ${backgroundColors[countBg]};">
              <div class="podcast-image-container">
                <img class="podcast-channel-profile-image"
                  src = "${episode.profile}">
              </div>
              <div class="podcast-info">
                <div class="podcast-title-date">
                  <div class="posted-date">
                    ${formatDate(episode.date_added)}
                  </div>
                  <div class="podcast-title">
                    ${episode.title}
                  </div>
                  <div class="podcast-description">
                    ${episode.title.length < 60 ? episode.description : ''}
                  </div>
                </div>
                <div class="play-podcast-button-container">
                  <button class="play-podcast-button js-play-button"
                  data-episode-id="${episode.id}">
                    <span>
                      <img src="images/icons/apple-play-button.png"
                        class="play-podcast-icon">
                    </span>
                    <span class="podcast-duration">
                      ${formatDuration(episode.duration)}
                    </span>
                  </button>
                </div>
                <div class="pause-podcast-button-container">
                  <button class="pause-podcast-button js-pause-button"
                  data-episode-id="${episode.id}">
                    <span>
                      <img src="images/icons/apple-pause-button.png"
                        class="pause-podcast-icon">
                    </span>
                    <span class="podcast-duration">
                      ${formatDuration(episode.duration)}
                    </span>
                  </button>
                </div>
                  <button class="like-button">
                    <img  class="heart-image"
                    src="images/icons/white-heart-background.png">
                  </button>
                </div>
              </div>
            </div>
    `
    countBg++
  })

  document.querySelector('.hero-episodes-grid').innerHTML = episodesHTML

}

function renderLatestEpisodes (episodes) {
  let episodesHTML = ''

  episodes.forEach((episode) => {
    episodesHTML += `
          <div class="latest-podcast-episodes js-episode-${episode.id}">
              <div class="podcast-image-container-latest">
                <img class="podcast-channel-profile-image"
                  src="${episode.profile}">
              </div>
              <div class="podcast-info">
                <div class="podcast-title-date">
                  <div class="posted-date posted-date-two">
                    ${formatDate(episode.date_added)}
                  </div>
                  <div class="podcast-title podcast-title-two">
                    ${episode.title}
                  </div>
                  <div class="podcast-description podcast-description-two">
                    ${episode.description}
                  </div>
                  <div class="podcast-duration podcast-duration-two">
                    ${formatDuration(episode.duration)}
                  </div>
                </div>
              </div>
              <div class="purple-play-button-container">
                <button class="purple-play-button js-play-button"
                data-episode-id=${episode.id}
                data-parent-container-name="latest-episode">
                <img src="images/icons/apple-play-button.png"
                  class = "purple-play-icon">
                </button>
              </div>
              <div class="purple-pause-button-container">
                <button class="purple-pause-button js-pause-button"
                  data-episode-id=${episode.id}
                  data-parent-container-name="latest-episode">
                  <img src="images/icons/apple-pause-button.png"
                    class = "purple-pause-icon">
                </button>
              </div>
          </div>
    `
  })

  document.querySelector('.latest-episodes-grid').innerHTML = episodesHTML


  const scrollContainer = document.querySelector('.latest-episodes-scroll-container')
  const scrollLeftBtn = document.querySelector('.scroll-left')
  const scrollRightBtn = document.querySelector('.scroll-right')

  scrollLeftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left:(-scrollContainer.clientWidth/2), behavior: 'smooth' })
  })

  scrollRightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: scrollContainer.clientWidth/2, behavior: 'smooth' })
  })

  scrollContainer.addEventListener('scroll', updateScrollButtons)

  function updateScrollButtons() {
    const scrollLeft = scrollContainer.scrollLeft
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth

    scrollLeftBtn.disabled = scrollLeft === 0
    scrollRightBtn.disabled = scrollLeft === maxScrollLeft
  }

  updateScrollButtons()

}

function renderPopularShows(shows) {
  let popularShowsHTML = ''

  shows.forEach((show) => {
    popularShowsHTML += `
        <a href="channel.html?channelID=${show.id}">
          <div class="popular-channel">
                <div class="popular-channel-profile">
                  <img src="${show.profile_img_link}">
                  <button class="purple-play-button">
                    <img src="images/icons/apple-play-button.png"
                    class = "purple-play-icon">
                  </button>
                </div>
                <div class="type-schedule">
                  <div class="show-type">${show.show_type}</div>
                  <div class="update-schedule">${show.release_schedule}</div>
                </div>
          </div>
        </a>
    `
  })

  document.querySelector('.popular-shows-grid').innerHTML = popularShowsHTML
}

function populateHomePage () {
  Promise.all([
    fetchEpisodes('Hero'),
    fetchEpisodes('Latest'),
    fetchShows('Popular')
  ]).then(
    () => {
      document.querySelectorAll('.js-play-button').forEach((button) => {
        button.addEventListener('click', () => {
          const episodeId = button.dataset.episodeId
          fetchaudioAndPlay(episodeId)
        })
      })
      document.querySelectorAll('.js-pause-button').forEach((button) => [
        button.addEventListener('click', () => {
          const episodeID = button.dataset.episodeId
          pauseAudio(episodeID)
        })
      ])   
      
    }
  )
}

populateHomePage()






