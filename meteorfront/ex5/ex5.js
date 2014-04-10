AA=new Meteor.Collection("HHaao0");
arenaNETmundial=new Meteor.Collection("HHarenaNETmundial");
Participabr=new Meteor.Collection("HHParticipabr");
BDS={"AA":AA,"arenaNETmundial":arenaNETmundial,"Participabr":Participabr};

genInt=function(N,R,O){
    var mar=[];
    for(var i=0;i<N;i++){
        mar.push(O+Math.floor(Math.random()*R));
    }
    return mar;
};

if (Meteor.isClient) {
Session.set("theTopic","AA");
  Template.hello.greeting = function () {
    return "seja bem vindo.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  //Template.toptopics.topics=["#arenaNETmundial","#Participabr","AA","megarrede","escritos","sobre"]
  Template.toptopics.topics=[{"topic":"#arenaNETmundial"},{"topic":"#Participabr"},{"topic":"AA"},{"topic":"megarrede"},{"topic":"emails"},{"topic":"doação de dados"},{"topic":"escritos"},{"topic":"sobre"}];
    for(var i=0;i<Template.toptopics.topics.length;i++){
        Template.toptopics.topics[i].tid=Template.toptopics.topics[i].topic.replace(/#/g,"");
}

  Template.toptopics.events=({

    'click': function(evt, tmpl){
        console.log("clicou "+evt.target.id);
        yesme=evt; yesme2=tmpl;
        
        Session.set("theTopic",evt.target.id);

},
    'keydown': function(e){ // DOES NOT WORK TTM
        console.log("apertou ");
},
    'mouseenter svg': function(evt, tmpl){
        console.log("entrou");
},
    'mouseleave svg': function(evt, tmpl){
        console.log("saiu");
},
});
Template.messages.messages=function(){
    //return Session.get("bb");
    return BDS[Session.get("theTopic")]
            // FIND SELETIVO NAO FUNCIONA TTM
              .find({},{fields:{text:1,created_at:1},sort:{id:-1}})
              .fetch();
};

  Meteor.startup(function () {
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
