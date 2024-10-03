import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

export const podcastEpisodes = [{
  id: '1011',
  channelId: '101',
  title: 'From Akoula to Zongo: Building the Future of the DRC',
  description:`Join us with 
  Nova and Lexi to talk about the massive subcontractor agreement
   between A&M Development RDC S.A.R.L. 
  and FULLCOM COMPANY S.A.R.L,`,
  audioFile: 'audios/aiModelPod/101-episode1.mp3',
  dateAddedHours: 72,
  durationSeconds: 592
},
{
  id: '1012',
  channelId: '101',
  title: 'The History and Impact of slavery in American Society',
  description:`This episode examines the history of slavery in America, from its origins in the 17th century 
  to its lasting impact on American society. 
  We'll explore the transatlantic slave trade and the lives of enslaved people in America.`,
  audioFile: 'audios/aiModelPod/101-episode2.mp3',
  dateAddedHours: 100,
  durationSeconds: 584
},
{
  id: '1013',
  channelId: '101',
  title: 'Trump Under Fire (Again?!): How Did This Happen Twice?!',
  description:`We dive into the wild story of yet another close call for former President Trump, this time on the golf course! 
  we talk how a would-be assassin armed 
  with an AK-47 and a GoPro got shockingly close to Trump, despite the Secret Service being on high alert after a similar incident just two months ago.`,
  audioFile: 'audios/aiModelPod/101-episode3.mp3',
  dateAddedHours: 24,
  durationSeconds: 397
},
{
  id: '1014',
  channelId: '101',
  title: `Unc's Unexpected Interlude`,
  description:`Get ready for a hilarious episode of "Nightcap" where NFL legend Shannon Sharpe gets caught with his pants down, 
  literally! Sharpe's Instagram followers got an unexpected eyeful when 
  his live stream broadcasted an intimate encounter, leading him to initially cry "hackers!"`,
  audioFile: 'audios/aiModelPod/101-episode4.mp3',
  dateAddedHours: 48,
  durationSeconds: 185
},
{
  id: '1021',
  channelId: '102',
  title: `Dr. Jamil Zaki: How to Cultivate a Positive, Growth-Oriented Mindset`,
  description:`In this episode, my guest is Dr. Jamil Zaki, Ph.D., 
  professor of psychology at Stanford University, We discuss cynicism and its healthier, more adaptive alternative, 
  healthy skepticism, and how embracing healthy 
  skepticism can enhance both our emotional and physical health.`,
  audioFile: 'audios/hubermanLab/102-episode1.mp3',
  dateAddedHours: 12,
  durationSeconds: 8202
},
{
  id: '1022',
  channelId: '102',
  title: `Optimal Protocols for Studying & Learning`,
  description:`In this episode, I discuss science-supported protocols to optimize your 
  depth and rate of learning of material and skills.`,
  audioFile: 'audios/hubermanLab/102-episode2.mp3',
  dateAddedHours: 50, 
  durationSeconds: 6098
},
{
  id: '1031',
  channelId: '103',
  title: `Jocko Underground: When Your Ready to Take Over The World, Here is Your Next`,
  description:`Think of where you want to be in life, then take over the world`,
  audioFile: 'audios/jockoPodcast/103-episode1.mp3',
  dateAddedHours: 65,
  durationSeconds: 1132
}, 
{
  id: '1032',
  channelId: '103',
  title: `Pay Attention to The Condition of Your Mind, Body, and Spirit. With Vietnam SEAL,
  Tom Murphy`,
  description:`Tom Murphy is a retired SEAL Officer who served for 25 years, including combat tours as a SEAL in Vietnam.`,
  audioFile: 'audios/jockoPodcast/103-episode2.mp3',
  dateAddedHours: 168,
  durationSeconds: 10851
}
]

export function formatDate (hours) {
  const today = dayjs()
  let datePosted = today.subtract(hours, 'hours')
  if (hours < 24) {
    return `${hours}H AGO`
  } 
  else if (hours < 168) {
    return `${Math.floor(hours/24)}D AGO`
  } 
  else if (hours < 672) {
    return `${datePosted.format('MMM, DD')}`
  }
  return `${datePosted.format('DD/MM/YYYY')}`
}

export function formatDuration (seconds) {
  if (seconds < 60 ) {
    return `${seconds} s`
  }
  else if (seconds < 3600) {
    return `${Math.round(seconds/60)} m`
  }

  let hours = seconds / 3600
  let hoursDecimal = hours - Math.floor(hours)
  let minutes = Math.round(hoursDecimal * 60)
  return `${Math.floor(hours)}h ${minutes}m`
}

export function getPodcastEpisode (episodeId) {
  const podcast = podcastEpisodes.find(obj => obj.id === episodeId)
  return podcast
}


/*export function shuffleEpisodes (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    
    [array[i], array[j]] = [array[j], array[i]]
  }

  return array
}
*/
