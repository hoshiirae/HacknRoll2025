import louis from './images/louis.png';
import coco from './images/coco.png';
import leon from './images/leon.png';

const dialogueData = [
    {
        "id": 1,
        "text":"One fine day in the cat cafe...",
        "character": null,
        "image": null
      },
      {
          "id": 2,
          "text":"Meow!Meow Meowwwww! (Human! Please help us!)",
          "character": "Louis",
          "image": louis
      },
      {
        "id": 3,
        "text": "Meowwwww Meow Meow. (Each of us is trapped in our own little puzzle, and we need your help to break free!)",
        "character": "Coco",
        "image": coco
      },
      {
          "id": 4,
          "text": "Meow. (Choose wisely, human. Each of us holds a different challenge. Some require brains, others... a touch of courage. Only the cleverest can help us escape.)",
          "character": "Leon",
          "image": leon
      },
      {
        "id": 5,
        "text": "Meow meowwwww! (Tap one of us to start our adventure!)",
        "character": "Louis",
        "image": louis
      },
      {
          "id": 6,
          "text": "Meowwwww! (Our freedom lie in your hands!)",
          "character": "Coco",
          "image": coco
      },

      //losing one game

      {
        "id": 7,
        "text": "Meoww...(Louis! Please don't let us turn into monsters too...)",
        "character": "Coco",
        "image": coco
      },

      {
        "id": 8,
        "text": "Meoww...(Leon! Please don't let us turn into monsters too...)",
        "character": "Louis",
        "image": louis
      },

      {
        "id": 9,
        "text": "Meoww...(Coco! Please don't let us turn into monsters too...)",
        "character": "Leon",
        "image": leon
      },


      //losing two games
      
      {
        "id": 11,
        "text": "Meoww meow....(Please help me. I don't want to turn into a monster)",
        "character": "Coco",
        "image": coco
      },

      {
        "id": 12,
        "text": "Meoww meow....(Please help me. I don't want to turn into a monster)",
        "character": "Louis",
        "image": louis
      },

      {
        "id": 13,
        "text": "Meoww...(Coco! Please don't let us turn into monsters too...)",
        "character": "Leon",
        "image": leon
      },

      //losing all games
      {
        "id": 14,
        "text": "insert corrupted text",
        "character": "Leon",
        "image": leon
      }, 

      {
        "id": 15,
        "text": "insert corrupted text",
        "character": "Coco",
        "image": coco
      },

      {
        "id": 16,
        "text": "insert corrupted text",
        "character": "Louis",
        "image": louis
      }, 

      //winning all games
      {
        "id": 17,
        "text": "Meow!! (Thank you for helping us escape!)",
        "character": "Coco",
        "image": coco
      }
]

export default dialogueData;