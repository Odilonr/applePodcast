import { getPodcastEpisode, podcastEpisodes } from "./data/podcastEpisodes.js"

const audioObjects = JSON.parse(localStorage.getItem('audioObjects')) || []

let currentlyPlaying

export let recentlyPlayedAudios = JSON.parse(localStorage.getItem('recentlyPlayedAudios')) || []

export function addToAudioObjects(audioElement) {
  const audioObject = findAudioPlaying(audioElement.id)
  if (audioObject) {
    return
  }

  const newAudioObject = ({
    audioId: audioElement.id,
    currentTime: 0
  }
  )

  audioObjects.push(newAudioObject)
  saveToLocalStorage()
}

export function saveToLocalStorage() {
  localStorage.setItem('audioObjects', JSON.stringify(audioObjects))
}

export function audioPlayer (audioElement, action) {
  const audioObject = findAudioPlaying(audioElement.id)
  if (action === 'play') {
    addToRecentlyPlayed(audioElement.id)
    let currentVolume = Number(JSON.parse(localStorage.getItem('currentVolume'))) || 30
    audioElement.currentTime = audioObject['currentTime']
    audioElement.volume = Math.round((currentVolume/100) * 10) / 10
    audioElement.play()
  } else {
    audioElement.pause()
    updateCurrentTime(audioElement)
  }
}

export function updateCurrentTime (audioElement) {
  if (audioElement.src) {
    const audioObject = findAudioPlaying(audioElement.id)
    audioObject['currentTime'] = audioElement.currentTime
    saveToLocalStorage()
  }
}

export function findAudioPlaying (audioId) {
  return audioObjects.find(obj => obj.audioId === audioId)
}

export function updateCurrentAudio (elementContainingEp) {
  if (currentlyPlaying) {
    /*const sameEpisodes = currentlyPlaying.querySelector('.podcast-title').innerText !== 
      elementContainingEp.querySelector('.podcast-title').innerText*/
    currentlyPlaying.classList.remove('audio-playing')
  }
  elementContainingEp.classList.add('audio-playing')
  currentlyPlaying = elementContainingEp
}



export function addToRecentlyPlayed (audioId) {
  const podcastEpisode = getPodcastEpisode(audioId)
  const episodeExists = recentlyPlayedAudios.find(obj => obj.id === podcastEpisode.id)
  if (recentlyPlayedAudios.length > 8) {
    recentlyPlayedAudios.pop()
  }

  if (episodeExists) {
    const newRecentlyPlayed = recentlyPlayedAudios.filter( (value) => {
      return value.title !== episodeExists.title
    })
    newRecentlyPlayed.unshift(episodeExists)
    localStorage.setItem('recentlyPlayedAudios', JSON.stringify(newRecentlyPlayed))
    return
  }

  recentlyPlayedAudios.unshift(podcastEpisode)
  localStorage.setItem('recentlyPlayedAudios', JSON.stringify(recentlyPlayedAudios))
}
