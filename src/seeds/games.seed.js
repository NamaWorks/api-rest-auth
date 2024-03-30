const mongoose = require("mongoose")

const Game = require("../api/models/game_model")
const Console = require("../api/models/console_model")

let games = [
    {
      name: "Cyberpunk 2077",
      release_date: "December 2023",
      genres: ["Action RPG", "Open World"],
      description: "Explore Night City in this futuristic RPG set in a dystopian future.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Helldivers 2",
      release_date: "February 2024",
      genres: ["Online Co-op", "Action"],
      description: "Fight for the freedom of Super Earth!",
      console: ["PC", "PS5"],
    },
    {
      name: "Elden Ring",
      release_date: "February 2024",
      genres: ["Action RPG", "Fantasy"],
      description: "FromSoftware and George R. R. Martin collaborate in this dark fantasy adventure.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Halo Infinite",
      release_date: "November 2023",
      genres: ["First-Person Shooter", "Sci-Fi"],
      description: "Master Chief returns to save humanity in the next chapter of the Halo saga.",
      console: ["PC", "Xbox"],
    },
    {
      name: "Starfield",
      release_date: "October 2023",
      genres: ["Space Exploration", "Sci-Fi"],
      description: "Embark on interstellar adventures in Bethesda's highly anticipated space RPG.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Metroid Prime 4",
      release_date: "TBD",
      genres: ["Action-Adventure", "Science Fiction"],
      description: "Samus Aran's return promises thrilling exploration and alien encounters.",
      console: ["Switch"],
    },
    {
      name: "The Legend of Zelda: Breath of the Wild 2",
      release_date: "TBD",
      genres: ["Action-Adventure", "Fantasy"],
      description: "Link's next epic quest unfolds in the sequel to the beloved Breath of the Wild.",
      console: ["Switch"],
    },
    {
      name: "Redfall",
      release_date: "Summer 2024",
      genres: ["Co-op Shooter", "Vampires"],
      description: "Battle supernatural threats in an open-world co-op shooter set in a vampire-infested town.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Fable IV",
      release_date: "TBD",
      genres: ["Action RPG", "Fantasy"],
      description: "Return to the whimsical world of Albion in the next installment of the Fable series.",
      console: ["PC", "Xbox"],
    },
    {
      name: "God of War: Ragnarok",
      release_date: "TBD",
      genres: ["Action-Adventure", "Mythology"],
      description: "Kratos faces off against Norse gods in this highly anticipated sequel.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Horizon Forbidden West",
      release_date: "February 2024",
      genres: ["Action RPG", "Post-Apocalyptic"],
      description: "Aloy's journey continues in a lush and dangerous world filled with robotic creatures.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Resident Evil 4 Remake",
      release_date: "TBD",
      genres: ["Survival Horror", "Zombies"],
      description: "Relive the horror classic with updated graphics and gameplay.",
      console: ["PC", "Xbox", "PS5", "Switch"],
    },
    {
      name: "Final Fantasy XVI",
      release_date: "TBD",
      genres: ["JRPG", "Fantasy"],
      description: "A new epic unfolds in the beloved Final Fantasy franchise.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Deathloop",
      release_date: "September 2023",
      genres: ["Action", "Time Loop"],
      description: "Assume the role of an assassin trapped in a time loop on the mysterious Blackreef island.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Senua's Saga: Hellblade II",
      release_date: "TBD",
      genres: ["Action-Adventure", "Psychological Horror"],
      description: "Venture into Norse mythology with Senua in this haunting sequel.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Ghostwire: Tokyo",
      release_date: "October 2023",
      genres: ["Action", "Supernatural"],
      description: "Investigate paranormal occurrences in a supernatural-infested Tokyo.",
      console: ["PC", "Xbox", "PS5"],
    },
    {
      name: "Star Wars: Knights of the Old Republic Remake",
      release_date: "TBD",
      genres: ["RPG", "Science Fiction"],
      description: "Relive the iconic Star Wars RPG with modern graphics and enhanced gameplay.",
      console: ["PC"],
    },
    {
      name: "Silksong",
      release_date: "TBD",
      genres: ["Action-Adventure"],
      description: "The second part of one of the best metroidvanias",
      console: ["PC", "Xbox", "PS5", "Switch"],
    },
]

// const gamesDocuments = games.map(game=> new Game(game))

let gamesData = []
const feedGames = async () => {
try {
  await mongoose
    .connect(process.env.URL_DB)
    .then(async ()=> {
      const allGames = await Game.find()
      if(allGames.length>0) {
        await Game.collection.drop()
      }
    })
    .catch((error) => {console.log(`error deleting data: ${error}`)})
    .then(async() => {
      const consolesData = await Console.find()
      const consolesMock = new Array(...await consolesData)
      const gamesArr = games.forEach(game => {
        const gameConsoles = game.console
        let consolesIdArr = []
        // We enter the consoles inside each game
          gameConsoles.forEach((consoleName) => {
            consolesMock.forEach((consoleItem) => {
              if(consoleItem.name === consoleName){
                let id = String(consoleItem._id)
                consolesIdArr.push(id)
              }
              game.console = consolesIdArr
            })
            })
              let  consoleOrigin  = game.console
              gamesData.push(game)
          })
        })
    .catch((error) => {console.log(`error creating data: ${error}`)})
    .then(async()=> {
        let gamesDocuments = gamesData.map(game => new Game(game))
      await Game.insertMany(gamesDocuments)
          
    })
    // .finally(() => { mongoose.disconnect()})
} catch (error) {
  console.log(`error feeding Games data: ${error}`)
}
}
feedGames()

// module.exports = gamesDocuments
module.exports = { feedGames }