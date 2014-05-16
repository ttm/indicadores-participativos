if (Meteor.isClient) {
    ii=10;
    Session.set("ii",10);
  Template.hello.greeting = function () {
    return "Welcome to mmissa."+Session.get("ii");
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
