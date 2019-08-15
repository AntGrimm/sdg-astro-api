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
}

const main = () => {
  createUrl()
  getMainImage()
}

document.addEventListener('DOMContentLoaded', main)
