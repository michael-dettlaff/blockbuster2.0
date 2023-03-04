const mongoose = require('mongoose');

// have to do something with defaults
const WatchlistSchema = new mongoose.Schema( {
    email  : {type: String, required: true},
    title  : {type: String, required: true},
    poster : {type: String}
});

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = Watchlist;