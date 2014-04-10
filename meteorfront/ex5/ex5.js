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
rRGB=function(){
    var foo=genInt(3,128,0);
    var bar="rgb("+foo[0]+","+foo[1]+","+foo[2]+")";
    console.log(bar);
    return bar;
};
var W=150;
var W2=2*W;
if (Meteor.isClient) {
    var estado={w1:W,w2:W2,h1:W/2,h2:W2,size:W/6,alpha:0.9,atual:"inicial"};
    var palavra="MMiSSA";
    var letras=[];
    for(var i=0;i<palavra.length;i++){
        letras[i]={letra:palavra[i],
                   cor:"rgba(0,0,0,0)",
                   pos:{x:(estado.w1*(1-estado.alpha)/2)+  i*(estado.w1*estado.alpha)/palavra.length,
                        y:estado.h1*0.6 },
                   pos2:{x:(i+0.5)*(estado.w2*estado.alpha)/(palavra.length),
                        y:estado.h2/2 },
                   A:{ax:0.1*W,
                      ay:0.1*W},
                  };
    }
    letras[0].expansoes=[{palavra:"onitoramento"}];
    letras[1].expansoes=[{palavra:"assivo"}];
    letras[2].expansoes=[{palavra:"nterpessoal"},{palavra:"nteligente"},{palavra:"nterativo"}];
    letras[3].expansoes=[{palavra:"ociedade"}];
    letras[4].expansoes=[{palavra:"ociedade"}];
    letras[5].expansoes=[{palavra:"proveitamento"}];
    MMISSA={palavra:{}};
    MMISSA.palavra.palavra=palavra;
    MMISSA.palavra.letras=letras;
    MMISSA.estado=estado;
    MMISSA.move=0; // colocar 1 assim que estiver tudo criado para mexer o svg todo


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
    if(MMISSA.move){
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
Template.honneyPot.ticket=function(){
    return Math.random()*100000;
};
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
        var ttexts= d3.selectAll(".mmissaText")
               .data(MMISSA.palavra.letras)
               .text(function (d){return d.letra});

        if(MMISSA.estado.atual==="inicial"){
                ttexts.transition().duration(200).delay(300)
               .attr("x", function(d,i) { return d.pos.x+Math.random()*d.A.ax})
              .attr("y", function(d,i)  { return d.pos.y+Math.random()*d.A.ay});
        } else {
            ttexts.transition().duration(200).delay(300)
               .attr("x", function(d,i) { return d.pos2.x+Math.random()*d.A.ax})
              .attr("y", function(d,i)  { return d.pos2.y+Math.random()*d.A.ay});
            ttexts.selectAll("text")
                .data(function(d){console.log(d.expansoes); return d.expansoes})
                .enter().append("text")
       .text(function (d){return d.palavra})
      .attr("font-size", MMISSA.estado.size+"px")
       .attr("x", function(d,i) { return i*50 })
      .attr("y", function(d,i)  { return i*50})
      .attr("fill", "black")
      .attr("color", "black");
//            .selectAll("text.labels")
//            .data(function(d){return d.expansoes})
//            .enter().append("text")
//            .text(function(d){return d.palavra})
//      .attr("font-size", MMISSA.estado.size+"px")
//       .attr("x", function(d,i) { return 50 })
//      .attr("y", function(d,i)  { return 50});

        }


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
    var svg=svg=d3.select("#mmissa").append("svg").attr("width",MMISSA.estado.w1).attr("height", MMISSA.estado.h1)
       .on('click', function(d){ 
            if(MMISSA.estado.atual==="inicial"){
                MMISSA.estado.atual="expandido";
             var nodeSelection = d3.select(this).transition()
                                   .attr("height",MMISSA.estado.h2)
                                   .attr("width",MMISSA.estado.w2)
            
                d3.selectAll(".mmissaText").transition()
                                        .attr("y",function(d,i){ return d.pos2.y })
                                        .attr("x",function(d,i){ return d.pos2.x });
            } else {
                MMISSA.estado.atual="inicial";
                var nodeSelection = d3.select(this).transition()
                                    .attr("height",MMISSA.estado.h1)
                                    .attr("width",MMISSA.estado.w1);
               d3.selectAll(".mmissaText").transition()
                                       .attr("y",function(d,i){ return d.pos.y })
                                       .attr("x",function(d,i){ return d.pos.x });
            }
        })
       .on('mouseover', function(d){ 
            d3.select(".mmissaRect").attr("stroke","black");

})
       .on('mouseout', function(d){ 
            d3.select(".mmissaRect").attr("stroke","white");
});
//       .on('mouseout', function(d){ 
//                var nodeSelection = d3.select(this).transition()
//                                     .attr("height",MMISSA.estado.h1)
//                                     .attr("width",MMISSA.estado.w1);
//                d3.selectAll(".mmissaText").transition()
//                                        .attr("y",function(d,i){ return d.pos.y })
//                                        .attr("x",function(d,i){ return d.pos.x });
//        })
//       .on('click', function(d){ 
//                var nodeSelection = d3.select(this).transition().attr("fill",rRGB());
//                d3.select(".mmissaRect").transition().attr("fill",rRGB());
//    console.log("fora missa");
//        });


    svg.append("rect")
       .attr("class", "mmissaRect")
       .attr("width", "100%")
       .attr("height", "100%")
       .attr("fill", "red")
        .attr("stroke-width","5")
        .attr("stroke","white")
        .attr("rx","20")
        .attr("ry","20")
//       .on('mouseover', function(d){ 
//                var nodeSelection = d3.select(this)
//                                      .transition()
//                                      .attr("height",MMISSA.estado.h2)
//                                      .attr("width",MMISSA.estado.w2);
//
//        })
//       .on('mouseout', function(d){ 
//            var nodeSelection = d3.select(this)
//                                  .transition()
//                                  .attr("height",MMISSA.estado.h1)
//                                  .attr("width",MMISSA.estado.w1);
//        })
       .on('click', function(d){ 
            var nodeSelection = d3.select(this)
                                  .transition()
                                  .attr("color",rRGB());
        });

;

    tlabels=svg.selectAll("text.labels")
       .data(MMISSA.palavra.letras)
       .enter().append("text")
        .attr("class", "mmissaText")
       .text(function (d){return d.letra})
      .attr("font-size", MMISSA.estado.size+"px")
       .attr("x", function(d,i) { return d.pos.x })
      .attr("y", function(d,i)  { return d.pos.y});
//       .on('mouseover', function(d){ 
//            var nodeSelection = d3.select(this).transition().attr("y",MMISSA.estado.h2/2);
//        });

    MMISSA.move=1;

    }


      Meteor.startup(function () {    }); //

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
