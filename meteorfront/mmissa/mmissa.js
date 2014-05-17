                if (Meteor.isClient) {
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
    topicos=["aa","hashtags","participabr","arenanetmundial","teloes","escritos","emails","doação de dados","sobre"];
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
Template.tCentral.isHash=function(){
    Session.get("SELECTED");
    if(typeof SELECTED=="undefined"){
        return 0;
    } else {
        if(SELECTED=="idhashtags"){
            return 1;
        } else {
            return 0;
        }
    }
};
Template.tCentral.isSobre=function(){
    Session.get("SELECTED");
    if(typeof SELECTED=="undefined"){
        return 0;
    } else {
        if(SELECTED=="idsobre"){
            return 1;
        } else {
            if(SELECTED=="idhashtags" || SELECTED==0){
                return 0;
            } else {
                return 1;
            }
        }
    }
};

 
                    } // end isClient

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
