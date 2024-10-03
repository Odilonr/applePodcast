import { getPodcatChannel } from "./data/podcastChannels.js"
import { formatDate } from "./data/podcastEpisodes.js"
import { findAudioPlaying, audioPlayer, updateCurrentTime } from "./audioManager.js"

export function renderHeaderData (podcastEpisode, audioElement) {
  document.querySelector('.title-podcast-channel').innerHTML = ''
  const podcastChannel = getPodcatChannel(podcastEpisode.channelId)
  document.querySelectorAll('.audio-time-control').forEach((rewindButton)=>{
    rewindButton.removeAttribute("disabled")
    rewindButton.replaceWith(document.querySelector('.audio-time-control').cloneNode(true))
  })
  document.querySelector('.main-play-button').removeAttribute("disabled")
  document.querySelector('.main-play-button').replaceWith(document.querySelector('.main-play-button').cloneNode(true))
  document.querySelector('.main-pause-button').replaceWith(document.querySelector('.main-pause-button').cloneNode(true))
  document.querySelector('.js-video-play-section').classList.add('audio-playing')

  document.querySelector('.js-top-channel-image').setAttribute("src", podcastChannel.profileImage)

  document.querySelector('.title-podcast-channel').innerHTML = `
            <div class="title-podcast-channel-display">
              <div class="js-marquee-container">
                <div class="title-podcast js-title-podcast">
                  ${podcastEpisode.title}
                </div>
              </div>
              <div class="channel-name">
                ${podcastChannel.name} - ${formatDate(podcastEpisode.dateAddedHours)}
              </div>
            </div>
            <input class="range-time-control js-time-control" type="range" value="0">
  `
  
  const audioObject = findAudioPlaying(audioElement.id)
  const marqueeContainer = document.querySelector('.js-marquee-container')
  const podcastTitle = document.querySelector('.js-title-podcast')
  const slider = document.querySelector('.js-time-control')
  const startingValue = (audioObject.currentTime/audioElement.duration) * 100
  slider.value = startingValue
  
  progressScript()

  if (podcastEpisode.title.length > 65) {
    marqueeContainer.classList.add('marquee-container')
    podcastTitle.classList.add('title-podcast-long')
  }
  document.querySelector('.js-middle-section').classList.add('audio-playing')
  
  function progressScript () {
    const sliderValue = slider.value 
    slider.style.background = `linear-gradient(to right, rgb(120, 119, 119) ${sliderValue}%, #ccc ${sliderValue}%)`;
  }

  slider.addEventListener('input', ()=>{
    const audioDuration = audioElement.duration
    const currentPercentage = (slider.value/100) * audioDuration
    audioElement.currentTime = currentPercentage
    updateCurrentTime(audioElement)
    progressScript()
  })
 
  audioElement.addEventListener('timeupdate', ()=> {
    const percent = (audioElement.currentTime/audioElement.duration) * 100
    slider.value = percent
    progressScript()
  })


  document.querySelector('.main-play-button').addEventListener('click', ()=>{
    const elementContainingEp = document.querySelector(`.js-present-podcast-episode-${podcastEpisode.id}`)
    elementContainingEp.classList.add('audio-playing')
    document.querySelector('.js-video-play-section').classList.add('audio-playing')
    elementContainingEp.dataset.audioPlaying = 'true'
    audioPlayer(audioElement, 'play')
  })

  document.querySelector('.main-pause-button').addEventListener('click', ()=> {
    document.querySelector(`.js-present-podcast-episode-${podcastEpisode.id}`).classList.remove('audio-playing')
    document.querySelector('.js-video-play-section').classList.remove('audio-playing')
    audioPlayer(audioElement, 'pause')
  })

  const forwardSkipButtons = document.querySelectorAll('.audio-time-control')
  forwardSkipButtons[0].addEventListener('click', ()=>{
    audioElement.currentTime -= 15
    updateCurrentTime(audioElement)
    const newPercent = (audioElement.currentTime/audioElement.duration) * 100
    slider.value = newPercent
    progressScript()
  })

  forwardSkipButtons[1].addEventListener('click', ()=> {
    audioElement.currentTime += 30
    updateCurrentTime(audioElement)
    const newPercent = (audioElement.currentTime/audioElement.duration) * 100
    slider.value = newPercent
    progressScript()
  })

}


styleVolumeSlider()

function styleVolumeSlider () {
  const currentVolume = Number(JSON.parse(localStorage.getItem('currentVolume'))) || 30
  const volumeSlider = document.querySelector('.js-volume-control')
  volumeSlider.value = currentVolume


  progressScript()

  function progressScript () {
    const sliderValue = volumeSlider.value 
    volumeSlider.style.background = `linear-gradient(to right, rgb(120, 119, 119) ${sliderValue}%, #ccc ${sliderValue}%)`;
  }

  volumeSlider.addEventListener('input', () => {
    const volumePercent = volumeSlider.value
    const volumeFinale = Math.round((volumePercent/100) * 10) / 10
    document.querySelector('audio').volume = volumeFinale
    localStorage.setItem('currentVolume', String(volumePercent))
    progressScript()
  })
}

