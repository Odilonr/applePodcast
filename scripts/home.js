import { formatDate, formatDuration } from "./utils/formatTime.js";
import { fetchaudioAndPlay, pauseAudio, fetchEpisodes, fetchShows } from "./resourceManager.js";


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
    fetchEpisodes('Hero', renderHeroEpisodes),
    fetchEpisodes('Latest', renderLatestEpisodes),
    fetchShows('Popular', renderPopularShows)
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






