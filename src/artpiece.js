export default class ArtPiece {
    constructor() {
        this.img = this.getRandomImg()
        this.imageUrl = this.img['primaryimageurl']
        this.imageID = this.img['objectid']
        this.artist = "Unidentified Artist"
        if (this.img['people'] != undefined) {
            this.artist = this.img['people'][0]['name']
        }
        this.title = "Untitled"
        if (this.img['people'] != undefined) {
            this.title = this.img['title']
        }
        this.dated = "Undated"
        if (this.img['dated'] != undefined) {
            this.dated = this.img['dated']
        }
        this.culture = "Unidentified Culture"
        if (this.img['culture'] != undefined) {
            this.culture = this.img['culture']
        }
    }
    getRandomImg() {
        var http = new XMLHttpRequest()
        var baseurl = "https://api.harvardartmuseums.org/object"

        //first request to get number of pages
        var params = {
            apikey: "a2c8fcd0-ec3a-11e9-a2f0-1b926ef7a557",
            fields: null
        }
        http.open("GET", baseurl + this.formatParams(params), false)
        http.send()
        var data = JSON.parse(http.response)

        //second request to get individual art piece
        var piece = null
        do {
            params = {
                apikey: "a2c8fcd0-ec3a-11e9-a2f0-1b926ef7a557",
                page: `${Math.floor(Math.random()*data['info']['pages']) + 1}`,
                fields: "accessionyear,people,primaryimageurl,objectid,title,dated,culture"
            }
            http.open("GET", baseurl + this.formatParams(params), false)
            http.send()
            data = JSON.parse(http.response)
            piece = data['records'][Math.floor(Math.random()*10)]
        } while (piece['primaryimageurl'] == undefined || piece['title'] == undefined)

        return piece
    }
    getUrl() {
        return this.imageUrl
    }
    getID() {
        return this.imageID
    }
    getArtist() {
        return this.artist
    }
    getTitle() {
        return this.title
    }
    getDated() {
        return this.dated
    }
    getCulture() {
        return this.culture
    }
    formatParams(params) {
        return "?" + Object
        .keys(params)
        .map(function(key){
          return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
    }
}
