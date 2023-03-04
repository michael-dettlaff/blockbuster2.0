var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

let User = require('../models/users');
let Review = require('../models/reviews');
let watchList = require('../models/watchlist');

const fetch = require('node-fetch');
const Watchlist = require('../models/watchlist');

router.post('/login', function(req, res, next) {

  console.log("logging in");

  req.session.regenerate((err) => {

    if(err){
      console.log(err);
    } else {
      User.find( {'email' : req.body.email, 'password' : req.body.password} , (err, users) => {
        if( err ) {
          res.status(500).send("Error");
        } else {
          if(users.length == 1){ //there is a user in the database
            if(users[0].role == 'Teacher'){
              let user = { 'Teacher' : true, 'id' : users[0]['id'], 'email' : users[0]['email'], 'classNum' : users[0]['classNum'] };
              let csrf = uuidv4();
              req.session.csrf = csrf;
              req.session.user = user;
              res.cookie('X-XSRF-TOKEN', csrf );
              //res.json(user);
              res.status(200).send(user);
            } else {
              let user = { 'Student' : true, 'id' : users[0]['id'], 'email' : users[0]['email'], 'classNum' : users[0]['classNum'] };
              let csrf = uuidv4();
              req.session.csrf = csrf;
              req.session.user = user;
              res.cookie('X-XSRF-TOKEN', csrf );
              //res.json(user);
              res.status(200).send(user);
            }
          } else { // user is not in db
            //res.json( {error: 'error'} );
            res.status(200).send( {error: 'error'} );
          }
        }
      });
    }
  });
});



// logging out of the website
router.post('/logout', function(req,res,next) {

  req.session.regenerate( function(err) {
    if(err){
      console.log(err);
    } else {
      //res.json( { msg : 'ok' } );
      res.status(200).send( { msg : 'ok' } );
    }
  });
});

// create a new student for a specific class, also register from home screen
router.post('/newStudent/:username', function(req, res, next) {

  let stud = req.body;
  let teacher = req.params['username'];

  let q = {'email' : teacher};

  User.find({'email' : stud.email}, (error, exist) => {
    if(error){
      console.log(error);
    } else {
      if(exist.length > 0){
        let userExists = {error : 'error'};
        //res.json(userExists);
        res.status(200).send(userExists);
      } else {
        User.find(q, (err, teach) => {

          if(err){
            console.log(err);
          } else {
            if(teach.length == 0){
              //res.json({noTeacher : 'error'});
              res.status(200).send( {noTeacher : 'error'} );
            } else {
              let classNum = teach[0].classNum;
              let name = stud.name;
              let email = stud.email;
              let password = stud.password;
              let numReviews = 0;
              let reviewsUngraded = 0;
              let role = 'Student';

              let studObj = {
                'name' : name,
                'email' : email,
                'password' : password,
                'role' : role,
                'classNum' : classNum,
                'numReviews' : numReviews,
                'reviewsUngraded' : reviewsUngraded
              }
              //console.log(studObj);
              insertStudent( studObj, res );
          }
          }
        });
      }
    }
  });
});


// checks if the request is being made by an authenticared user
router.all( '/*', (req, res, next ) => {

  if( req.session.user && req.get('X-XSRF-TOKEN') == req.session.csrf ) {
    next();
  } else {
    console.log('invalid call to another function!');
    res.status('403').send();
  }
});

// getting the name of a particular user
router.get('/getName/:username', function(req,res,next) {
  let user = req.params.username;
  User.find({'email' : user}, (err, name) => {
    if(err){
      console.log(err);
    } else {
      let userName = name[0]['name'];
      //res.json({'user' : userName});
      res.status(200).send( {'user' : userName} );
    }
  });
});


// get the students for a particular class
router.get('/teacher/:username', function(req, res, next) {

  let teacher = req.params.username;
  let query = {'email' : teacher};

  User.find(query, (err, teach) => {
    if(err){
      console.log(err);
    } else {
      let num = teach[0]['classNum'];
      let q = {'role' : 'Student', 'classNum' : num};

      User.find( q , (err, users) => {
        if( err ) {
          console.log('error');
          res.status(500).send("Error");
        } else {
          if(users.length > 0){ //there is a user in the database
            //res.json(users);
            res.status(200).send(users);
          } else { // user is not in db
            //res.json( {error: 'error'} ); 
            res.status(200).send( {error: 'error'} );
          }
        }
      });
    }
  });
});

// create a new teacher
router.post('/newTeacher', function(req, res, next) {

  let teacher = req.body;

  User.find({'email' : teacher['email']}, (err, user) => {
    if(err){
      console.log(err);
    } else {
      if(user.length != 0){
        let userExists = {error : 'error'};
        //console.log('email already in use');
        res.status(200).send(userExists);
      } else {
        User.find({'role' : 'Teacher'}, (error, teachers) =>{
          if(error){
            console.log(error);
          } else {

            let newTeacher = {
              'name' : teacher['name'],
              'email' : teacher['email'],
              'password' : teacher['password'],
              'role' : 'Teacher',
              'classNum' : teachers.length + 1,
              'numReviews' : 0,
              'reviewsUngraded' : 0
            }
            insertTeacher(newTeacher, res);
          }
        });
      }
    }
  });
});


async function insertTeacher( teacher, res){

  let newTeacher = User(teacher);
  let saved = await newTeacher.save( 
    (err, savedUser) => {
      if(err){
        console.log(err);
      } else {
          //console.log(savedUser);
          //res.json(savedUser)
          res.status(200).send(savedUser);
      }
      });
}

async function insertStudent( student, response ){

  let newStudent = User(student);
  let saved = await newStudent.save( 
    (err, savedUser) => {
      if(err){
        console.log(err);
      } else {
          //console.log(savedUser);
          response.status(200).send(savedUser);
      }
      });
}

// search for a specific movie from the api
router.get('/movie/:title', function(req, res, next) {

  let movie = req.params.title;
  searchMovie( movie, res );
});

// the actual function that does the searching of the movie
async function searchMovie( title, response){

  let url = 'https://www.omdbapi.com/?apikey=9be2097b&t=' + title;

  let movie = await fetch(url);
  let data = await movie.json();

  if(data['Response'] == 'False'){
    console.log('this movie doesnt exist in db')
    //response.json(data);
    response.status(200).send(data);
  } else {

    let movieReturn = {
      'Title' : data['Title'],
      'Director' : data['Director'],
      'Year' : data['Year'],
      'Genre' : data['Genre'],
      'Actors' : data['Actors'],
      'Plot' : data['Plot'],
      'imdbRating' : data['imdbRating'],
      'Poster' : data['Poster'],
      'Runtime' : data['Runtime'],
      'Rated' : data['Rated']
    };
    //response.json(movieReturn);
    response.status(200).send(movieReturn);
  }
}

// this endpoint stores a review in the review collection
router.post('/review', function(req, res, next){

  makeReview(req, res);
});

// want the poster to be stored in the review
async function makeReview(req, res){

  let today = new Date();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = today.getDate();
  let day = month +'-'+date+'-'+year;

  let url = 'https://www.omdbapi.com/?apikey=9be2097b&t=' + req.body.title;

  let movie = await fetch(url);
  let data = await movie.json();
  let poster = data['Poster'];

  let review = {
    'email' : req.body.email,
    'title' : req.body.title,
    'rating': req.body.rating,
    'review': req.body.review,
    'date'  : day,
    'poster': poster,
    'grade' : 'NA',
    'feedback' : 'NA'
  }

  let newReview = Review(review);

  User.find({'email': req.body.email}, (error, user) => {
    if(error){
      console.log(error);
    } else {
      let count = user[0]['numReviews'] + 1;
      let count2 = user[0]['reviewsUngraded']+1;
      let id = user[0]['_id'];

      User.findByIdAndUpdate(id,{'numReviews':count, 'reviewsUngraded': count2}, (error2, updatedUser) => {
        if(error2){
          console.log(error2);
        } else {
          let saved = newReview.save( (err, savedReview) => {
            if(err){
              console.log(err);
            } else {
                //res.json(savedReview);
                res.status(200).send(savedReview);
            }
          });
        }
      })
    }
  });
}


//  finding reviews for a particular person
router.get('/reviews/:email', function(req, res, next){  
  let user = req.params.email;
  Review.find({'email':user}, (err, reviews) => {
    if(err){
      console.log(err);
    } else {
      //res.json(reviews);
      res.status(200).send(reviews);
    }
  })
});


//  filtering reviews for a particular person
router.get('/reviews/:email/category/:category/query/:query', function(req, res, next){
  
  let user = req.params.email;
  let category = req.params.category;
  category.replace('%20', ' ');
  let query = req.params.query;
  let filter;

  if(category == 'Movie Rating'){
    filter = {'email' : user, 'rating' : query};
  } else if(category == 'Movie Title'){
    filter = {'email' : user, 'title' : new RegExp(query, 'i')};
  } else if(category == 'Review Date'){
    filter = {'email' : user, 'date' : query};
  } else if(category == 'Review Grade'){
    filter = {'email' : user, 'grade' : query};
  }
  
  Review.find(filter, (err, reviews) => {
    if(err){
      console.log(err);
    } else {
      //res.json(reviews);
      res.status(200).send(reviews);
    }
  })
});


//  deleting a student from the database
router.delete('/student/:email', function(req,res,next){
  let user = req.params.email;

  User.find({'email' : user}, (err, user) => {
    if(err){
      console.log(err);
    } else {
      let id = user[0]['_id'];
      User.findByIdAndDelete(id, (error, del) => {
        if(error){
          console.log(error);
        } else {
          //res.json(del);
          res.status(200).send(del);
        }
      });
    }
  });
});


//getting a specific review 
router.get('/user/:username/review/:review', function(req,res,next){
  let user = req.params.username;
  let movie = req.params.review;

  Review.find({'email': user, 'title': movie}, (err, review) => {
    if(err){
      console.log(error);
    } else {

      // movie was not already reviewed by this person
      if(review.length == 0){
        //res.json({reviewed : false});
        res.status(200).send({reviewed : false});
      } else { // this movie has been reviewed
        //res.json(review[0]);
        res.status(200).send(review[0]);
      }

    }
  }); 
});

//updating a specific review
router.put('/student/:username/review/:review', function(req,res,next){

  let user = req.params.username;
  let movie = req.params.review;

  let updatedReview = {'grade' : req.body.grade, 'feedback' : req.body.feedback};

  User.find({'email' : user}, (err, student) => {
    if(err){
      console.log(err);
    } else {

      Review.findOne({'email' : user, 'title' : movie}, (err3, origReview) => {
        if(err3){
          console.log(err3);
        } else {
          // if the review is not graded
          if(origReview['grade'] == 'NA'){

            // chagning the grade from no grade to grade
            if(req.body.grade != 'NA'){
              let count = student[0]['reviewsUngraded'] - 1;
              User.findByIdAndUpdate(student[0]['_id'], {'reviewsUngraded' : count}, (error, update) => { // updating unGradedReviews
                if(error){
                  console.log(error);
                } else {
                  Review.findOneAndUpdate({'email' : user, 'title' : movie}, updatedReview, (err2, rev) => {
                    if(err2){
                      console.log(err2);
                    } else {
                      //res.json(rev);
                      res.status(200).send(rev);
                    }
                  });
                }
              });
            } else {

            }

          } else { // review is graded

            if(req.body.grade != 'NA'){ //changing grade to a different grade
              //let count = student[0]['reviewsUngraded'] - 1;
              User.findOne(student[0]['_id'], (error, update) => { // updating unGradedReviews
                if(error){
                  console.log(error);
                } else {
                  Review.findOneAndUpdate({'email' : user, 'title' : movie}, updatedReview, (err2, rev) => {
                    if(err2){
                      console.log(err2);
                    } else {
                      //res.json(rev);
                      res.status(200).send(rev);
                    }
                  });
                }
              });

            } else { //changing grade to no grade
              let count = student[0]['reviewsUngraded'] + 1;
              User.findByIdAndUpdate(student[0]['_id'], {'reviewsUngraded' : count}, (error, update) => { // updating unGradedReviews
                if(error){
                  console.log(error);
                } else {
                  Review.findOneAndUpdate({'email' : user, 'title' : movie}, updatedReview, (err2, rev) => {
                    if(err2){
                      console.log(err2);
                    } else {
                      //res.json(rev);
                      res.status(200).send(rev);
                    }
                  });
                }
              });
            }
          }
        }
      });
    }
  });
});

// deleeting a users review
router.delete('/user/:username/review/:title', function(req, res, next) {
  let user = req.params.username;
  let movie = req.params.title;

  Review.find({'email' : user, 'title' : movie}, (err, review) => {
    if(err){
      console.log(err);
    } else {
      if(review[0]['grade'] == 'NA'){
        User.find({'email' : user}, (error, user) => {
          if(error){
            console.log(error);
          } else {
            let ungraded = user[0]['reviewsUngraded'] - 1;
            let reviews = user[0]['numReviews'] - 1;
            User.findByIdAndUpdate(user[0]['_id'], {'reviewsUngraded' : ungraded, 'numReviews' : reviews}, (err2, updatedUser) => {
              if(err2){
                console.log(err2);
              } else {
                //console.log('user should be updated');
              }
            });
            Review.findByIdAndDelete(review[0]['_id'], (err3, delReview) => {
              if(err3){
                console.log(err3);
              } else {
                //console.log('rev should be deleted');
                //res.json(delReview);
                res.status(200).send(delReview);
              }
            });
          }
        }); 
      } else {
        User.find({'email' : user}, (error, user) => {
          if(error){
            console.log(error);
          } else {
            let reviews = user[0]['numReviews'] - 1;
            User.findByIdAndUpdate(user[0]['_id'], {'numReviews' : reviews}, (err2, updatedUser) => {
              if(err2){
                console.log(err2);
              } else {
                //console.log('user should be updated');
              }
            });
            Review.findByIdAndDelete(review[0]['_id'], (err3, delReview) => {
              if(err3){
                console.log(err3);
              } else {
                //res.json(delReview);
                res.status(200).send(delReview);
              }
            });
          }
        });
      }
    }
  });
});

// changing the password of the user
router.post('/changePassword', function(req,res,next) {
  let user = {'email' : req.body.username, 'password' : req.body.password};
  let newPass = {'password' : req.body.newPassword};
  User.find(user, (err, user) =>{
    if(err){
      console.log(err);
    } else {
      // user is not in the database
      if(user.length == 0){
        //res.json({error: 'error'});
        res.status(200).send( {error: 'error'} );
      } else { // user is in database
        User.findByIdAndUpdate(user[0]['_id'], newPass, (error, updatedUser) => {
          if(error){
            console.log(error);
          } else {
            //res.json(updatedUser);
            res.status(200).send(updatedUser);
          }
        });
      } 
    }
  });
});

// changing the student to a teacher
router.put('/newTeacher/:username', function(req,res,next) {

  User.find({'role' : 'Teacher'}, (error, teachers) => {
    if(error){
      console.log(error);
    } else {
      let classNum = teachers.length+1;
      User.find({'email' : req.params.username}, (err, student) => {
        if(err){
          console.log(err);
        } else {
          User.findByIdAndUpdate(student[0]['_id'], {'role' : 'Teacher', 'classNum' : classNum}, (err2, updatedStud) => {
            if(err2){
              console.log(err2);
            } else {
              //res.json(updatedStud);
              res.status(200).send(updatedStud);
            }
          });
        }
      });
    }
  });
});



// changing the username of a user
router.post('/changeUsername', function(req,res,next){
  let user = {'email' : req.body.username, 'password' : req.body.password};
  let newUsername = {'email' : req.body.newUsername};

  User.find(user, (err, user1) => {
    if(err){
      console.log(err);
    } else {
      // user is not in the database
      if(user.length == 0){
        //console.log('wrong password was given');
        //res.json({error: 'error'});
        res.status(200).send( {error: 'error'} );
      } else {
        Review.find({'email' : req.body.username}, (error, revs) => {
          if(error){
            console.log(error);
          } else {
            let i = 0;
            for(i = 0; i < revs.length; i++){
              Review.findOneAndUpdate({'email': req.body.username, 'title' : revs[i]['title']}, newUsername, (err2, updatedRev) =>{
                if(err2){
                  console.log(err2);
                } else {
                  //console.log('review should have been updated');
                }
              });
            }
            User.findOneAndUpdate(user, newUsername, (err3, updatedUser) => {
              if(err3){
                console.log(err3);
              } else {
                //res.json(updatedUser);
                res.status(200).send(updatedUser);
              }
            });
          }
        });
      }
    }
  });
});


// updating an ungraded review
router.put('/user/:username/updateReview/:title', function(req, res, next) {

  let newReview = {'rating' : req.body.rating, 'review' : req.body.review};
  let oldReview = {'email' : req.params.username, 'title' : req.params.title};

  Review.findOneAndUpdate(oldReview, newReview, (err, newReview) => {
    if(err){
      console.log(err);
    } else {
      //res.json(newReview);
      res.status(200).send(newReview);
    }
  });

});


// getting a students watchlist
router.get('/watchList/:username', function(req,res,next){
  let user = req.params.username;
  Watchlist.find({'email': user}, (err, movies) => {
    if(err){
      console.log(err);
    } else {
      console.log(movies);
      res.status(200).send(movies);
    }
  });
});


// 
router.post('/watchList/:username', function(req,res,next){
  //console.log(req.params.username + ' ' + req.body.title);
  Watchlist.find({'email' : req.params.username, 'title' : req.body.title}, (err, review) => {
    if(err){
      console.log(err);
    } else {
      if(review.length == 0){
        console.log('not in watchlist');
        insertList(req,res);
      } else {
        console.log('in watchlist');
      }
      //res.status(200).send(review);
    }
  });
});


async function insertList(req, res){

  let addList = {
   'email' : req.params.username,
   'title' : req.body.title,
   'poster': req.body.poster
 }

 let list = Watchlist(addList);
 let saved = await list.save( (err, savedList) => {
  if(err){
    console.log(err);
  } else {
    res.status(200).send(savedList);
  }
 });
 console.log(addList);
}


router.delete('/watchlist/:username/title/:title', function(req,res,next){
  let film = {
    'email' : req.params.username,
    'title' : req.params.title
  };
  console.log(film);
  res.status(200).send(film);
});


require('./mock')();
module.exports = router;
