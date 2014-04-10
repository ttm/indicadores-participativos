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
    return "Welcome to ex5.";
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
    'click #AA': function(evt, tmpl){
evt.target.id;
        console.log("clicou AA");
},
    'click': function(evt, tmpl){
        console.log("clicou "+evt.target.id);
        console.log("originou-se de "+evt.target);
//aa=AA.find({},{"text":1,"created_at":1,"user.name":1}).limit(10);
//aa=BDS[evt.target.id].find({},{"text":1,"created_at":1,"user.name":1}).limit(10);
//aa=BDS[evt.target.id].find({},{"text":1,"created_at":1,"user.name":1},{"limit":10});
//bb=aa.fetch();
//Session.set("bb",bb.slice(bb.length-10,bb.length));
Session.set("theTopic",evt.target.id);
d3.select("body").transition()
                .duration(2000)
    //.style("background-color", "hsl(" + Math.random() * 360 + ",100%,50%)");
//    .style("background-color", "rgb(" + Math.random() * 128+ ","+Math.random() * 128+","+Math.random()*128+")");

//d3.select("body").selectAll("p")
//    .data([4, 8, 15, 16, 23, 42])
//  .enter().append("p")
//    .text(function(d) { return "I’m number " + d + "!"; });

},
    'keydown': function(e){ // does not work
        console.log("apertou ");
},
    'mouseenter ul': function(evt, tmpl){
        console.log("entrou");
},
    'mouseleave ul': function(evt, tmpl){
        console.log("saiu");
},
});
Template.messages.messages=function(){
    //return Session.get("bb");
    return BDS[Session.get("theTopic")]
              //.find({},{"text":1,"created_at":1,"user.name":1},{$sort:{id:-1}})
              .find({},{fields:{text:1,created_at:1},sort:{id:-1}})
              //.find({}).sort({id:-1})
              .fetch();
};

  Meteor.startup(function () {
//d3.select("body").style("background-color", "#DFD");
//d3.select("body").style("background-color", "#DFD");
//d3.select("body").style("background-color", "#000");
//d3.select("body").style("color", "#FFF");
d3.selectAll("li").style("color", function() {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
});
d3.selectAll("li").style("background", function(d, i) {
  return i % 2 ? "#fff" : "#eee";
});
d3.selectAll("li")
    .data(genInt(Template.toptopics.topics.length,16,10))
    .style("font-size", function(d) { return d + "px"; });


});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
