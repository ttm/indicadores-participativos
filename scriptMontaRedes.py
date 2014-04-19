#-*- coding: utf8 -*-
import pymongo, __builtin__, datetime
from dateutil import parser
import time as T, networkx as x, json # json.dumps
import MySQLdb, cPickle,sys,string

from maccess import mdc
client=pymongo.MongoClient(mdc.u1)
CLIENT=client
aa=client.sna.HHarenaNETmundial.find({},{"text":1,"user.screen_name":1,"created_at":1,"_id":0}).sort("id",pymongo.DESCENDING).limit(300)
msgs=[a for a in aa]
texts=[i["text"] for i in msgs]
pairs=[(i["user"]["screen_name"], i["text"]) for i in msgs]
text=string.join([i["text"] for i in msgs]," ")
exclude = set(string.punctuation.replace("#",""))
text= ''.join(ch for ch in text if ch not in exclude)
text=text.encode('utf-8').split()
tags=[i.lower() for i in text if i.startswith("#") and "\xe2\x80\xa6" not in i]
tags_=list(set(tags))
ctags=[tags.count(i) for i in tags_]
# achar os outros vértices: participantes que emitiram as tags
users=list(set([i["user"]["screen_name"] for i in msgs]))
cu={}
nodes=[]
links=[]
i=0
for tag in tags_:
    nodes.append({"nome":tag,"group":1,"count":i})
    cu[tag]=i
    i+=1
for user in users:
    nodes.append({"nome":user,"group":2,"count":i})
    cu[user]=i
    i+=1
    text=string.join([msg["text"] for msg in msgs]," ").encode('utf-8')
    for tag in tags_:
        tcount=text.count(tag)
        if tcount>0:
            links.append({"source":cu[user],"target":cu[tag],"value":tcount})
            
    

    


sys.exit()
# com cada retweet, ver se o screen_name jah eh vertice, senao adiciona-lo
# ver se o screen_name da fonte jah eh vertice, senao adiciona-lo
# ver se a aresta (screen_name,screen_name2) já existe, e criar ou adicionar 1 no peso.
g=x.Graph()
RTs=[i for i in msgs if i["text"].startswith("RT @")]
sn2s=[]
for RT in RTs:
    sn1=RT["user"]["screen_name"]
    foo=RT["text"]
    sn2=foo[foo.index("@")+1:foo.index(":")]
    if "@" in sn2:
        sn2=sn2[:sn2.index("@")]
    sn2s+=[sn2]
    edge=sn1,sn2
    g.add_node(sn1)
    g.add_node(sn2)
    g.add_edge(*edge)


g2=x.Graph()
sn2s2=[]
for RT in RTs:
    sn1=RT["user"]["screen_name"]
    foo=RT["text"]
    sn2=foo[foo.index("@")+1:foo.index(":")]
    if "@" in sn2:
        sn2=sn2[:sn2.index("@")]
    sn2s2+=[sn2]
    edge=sn1,sn2
    if sn1 in g2.nodes(): # quem retweetou
        g2.node[sn1]["weight"]+=1 # pois é atividade deste 
    else:
        g2.add_node(sn1,weight=1.)
    if sn2 in g2.nodes(): # a fonte do tweet original
        pass
    else:
        g2.add_node(sn2,weight=0) # pois não é atividade dele

    if g2.has_edge(sn1,sn2):
        g2[sn1][sn2]["weight"]+=1
    else:
        g2.add_edge(sn1, sn2, weight=1.)
