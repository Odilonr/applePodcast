import { formatDate } from "./utils/formatTime.js"

export function renderHeaderData (episode, audio) {
  //document.querySelector('.title-podcast-channel').innerHTML = ''
  //const podcastChannel = getPodcatChannel(podcastEpisode.channelId)
  document.querySelectorAll('.audio-time-control').forEach((rewindButton)=>{
    rewindButton.removeAttribute("disabled")
    rewindButton.replaceWith(document.querySelector('.audio-time-control').cloneNode(true))
  })

  document.querySelector('.main-play-button').removeAttribute("disabled")
  document.querySelector('.js-video-play-section').classList.add('audio-playing')

  document.querySelector('.js-top-channel-image').setAttribute("src", `${episode.profile}`)

  document.querySelector('.title-podcast-channel').innerHTML = `
            <div class="title-podcast-channel-display">
              <div class="js-marquee-container">
                <div class="title-podcast js-title-podcast">
                  ${episode.title}
                </div>
              </div>
              <div class="channel-name">
                ${episode.show_name} - ${formatDate(episode.date_added)}
              </div>
            </div>
            <input class="range-time-control js-time-control" type="range" value="0">
  `
  
  //const audioObject = findAudioPlaying(audioElement.id)
  const marqueeContainer = document.querySelector('.js-marquee-container')
  const podcastTitle = document.querySelector('.js-title-podcast')
  const slider = document.querySelector('.js-time-control')
  const startingValue = (audio.currentTime /audio.duration) * 100
  slider.value = startingValue
  
  progressScript()

  if (episode.title.length > 65) {
    marqueeContainer.classList.add('marquee-container')
    podcastTitle.classList.add('title-podcast-long')
  }

  document.querySelector('.js-middle-section').classList.add('audio-playing')
  
  function progressScript () {
    const sliderValue = slider.value 
    slider.style.background = `linear-gradient(to right, rgb(120, 119, 119) ${sliderValue}%, #ccc ${sliderValue}%)`;
  }

  slider.addEventListener('input', ()=>{
    const audioDuration = audio.duration
    const currentPercentage = (slider.value/100) * audioDuration
    audio.currentTime = currentPercentage
    //updateCurrentTime(audioElement)
    progressScript()
  })
 
  audio.addEventListener('timeupdate', ()=> {
    const percent = (audio.currentTime/audio.duration) * 100
    slider.value = percent
    progressScript()
  })

  const forwardSkipButtons = document.querySelectorAll('.audio-time-control')
  forwardSkipButtons[0].addEventListener('click', ()=>{
    audio.currentTime -= 15
    const newPercent = (audio.currentTime/audio.duration) * 100
    slider.value = newPercent
    progressScript()
  })

  forwardSkipButtons[1].addEventListener('click', ()=> {
    audio.currentTime += 30
    const newPercent = (audio.currentTime/audio.duration) * 100
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

