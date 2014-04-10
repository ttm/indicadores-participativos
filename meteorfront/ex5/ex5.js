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
MMISSA_MOVE=0;

Meteor.setInterval(function () {
  Session.set('time', new Date);
  }, 1000);

UI.body.helpers({
    hours: _.range(0, 12),
    degrees: function () {
        return 30 * this;
    },
    handData: function () {
//Template.mmissa.rendered()
console.log(4);
if(MMISSA_MOVE){
    moveMmissa();
console.log(5);
}
        var time = Session.get('time') || new Date;
        return { hourDegrees: time.getHours() * 30,
        minuteDegrees: time.getMinutes() * 6,
        secondDegrees: time.getSeconds() * 6 };
    },
    radial: function (angleDegrees,
                startFraction,
                endFraction) {
    var r = 100;
    var radians = (angleDegrees-90) / 180 * Math.PI;

    return {
    x1: r * startFraction * Math.cos(radians),
            y1: r * startFraction * Math.sin(radians),
            x2: r * endFraction * Math.cos(radians),
            y2: r * endFraction * Math.sin(radians)
    };
    }
});

Session.set("theTopic","AA");
  Template.hello.greeting = function () {
    return "seja bem vindo.";
  };


Template.hello.mmissa=function(){
}

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

function randInt(N,A,O){
     N = typeof N !== 'undefined' ? N : 3 ;
A = typeof A !== 'undefined' ? A : 128;
O = typeof O !== 'undefined' ? a : 0;
    var rands=[];
    for(var i=0;i<N;i++){
        rands[i]=Math.floor(Math.random()*A+O);
    }
    return rands;
    
    
}
function moveMmissa(){
console.log(Math.random());
var svg=d3.select("#mmissa").select("svg");
tsvg=svg[0];

datajoin=d3.selectAll(".mmissaText")
   .data(mmissa)
   .text(function (d){return d})
   .attr("x", function(d,i) { return (i*(w*0.9)/mmissafoo.length)*(1+Math.random()*0.1) })
  .attr("y", function(d,i)  { return (1+Math.random()*0.1)*(.9*h )});
//   .text(function (d){return d});
//
TC_=randInt();
TC="rgb("+TC_[0]+","+TC_[1]+","+TC_[2]+")";
TC_=randInt();
BC="rgb("+TC_[0]+","+TC_[1]+","+TC_[2]+")";
d3.select("body")
//    .style("background","rgb("+Math.floor(Math.random()*128)+",0,0 )")
    //.transition()
    .style("background",BC)
    .style("color",TC);
   //.attr("x", function(d,i) { return i});

  // .attr("x", function(d,i) { return i*w/mmissafoo.length +2})
  //.attr("y", function(d,i)  { return (1+Math.random()*0.3)*(.9*h )});


//   .text(function (d){return d})
//  .transition()
//   .attr("x", function(d,i) { return i*w/mmissafoo.length +2})
//  .attr("y", function(d,i)  { return (1+Math.random()*0.3)*(.9*h )});

}

Template.mmissa.rendered=function() {
h=100;
h2=400;
w=400;
//self=this;
//self.svg=svg;
var svg=svg=d3.select("#mmissa").append("svg").attr("width",w).attr("height", h)
   .on('mouseover', function(d){ 
            var nodeSelection = d3.select(this).transition().attr("height",h2);
console.log("dentro missa");
    })
   .on('mouseout', function(d){ 
console.log("fora missa");
    })
   .on('click', function(d){ 
            var nodeSelection = d3.select(this).transition().attr("height",h);
console.log("fora missa");
    });


svg.append("rect")
   .attr("width", "100%")
   .attr("height", "100%")
   .attr("fill", "red")
   .on('mouseover', function(d){ 
            var nodeSelection = d3.select(this).attr("height",400);
    });
mmissafoo="MMiSSA";
mmissa=[];
for(var i=0;i<mmissafoo.length;i++){mmissa[i]=mmissafoo[i];}
tlabels=svg.selectAll("text.labels")
   .data(mmissa)
   .enter().append("text")
    .attr("class", "mmissaText")
   .text(function (d){return d})
  .attr("font-size", h+"px")
   .attr("x", function(d,i) { return i*w/mmissafoo.length })
  .attr("y", function(d,i)  { return (1+Math.random()*0.1)*(.9*h )})
   .on('mouseover', function(d){ 
            var nodeSelection = d3.select(this).transition().attr("y",h2/2);
    });
  //.attr("y", function(d,i)  { return .9*h })

MMISSA_MOVE=1;

}


  Meteor.startup(function () {
var height=150;
var width=440;
//var svg=d3.select("#tituloMissa").append('svg').attr("width",width).attr("height", height);
var svg=d3.select("body").append('svg').attr("width",width).attr("height", height).attr("float","right");

mmissafoo="MMISSA";
mmissa=[];
for(var i=0;i<mmissafoo.length;i++){mmissa[i]=mmissafoo[i];}
svg.selectAll("text.labels")
   .data(mmissa)
   .enter().append("text")
   .text(function (d){return d})
   .attr("x", function(d,i) { return i*width/mmissafoo.length })
  .attr("y", function(d,i)  { return height });
//  .attr("font-family", "sans-serif")
//  .attr("font-size", "70px")
//  .attr("fill", "red");
//   .x(function(d,i){return i);

pdata = [10,12,6,8,15];
 
         selectDIV = d3.select("#example1");
 
        selectDIV.selectAll("p")
             .data(pdata)
             .enter()
             .append("p")
             .text(function(d){return d});

});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
