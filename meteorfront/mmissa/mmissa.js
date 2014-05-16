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
    ttime=Session.get("time")
    d3.select("#textoMmissa").transition().attr("x",(84+2*Math.random())+"%")
                        .attr("y",(44+2*Math.random())+"%")
                        .attr("font-size",15+10*Math.random());
    return [ttime.getMinutes(),ttime.getSeconds()];
  };

  Template.mmissa.events({
    'click': function () {
        d3.select("#rectMmissa").transition().attr("height",(20+20*Math.random())+"%");
    d3.selectAll("rect").style("fill",function(d){
        acor="rgb("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")";
        return acor;});
    }
  });

  Template.controladores.events({
    'click': function(evt){
    ee=evt;
    px=evt.offsetX;
    py=evt.offsetY;
    ee0=d3.select("#rectControladores");
    fx=ee0.property("x").baseVal.value;
    fy=ee0.property("y").baseVal.value;
    rx=px-fx;
    ry=py-fy;
    d3.selectAll("rect").attr("rx",rx).attr("ry",ry);
},
});

  Template.hello.events({
    'click': function () {
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    },
     'mousemove': function(evt){
        Session.set("mx",evt.clientX);
        Session.set("my",evt.clientY);
}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
