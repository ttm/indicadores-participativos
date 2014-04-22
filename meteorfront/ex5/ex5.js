function setContext(){
 if(Session.get("theTopic")==="teloes"){
    Session.set("tcheia",1);
 }
 if(Session.get("theTopic")==="teloes"){
 }
 if(Session.get("theTopic")==="emails"){
 }
 if(Session.get("theTopic")==="AA"){
     Meteor.call("aaRedeBipartida", function(error,results) {
         Session.set("tdata",results);
         atualizaLaterais(results);
         renderGraph("graph1");
         renderBubble("wordcloud1");
    });
  }
  if(Session.get("theTopic")==="arenaNETmundial"){
    Meteor.call("arenaBase", function(error,results) {
         Session.set("tdata",results);
         atualizaLaterais(results);
         renderGraph("graph1a");
         renderBubble("wordcloud1a");
    });

  }
  if(Session.get("theTopic")==="Participabr"){
    Meteor.call("participaBase", function(error,results) {
         Session.set("tdata",results);
         atualizaLaterais(results);
         renderGraph("graph1p");
         renderBubble("wordcloud1p");
    });
  }
};
function atualizaLaterais(results){
     var col=results.data.collocations;
     var thebar=d3.select("#leftbar");
     parags=thebar.selectAll("p").data(col);
     parags.enter().append("p");
     parags.text(function(d){return d[0]+" "+d[1]});
     parags.exit().remove();
     var thebar=d3.select("#rightbar");
     parags=thebar.selectAll("p").data(results.data.msgs);
     parags.enter().append("p");
    if (Session.get("theTopic")==="arenaNETmundial"){
         parags.text(function(d){return d.user.screen_name+": "+d.text+", "+d.created_at});
    }

    if (Session.get("theTopic")==="Participabr"){
         parags.text(function(d){return d.user.screen_name+": "+d.text+", "+d.created_at});
    }
    if (Session.get("theTopic")==="AA"){
         parags.text(function(d){return results.data.users[d[0]]+": "+d[1]+", "+d[2]});
    }
         parags.exit().remove();

}

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
    return bar;
};

if (Meteor.isClient) {
COUNTER=0;
Template.tcheia.foo=function(){
    d3.select("#text2").text(Session.get("CCOUNTER"));
    d3.select("#text4").text(Session.get("CCOUNTER"));
};
Template.tcheia.tsetup=function(){
     // setup da visualização
     // tamanho da tela, etc
    if (Session.get("screen1")){
        var t1="50%";
        var t2="0%";
    } else {
        var t1="0%";
        var t2="50%";
    }
    var w=Session.get("w");
    var h=Session.get("h");
    //return {w:820,h:400,t1:t1,t2:t2};
    return {w:w,h:h,t1:t1,t2:t2};
};
montaLT2=function(){
    var ltsvg=d3.select("#ltdiv2").append("svg").attr("id","ltsvg2").attr("width","100%").attr("height","100%");
    renderBubbleTelao("ltsvg2");
};
updateBubbleTelao = function(svgid){
        var histograma=Session.get("tdata").hist;
        format = d3.format(",d"),
        fill = d3.scale.category20c();
        var vis = d3.select("#"+svgid);
        var node = vis.selectAll("g.node")
          .data(bubble.nodes({children:histograma}).slice(1))
          .enter().append("svg:g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        node.append("svg:title")
          .text(function(d) { return d.name + ": " + format(d.value); });
        node.append("svg:circle")
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { return fill(d.name); });
        node.append("svg:text")
          .attr("text-anchor", "middle")
          .attr("dy", ".3em")
          .text(function(d) { return d.name.substring(0, d.r / 3); })
          .attr("font-family", "sans-serif")
          .attr("stroke","black")
          .attr("stroke-width",0.1)
          .attr("font-size", function(d){return 4+3*Math.log(5+2*d.count)});
        node.append("svg:text")
          .attr("text-anchor", "middle")
          .attr("dy", "1.6em")
          .attr("stroke-width",0.1)
          .attr("fill","black")
          .text(function(d) { return d.count; })
          .attr("font-size", function(d){return 4+2*Math.log(5+2*d.count)});

};
montaRT2=function(){
    var w=Session.get("w"),h=Session.get("h");
    console.log(w,h);
    var ncol=1;
    var nrow=8;
    var col_sep=(w/2)/ncol;
    var line_sep=(h/2)/nrow;

    var tdata=Session.get('tdata');
    var msgs=tdata.msgs.slice(0,ncol*nrow);
    rtsvg=d3.select("#rtdiv2").append("svg").attr("width","100%").attr("height","100%");
    rttexts=rtsvg.selectAll("text")
            .data(msgs).enter().append("text")
            .append("tspan")
            .text(function(d,i){
                return (d.user.screen_name+": "+d.text+", "+d.created_at).slice(0,90) })
            .attr("x",function(d,i){return 10}).attr("y",function(d,i){return 20+i*line_sep}).attr("font-size",10);
    rttexts2=rtsvg.selectAll("text .subline")
                   .data(msgs).enter().append("text")
                   .append("tspan").text(function(d,i){
                      return (d.user.screen_name+": "+d.text+", "+d.created_at).slice(90) })
                   .attr("x",function(d,i){return 10}).attr("y",function(d,i){return 15+20+i*line_sep}).attr("font-size",10);
};
updateRT2=function(){
    var w=Session.get("w"),h=Session.get("h");
    console.log(w,h);
    var ncol=1;
    var nrow=8;
    var col_sep=(w/2)/ncol;
    var line_sep=(h/2)/nrow;


    var tdata=Session.get('tdata');
    var msgs=tdata.msgs.slice(0,ncol*nrow);
    rttexts=rtsvg.selectAll("text")
            .data(msgs)
            .text(function(d,i){
                return (d.user.screen_name+": "+d.text+", "+d.created_at).slice(0,90) })
            .attr("x",function(d,i){return 10}).attr("y",function(d,i){return 20+i*line_sep}).attr("font-size",10);
    rttexts2=rtsvg.selectAll("text .subline")
                   .data(msgs)
                   .text(function(d,i){
                      return (d.user.screen_name+": "+d.text+", "+d.created_at).slice(90) })
                   .attr("x",function(d,i){return 10}).attr("y",function(d,i){return 15+20+i*line_sep}).attr("font-size",10);

};

montaRB2=function(geral){
    var w=Session.get("w"),h=Session.get("h");
    var col_sep=(w/2)/3;
    var line_sep=(h/2)/5;
    var rbdiv=d3.select("#rbdiv2");
    rbdiv.append("p").attr("id","text3").text("flip me again").attr("x",col_sep).attr("y",line_sep).style("color","green").on("click",function(d){ Session.set("screen1",1);  });
    rbdiv.append("p").attr("id","text4").attr("x",2*col_sep).attr("y",line_sep).style("color","green");
    rbdiv.append("p").attr("id","text5").text("condense").attr("x",col_sep).attr("y",2*line_sep).style("color","green").on("click",function(d){
            Session.set("screen1",1);  
            Session.set("theTopic","AA");  
        Session.set("tcheia",0);
          setContext();
});
tgeral=geral;
    rbdiv.append("div").attr("id","tInfoDiv").selectAll("p").data(geral).enter().append("p").text(function(d){return d.info+": "+d.val}).style("color","green");
};
montaLB2=function(){
   var tsetup=Template.tcheia.tsetup();
    var w=tsetup.w,h=tsetup.h;
    console.log(w,h);
    ncol=3;
    nrow=10;
    var col_sep=(w/2)/ncol;
    var line_sep=(h/2)/nrow;

    var tdata=Session.get('tdata');
    var colloc=tdata.collocations.slice(0,ncol*nrow);
    lbsvg=d3.select("#lbdiv2").append("svg").attr("width","100%").attr("height","100%");
    lbtexts=lbsvg.selectAll("text").data(colloc).enter().append("text").text(function(d,i){return "..."+d[0]+"..."+d[1]+"..." }).attr("x",function(d,i){return (i%3)*col_sep}).attr("y",function(d,i){return (1+Math.floor(i/3))*line_sep}).attr("font-size",10);
};
montaLT=function(tgraph){
    ltsvg=d3.select("#ltdiv").append("svg").attr("id","ltsvg").attr("width","100%").attr("height","100%");
    foobarbaz2=new rtGraph2(tgraph,"ltsvg");

};
montaRT=function(tgraph){
    rtsvg=d3.select("#rtdiv").append("svg").attr("id","rtsvg").attr("width","100%").attr("height","100%");
    var foobarbaz4=new hashGraph(tgraph,"rtsvg");
};
montaRB=function(){
    //var tsetup=Template.tcheia.tsetup();
    //var w=tsetup.w,h=tsetup.h;
    var w=Session.get("w"),h=Session.get("h");
    console.log(w,h);
    var col_sep=(w/2)/3;
    var line_sep=(h/2)/5;

    
    var rbsvg=d3.select("#rbdiv").append("svg").attr("width","100%").attr("height","100%");
    var rbrec=rbsvg.append("rect").attr("width","100%").attr("height","100%").attr("fill","red");
    rbsvg.append("text").attr("id","text2").text(Session.get("CCOUNTER")).attr("x","30%").attr("y","30%");
    rbsvg.append("text").attr("id","textFlip").text("flip me").attr("x","30%").attr("y","90%").on("click",function(d){
            Session.set("screen1",0);
});
    rbsvg.append("text").attr("id","helpMe").text("help").attr("x","30%").attr("y","60%").on("click",function(d){
    alert("Os quatro retangulos verdes ao lado configuram os layouts dos grafos (basta clicar, ele mapeia o x e y).\n\nNo 'config me', coloque <width>;<height>;<nmsgs>\n\nClique no 'flip me' para alternar telao");
});
    rbsvg.append("text").attr("id","configMe").text("config me").attr("x","60%").attr("y","30%").on("click",function(d){
        var invars=prompt("O que você quer?");
            console.log(invars);
        foo=invars;
        wh=invars.split(";")
        Session.set("w",wh[0]);
        Session.set("h",wh[1]);
        Session.set("NMSGS",wh[2]);
});

    rbsvg.append("rect").attr("x","60%").attr("y","60%").attr("width","50%").attr("height","5%").style("fill","green").on("click",function(d){
var ppos=d3.mouse(this);
var tb=this.getBBox();
var delta1=(ppos[0]-tb.x)/tb.width;
var delta2=(ppos[1]-tb.y)/tb.height;
console.log(delta1,delta2);
Session.set("cf1",(10*delta1/0.8)*-12);
Session.set("lf1",(10*delta2)*30);
});
    rbsvg.append("rect").attr("x","60%").attr("y","70%").attr("width","50%").attr("height","5%").style("fill","green").on("click",function(d){
var ppos=d3.mouse(this);
var tb=this.getBBox();
var delta1=(ppos[0]-tb.x)/tb.width;
var delta2=(ppos[1]-tb.y)/tb.height;
console.log(delta1,delta2);
Session.set("cf2",(10*delta1/0.8)*-12);
Session.set("lf2",(10*delta2)*30);
});
    rbsvg.append("rect").attr("x","60%").attr("y","80%").attr("width","50%").attr("height","5%").style("fill","green").on("click",function(d){
var ppos=d3.mouse(this);
var tb=this.getBBox();
var delta1=(ppos[0]-tb.x)/tb.width;
var delta2=(ppos[1]-tb.y)/tb.height;
console.log(3,delta1,delta2);
Session.set("cf3",(10*delta1/0.8)*-12);
Session.set("lf3",(10*delta2)*30);
});


};

montaLB=function(tgraph){
    lbsvg=d3.select("#lbdiv").append("svg").attr("id","lbsvg").attr("width","100%").attr("height","100%");
    //var foobarbaz3=new Bipartite(tgraph,"lbsvg",Template.tcheia.tsetup().w/2,Template.tcheia.tsetup().h/2);
    var foobarbaz3=new wordGraph(tgraph,"lbsvg");
};
updateLT=function(tgraph){
    updateRTGraph2(tgraph,"ltsvg");
    updateRTInfo(tgraph,"ltsvg");
};

updateRT=function(tgraph){
    updateHashGraph(tgraph,"rtsvg");
    updateHashInfo(tgraph,"rtsvg");
};
updateLB=function(tgraph){
    updateWordGraph(tgraph,"lbsvg");
    updateWordInfo(tgraph,"lbsvg");
};
updateRB2=function(geral){
    //d3.select("#tInfoDiv").selectAll("p").data(geral).text(function(d){return d.info+": "+d.val});
};

updateLT2=function(hist){
   // updateBubbleTelao("ltsvg2",hist);
};
updateMe=function(){
        Meteor.call("arenaCheias",Session.get("NMSGS"), function(error,results) {
            var ttdata=results.data;
            Session.set("tdata",ttdata);
            updateLT(ttdata.graph2);
            updateRT(ttdata.graph3);
            updateLB(ttdata.graph);
            updateRB2(ttdata.geral);
            updateRT2();
            updateLT2(ttdata.hist);
        });
};
    Template.tcheia.rendered=function(){
        Session.set("screen1",1);
        Meteor.call("arenaCheias",Session.get("NMSGSi"), function(error,results) {
            Session.set("w",1024);
            Session.set("h",768);
            var ttdata=results.data;
            Session.set("tdata",ttdata);
            montaLT(ttdata.graph2);
            montaRT(ttdata.graph3);
            montaRB();
            montaLB(ttdata.graph);

            montaLT2();
            montaRT2();
            montaRB2(ttdata.geral);
            montaLB2();
        });
    };
    Template.tcheia.ssetup=function(){
 // setup do sistema complexo
 // número de mensagens, etc
        return {nmsgs:100};
};

    Template.rightbar.rendered = function(){
         var thebar=d3.select("#rightbar").style("background","blue").style("padding","10px");
         thebar.append("h3").text("mensagens mais recentes");
};
    Template.leftbar.rendered = function(){
         var thebar=d3.select("#leftbar").style("background","blue").style("padding","10px");
         thebar.append("h3").text("termos associados");
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
            console.log(prompt("O que você quer?"));
        }
    });
    Template.tfooter.ticket=function(){
        return Math.random()*100000;
    };
    Template.toptopics.topics=[{"topic":"#arenaNETmundial"},{"topic":"#Participabr"},{"topic":"AA"},{topic:"Endpoint Sparql"},{"topic":"megarrede"},{"topic":"emails"},{"topic":"doação de dados"},{"topic":"teloes"},{"topic":"sobre"}];
    for(var i=0;i<Template.toptopics.topics.length;i++){
        Template.toptopics.topics[i].tid=Template.toptopics.topics[i].topic.replace(/#/g,"");
    }
    Template.toptopics.events=({
        'click': function(evt, tmpl){
            console.log("clicou "+evt.target.id); yesme=evt; yesme2=tmpl;
            Session.set("theTopic",evt.target.id);
            setContext();
        },
        'keydown': function(e){ // DOES NOT WORK TTM
        },
        'mouseenter svg': function(evt, tmpl){
        },
        'mouseleave svg': function(evt, tmpl){
        },
    });
    Template.theHash.context=function(){
        var tdata=Session.get('tdata');

        if (Session.get("theTopic")==="AA"){
            if (tdata.data){
                var nmsgs=tdata.data.nmsgs;
                var nusers=tdata.data.nusers;
            } else {
                var nmsgs=0;
                var nusers=0;
            }
            return {theTopic : Session.get("theTopic"), isAA : 1,nmsgs:nmsgs,nusers:nusers};
        }
        if (Session.get("theTopic")==="Participabr"){
            if (typeof tdata.data.avar !== "undefined"){
                var nt=tdata.data.avar[0];
                var mr=tdata.data.avar[1];
            } else {
                var vt=0;
                var mr=0;
            }
            return {theTopic : Session.get("theTopic"), isParticipabr: 1,ntweets:nt,mrand:mr};
        }
        if (Session.get("theTopic")==="arenaNETmundial"){
            if (typeof tdata.data.avar !== "undefined"){
                var nt=tdata.data.avar[0];
                var mr=tdata.data.avar[1];
            } else {
                var vt=0;
                var mr=0;
            }
            return {theTopic : Session.get("theTopic"), isArena: 1,ntweets:nt,mrand:mr};
        }
};

    Handlebars.registerHelper('texto1', function() {
        return Session.get("texto1");
    });
    Handlebars.registerHelper('texto2', function() {
        return Session.get("texto2");
    });
Template.toptopics.rendered=function() {
    var mw=580;
    var mh=200;
    svgt=d3.select("#toptopics").append("svg")
                   .attr("width",mw)
                   .attr("height",mh);
    rectt=svgt.append("rect").attr("width","100%").attr("height","100%").attr("fill","red");
    var n_topics=Template.toptopics.topics.length;
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
        .attr("id",function(d){return d.tid})
        .attr("fill","green")
        .attr("x",function(d,i){return 10+janela*xi[i]}     )
        .attr("y",function(d,i){return 10+altura*yi[i]}     )
        //.attr("y",10     )
        .attr("width",janela*(1-alpha_margemx))
        .attr("height",altura*(1-alpha_margemy))
        .attr("stroke-width",function(d){return d.topic==="AA" ? "5" : "0"})
        .attr("stroke",      function(d){return d.topic==="AA" ? "white" : "black"})
        .on("click",function(d){
            console.log(d.topic); 
            d3.selectAll(".topicMenuRect").attr("stroke-width","0").attr("stroke","black");
            d3.select(this).attr("stroke-width","5")
                    .attr("stroke","white")
                        .style("fill", rRGB())
                    .transition()
                        .delay(1000)
                        .duration(0)
                        .style("fill", rRGB())
                    .transition()
                        .delay(2000)
                        .duration(0)
                        .style("fill", rRGB())
                    .transition()
                        .delay(3000)
                        .duration(1000)
                        .style("fill", rRGB())
                        .attr("rx",20)
                        .attr("ry",20);
         });

    topicItens.append("text")
        .attr("class","topicText")
        .attr("x",function(d,i){return 10+janela*(xi[i]+0.05)})
        .attr("y",function(d,i){return 10+altura*(yi[i]+0.5)})
        .attr("pointer-events","none")
        .text(function (d){return d.topic});
}

Template.mmissa.setupMMISSA=function(palavra){
    var W=150;
    var W2=2*W;
    var estado={w1:W,w2:W2,h1:W/2,h2:W2,size:W/6,alpha:0.9,atual:"inicial"};
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
}

Template.mmissa.rendered=function() {
// Setup básico
    Template.mmissa.setupMMISSA("MMISSA");
    MMISSA.move=0; // colocar 1 assim que estiver tudo criado para mexer o svg todo
// MMISSA retangulo geral
    var svg=svg=d3.select("#mmissa").append("svg").attr("width",MMISSA.estado.w1).attr("height", MMISSA.estado.h1)
       .on('click', function(d){ 
            if(MMISSA.estado.atual==="inicial"){
                MMISSA.estado.atual="expandido";
                var nodeSelection = d3.select(this).transition()
                   .attr("height",MMISSA.estado.h2)
                   .attr("width",MMISSA.estado.w2);
            
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
    svg.append("rect")
       .attr("class", "mmissaRect")
       .attr("width", "100%")
       .attr("height", "100%")
       .attr("fill", "red")
       .attr("stroke-width","5")
       .attr("stroke","white")
       .attr("rx","20")
       .attr("ry","20")
       .on('click', function(d){ 
             d3.select(this)
                 .transition()
                 .attr("color",rRGB());
        });
    tlabels=svg.selectAll("text.labels")
       .data(MMISSA.palavra.letras)
       .enter().append("text")
        .attr("class", "mmissaText")
       .text(function (d){return d.letra})
      .attr("font-size", MMISSA.estado.size+"px")
      .attr("font-family", "cursive")
       .attr("x", function(d,i) { return d.pos.x })
      .attr("y", function(d,i)  { return d.pos.y});
    MMISSA.move=1;
}

  Meteor.startup(function () { 
    Meteor.setInterval(function () {
      Session.set('time', new Date);
      }, 1000);
      //Session.set("theTopic","AA"); // para a interface original TTM
      Session.set("theTopic","teloes"); // para a interface de teloes
      Session.set("tcheia",1); // para a interface de teloes
      Session.set("NMSGS",20);
      Session.set("NMSGSi",20);
      Session.set("cf1",-48);
      Session.set("lf1",120);
      Session.set("cf2",-22);
      Session.set("lf2",220);
      Session.set("cf3",-33);
      Session.set("lf3",90);
      setContext();
  });

      Session.set("tcheia",1); // para a interface de teloes

    UI.body.helpers({
        cheia: function(){return Session.get("tcheia")},
        cheiaa: 0,
        hours: _.range(0, 12),
        degrees: function () {
            return 30 * this;
        },
        countMe: function(){
            var time = Session.get("time");
            COUNTER++;
            Session.set("CCOUNTER",COUNTER);
            if ((COUNTER%10)===0){
                console.log("updating");
                updateMe();
            }
            return 2;
        },
        handData: function () {
            if(Session.get("theTopic")!=="teloes"){
                if (typeof MMISSA !== 'undefined'){
                    if(MMISSA.move){
                        moveMmissa();
                    }
                }
                console.log("handdata");
                if ((COUNTER%10)===0){
                    if(Session.get("theTopic")==="Participabr"){
                        Meteor.call("participaBase", function(error,results) {
                            Session.set("tdata",results);
                             atualizaLaterais(results);
                        });
                    }
                    if(Session.get("theTopic")==="arenaNETmundial"){
                        Meteor.call("arenaBase", function(error,results) {
                            Session.set("tdata",results);
                             atualizaLaterais(results);
                        });
                    }

                }
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


    function renderBubbleTelao(svgid){
        var r = 580,
        format = d3.format(",d"),
        fill = d3.scale.category20c();
    var w=Session.get("w")/2,h=Session.get("h")/2;

        bubble = d3.layout.pack()
            .sort(null)
            //.size([r, r])
            .size([w, h])
            .value(function(d) { return 1+Math.log(d.count)*2; })
            .padding(1);
        //var vis = d3.select("#wordcloud1")
        var vis = d3.select("#"+svgid)
            //.attr("width", r)
            //.attr("height", r)
            .attr("width", w)
            .attr("height", h)
            .attr("class", "bubble");

            updateBubbleTelao(svgid);
    };



    function renderBubble(svgid){
        var TTTdata=Session.get('tdata');
        var histograma=TTTdata.data.hist;
        var r = 580,
        format = d3.format(",d"),
        fill = d3.scale.category20c();
   var tsetup=Template.tcheia.tsetup();
    var w=tsetup.w/2,h=tsetup.h/2;

        var bubble = d3.layout.pack()
            .sort(null)
            //.size([r, r])
            .size([w, h])
            .value(function(d) { return 1+Math.log(d.count)*2; })
            .padding(1);
        //var vis = d3.select("#wordcloud1")
        var vis = d3.select("#"+svgid)
            //.attr("width", r)
            //.attr("height", r)
            .attr("width", w)
            .attr("height", h)
            .attr("class", "bubble");
        var node = vis.selectAll("g.node")
          .data(bubble.nodes({children:histograma}).slice(1))
          .enter().append("svg:g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        node.append("svg:title")
          .text(function(d) { return d.name + ": " + format(d.value); });
        node.append("svg:circle")
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { return fill(d.name); });
        node.append("svg:text")
          .attr("text-anchor", "middle")
          .attr("dy", ".3em")
          .text(function(d) { return d.name.substring(0, d.r / 3); })
          .attr("font-family", "sans-serif")
          .attr("stroke","black")
          .attr("stroke-width",0.1)
          .attr("font-size", function(d){return 4+3*Math.log(5+2*d.count)});
        node.append("svg:text")
          .attr("text-anchor", "middle")
          .attr("dy", "1.6em")
          .attr("stroke-width",0.1)
          .attr("fill","black")
          .text(function(d) { return d.count; })
          .attr("font-size", function(d){return 4+2*Math.log(5+2*d.count)});
    };


    function hashNet(tgraph,gid,width,height){ // para tela cheia 1
        console.log(gid,width,height);
        //var width =  580,
        //    height = 300;
        var color2 = d3.scale.category10();
        color2("sd");
        color2("sd2");
        color2("sd3");
        color2("sd4");
        color2("sd5");
        color2("sd6");
        color2("sd7");
        var force2 = d3.layout.force()
            .charge(-12)
            .linkDistance(30)
            .size([width, height]);
        var svg2 = d3.select("#"+gid)
        //var svg = d3.select("#graph1")
            .attr("width", width)
            .attr("height", height);
        //var TTdata=Session.get('tdata');
        //var graph=TTdata.data.graph;
        force2
              .nodes(tgraph.nodes)
              .links(tgraph.links)
              .start();
        var link2 = svg2.selectAll(".link")
              .data(tgraph.links)
              .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });
        var node2 = svg2.selectAll(".node")
              .data(tgraph.nodes)
              .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .style("fill", function(d) { return color2(d.group); })
              .call(force2.drag);
        node2.append("title")
              .text(function(d) { return d.nome; });
        force2.on("tick", function() {
            link2.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node2.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });
    };
// terceiro quadrante
    function wordGraph(tgraph,gid){ // para tela cheia 1
        ttnodesWord = [],
            ttlinksWord = [];
        var color2 = d3.scale.category10();
        color2("asd2"),color2("a4sd"),color2("as5sd"), color2("asd"),color2("assssadd"),color2("assd"),color2("assdsasd");
        force2Word= d3.layout.force()
            .nodes(ttnodesWord)
            .links(ttlinksWord)
            .charge(-12)
            .linkDistance(30)
            .size([Template.tcheia.tsetup().w/2,Template.tcheia.tsetup().h/2])
             .on("tick", tick);

        var svg2 = d3.select("#"+gid);
        svg2.append("text").attr("id","t0"+gid).attr("x",20).attr("y",29).style("fill","white").text("Relacionamento por palavras");
        svg2.append("text").attr("id","t1"+gid).attr("x",20).attr("y",59).style("fill","white");
        svg2.append("text").attr("id","t2"+gid).attr("x",20).attr("y",89).style("fill","white");
        var node = svg2.selectAll(".node"),
            link = svg2.selectAll(".link");
        ttstartWord=function() {
          node = node.data(force2Word.nodes(), function(d) { return d.nome;}).attr("class","oldnodeWords");
          node.enter()
                    .append("circle").attr("class","newnodeWords")
                      .style("fill","yellow").attr("r", function(d){return 3+d.peso_total/2;}).call(force2Word.drag)
                      .transition().duration(2000).style("fill",function(d){return color2(d.group)});
    d3.selectAll(".newnodeWords").append("title")
              .text(function(d) { return d.nome; });
                        node.exit().transition().style("fill","red").remove();
          link = link.data(force2Word.links(), function(d) { return d.nome_source+ "-" + d.nome_target; });
          link.enter().insert("line", ".node").attr("class", "link")
              .style("stroke-width", function(d) { return d.value; });
          link.exit().remove();
          force2Word.start();
        }
        function tick() {
          node.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; })

          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
        }
        updateWordGraph(tgraph,gid);
        updateWordInfo(tgraph,gid);
    };

    updateWordInfo=function(tgraph,gid){
        var svg2 = d3.select("#"+gid)
        svg2.select("#t1"+gid).text("entidades: "+tgraph.nodes.length+", relações: "+tgraph.links.length);
        svg2.select("#t2"+gid).text((tgraph.nodes.length-tgraph.npalavras)+" pessoas, "+tgraph.npalavras+" n palavras");
    }; // para tela cheia 1

    updateWordGraph=function(tgraph,gid){ // para tela cheia 1
      var a = {id: "a"}, b = {id: "b"}, c = {id: "c"};
      ttgraph=tgraph;
     newnodes=tgraph.nodes;
     newlinks=tgraph.links;
     oldnodes=force2Word.nodes();
     // anda em cada oldnodes removendo que nao estiver em new nodes

        force2Word
            .charge(Session.get("cf3"))
            .linkDistance(Session.get("lf3"));

    outs=[];
    for(var i=0;i<oldnodes.length;i++){
        var tnode=oldnodes[i];
        var nodeout=1; // vertice estah fora
        for(var j=0;j<newnodes.length;j++){
            if(tnode.nome===newnodes[j].nome){
                nodeout=0;
            }
        }
        if (nodeout){
            outs.push(i);
        }
    }
    // anda em cada newnode adicionando quem nao estiver em oldnodes
    ins=[];
    for(var i=0;i<newnodes.length;i++){
        tnode=newnodes[i];
        nodein=1; // o vertice entra
        for(var j=0;j<oldnodes.length;j++){
            if(tnode.nome==oldnodes[j].nome){
                nodein=0;
            }
        }
        if (nodein){
            ins.push(i);
        }
    }
    WordIns=ins;
    // remover os nodes dos oldnodes
    for(var i=outs.length-1;i>=0;i--){
        ttnodesWord.splice(outs[i],1);
    }
    // atualizando os dados dos vertices
    // para cada item de ttnodesWord
    // achar quem do newnodes que tem mesmo nome
    // pegar os dados dele
        //for(var item in ttnodesWord){
    //    var onome=ttnodesWord[item].nome;
    //    i=0;
    //    while(newnodes[i].nome!==onome){
    //        i++;
    //    }
    //    for (var item2 in newnodes[i]){
    //        ttnodesWord[item][item2]=newnodes[i][item2];
    //    }
    //}

    // adicionar os nodes dos newnodes
    for(var i=0;i<ins.length;i++){
        ttnodesWord.push(newnodes[ins[i]]);
    }
    ttlinksWord.length = 0;
    for(var ii=0;ii<newlinks.length;ii++){ // para cada aresta
        // observar o source e o target
        var tlink=newlinks[ii];
        var tnome1=newnodes[tlink.source].nome;
        var tnome2=newnodes[tlink.target].nome;
        var i=-1;
        do { i++; var tnn=i; 
        } while (ttnodesWord[i].nome!==tnome1);
        var i=-1;
        do {  i++;var tnn2=i;
        } while (ttnodesWord[i].nome!==tnome2);
        tlink.source=tnn;
        tlink.target=tnn2;
        tlink.nome_source=tnome1;
        tlink.nome_target=tnome2;
        ttlinksWord.push(tlink);
    }
      ttstartWord();
    };



// segundo quadrante
    function hashGraph(tgraph,gid){ // para tela cheia 1
        ttnodes2 = [],
            ttlinks2 = [];
        var color2 = d3.scale.category10();
        color2("asd"),color2("assasdd"),color2("assd");
        force2Hash = d3.layout.force()
            .nodes(ttnodes2)
            .links(ttlinks2)
            .charge(-12)
            .linkDistance(30)
            .size([Template.tcheia.tsetup().w/2,Template.tcheia.tsetup().h/2])
             .on("tick", tick);

        var svg2 = d3.select("#"+gid);
        svg2.append("text").attr("id","t0"+gid).attr("x",20).attr("y",29).style("fill","white").text("Relacionamento por hashtags");
        svg2.append("text").attr("id","t1"+gid).attr("x",20).attr("y",59).style("fill","white");
        svg2.append("text").attr("id","t2"+gid).attr("x",20).attr("y",89).style("fill","white");
        var node = svg2.selectAll(".node"),
            link = svg2.selectAll(".link");
        ttstartHash=function() {
          node = node.data(force2Hash.nodes(), function(d) { return d.nome;}).attr("class","oldnodeHash");
          node.enter().append("circle").attr("class","newnodeHash")
                      .style("fill","yellow").attr("r", function(d){return d.atv+2;}).call(force2Hash.drag)
                      .transition().duration(2000).style("fill",function(d){return color2(d.group)});

 d3.selectAll(".newnodeHash").append("title")
              .text(function(d) { return d.nome+",atv="+d.atv.toFixed(2); });
                        node.exit().transition().style("fill","red").remove();


          link = link.data(force2Hash.links(), function(d) { return d.nome_source+ "-" + d.nome_target; });
          link.enter().insert("line", ".node").attr("class", "link")
              .style("stroke-width", function(d) { return d.value; });
          link.exit().remove();



          force2Hash.start();
        }
        function tick() {
          node.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; })

          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
        }
        updateHashGraph(tgraph,gid);
        updateHashInfo(tgraph,gid);
    };

    updateHashInfo=function(tgraph,gid){
        var svg2 = d3.select("#"+gid)
        svg2.select("#t1"+gid).text("nvertices "+tgraph.nodes.length+"("+(tgraph.nodes.length-tgraph.ntags)+"u,"+tgraph.ntags+"h), narestas "+tgraph.links.length);
    }; // para tela cheia 1
    updateHashGraph=function(tgraph,gid){ // para tela cheia 1
      var a = {id: "a"}, b = {id: "b"}, c = {id: "c"};
      ttgraph=tgraph;
     newnodes=tgraph.nodes;
     newlinks=tgraph.links;
     oldnodes=force2Hash.nodes();
     // anda em cada oldnodes removendo que nao estiver em new nodes
        force2Hash
            .charge(Session.get("cf2"))
            .linkDistance(Session.get("lf2"));
     // anda em cada oldnodes removendo que nao estiver em new nodes
    outs=[];
    for(var i=0;i<oldnodes.length;i++){
        var tnode=oldnodes[i];
        var nodeout=1; // vertice estah fora
        for(var j=0;j<newnodes.length;j++){
            if(tnode.nome===newnodes[j].nome){
                nodeout=0;
            }
        }
        if (nodeout){
            outs.push(i);
        }
    }
    // anda em cada newnode adicionando quem nao estiver em oldnodes
    ins=[];
    for(var i=0;i<newnodes.length;i++){
        tnode=newnodes[i];
        nodein=1; // o vertice entra
        for(var j=0;j<oldnodes.length;j++){
            if(tnode.nome==oldnodes[j].nome){
                nodein=0;
            }
        }
        if (nodein){
            ins.push(i);
        }
    }
    // remover os nodes dos oldnodes
    for(var i=outs.length-1;i>=0;i--){
        ttnodes2.splice(outs[i],1);
    }
    // atualizando os dados dos vertices
    for(var item in ttnodes2){
        var onome=ttnodes2[item].nome;
        i=0;
        while(newnodes[i].nome!==onome){
            i++;
        }
        for (var item2 in newnodes[i]){
            ttnodes2[item][item2]=newnodes[i][item2];
        }
    }

    // adicionar os nodes dos newnodes
    for(var i=0;i<ins.length;i++){
        ttnodes2.push(newnodes[ins[i]]);
    }
    ttlinks2.length = 0;
    for(var ii=0;ii<newlinks.length;ii++){ // para cada aresta
        // observar o source e o target
        var tlink=newlinks[ii];
        var tnome1=newnodes[tlink.source].nome;
        var tnome2=newnodes[tlink.target].nome;
        var i=-1;
        do { i++; var tnn=i; 
        } while (ttnodes2[i].nome!==tnome1);
        var i=-1;
        do {  i++;var tnn2=i;
        } while (ttnodes2[i].nome!==tnome2);
        tlink.source=tnn;
        tlink.target=tnn2;
        tlink.nome_source=tnome1;
        tlink.nome_target=tnome2;
        ttlinks2.push(tlink);
    }
      ttstartHash();
    };

// rtGraph2
    function rtGraph2(tgraph,gid){ // para tela cheia 1
        ttnodes = [],
            ttlinks = [];
        var color2 = d3.scale.category10();
        force2 = d3.layout.force()
            .nodes(ttnodes)
            .links(ttlinks)
            .charge(-12)
            .linkDistance(30)
            .size([Session.get("w")/2,Session.get("h")/2])
             .on("tick", tick);

        var svg2 = d3.select("#"+gid)
            .attr("width", Session.get("w")/2)
            .attr("height", Session.get("h")/2);
        svg2.append("text").attr("id","t0"+gid).attr("x",20).attr("y",29).style("fill","white").text("Estrutura de retweets");
        svg2.append("text").attr("id","t1"+gid).attr("x",20).attr("y",59).style("fill","white");
        svg2.append("text").attr("id","t2"+gid).attr("x",20).attr("y",89).style("fill","white");
        var node = svg2.selectAll(".node"),
            link = svg2.selectAll(".link");
        ttstart=function() {
          node = node.data(force2.nodes(), function(d) { return d.nome;}).attr("class","oldnodeRT");
          node.enter().append("circle").attr("class","newnodeRT")
                      .style("fill","yellow").attr("r", function(d){return d.grau+2;}).call(force2.drag)
                      .transition().duration(2000).style("fill",function(d){return color2(d.group)});

 d3.selectAll(".newnodeRT").append("title")
              .text(function(d) { return d.nome+",g="+d.grau+",cc="+d.clust.toFixed(2); });
                        node.exit().transition().style("fill","red").remove();


          link = link.data(force2.links(), function(d) { return d.nome_source+ "-" + d.nome_target; });
          link.enter().insert("line", ".node").attr("class", "link")
              .style("stroke-width", function(d) { return d.value; });
          link.exit().remove();



          force2.start();
        }
        function tick() {
          node.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; })

          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
        }
        updateRTGraph2(tgraph,gid);
        updateRTInfo(tgraph,gid);
    };

    updateRTInfo=function(tgraph,gid){
        var svg2 = d3.select("#"+gid)
        svg2.select("#t1"+gid).text("n pessoas "+tgraph.nvertices+", n interações "+tgraph.narestas+", grau max "+tgraph.grau_max+", grau medio "+tgraph.grau_medio.toFixed(2));
        svg2.select("#t2"+gid).text("clusterizacao media "+tgraph.clust_media.toFixed(2)).attr("x",20);
    } // para tela cheia 1
    updateRTGraph2=function(tgraph,gid){ // para tela cheia 1
      var a = {id: "a"}, b = {id: "b"}, c = {id: "c"};
      ttgraph=tgraph;


        force2
            .charge(Session.get("cf1"))
            .linkDistance(Session.get("lf1"));
     newnodes=tgraph.nodes;
     newlinks=tgraph.links;
     oldnodes=force2.nodes();
     // anda em cada oldnodes removendo que nao estiver em new nodes
    outs=[];
    for(var i=0;i<oldnodes.length;i++){
        var tnode=oldnodes[i];
        var nodeout=1; // vertice estah fora
        for(var j=0;j<newnodes.length;j++){
            if(tnode.nome===newnodes[j].nome){
                nodeout=0;
            }
        }
        if (nodeout){
            outs.push(i);
        }
    }
    // anda em cada newnode adicionando quem nao estiver em oldnodes
    ins=[];
    for(var i=0;i<newnodes.length;i++){
        tnode=newnodes[i];
        nodein=1; // o vertice entra
        for(var j=0;j<oldnodes.length;j++){
            if(tnode.nome==oldnodes[j].nome){
                nodein=0;
            }
        }
        if (nodein){
            ins.push(i); // caso nao tenha sido achado, adicione-o
        }
    }
    // remover os nodes dos oldnodes
    for(var i=outs.length-1;i>=0;i--){
        ttnodes.splice(outs[i],1);
    }
    // adicionar os nodes dos newnodes
    for(var i=0;i<ins.length;i++){
        ttnodes.push(newnodes[ins[i]]);
    }
    // atualizar os dados dos sobreviventes
    // fazendo junto com a atualizacao das arestas
    ttlinks.length = 0;
    for(var ii=0;ii<newlinks.length;ii++){ // para cada aresta
        // observar o source e o target
        var tlink=newlinks[ii];
        var tnome1=newnodes[tlink.source].nome;
        var tnome2=newnodes[tlink.target].nome;
        var i=-1;
        do { i++; var tnn=i; 
        } while (ttnodes[i].nome!==tnome1);
        //for (var avar in newnodes[tlink.source]){
        //    ttnodes[i][avar]=newnodes[tlink.source][avar];
        //}
        var i=-1;
        do {  i++;var tnn2=i;
        } while (ttnodes[i].nome!==tnome2);
        //for (var avar in newnodes[tlink.target]){
        //    ttnodes[i][avar]=newnodes[tlink.target][avar];
        //}
        tlink.source=tnn;
        tlink.target=tnn2;
        tlink.nome_source=tnome1;
        tlink.nome_target=tnome2;
        ttlinks.push(tlink);
    }
    //  ttlinks.push.apply(ttlinks,ttgraph.links);
      //ttlinks=ttgraph.links;
      ttstart();
    };
    function rtGraph(tgraph,gid,width,height){ // para tela cheia 1
        console.log(gid,width,height);
        //var width =  580,
        //    height = 300;
        var color2 = d3.scale.category10();
        force2 = d3.layout.force()
            .charge(-12)
            .linkDistance(30)
            .size([width, height]);
        var svg2 = d3.select("#"+gid)
            .attr("width", width)
            .attr("height", height);
        //var TTdata=Session.get('tdata');
        //var graph=TTdata.data.graph;
        force2
              .nodes(tgraph.nodes)
              .links(tgraph.links)
              .start();
        var link2 = svg2.selectAll(".link")
              .data(tgraph.links)
              .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });
        var node2 = svg2.selectAll(".node")
              .data(tgraph.nodes,function(d){return d.nome})
              .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .style("fill", function(d) { return color2(d.group); })
              .call(force2.drag);
        node2.append("title").attr("id",function(d){return gid+"Title1"+d.nome})
              .text(function(d) { return d.nome; });
        force2.on("tick", function() {
            link2.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node2.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });
    };

    updateRTGraph=function(tgraph,gid){ // para tela cheia 1
        console.log("updating rtgraph");
        var color2 = d3.scale.category10();
        //var force2 = d3.layout.force()
        //    .charge(-12)
        //    .linkDistance(30)
        //    .size([width, height]);
        var svg2 = d3.select("#"+gid)
        //var svg = d3.select("#graph1")
            .attr("width",  Session.get("w")/2)
            .attr("height", Session.get("h")/2);
        //var TTdata=Session.get('tdata');
        //var graph=TTdata.data.graph;
        //var force2 = d3.layout.force()
        //    .charge(-12)
        //    .linkDistance(30)
        //    .size([Session.get("w")/2,Session.get("h")/2]);
        force2
              .nodes(tgraph.nodes)
              .links(tgraph.links)
            .size([Session.get("w")/2,Session.get("h")/2])
              .start();
        //force2=Session.get('force2');
        //force2
        //      //.size([Session.get("w")/2,Session.get("h")/2])
        //      .nodes(tgraph.nodes)
        //      .links(tgraph.links);
              //.start();
        //svg2.selectAll(".node").remove();
        var node2 = svg2.selectAll(".node")
              .data(tgraph.nodes,function(d){return d.nome});
            //  .attr("class", "node")
            //  .attr("r", 5)
            //    .attr("fill","black");
            node2
              .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .style("fill", function(d) { return color2(d.group); })
              .call(force2.drag);
              //.select("title")
              //.text(function(d) { return d.nome; });
        node2.exit().remove();
        // svg2.selectAll(".link").remove();
        var link2 = svg2.selectAll(".link")
              .data(tgraph.links);
          link2
               .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });
        link2.exit().remove();

            //node2. //update old elements as needed
            // create new elements as needed

        //node2.exit().transition().duration(750).style("fill","black").style("fill-opacity", 1e-6).remove();
        force2.on("tick", function() {
            link2.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node2.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });
    };



//    function minGraph(graph,gid,width,height){
    function layout2(inputNodes, inputLinks) {
       var force = d3.layout.force();
       var nodes = force.nodes();
       var links = force.links();

       var update = function() {
          //append nodes and links from data

          force.on("tick",function(e){
             //tick movement

          });
       };
       for(var i=0; i<inputNodes.length; i++){
          nodes.push(inputNodes[i]);
       }
       for(var i=0; i<inputLinks.length; i++){
          links.push(inputLinks[i]);
       }
       update();
    };
    function Bipartite(graph,gid,width,height){ // para tela cheia 1
        console.log(gid,width,height);
        //var width =  580,
        //    height = 300;
        color = d3.scale.category10();
        color("sadoj");
        color("sadosj");
        color("sasadosj");
        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);
        var svg = d3.select("#"+gid)
        //var svg = d3.select("#graph1")
            .attr("width", width)
            .attr("height", height);
        //var TTdata=Session.get('tdata');
        //var graph=TTdata.data.graph;
        force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();
        var link = svg.selectAll(".link")
              .data(graph.links)
              .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });
        var node = svg.selectAll(".node")
              .data(graph.nodes)
              .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .style("fill", function(d) { return color(d.group); })
              .call(force.drag);
        node.append("title")
              .text(function(d) { return d.nome; });
        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });
    };


    function renderGraph(gid){
        var width =  580,
            height = 300;
        var color = d3.scale.category20();
        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);
        var svg = d3.select("#"+gid)
        //var svg = d3.select("#graph1")
            .attr("width", width)
            .attr("height", height);
        var TTdata=Session.get('tdata');
        var graph=TTdata.data.graph;
        force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();
        var link = svg.selectAll(".link")
              .data(graph.links)
              .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });
        var node = svg.selectAll(".node")
              .data(graph.nodes)
              .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .style("fill", function(d) { return color(d.group); })
              .call(force.drag);
        node.append("title")
              .text(function(d) { return d.nome; });
        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });
    };

    function colorAll(tduration){
        if(typeof BC !=="undefined"){
            DX=7;
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
            .transition().duration(tduration)
            .style("background-color",BC)
            .style("color",TC);
    };

    function moveMmissa(){
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
            colorAll(0)
        }
    };

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

}
if (Meteor.isServer) {
    Meteor.methods({
       checkTwitter: function () {
console.log(6);
            return Meteor.http.call("GET", "http://0.0.0.0:5000/jsonTest/"); },
       aaJson: function () {
console.log(5);
            return Meteor.http.call("GET", "http://0.0.0.0:5000/aajson/");  },
       aaRedeBipartida: function () {
console.log(4);
            return Meteor.http.call("GET", "http://0.0.0.0:5000/aaRedeBipartida/");  },
       participaBase: function () {
console.log(3);
            return Meteor.http.call("GET", "http://0.0.0.0:5000/participaBase/");  },
       arenaBase: function () {
console.log(2);
            return Meteor.http.call("GET", "http://0.0.0.0:5000/arenaBase/");  },
       arenaCheias: function (NMSGS) {
        if(typeof NMSGS ==="undefined"){
            NMSGS=100;
        }
console.log(1);
            return Meteor.http.call("GET", "http://0.0.0.0:5000/arenaCheias/"+NMSGS+"/");  }
    });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
