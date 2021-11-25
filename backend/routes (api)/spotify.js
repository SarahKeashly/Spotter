/*
 * All routes querying spotify API belong here
 */

const express = require("express");
const router = express.Router();



module.exports = (spotifyApiWrapper) => {
  /*  getUserPlaylists('*spotify username*')
      {
        "href":"https://api.spotify.com/v1/users/wagabooga/playlists?offset=0&limit=20",
        "items":[{"collaborative":false,
        "description":"funky + rando",
        "external_urls":{"spotify":"https://open.spotify.com/playlist/31C8S7xQbbtpLRmlZ1xOTM"},
        "href":"https://api.spotify.com/v1/playlists/31C8S7xQbbtpLRmlZ1xOTM",
        "id":"31C8S7xQbbtpLRmlZ1xOTM",
        "images":[{"height":640,"url":"https://mosaic.scdn.co/640/ab67616d0000b2734bac7a0f6b01f294e7af818cab67616d0000b273879e9318cb9f4e05ee552ac9ab67616d0000b273a1d785640d9421ec17ea8fe6ab67616d0000b273a47ee7a49c53ccdcb38dc874","width":640},
        {"height":300,"url":"https://mosaic.scdn.co/300/ab67616d0000b2734bac7a0f6b01f294e7af818cab67616d0000b273879e9318cb9f4e05ee552ac9ab67616d0000b273a1d785640d9421ec17ea8fe6ab67616d0000b273a47ee7a49c53ccdcb38dc874","width":300},
        {"height":60,"url":"https://mosaic.scdn.co/60/ab67616d0000b2734bac7a0f6b01f294e7af818cab67616d0000b273879e9318cb9f4e05ee552ac9ab67616d0000b273a1d785640d9421ec17ea8fe6ab67616d0000b273a47ee7a49c53ccdcb38dc874","width":60}],
        "name":"2",
        "owner":{"display_name":"wagabooga","external_urls":{"spotify":"https://open.spotify.com/user/wagabooga"}
  */
  router.get("/playlists", (req, res) => {
    spotifyApiWrapper.getUserPlaylists()
      .then(function (data) {
        res.json(data.body)
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  });


  router.get("/searchTrack/:id", (req, res) => {
    spotifyApiWrapper.searchTracks(req.params.id)
      .then(function (data) {
        console.log("data.body.tracks.items", data.body.tracks.items)
        res.json(data.body.tracks.items)
      }, function (err) {
        console.error(err);
      })
      .catch((err) => {
        console.log(err)
      })
  });
  router.get("/devices", (req, res) => {
    spotifyApiWrapper.getMyDevices()
      .then(function (data) {
        let availableDevices = data.body.devices;
        console.log(availableDevices);
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  });
  return router;
};
