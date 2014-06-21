if (Meteor.isClient) {
Accounts.ui.config({
  requestPermissions: {
    facebook: ['email', 'user_friends', 'user_location', 'user_events', 
            "user_relationships",
            'friends_events', 'friends_location', 'friends_about_me',
            'user_status', 'friends_status', 'read_friendlists'],
    }
});

Template.hello.rendered=function(){
        Meteor.call('getFFriends',"639917658", function(err, data) {
             $('#result').text(JSON.stringify(data, undefined, 4));
         });

};
}

if (Meteor.isServer) {
function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}
Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}
Facebook.prototype.getUserData = function() {
    return this.query('me');
}
Facebook.prototype.getFriends = function() {
    //return this.query('me?fields=friends');
    return this.query('me/friends');
}
Facebook.prototype.getFFriends = function(tid) {
    console.log(tid+"AA");
    console.log(tid+'?fields=friends');
    //return this.query("/"+tid+'/friends');
    //return this.query(tid+'?fields=friends');
    //return this.query(tid+'/friends');
    return this.query('me/mutualfriends/'+tid);
}
Meteor.methods({
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        return data;
    },
    getFriends: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getFriends();
        return data;
    },
    getFFriends: function(tid) {
        console.log(tid);
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getFFriends(tid);
        return data;
    },

});

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
