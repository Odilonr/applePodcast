import { getPodcatChannel } from "./data/podcastChannels.js"


function renderChannelPresentation () {
  let channelHTML = ''

  const url = new URL(window.location.href)
  const channelID = url.searchParams.get('channelID')
  const channel = getPodcatChannel(channelID)

  console.log(channel)
}

renderChannelPresentation()