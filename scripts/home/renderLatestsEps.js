import { podcastEpisodes, formatDate, formatDuration } from "../data/podcastEpisodes.js"
import { getPodcatChannel } from "../data/podcastChannels.js"
import { playPodcastEpisode, pausePodcastEpisode } from "../generalPlayPause.js"
import { recentlyPlayedAudios } from "../audioManager.js"

export function renderLatestEps () {
  let podcastEpisodesHTML = ''

  const latestEpisodes = podcastEpisodes.sort((a,b) => a.dateAddedHours - b.dateAddedHours).slice(0, 8)

  latestEpisodes.forEach((episode) => {
    const channelId = episode.channelId
    const matchingChannel = getPodcatChannel(channelId)

    podcastEpisodesHTML += `
          <div class="latest-podcast-episodes js-latest-pods-${episode.id}">
              <div class="podcast-image-container-latest">
                <img class="podcast-channel-profile-image"
                  src="${matchingChannel.profileImage}">
              </div>
              <div class="podcast-info">
                <div class="podcast-title-date">
                  <div class="posted-date posted-date-two">
                    ${formatDate(episode.dateAddedHours)}
                  </div>
                  <div class="podcast-title podcast-title-two">
                    ${episode.title}
                  </div>
                  <div class="podcast-description podcast-description-two">
                    ${episode.description}
                  </div>
                  <div class="podcast-duration podcast-duration-two">
                    ${formatDuration(episode.durationSeconds)}
                  </div>
                </div>
              </div>
              <div class="purple-play-button-container">
                <button class="purple-play-button js-purple-play-button"
                data-podcast-episode-id=${episode.id}
                data-parent-container-name="latest-episode">
                <img src="images/icons/apple-play-button.png"
                  class = "purple-play-icon">
                </button>
              </div>
              <div class="purple-pause-button-container">
                <button class="purple-pause-button js-purple-pause-button"
                  data-podcast-episode-id=${episode.id}
                  data-parent-container-name="latest-episode">
                  <img src="images/icons/apple-pause-button.png"
                    class = "purple-pause-icon">
                </button>
              </div>
          </div>
    `
  })

  document.querySelector('.latest-episodes-grid').innerHTML = podcastEpisodesHTML


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

  function renderRecentlyPlayed () {
    let recentlyPlayedHTML = ''

    recentlyPlayedAudios.forEach((episode) => {
      const episodeChannelId = episode.channelId
      const channel = getPodcatChannel(episodeChannelId)

      recentlyPlayedHTML += `
          <div class="latest-podcast-episodes js-recently-played-${episode.id}">
              <div class="podcast-image-container-latest">
                <img class="podcast-channel-profile-image"
                  src="${channel.profileImage}">
              </div>
              <div class="podcast-info">
                <div class="podcast-title-date">
                  <div class="posted-date posted-date-two">
                    ${formatDate(episode.dateAddedHours)}
                  </div>
                  <div class="podcast-title podcast-title-two">
                    ${episode.title}
                  </div>
                  <div class="podcast-description podcast-description-two">
                    ${episode.description}
                  </div>
                  <div class="podcast-duration podcast-duration-two">
                    ${formatDuration(episode.durationSeconds)}
                  </div>
                </div>
              </div>
              <div class="purple-play-button-container">
                <button class="purple-play-button js-purple-play-button"
                data-podcast-episode-id=${episode.id}
                data-parent-container-name="recently-played">
                <img src="images/icons/apple-play-button.png"
                  class = "purple-play-icon">
                </button>
              </div>
              <div class="purple-pause-button-container">
                <button class="purple-pause-button js-purple-pause-button"
                  data-podcast-episode-id=${episode.id}
                  data-parent-container-name="recently-played">
                  <img src="images/icons/apple-pause-button.png"
                    class = "purple-pause-icon">
                </button>
              </div>
          </div>

      `
    })

    document.querySelector('.recently-played-grid').innerHTML = recentlyPlayedHTML
  }

  renderRecentlyPlayed()

  const audioElement = document.querySelector('audio')

  document.querySelectorAll('.js-purple-play-button').forEach((button) => {
    button.addEventListener('click', () => {
      const podcastEpisodeId = button.dataset.podcastEpisodeId
      const parentContainerName = button.dataset.parentContainerName
      let elementContainingEp
      if (parentContainerName === "recently-played") {
        elementContainingEp = document.querySelector(`.js-recently-played-${podcastEpisodeId}`)
      } else if(parentContainerName === "latest-episode") {
        elementContainingEp = document.querySelector(`.js-latest-pods-${podcastEpisodeId}`)
      }
      playPodcastEpisode(podcastEpisodeId, audioElement, elementContainingEp)
    })
    
  })

  document.querySelectorAll('.js-purple-pause-button').forEach((button) => {
    button.addEventListener('click', () => {
      const podcastEpisodeId = button.dataset.podcastEpisodeId
      const parentContainerName = button.dataset.parentContainerName
      let elementContainingEp
      if (parentContainerName === "recently-played") {
        elementContainingEp = document.querySelector(`.js-recently-played-${podcastEpisodeId}`)
      } else if(parentContainerName === "latest-episode") {
        elementContainingEp = document.querySelector(`.js-latest-pods-${podcastEpisodeId}`)
      }
      pausePodcastEpisode(elementContainingEp)
    })
  })
  
}