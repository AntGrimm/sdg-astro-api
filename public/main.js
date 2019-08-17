// Variables for array to track launch card
let missions = []
let currentIndex = 0

// Nasa picture of the day API
const createUrl = nasaSite => {
  const API_URL = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  console.log(API_URL)
  return API_URL
}

// SpaceX launch info API
const createSpaceXUrl = spaceXSite => {
  const SPACE_API_URL =
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  console.log(SPACE_API_URL)
  return SPACE_API_URL
}

// Nasa picture of day json fetch
const getMainImage = async nasaSite => {
  const response = await fetch(createUrl(nasaSite))
  const nasaData = await response.json()

  console.log(nasaData)
  const mainImage = (document.querySelector(
    '.image-area'
  ).style.backgroundImage = `url(${nasaData.hdUrl})`)
  console.log(nasaData.hdUrl)
  document.querySelector('.image-copyright').textContent =
    nasaData.copyright || 'no copyright'
  document.querySelector('.image-title').textContent = nasaData.title
  console.log(mainImage)
}

// space X launch card info
const getLaunchCard = async spaceXSite => {
  const response = await fetch(createSpaceXUrl(spaceXSite))
  const spaceXData = await response.json()

  console.log(spaceXData)

  // missions is an empty array that will populate with Space X API
  // The array will be 0 - 17(.length), and the next button will have to read array.length - 2 array ++
  // The previous button will have to read array.length +1 array --
  // Set array to json data
  missions = spaceXData

  // apply API data to array index and display on launch card
  document.querySelector('.mission-name').textContent =
    missions[currentIndex].mission_name
  document.querySelector('.launch-info').textContent =
    missions[currentIndex].details || 'No description available yet.'
  document.querySelector('.location').textContent =
    missions[currentIndex].launch_site.site_name_long

  // Create countdown timer (not sure how to do this in a separate function from the json)
  // set variable to start countdown timer with interval
  const x = setInterval(function() {
    // get todays date
    const now = new Date()
    // get launch date
    const launchDate = new Date(missions[currentIndex].launch_date_utc)
    // subtract todays date from launch date
    const diff = launchDate.getTime() - now.getTime()
    // convert to seconds
    const secondsFromT1ToT2 = diff / 1e3
    let totalSeconds = Math.abs(secondsFromT1ToT2)
    if (secondsFromT1ToT2 < 0) {
      clearInterval(x)
      document.querySelector('.countdown').textContent = 'Launched!'
    } else {
      const time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
      // convert time seconds to be displayed on card
      time.days = Math.floor(totalSeconds / (60 * 60 * 24))
      totalSeconds = totalSeconds - time.days * 24 * 60 * 60
      time.hours = Math.floor(totalSeconds / (60 * 60))
      totalSeconds = totalSeconds - time.hours * 60 * 60
      time.minutes = Math.floor(totalSeconds / 60)
      totalSeconds = totalSeconds - time.minutes * 60
      time.seconds = Math.floor(totalSeconds)
      console.log(time)
      document.querySelector('.countdown').textContent =
        time.days +
        ' days, ' +
        time.hours +
        ' hours, ' +
        time.minutes +
        ' minutes, ' +
        time.seconds +
        ' seconds'
    }
  }, 1000)
}

// Hit next button to see next launch info
const nextMissionButton = () => {
  if (currentIndex > missions.length - 2) {
    currentIndex = 0
  } else {
    currentIndex++
  }
  getLaunchCard()
}

// previous button to see previous launch info
const previousMissionButton = () => {
  if (currentIndex > 0) {
    currentIndex--
  } else {
    currentIndex = missions.length - 1
  }
  getLaunchCard()
}

const main = () => {
  // API for main image
  createUrl()
  getMainImage()
  // API for Launch card
  createSpaceXUrl()
  getLaunchCard()
}

document.addEventListener('DOMContentLoaded', main)
document
  .querySelector('.right-arrow')
  .addEventListener('click', nextMissionButton)
document
  .querySelector('.left-arrow')
  .addEventListener('click', previousMissionButton)
