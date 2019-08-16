let missions = []
let currentIndex = 0

const createUrl = nasaSite => {
  const API_URL = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  console.log(API_URL)
  return API_URL
}

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

const createSpaceXUrl = spaceXSite => {
  const SPACE_API_URL =
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  console.log(SPACE_API_URL)
  return SPACE_API_URL
}

const getLaunchCard = async spaceXSite => {
  const response = await fetch(createSpaceXUrl(spaceXSite))
  const spaceXData = await response.json()

  console.log(spaceXData)

  // missions is an empty array that will populate with Space X API
  // The array will be 0 - 17, and the next button will have to read array.length - 2 array ++
  // The previous button will have to read array.length +1 array --
  missions = spaceXData
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
