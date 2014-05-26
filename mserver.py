#-*- coding: utf8 -*-
from flask import Flask, render_template, make_response, session, redirect, url_for, escape, request,jsonify,Response   
import pymongo, __builtin__, datetime
from dateutil import parser
import time as T, networkx as x, json # json.dumps
import MySQLdb, cPickle, numpy as n
#c=pymongo.MongoClient()
#db=c["mytest"]
#col=db["twitter"]
#ff=col.find()
#aa=ff[0]
#bb=aa["arenaNETmundial"]
#msgs=[(i["text"],i["user"]["screen_name"]) for i in bb[2000:2200]]

from maccess import mdc
client=pymongo.MongoClient(mdc.u1)
CLIENT=client # para o bd do app em si, usuários, etc
aa=CLIENT.sna.HHParticipabr.find()
print CLIENT.sna.HHParticipabr.count()
msgs_=[a for a in aa[100:200] if a]


g=x.Graph()
RTs=[i for i in msgs_ if i[0].startswith("RT @")]
sn2s=[]
for RT in RTs:
    sn1=RT[1]
    foo=RT[0]
    try:
        bar=foo.index(":")
    except:
        bar=foo.index("@")+5
    sn2=foo[foo.index("@")+1:bar]
    if "@" in sn2:
        sn2=sn2[:sn2.index("@")]
    sn2s+=[sn2]
    edge=sn1,sn2
    if sn1 in g.nodes(): # quem retweetou
        g.node[sn1]["weight"]+=1 # pois é atividade deste 
    else:
        g.add_node(sn1,weight=1.)
    if sn2 in g.nodes(): # a fonte do tweet original
        pass
    else:
        g.add_node(sn2,weight=0) # pois não é atividade dele

    if g.has_edge(sn1,sn2):
        g[sn1][sn2]["weight"]+=1
    else:
        g.add_edge(sn1, sn2, weight=1.)
# pegar a listagem dos vertices por grau
graus=g.degree()
clust=x.clustering(g)
vertices=sorted(graus,key=graus.get)
graus_=[graus[vv] for vv in vertices]
clust_=[clust[vv] for vv in vertices]
print vertices
#nodes=g.nodes()
nodes=vertices
nn=len(vertices)
nodes_=[]
cu={}
i=0
for node in nodes:
    nodes_.append({"nome":node,
                      "group":[1,[2,3][i>int(0.95*nn)]][i>int(nn*0.8)],
                       "count":i,"grau":graus[node],"clust":clust[node]})
    cu[node]=i
    i+=1
edges=g.edges()
links=[]
for edge in edges:
    links.append({"source":cu[edge[0]],"target":cu[edge[1]],"value":g[edge[0]][edge[1]]["weight"]})
graph2={"nodes":nodes_,"links":links,"grau_max":graus_[-1],"grau_medio":n.mean(graus_),"grau_desvio":n.std(graus_),"clust_media":n.mean(clust_),"nvertices":g.number_of_nodes(),"narestas":g.number_of_edges()}




app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello World!"

@app.route("/json/")
def foa():
    d={"a":13,"suhu":22}
    return jsonify(d=d)


@app.route("/redeTeste2/")
def rT2():
    return jsonify(graph=graph2)


@app.route("/redeTeste/")
def rT():
    g=x.erdos_renyi_graph(20,0.3)
    graus=g.degree()
    clustering=x.clustering(g)
    nodes=g.nodes()
    nodes_=[]
    for node in nodes:
        nodes_+=[{"name":node,"group":1,"degree":graus[node],"clustering":clustering[node]}]
    edges=g.edges()
    edges_=[]
    for ee in edges:
        print ee
        edges_+=[{"source":nodes.index(ee[0]),"target":nodes.index(ee[1]),"value":1}]
    return jsonify(nodes=nodes_,links=edges_)
if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')
