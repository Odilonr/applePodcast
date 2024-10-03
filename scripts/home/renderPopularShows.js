import { podcastChannels } from "../data/podcastChannels.js";

export function renderPopularShows () {
  let podcastChannelsHTML = ''

  const popularChannels = podcastChannels.sort((a,b) => b.rating.count - a.rating.count)

  popularChannels.forEach((channel) => {
    podcastChannelsHTML += `
        <a href="channel.html?channelID=${channel.id}">
          <div class="popular-channel">
                <div class="popular-channel-profile">
                  <img src="${channel.profileImage}">
                  <button class="purple-play-button">
                    <img src="images/icons/apple-play-button.png"
                    class = "purple-play-icon">
                  </button>
                </div>
                <div class="type-schedule">
                  <div class="show-type">${channel.type}</div>
                  <div class="update-schedule">${channel.schedule}</div>
                </div>
          </div>
        </a>
    `
  })

  document.querySelector('.popular-shows-grid').innerHTML = podcastChannelsHTML

}