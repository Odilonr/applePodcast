import { getPodcastEpisode } from "./data/podcastEpisodes.js"
import { addToAudioObjects, updateCurrentAudio, updateCurrentTime, audioPlayer } from "./audioManager.js"
import { renderHeaderData } from "./header.js"

export function playPodcastEpisode (podcastEpisodeId, audioElement, elementContainingEp) {
  const podcastEpisode = getPodcastEpisode(podcastEpisodeId)

  updateCurrentAudio(elementContainingEp)
  updateCurrentTime(audioElement)
  
  audioElement.setAttribute("src", podcastEpisode.audioFile)
  audioElement.setAttribute("id", podcastEpisodeId)

  addToAudioObjects(audioElement)

  setTimeout(()=> {
    audioPlayer(audioElement, 'play')
    renderHeaderData(podcastEpisode, audioElement)
  }, 
  200)


}

export function pausePodcastEpisode (elementContainingEp) {
  elementContainingEp.classList.remove('audio-playing')
  document.querySelector('.js-video-play-section').classList.remove('audio-playing')
  const audioElement = document.querySelector('audio')
  audioPlayer(audioElement, 'pause')
}