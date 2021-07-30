const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "dm5uxyi2s",
    api_key: "226518815717594",
    api_secrey: "O5UlUZSr5xFchZ0Gb-g0wkEh21U"
})

module.exports = { cloudinary }