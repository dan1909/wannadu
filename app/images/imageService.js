const IMAGES = {
  'katie_perry': require('./katie_perry.jpeg'),
  'rihana': require('./rihana.jpg')
}

getImage = (image_name) => {
  return IMAGES[image_name]
}

exports.getImage = getImage
