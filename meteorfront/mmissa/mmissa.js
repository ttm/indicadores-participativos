                if (Meteor.isClient) {
/////////////////////// BEGIN AUDIO SETUP
// Example showing how to produce a tone using Web Audio API.
var oscillator;
var amp;
function fixOscillator(osc)
{
    if (typeof osc.start == 'undefined') {
        osc.start = function(when) {
            osc.noteOn(when);
        }
    }
    if (typeof osc.stop == 'undefined') {
        osc.stop = function(when) {
            osc.noteOff(when);
        }
    }
}
// Create an AudioCOntext and a JavaScriptNode.
var contextClass = (window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext);
context=new contextClass();
function initAudio() {
    if( context )  {
        oscillator = context.createOscillator();
        fixOscillator(oscillator);
        oscillator.frequency.value = 440;
        amp = context.createGainNode();
        amp.gain.value = 0;
    
        // Connect ooscillator to amp and amp to the mixer of the context.
        // This is like connecting cables between jacks on a modular synth.
        oscillator.connect(amp);
        amp.connect(context.destination);
        oscillator.start(0);
    }
}
// Set the frequency of the oscillator and start it running.
function startTone( frequency ) {
        oscillator = context.createOscillator();
        fixOscillator(oscillator);
        oscillator.frequency.value = 440;
        amp = context.createGainNode();
        amp.gain.value = 0;
    
        // Connect ooscillator to amp and amp to the mixer of the context.
        // This is like connecting cables between jacks on a modular synth.
        oscillator.connect(amp);
        amp.connect(context.destination);
        oscillator.start(0);
    var now = context.currentTime;
    oscillator.frequency.setValueAtTime(frequency, now);
    // Ramp up the gain so we can hear the sound.
    // We can ramp smoothly to the desired value.
    // First we should cancel any previous scheduled events that might interfere.
    amp.gain.cancelScheduledValues(now);
    // Anchor beginning of ramp at current value.
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.1);
    return [amp, oscillator];
}
ST=startTone;
function stopTone(amp) {
    var now = context.currentTime;
    amp.gain.cancelScheduledValues(now);
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.0, context.currentTime + 1.0);
}
ST2=stopTone;
// init once the page has finished loading.
window.onload = initAudio;
////////////////////// END AUDIO SETUP

Session.set("OPTION",0);
Session.set("SELECTED",0);
Meteor.setInterval(function () {
  Session.set('time', new Date);
}, 1000);
  Template.mmissa.texto= function(){
    return "MMISSA";
}
  Template.contador.mousepos= function () {
    return [Session.get("mx"),Session.get("my")];
};
  Template.contador.contagem= function () {
    d3.select("#textoMmissa").transition().attr("x",(84+2*Math.random())+"%") //TTM
                        .attr("y",(44+2*Math.random())+"%")
                        .attr("font-size",15+10*Math.random());
    ttime=Session.get("time");
    d3.selectAll(".sobreText").style("fill",function(){
        acor="rgb("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")";
        return acor;
    });
    if(ttime){
        return [ttime.getMinutes(),ttime.getSeconds()];
    }
  };

  Template.mmissa.events({
    'click': function () {
        ht=Math.floor(20+20*Math.random())+"%";
    d3.select("#rectMmissa").transition().attr("height",ht);
    d3.selectAll("rect").style("fill",function(d){
        acor="rgb("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")";
        return acor;});
    },
  });

  Template.controladores.rendered=function(){
        var ee0=d3.select("#rectControladores").on("click",function(d){
                console.log("yoeu");
                ddd=d;
                ttt=this;
                coor=d3.mouse(this);
                console.log(coor[0],coor[1]);
            var rx=coor[0];
            var ry=coor[1];
        d3.selectAll("rect").attr("rx",rx).attr("ry",ry);
        });
};
  Template.hello.events({
     'mousemove': function(evt){
        Session.set("mx",evt.clientX);
        Session.set("my",evt.clientY);
}
  });
  Template.hello.rendered=function(){
    topicos=["aa","hashtags","participabr","arenanetmundial","teloes","musica","emails","doação de dados","sobre"];
    menu=[];
    for(var i=0; i<topicos.length; i++){
        var x=(0.2+i%3)*(100.0/3);
        var y=(0.6+Math.floor(i/3))*(100.0/5);
        menu.push({palavra:topicos[i],x:x,y:y});
}
    ee1=d3.select("#svgC");
    groups=ee1.selectAll("g").data(menu)
      .enter().append("svg").attr("class","menuItem").attr("id",function(d){return "id"+d.palavra;})
                .style("fill", "white")
                .attr("x", function(d) { return d.x-1+"%"; })
               .attr("y", function(d)  { return d.y-4+"%";});
               groups.append("rect")
                .attr("y", function(d)  { return "0%";})
                .attr("width", function(d) { return "25%"; })
                .attr("height", function(d) { return "12%"; });
    groups.append("text")
                .style("fill", "black")
                .attr("x", function(d) { return "1%"; }).style("stroke-width","0%")
               .attr("y", function(d)  { return "6%";})
                .text(function (d){return d.palavra});
    SELECTED=0;
    groups.on("click",function(d){
                    if(SELECTED){
                        SELECTED=0;
                            d3.selectAll(".menuItem").transition().style("fill","white").style("stroke-width","0%")
                .attr("x", function(d) { return d.x-1+"%"; })
               .attr("y", function(d)  { return d.y-4+"%";});
                        d3.selectAll(".hashItem").transition().style("fill","white").style("stroke-width","0%")
                .attr("x", function(d) { return "-500px"; })
               .attr("y", function(d)  { return "-500px";});
            Session.set("HASH",0);

                    } else {
                                d3.selectAll(".menuItem").transition().attr("x","60%").attr("y","5%").style("fill","black");
                                d3.select(this).transition().attr("x","5%").attr("y","5%").style("fill","yellow").style("stroke-width","0.3%").style("stroke","black");
                                SELECTED=this.id;
                        }
    Session.set("SELECTED",SELECTED);
      });
};
Template.tCentral.SELECTED=function(){
    Session.get("SELECTED");
    if(typeof SELECTED=="undefined"){
        return 0;
    } else {
        return SELECTED;
    }
};
Template.tCentral.hasHash=function(){
    hash=Session.get("HASH");
    if(typeof hash!=="undefined"){
        if(hash!==0){
            return 1;
        }
    }
}
foos=[];    
Template.musica.tsync=function(){
    ttime=Session.get("time");
    for(var i=0;i<foos.length;i++){
        ST2(foos[i][0]);
    }
    foos=[];
    d3.selectAll(".node circle").style("fill",function(d){
        chance=Math.random();
        if(chance<0.1){
            acor="red";
            foo=ST(d.degree*100);
            foos.push(foo);
        } else {
            //acor="rgb("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")";}
            acor="blue";}
        return acor;});
};
Template.musica.rendered=function(){
    tsvg=d3.select("#musica");
var color = d3.scale.category20();
height="300";
width ="300";
var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

Meteor.call("redeTeste",function(error,result){
    graph=result.data;
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = tsvg.selectAll(".link")
      .data(force.links())
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = tsvg.selectAll(".node")
      .data(force.nodes())
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);
  
node.append("circle")
      .attr("r", 5)
      .style("fill", function(d) { ddd=d; return color(d.group); });

  node.append("title")
      .text(function(d) { return d.name; });


  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
//    node.attr("cx", function(d) { return d.x; })
//        .attr("cy", function(d) { return d.y; });
  });
});
};
Template.tCentral.isMusica=function(){
    SEL=Session.get("SELECTED");
    if(SEL=="idmusica"){
        return 1;
    } else {
        return 0;
    }
};
Template.tCentral.isHash=function(){
    Session.get("SELECTED");
    if(typeof SELECTED=="undefined"){
        return 0;
    } else {
        if(SELECTED=="idhashtags"){
    hashtags=["participabr","arenaNETmundial","aao0"];
    hashMenu=[];
    for(var i=0; i<hashtags.length; i++){
        var x=(0.2+i%3)*(100.0/3);
        var y=(1.6+Math.floor(i/3))*(100.0/5);
        hashMenu.push({palavra:hashtags[i],x:x,y:y});
}
    ee1=d3.select("#svgC");
    groups=ee1.selectAll("g").data(hashMenu)
      .enter().append("svg").attr("class","hashItem").attr("id",function(d){return "hash"+d.palavra;})
                .style("fill", "white")
                .attr("x", function(d) { return d.x-1+"%"; })
               .attr("y", function(d)  { return d.y-4+"%";});
               groups.append("rect")
                .attr("y", function(d)  { return "0%";})
                .attr("width", function(d) { return "25%"; })
                .attr("height", function(d) { return "12%"; });
    groups.append("text")
                .style("fill", "black")
                .attr("x", function(d) { return "1%"; }).style("stroke-width","0%")
               .attr("y", function(d)  { return "6%";})
                .text(function (d){return "#"+d.palavra});
    HASH=0;
    groups.on("click",function(d){
                    if(HASH){
                        HASH=0;
                            d3.selectAll(".menuItem").transition().style("fill","white").style("stroke-width","0%")
                .attr("x", function(d) { return d.x-1+"%"; })
               .attr("y", function(d)  { return d.y-4+"%";});
                        d3.selectAll(".hashItem").transition().style("fill","white").style("stroke-width","0%")
                .attr("x", function(d) { return "-500px"; })
               .attr("y", function(d)  { return "-500px";});
                    Session.set("SELECTED",0);
            Session.set("HASH",0);
                    SELECTED=0;
                    } else {
                                d3.selectAll(".hashItem").transition().attr("x","60%").attr("y","5%").style("fill","black");
                                d3.select(this).transition().attr("x","5%").attr("y","5%").style("fill","yellow").style("stroke-width","0.3%").style("stroke","black");
                                HASH=this.id;
                        }
    Session.set("HASH",HASH);
      });
            return 1;
        } else {
            return 0;
        }
    }
};
Template.tHash.rendered=function(){
    d3.select("#wNet").on("click",function(){
        console.log("done",Session.get("HASH"),Session.get("SELECTED"));
Session.set("OPTION",1);
    });
};
Template.hello.option=function(){
    return Session.get("OPTION");
};
Template.tCentral.HASH=function(){
    return Session.get("HASH");
};
Template.tCentral.isSobre=function(){
    Session.get("SELECTED");
    if(typeof SELECTED=="undefined"){
        return 0;
    } else {
        if(SELECTED=="idsobre"){
            return 1;
        } else {
            if(SELECTED=="idhashtags" || SELECTED==0 || SELECTED=="idmusica"){
                return 0;
            } else {
                return 1;
            }
        }
    }
};

  Meteor.startup(function () { 
        Meteor.call("redeTeste", function(error,results) {
            terr2=error;
            tres2=results;
        });
        Meteor.call("jsonTest", function(error,results) {
            terr=error;
            tres=results;
        });
});
                    } // end isClient

if (Meteor.isServer) {
    Meteor.methods({
       jsonTest: function () {
            return Meteor.http.call("GET", "http://0.0.0.0:5000/json/"); },
       redeTeste: function () {
            return Meteor.http.call("GET", "http://0.0.0.0:5000/redeTeste/"); },
    });
  Meteor.startup(function () {
  });
}
