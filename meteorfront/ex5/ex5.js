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
    var foo=genInt(3,256,0);
    var bar="rgb("+foo[0]+","+foo[1]+","+foo[2]+")";
    //console.log(bar);
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
                        y:estado.h2/2.6 },
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
    //console.log(4);
    if(MMISSA.move){
        moveMmissa();
    //console.log(5);
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
        return "Arte em Ação";
      };

      Template.hello.greeting2 = function () {
        return "Autorregulação Algorítmica";
      };


    Template.hello.mmissa=function(){
    }

      Template.hello.events({
        'click input': function () {
          // template data, if any, is available in 'this'
          if (typeof console !== 'undefined')
            //console.log("You pressed the button");
prompt("O que você quer?");
        }
      });

      //Template.toptopics.topics=["#arenaNETmundial","#Participabr","AA","megarrede","escritos","sobre"]
      Template.toptopics.topics=[{"topic":"#arenaNETmundial"},{"topic":"#Participabr"},{"topic":"AA"},{topic:"Endpoint Sparql"},{"topic":"megarrede"},{"topic":"emails"},{"topic":"doação de dados"},{"topic":"escritos"},{"topic":"sobre"}];
        for(var i=0;i<Template.toptopics.topics.length;i++){
            Template.toptopics.topics[i].tid=Template.toptopics.topics[i].topic.replace(/#/g,"");
    }
Template.honneyPot.ticket=function(){
    return Math.random()*100000;
};
      Template.toptopics.events=({

        'click': function(evt, tmpl){
            //console.log("clicou "+evt.target.id);
            yesme=evt; yesme2=tmpl;
            
            Session.set("theTopic",evt.target.id);

    },
        'keydown': function(e){ // DOES NOT WORK TTM
            //console.log("apertou ");
    },
        'mouseenter svg': function(evt, tmpl){
            //console.log("entrou");
    },
        'mouseleave svg': function(evt, tmpl){
            //console.log("saiu");
    },
    });
    Template.messages.messages=function(){
foo="bar";
        //return Session.get("bb");
//        return BDS[Session.get("theTopic")]
//                // FIND SELETIVO NAO FUNCIONA TTM
//                  .find({},{fields:{text:1,created_at:1},sort:{id:-1}})
//                  .fetch();
    };

    function randInt(N,A,O){
         N = typeof N !== 'undefined' ? N : 3 ;
    A = typeof A !== 'undefined' ? A : 128;
    O = typeof O !== 'undefined' ? O : 0;
        var rands=[];
        for(var i=0;i<N;i++){
            rands[i]=Math.floor(Math.random()*A+O);
        }
        return rands;
        
        
    }

    function moveMmissa(){
        //console.log(Math.random());
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
              .attr("y", function(d,i)  { return d.pos2.y+Math.random()*d.A.ay*5});
            ttexts.selectAll("text")
                .data(function(d){ return d.expansoes})
                .enter().append("text")
       .text(function (d){return d.palavra})
      .attr("font-size", MMISSA.estado.size+"px")
       .attr("x", function(d,i) { return i*50 })
      .attr("y", function(d,i)  { return i*50});
      //.attr("fill", "black")
      //.attr("color", "black");
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
            //TC_=randInt();
            //TC="rgb("+TC_[0]+","+TC_[1]+","+TC_[2]+")";
            //TC_=randInt(3,20,105);
            if(typeof BC !=="undefined"){
                DX=7;
            //console.log(BC);
                BC1+=Math.floor((Math.random()*2-1)*DX);
                BC1= (BC1<200) ? 200 : BC1;
                BC2+=Math.floor((Math.random()*2-1)*DX);
                BC2= (BC2<200) ? 200 : BC2;
                BC3+=Math.floor((Math.random()*2-1)*DX);
                BC3= (BC3<200) ? 200 : BC3;
             BC="rgb("+BC1+","
                      +BC2+","
                      +BC3+")";
        
            } else {
            BC1=Math.floor(Math.random()*10+200);
            BC2=Math.floor(Math.random()*10+200);
            BC3=Math.floor(Math.random()*10+200);
            BC="rgb("+BC1+","
                     +BC2+","
                     +BC3+")";
            }

            if(typeof TC !=="undefined"){
                DXt=15*2;
            //console.log(TC);
                TC1+=Math.floor((Math.random()*2-1)*DXt);
                TC1= (TC1>80 ) ? 80 : TC1;
                TC2+=Math.floor((Math.random()*2-1)*DXt*2);
                TC2= (TC2<0 ) ? 20 : TC2;
                TC2= (TC2>80 ) ? 70 : TC2;
                TC3+=Math.floor((Math.random()*2-1)*DXt);
                TC3= (TC3>80) ? 80 : TC3;
             TC="rgb("+TC1+","
                      +TC2+","
                      +TC3+")";
        
            } else {
            TC1=Math.floor(Math.random()*40);
            TC2=Math.floor(Math.random()*40);
            TC3=Math.floor(Math.random()*40);
            TC="rgb("+TC1+","
                     +TC2+","
                     +TC3+")";
            }

            d3.select("body")
                .transition().duration(750)
                .style("background-color",BC)
                .style("color",TC);
            //    .style("background","rgb("+Math.floor(Math.random()*128)+",0,0 )")
               //.attr("x", function(d,i) { return i});

              // .attr("x", function(d,i) { return i*w/mmissafoo.length +2})
              //.attr("y", function(d,i)  { return (1+Math.random()*0.3)*(.9*h )});


            //   .text(function (d){return d})
            //  .transition()
            //   .attr("x", function(d,i) { return i*w/mmissafoo.length +2})
            //  .attr("y", function(d,i)  { return (1+Math.random()*0.3)*(.9*h )});

    }

var mw=580;
var mh=200;
    Template.mmissa.rendered=function() {
svgt=d3.select("#toptopics").append("svg")
               .attr("width",mw)
                .attr("height",mh);
rectt=svgt.append("rect").attr("width","100%").attr("height","100%").attr("fill","red");


var n_topics=Template.toptopics.topics.length;
//var janela=mw/n_topics;
//var altura=mh/n_topics;
var alpha_margemx=0.05;
var alpha_margemy=0.3;
var ncol=3; var nlinha=3;
var janela=(mw*.95)/ncol;
var altura=mh/nlinha;
xi=[];
yi=[];
for(var i=0; i<n_topics;i++){
   xi.push(i%ncol); 
   yi.push(Math.floor(i/ncol)); 
}


topicItens=svgt.selectAll("g .topicMenuGroup")
    .data(Template.toptopics.topics)
    .enter().append("g")
    .attr("class","topicMenuSvg");



topicItens.append("rect")
    .attr("class","topicMenuRect")
    .attr("fill","green")
    .attr("x",function(d,i){return 10+janela*xi[i]}     )
    .attr("y",function(d,i){return 10+altura*yi[i]}     )
    //.attr("y",10     )
    .attr("width",janela*(1-alpha_margemx))
    .attr("height",altura*(1-alpha_margemy))
    .attr("stroke-width",function(d){return d.topic==="#arenaNETmundial" ? "5" : "0"})
    .attr("stroke",function(d){return d.topic==="#arenaNETmundial" ? "white" : "black"})
    .on("click",function(d){

console.log(d.topic); 

d3.selectAll(".topicMenuRect").attr("stroke-width","0").attr("stroke","black");

d3.select(this).style("fill", rRGB())
        .attr("stroke-width","5")
        .attr("stroke","white")
;});
    
topicItens.append("text")
    .attr("class","topicText")
    .attr("x",function(d,i){return 10+janela*(xi[i]+0.05)}     )
    .attr("y",function(d,i){return 10+altura*(yi[i]+0.5)}     )
    .attr("pointer-events","none")
   .text(function (d){return d.topic});


    //var svg=svg=d3.select("#leftbar").append("svg").attr("width",MMISSA.estado.w1).attr("height", MMISSA.estado.h1)


    var svg=svg=d3.select("#mmissa").append("svg").attr("width",MMISSA.estado.w1).attr("height", MMISSA.estado.h1)
       .on('click', function(d){ 
            if(MMISSA.estado.atual==="inicial"){
                MMISSA.estado.atual="expandido";
             var nodeSelection = d3.select(this).transition()
                                   .attr("height",MMISSA.estado.h2)
                                   .attr("width",MMISSA.estado.w2)
            
                d3.selectAll(".mmissaText").transition()
                                        .attr("y",function(d,i){ return d.pos2.y +Math.random()*d.A.ax})
                                        .attr("x",function(d,i){ return d.pos2.x +Math.random()*d.A.ay*5});
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
      .attr("font-family", "cursive")
       .attr("x", function(d,i) { return d.pos.x })
      .attr("y", function(d,i)  { return d.pos.y});
//       .on('mouseover', function(d){ 
//            var nodeSelection = d3.select(this).transition().attr("y",MMISSA.estado.h2/2);
//        });

    MMISSA.move=1;
//AA.=
//d3.select("#leftbar").append("svg").selectAll("rect")
//                                   .data(
lsvg=d3.select("#leftbar").append("svg").attr("width",220)   
                                         .attr("height",70);
lrect=lsvg.append("rect").attr("width",200)
                    .attr("height",50)
                    .attr("fill","green")
                    .attr("x","5")
                    .attr("y","15")
                    .attr("rx","50")
                    .attr("ry","50")
                    .attr("stroke-width","5")
                    .attr("stroke",rRGB());

ltext=lsvg.append("text").text("AA é Arte em Ação").attr("pointer-events", "none")
      .attr("font-size", 20)
       .attr("x", function(d,i) { return 15 })
      .attr("y", function(d,i)  { return 30+15});
lrect.attr("width",ltext[0][0].getComputedTextLength()+20);

AAon=0;
lrect.on("click",function(d){
    AAon=sTweets("#leftbar",BDS.AA,AAon);
});


rsvg=d3.select("#rightbar").append("svg").attr("width",220)   
                                        .attr("height",70);
rrect=rsvg.append("rect").attr("width",200)
                    .attr("height",50)
                    .attr("fill","blue")
                    .attr("x","5")
                    .attr("y","15")
                    .attr("rx","50")
                    .attr("ry","50")
                    .attr("stroke-width","5")
                    .attr("stroke",rRGB());

rtext=rsvg.append("text").text("Participa.br")
      .attr("font-size", 20)
       .attr("x", function(d,i) { return 15 })
      .attr("y", function(d,i)  { return 30+15}).attr("pointer-events", "none");
rrect.attr("width",rtext[0][0].getComputedTextLength()+20);

Participaon=0;
rrect.on("click",function(d){
    Participaon=sTweets("#rightbar",BDS.Participabr,Participaon);
});




msvg=d3.select("#mmessages").append("svg").attr("width",240)   
                                        .attr("height",70);
mrect=msvg.append("rect").attr("width",200)
                    .attr("height",50)
                    .attr("fill","red")
                    .attr("x","5")
                    .attr("y","15")
                    .attr("rx","50")
                    .attr("ry","50")
                    .attr("stroke-width","5")
                    .attr("stroke",rRGB());

mtext=msvg.append("text").text("#arenaNETmundial")
      .attr("font-size", 20)
       .attr("x", function(d,i) { return 15 })
      .attr("y", function(d,i)  { return 30+15}).attr("pointer-events", "none");

mrect.attr("width",mtext[0][0].getComputedTextLength()+20);

Arenaon=0;
mrect.on("click",function(d){
    Arenaon=sTweets("#mmessages",BDS.arenaNETmundial,Arenaon);
});



}

function sTweets(oid,acoll,avar){
    if (avar===1){
    console.log(oid,acoll,avar,"desmonta");
        avar=0;
       d3.select(oid).selectAll("p").remove();
    } else {
    console.log(oid,acoll,avar,"monta");
        avar=1;
        adata=acoll.find().fetch();
       d3.select(oid).selectAll("p")
            .data(adata)
            .enter()
            .append("p")
            .append("a")
            .attr("href",function(d){return "http://twitter.com/"+d.user.screen_name})
            .attr("target","_blank")
            .append("text")
            //.text("o texto")
            .text(function(d){return d.user.screen_name+": "+d.text+". "+d.created_at;})
       .attr("x", function(d,i) { return 15 })
      .attr("y", function(d,i)  { return 60+15*i});
    }
    return avar;

};


      Meteor.startup(function () {    }); //

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
