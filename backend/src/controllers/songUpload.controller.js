const SongModel = require("../models/song.model.js");
const StorageService = require("../services/storage.service.js");
const id3 = require("node-id3");

const songUpload = async (req, res) => {
  try {
    const { mood } = req.body;
    const songBuffer = req.file.buffer;
    const tags = id3.read(songBuffer);

    // console.log(mood)
    // return

    //uploading buffer to cloud service and getting url link (calling same time both asunc code save time with promise.all)

    const [songFile, imagePosterFile] = await Promise.all([
      StorageService.uploadFile({
        fileBuffer: songBuffer,
        filename: tags.title + ".mp3",
        folder: "moodify/songs",
      }),
      StorageService.uploadFile({
        fileBuffer: tags.image.imageBuffer,
        filename: tags.title + ".jpeg",
        folder: "moodify/song_poster",
      }),
    ]);

    //uploading buffer to cloud service and getting url link (calling saprately two async oprtion)

    // const songFile = await StorageService.uploadFile({
    //     fileBuffer:songBuffer,
    //     filename: tags.title + ".mp3",
    //     folder: "moodify/songs"
    // })

    // // console.log(song)

    // const imagePosterFile = await StorageService.uploadFile({
    //     fileBuffer: tags.image.imageBuffer,
    //     filename : tags.title + ".jpeg",
    //     folder: "moodify/song_poster"
    // })

    const song = await SongModel.create({
      songUrl: songFile.url,
      posterUrl: imagePosterFile.url,
      title: tags.title + ".mp3",
      mood: mood,
    });

    res.status(201).json({
      message: "song uploaded successfuly",
      song,
    });
  } catch (err) {
    console.log(
      `something went wrong at songUpload controller with ERROR : ${err}`
    );
  }
};

const getSong = async (req, res) => {
  try {
    const { mood } = req.query;

    const song = await SongModel.findOne({
      mood,
    });

    res.status(200).json({
      message: "song fetched successfuly",
      song,
    });
  } catch (err) {
    console.log(
      `something went wrong at getSong controller with ERROR : ${err}`
    );
  }
};

module.exports = {
  songUpload,
  getSong,
};
