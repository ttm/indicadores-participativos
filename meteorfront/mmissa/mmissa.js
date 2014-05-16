if (Meteor.isClient) {
Meteor.setInterval(function () {
  Session.set('time', new Date);
}, 1000);


  Template.contador.segundos= function () {
    ttime=Session.get("time")
    return [ttime.getMinutes(),ttime.getSeconds()];
  };

  Template.hello.events({
    'click': function () {
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
