import { podcastEpisodes, formatDate, formatDuration, getPodcastEpisode } from '../data/podcastEpisodes.js'
import { getPodcatChannel } from '../data/podcastChannels.js'
import { playPodcastEpisode, pausePodcastEpisode } from '../generalPlayPause.js'

export function renderPresentationEps() {
  const backgroundColors = ['#3d1b30', '#1b3f45', '#0060cb', '#625143', '#412560','#467b9e', '#997942', '#456966']
  let podcastsHTML = ''
  let countBg = 0
  podcastEpisodes.forEach((episode) => {
    const channelId = episode.channelId
    const matchingChannel = getPodcatChannel(channelId)
    podcastsHTML += `
        <div class="main-podcast-episodes js-present-podcast-episode-${episode.id}"
            data-audio-playing = "false"
            style = "background-color: ${backgroundColors[countBg]};">
              <div class="podcast-image-container">
                <img class="podcast-channel-profile-image"
                  src = "${matchingChannel.profileImage}">
              </div>
              <div class="podcast-info">
                <div class="podcast-title-date">
                  <div class="posted-date">
                    ${formatDate(episode.dateAddedHours)}
                  </div>
                  <div class="podcast-title">
                    ${episode.title}
                  </div>
                  <div class="podcast-description">
                    ${episode.title.length < 60 ? episode.description : ''}
                  </div>
                </div>
                <div class="play-podcast-button-container">
                  <button class="play-podcast-button js-play-podcast-button"
                  data-podcast-episode-id="${episode.id}">
                    <span>
                      <img src="images/icons/apple-play-button.png"
                        class="play-podcast-icon">
                    </span>
                    <span class="podcast-duration">
                      ${formatDuration(episode.durationSeconds)}
                    </span>
                  </button>
                </div>
                <div class="pause-podcast-button-container">
                  <button class="pause-podcast-button js-pause-podcast-button"
                  data-podcast-episode-id="${episode.id}">
                    <span>
                      <img src="images/icons/apple-pause-button.png"
                        class="pause-podcast-icon">
                    </span>
                    <span class="podcast-duration">
                      ${formatDuration(episode.durationSeconds)}
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

  document.querySelector('.js-home-top-podcasts').innerHTML = podcastsHTML

  const audioElement = document.querySelector('audio')

  document.querySelectorAll('.js-play-podcast-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const podcastEpisodeId = button.dataset.podcastEpisodeId
        const elementContainingEp = document.querySelector(`.js-present-podcast-episode-${podcastEpisodeId}`)
        playPodcastEpisode(podcastEpisodeId, audioElement, elementContainingEp)
      })
    })
  
  document.querySelectorAll('.js-pause-podcast-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const podcastEpisodeId = button.dataset.podcastEpisodeId
        const elementContainingEp = document.querySelector(`.js-present-podcast-episode-${podcastEpisodeId}`)
        pausePodcastEpisode(elementContainingEp)
      })
    })
}