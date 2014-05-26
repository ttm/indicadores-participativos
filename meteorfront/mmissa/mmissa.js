Router.map(function() {
  this.route('musica', {
    path: '/musica', 
    onRun: function() {
      console.log('load one');
      Session.set("SELECTED","idmusica");
      Session.set("ROUTED",1);
    },
    onBeforeAction: function() {
      console.log('before one');
    }
  });
  this.route('', {
    path: '/', 
    onRun: function() {
      console.log('load two');
    },
    onBeforeAction: function() {
      console.log('before two');
    }
  });
});

                if (Meteor.isClient) {
// Create an AudioCOntext and a JavaScriptNode.
var contextClass = (window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext);
context=new contextClass();

var bufferSize =Math.pow(2,12);
var  lambda_f=Math.pow(2,10); // tamanho da tabela
var whiteNoise = context.createScriptProcessor(bufferSize, 1, 1);
sinTable=[];
triTable=[];
sqrTable=[];
sawTable=[];
noise=[];
for(var i=0;i<lambda_f;i++){
    sinTable.push(Math.sin(2*Math.PI*(i/lambda_f)));
    triTable.push(1-Math.abs(2-4*(i/lambda_f)));
    if(i<lambda_f/2){
        sqrTable.push(1);
    } else {
        sqrTable.push(-1);
    }
    sawTable.push(2*(i/lambda_f)-1);
}
tables=[sinTable,triTable,sqrTable,sawTable];
f_a=context.sampleRate;
vozes=[[0,210,0.1],[1,150,0.3]]; // 0 sin 1 tri 2 sqr 3 saw
fator=lambda_f/f_a;
ii=0;
vozes_=[];
vozesB=[];
nota_nova=1;
whiteNoise.onaudioprocess = function(e) {
    var output = e.outputBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        ii+=1;
        foo_i=ii*fator;
        val=0;
        for(var j=0;j<vozes_.length;j++){
            voz=vozes_[j];
            indice=Math.floor(foo_i*voz[1])%lambda_f;
            val+=tables[voz[0]][indice]*voz[2];
        }
        if(nota_nova){
            ramp=i/bufferSize;
        } else {
            ramp=1;
        }
        valB=0;
        for(var j=0;j<vozesB.length;j++){
            voz=vozesB[j];
            indice=Math.floor(foo_i*voz[1])%lambda_f;
            valB+=tables[voz[0]][indice]*voz[2];
        }
        output[i]=val*ramp+valB*(1-ramp);
    }
    nota_nova=0;
};
whiteNoise.connect(context.destination);
Session.set("OPTION",0);
Session.set("ROUTED",0);
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
F0=200;
  Template.controladores.tf0=function(){
    Session.get("time");
    return F0.toFixed(2);
}

  Template.controladores.rendered=function(){
        var ee0=d3.select("#rectControladores").on("click",function(d){
                console.log("yoeu");
                ddd=d;
                coor=d3.mouse(this);
                console.log(coor[0],coor[1]);
            var rx=coor[0];
            var ry=coor[1];
        d3.selectAll("rect").attr("rx",rx).attr("ry",ry);
        });
        tscale=d3.scale.linear().domain([0,d3.select("#rectf0")[0][0].getBBox().width]).range([60,500]);
        d3.select("#rectf0").on("click",function(d){
                ttt=this;
                bbox=this.getBBox();
                coor=d3.mouse(this);
                xx=coor[0];
                console.log(xx);
                F0=tscale(xx);
        });
};
  Template.hello.events({
     'mousemove': function(evt){
        Session.set("mx",evt.clientX);
        Session.set("my",evt.clientY);
}
  });
  Template.hello.rendered=function(){
    console.log("seesion is", Session.get("SELECTED"));
    console.log("routed is", Session.get("ROUTED"));
    if(!Session.get("ROUTED")){
    console.log("yey");
    
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
                .style("fill", "#f5c516")
                .attr("x", function(d) { return d.x-1+"%"; })
               .attr("y", function(d)  { return d.y-4+"%";});
               groups.append("rect")
                .attr("y", function(d)  { return "0%";})
                .attr("width", function(d) { return "25%"; })
                .attr("height", function(d) { return "12%"; });
    groups.append("text")
                .style("fill", "#662200")
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
}
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

nodes= d3.selectAll(".node")[0];
vozesB=vozes_;
vozes_=[];
for(var i=0;i<nodes.length;i++){
    if(Math.random()<0.03){
        node=nodes[i];
        tnode=node.getElementsByTagName("text")[0];
        tnode.textContent=node.__data__.nome;
        cnode=node.getElementsByTagName("circle")[0];
        d3.select(cnode).transition().style("fill","red").attr("r",10);
        vozes_.push([Math.floor(node.__data__.clust/0.26),F0+20*node.__data__.grau,0.1]);
    } else {
        node=nodes[i];
        tnode=node.getElementsByTagName("text")[0];
        tnode.textContent="";
        cnode=node.getElementsByTagName("circle")[0];
        d3.select(cnode).transition().style("fill","blue").attr("r",5);
    }
}
nota_nova=1;
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

Meteor.call("redeTeste2",function(error,result){
    graph=result.data.graph;
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

node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return ""; });

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
            return Meteor.http.call("GET", "http://brserver2.heroku.com/json/"); },
       redeTeste: function () {
            return Meteor.http.call("GET", "http://brserver2.heroku.com/redeTeste/"); },
       redeTeste2: function () {
            return Meteor.http.call("GET", "http://brserver2.heroku.com/redeTeste2/"); },
    });
  Meteor.startup(function () {
  });
}
