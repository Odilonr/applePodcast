
export const podcastChannels = [{
  id: '101',
  name: 'Ai Special with Lex and Nova',
  host : {
    hostName: 'Model Lex',
    hostImage: 'images/hosts/host-lex-model.jpg'
  },
  description: `Join Lexi and Nova, two AI hosts, as they explore everything from tech and 
  science to culture and life’s mysteries. With humor 
  and deep insights, no topic is off-limits in this lively, futuristic podcast.`,
  profileImage: 'images/channels/Kyle.jpg',
  rating: {
    stars: 4.9,
    count: 60000
  },
  type:'Social',
  schedule: 'Update Weekly',
  rated:'E',
  studio:'Scicomm Media'
}, 
{
  id: '102',
  name: 'Huberman Lab',
  host : {
    hostName: 'Andrew Huberman',
    hostImage: 'images/hosts/huberman-host.jpg'
  },
  description: `Regularly ranked as the #1 health podcast in the world, Dr. Huberman discusses 
  science and science-based tools for everyday life. New episodes are released every Monday.`,
  profileImage: 'images/channels/huberman-lab.jpg',
  rating: {
    stars: 4.8,
    count: 23000
  },
  type:'Health & Fitness',
  schedule: 'Update Weekly',
  rated: '',
  studio:'Scicomm Media'
},
{
  id: '103',
  name: 'Jocko Podcast',
  host : {
    hostName: 'Jocko Willink',
    hostImage: 'images/hosts/jocko-willink.jpg'
  },
  description: `Retired Navy SEAL, Jocko Willink and Director, Echo Charles, discuss discipline
  and leadership in business, war, relationships and everyday life.`,
  profileImage: 'images/channels/jocko-podcast.jpg',
  rating: {
    stars: 4.9,
    count: 30000
  },
  type:'Management',
  schedule: 'Updated Weekly',
  rated: 'E',
  studio:'Jocko DEFCOR Network'
},
{
  id: '104',
  name: 'Club Shay Shay',
  host : {
    hostName: 'Shannon Sharpe',
    hostImage: 'images/hosts/sharpe-host.jpg'
  },
  description: `NFL legend Shannon Sharpe—3x Super Bowl champion 
  and member of the Pro Football Hall of Fame—sits down with the biggest athletes, 
  celebrities and influencers to discuss their accomplishments`,
  profileImage: 'images/channels/club-shay-shay.jpg',
  rating: {
    stars: 4.9,
    count: 6400
  },
  type:'Basketball',
  schedule: 'Updated Weekly',
  rated:'E',
  studio:'iHeartsPodcasts, The Volume, and Shay Shay Media'
},
{
  id: '105',
  name: 'Ted Talks Daily',
  host : {
    hostName: 'Elise Hu',
    hostImage: 'images/hosts/host-elise.jpg'
  },
  description: `Every weekday, TED Talks Daily brings you the latest talks in audio. Join host and journalist Elise Hu 
  for thought-provoking ideas on every subject imaginable — from Artificial Intelligence to Zoology`,
  profileImage: 'images/channels/ted-talks.png',
  rating: {
    stars: 4.1,
    count: 9900
  },
  type:'Education',
  schedule: 'Updated Weekly',
  rated:'',
  studio:'TED Talks Daily'
},
{
  id: '106',
  name: 'The Joe Rogan Experience',
  host : {
    hostName: 'Joe Rogan',
    hostImage: 'images/hosts/host-joe.jpg'
  },
  description: `The official podcast of comedian Joe Rogan.`,
  profileImage: 'images/channels/joe-rogan.jpg',
  rating: {
    stars: 4.6,
    count: 198000
  },
  type:'Comedy',
  schedule: 'Updated Semiweekly',
  rated:'E'
},
{
  id: '107',
  name: 'Modern Wisdom',
  host : {
    hostName: 'Chris Williamson',
    hostImage: 'images/channels/modern-wisdom.jpg'
  },
  description: `Life lessons from the greatest thinkers on the planet with Chris Williamson. 
  Including guests like David Goggins, Dr Jordan Peterson, Sam Harris, Jocko Willink, Dr Andrew Huberman`,
  profileImage: 'images/channels/modern-wisdom.jpg',
  rating: {
    stars: 4.7,
    count: 2200
  },
  type:'Society & Culture',
  schedule: 'Updated Weekly',
  rated:'E'
},
{
  id: '108',
  name: 'Lex Fridman Podcast',
  host : {
    hostName: 'Lex Fridman',
    hostImage: 'images/hosts/host-fridman.jpg'
  },
  description: `Conversations about science, technology, history, philosophy and the nature of intelligence, 
  consciousness, love, and power. Lex is an AI researcher at MIT and beyond.`,
  profileImage: 'images/channels/lex-fridman.jpg',
  rating: {
    stars: 4.7,
    count: 11000
  },
  type:'Technology',
  schedule: 'Updated Biweekly',
  rated:''
},
{
  id: '109',
  name: 'What Now? with Trevor Noah',
  host : {
    hostName: 'Trevor Noah',
    hostImage: 'images/hosts/host-noah.png'
  },
  description: `Trevor currently hosts a Spotify original weekly podcast titled What Now? with Trevor Noah. In this new podcast, listeners get a chance to hear Trevor like never before. Trevor is joined each episode by celebrities, 
  thought leaders, athletes, and friends to chat about the contemporary topics on everyone’s minds.`,
  profileImage: 'images/channels/trevor-noah.jpg',
  rating: {
    stars: 4.6,
    count: 2600
  },
  type:'Society & Culture',
  schedule: 'Updated Weekly',
  rated:'E'
},
{
  id: '110',
  name: 'The Diary of a CEO with Steven Barlett',
  host : {
    hostName: 'Steven Barlett',
    hostImage: 'images/hosts/host-barlett.png'
  },
  description: `I decided to launch 'The Diary Of A CEO' podcast with the simple mission of providing an unfiltered journey into the remarkable stories and untold 
  dimensions of the world's most influential people, experts and thinkers. Thank you for listening.`,
  profileImage: 'images/channels/steven-bartlett.jpg',
  rating: {
    stars: 4.8,
    count: 2300
  },
  type:'Business',
  schedule: 'Updated Semiweekly',
  rated:''
}
]
  

export function getPodcatChannel(channelId) {
  const channel = podcastChannels.find(obj => obj.id === channelId)
  return channel
}

