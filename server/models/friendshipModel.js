var mongoose = require('mongoose');
var FriendshipSchema = mongoose.Schema({
    fk_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fk_friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
mongoose.model('Friendship', FriendshipSchema);