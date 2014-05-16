if (Meteor.isClient) {
Meteor.setInterval(function () {
  Session.set('time', new Date);
}, 1000);

  Template.mmissa.texto= function(){
    return "MMISSA";
}
  Template.contador.mousepos= function () {
    //return [10,20];
    return [Session.get("mx"),Session.get("my")];
};
  Template.contador.contagem= function () {
    d3.select("#textoMmissa").transition().attr("x",(84+2*Math.random())+"%")
                        .attr("y",(44+2*Math.random())+"%")
                        .attr("font-size",15+10*Math.random());

    ttime=Session.get("time")
    if(ttime)
        return [ttime.getMinutes(),ttime.getSeconds()];
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

  Template.controladores.events({
    'click': function(evt){
        var px=evt.offsetX;
        var py=evt.offsetY;
        var ee0=d3.select("#rectControladores");
        var fx=ee0.property("x").baseVal.value;
        var fy=ee0.property("y").baseVal.value;
        var rx=px-fx;
        var ry=py-fy;
        d3.selectAll("rect").attr("rx",rx).attr("ry",ry);
},
});

  Template.hello.events({
     'mousemove': function(evt){
        Session.set("mx",evt.clientX);
        Session.set("my",evt.clientY);
}
  });
  Template.hello.rendered=function(){
    topicos=["aa","hashtags","participabr","arenanetmundial","teloes","escritos","emails","doação de dados","sobre"];
    ee0=d3.select("#rectC");
    fx=ee0.property("x").baseVal.valueInSpecifiedUnits;
    fy=ee0.property("y").baseVal.valueInSpecifiedUnits;
    width=ee0.property("width").baseVal.valueInSpecifiedUnits;
    height=ee0.property("height").baseVal.valueInSpecifiedUnits;
    menu=[];
    for(var i=0; i<topicos.length; i++){
        var x=(0.2+i%3)*(width/3);
        var y=(1+Math.floor(i/3))*(height/4);
        menu.push({palavra:topicos[i],x:fx+x,y:fy+y});
}
    ee1=d3.select("#svg0");
    ee1.selectAll("text #menuText").data(menu)
                .enter().append("text")
                .text(function (d){return d.palavra})
                        .attr("font-size",15+10*Math.random())
                .attr("x", function(d) { return d.x+"%"; })
               .attr("y", function(d)  { return d.y+"%";});
};

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
