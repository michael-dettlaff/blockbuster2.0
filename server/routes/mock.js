let mongoose = require('mongoose');

let Review = require('../models/reviews');
let User = require('../models/users');
let Watchlist = require('../models/watchlist');

// inserting the users into the database
async function mockUsers( ) {
  let users = 
    [ 
      { name : 'Mike Dettlaff', email : 'mike@gmail.com', password : 'mike', role : 'Teacher', classNum : 1, numReviews : 0, reviewsUngraded : 0 },
    ];

  let saved = await User.insertMany( users );
}

async function mockReviews( ) {

  let today = new Date();
  //console.log('Date is ' + today);
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = today.getDate();
  let day = month +'-'+date+'-'+year;
  //console.log(month +'/'+date+'/'+year);

  let reviews =
    [
      { 
        email : 'will@gmail.com', title : 'Cars', rating : 10, 
        review : 'Perhaps The Greatest Achievement In Modern Cinema!', 
        poster: "https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg", date : '4-30-2022', grade : 'NA', feedback: 'NA'
      },
      { 
        email : 'john@gmail.com', title : 'Cats', rating : 1, 
        review : 'Perhaps The worst movie ive ever even seen',
        poster: "https://m.media-amazon.com/images/M/MV5BNjRlNTY3MTAtOTViMS00ZjE5LTkwZGItMGYwNGQwMjg2NTEwXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg", date : '5-1-2022', grade : 'NA', feedback: 'NA'
      },
      { 
        email : 'champ@gmail.com', title : 'Speed', rating : 8, 
        review : 'This movie was freaking awesome', 
        poster: "https://m.media-amazon.com/images/M/MV5BYjc0MjYyN2EtZGRhMy00NzJiLWI2Y2QtYzhiYTU3NzAxNzg4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg", date : day, grade : 'NA', feedback: 'NA'
      },
      { 
        email : 'herb@gmail.com', title : 'The Batman', rating : 7, 
        review : 'A little bit long, but a great new tone for the character', 
        poster: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg", date : day, grade : 'NA', feedback: 'NA'
      },
      { 
        email : 'champ@gmail.com', title : 'Se7en', rating : 9, 
        review : 'This movie was messed up in all the right ways', 
        poster: "https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", date : '4-30-2022', grade : 'NA', feedback: 'NA'
      },
      { 
        email : 'herb@gmail.com', title : 'Parasite', rating : 10, 
        review : 'Now this is Cinema!', 
        poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",date : day, grade : 'NA', feedback: 'NA'
      },
      { 
        email : 'will@gmail.com', title : 'Rounders', rating : 8, 
        review : '"Rounders" cheerfully buys into compulsive gambling. The hero gambles away his tuition money, his girlfriend, his law degree and nearly his life, and at the end hes still a happy gambler. If this movie were about alcoholism, the hero would regain consciousness after the DTs and order another double. Most gambling movies are dire warnings; this one is a recruiting poster.I think thats because the movie would rather recycle the Rocky genre than end on a sour note. It stars Matt Damon as a New York law student who is a truly gifted poker player, and since the movie ends with a big game you somehow kinda know hes not going to lose it. Since the genre insists on a victory at the end, the movie has to be in favor of poker; you dont see Rocky deciding to retire because of brain damage.',
        poster: "https://m.media-amazon.com/images/M/MV5BMzViMmMxMzItYmYyYi00NGU3LWI2MDMtNjcwOWFmZTZkOTcwXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_SX300.jpg", date : day, grade : 'NA', feedback: 'NA'
      },
    ];

  let saved = await Review.insertMany(reviews);
}

async function mockWatchlist(){

  let watchlist = [
    {
      email : 'mike@gmail.com',
      title : 'The Big Short',
      poster : 'https://m.media-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'
    },
    {
      email : 'mike@gmail.com',
      title : 'Sicario',
      poster : 'https://m.media-amazon.com/images/M/MV5BMjA5NjM3NTk1M15BMl5BanBnXkFtZTgwMzg1MzU2NjE@._V1_SX300.jpg'
    },
    {
      email : 'will@gmail.com',
      title : 'Taxi Driver',
      poster : 'https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
    },
  ];

  let saved = await Watchlist.insertMany(watchlist);
}


async function mockData() {
  await mongoose.connection.dropDatabase();
  
  await mockUsers();
  //await mockReviews();
  //await mockWatchlist();
}
  
module.exports = mockData;