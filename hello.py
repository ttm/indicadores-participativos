#-*- coding: utf8 -*-
from flask import Flask, render_template, make_response, session, redirect, url_for, escape, request,jsonify,Response   
import pymongo, __builtin__, datetime
from dateutil import parser
import time as T, networkx as x, json # json.dumps
import MySQLdb, cPickle
#msg=cur.execute("SELECT * FROM messages;")
#users=cur.execute("SELECT * FROM users;")
#sessions=cur.execute("SELECT * FROM sessions;")

app = Flask(__name__)
atime=T.time()

#client=pymongo.MongoClient()
#db = client['mytest']
#C = db['twitter'] #collection
#
print 0
from maccess import mdc
client=pymongo.MongoClient(mdc.u1)
CLIENT=client # para o bd do app em si, usuários, etc
################ CUT
#print 10
#db = client['sna']
#print 20
#
##foo=db.sna.find()
#foo=db.sna.find({},{"created_at":1,"user.name":1,"user.screen_name":1,"user.friends_count":1,"user.location":1,"user.followers_count":1,"user.statuses_count":1,"user.id":1})
#W=[ff for ff in foo]
#snames=[i["user"]["screen_name"] for i in W]
#IDS=[i["user"]["id"] for i in W]
#IDS_=range(1,len(W)+1)
#IDS_=[I for I in IDS_]
#print 30
#
#client2=pymongo.MongoClient(mdc.u2)
#db=client2.sna
#print 40
#
#ami=client2.sna.amizades.find()
##amis=[aa for aa in ami]
#g=x.Graph()
##for aa in ami:
##for ii in xrange(3):
#for ii in xrange(15):
#    cha=ami[ii].keys()
#    cha.pop(cha.index("_id"))
#    id_orig=int(cha[0])
#    idss=[i for i in ami[ii][cha[0]] if i in IDS]
#    for iids in idss:
#        g.add_edge(snames[IDS.index(id_orig)],snames[IDS.index(iids)])
#print 50
#
#@app.route('/crossf/')
#def crossf():
#    return render_template('crossf/index.html')
#
##@app.route('/rosto/')
##def rosto():
##    return render_template('crossf/rosto.html')
#from collections import OrderedDict
#IID=range(g.number_of_nodes())
##IID=[str(ii) for ii in IID]
#INN=g.nodes()
#degree=g.degree()
#closeness=x.closeness.closeness_centrality(g) 
#clustering=x.clustering(g)
#dd=OrderedDict(sorted(degree.items(), key=lambda t: t[1]))
#tnames=dd.keys()
#degrees=dd.values()
#@app.route('/_dahJsonG2')
#def dahJsonG2():
#    d={"names":tnames,"degrees":degrees}
#    return jsonify(d)
#
#@app.route('/_dahJsonG')
#def dahJsonG():
#    N=g.number_of_nodes()
#    GG=OrderedDict()
#    GG["nodes"]=[]
##    for name in names[-N/20:]:
##        GG["nodes"].append({"id":IDS_[snames.index(name)],"name":name,"group":"0"})
##    for name in names[-N/5:-N/20]:
##        GG["nodes"].append({"id":IDS_[snames.index(name)],"name":name,"group":"1"})
##    for name in names[:-N/5]:
##        GG["nodes"].append({"id":IDS_[snames.index(name)],"name":name,"group":"2"})
#    GG["links"]=[]
##    for (N1,N2) in g.edges():
##        GG["links"].append({"source":IDS_[snames.index(N1)],"target":IDS_[snames.index(N2)],"value":10})
#    ########3
##    for name in tnames[:-N/5]: # perifericos
##        GG["nodes"].append({"id":INN.index(name),"name":name,"group":2})
##    for name in tnames[-N/5:-N/20]: #intermediarios
##        GG["nodes"].append({"id":INN.index(name),"name":name,"group":1})
##    for name in tnames[-N/20:]: #hubs
##        GG["nodes"].append({"id":INN.index(name),"name":name,"group":0})
##    GG["links"]=[]
##    for (N1,N2) in g.edges():
##        GG["links"].append({"source":INN.index(N1),"target":INN.index(N2),"value":1})
#    for name in tnames[:-N/5]: # perifericos
#        GG["nodes"].append({"id":tnames.index(name),"name":name,"group":2,"clo":"%.2f"%(closeness[name],),"clu":"%.2f"%(clustering[name],),"gra":degree[name]})
#    for name in tnames[-N/5:-N/20]: #intermediarios
#        GG["nodes"].append({"id":tnames.index(name),"name":name,"group":1,"clo":"%.2f"%(closeness[name],),"clu":"%.2f"%(clustering[name],),"gra":degree[name]})
#    for name in tnames[-N/20:]: #hubs
#        GG["nodes"].append({"id":tnames.index(name),"name":name,"group":0,"clo":"%.2f"%(closeness[name],),"clu":"%.2f"%(clustering[name],),"gra":degree[name]})
#    GG["links"]=[]
#    for (N1,N2) in g.edges():
#        GG["links"].append({"source":tnames.index(N1),"target":tnames.index(N2),"value":1})
#
#
##        print {"source":IDS_[snames.index(N1)],"target":IDS_[snames.index(N2)],"value":"1"}
#    return jsonify(GG)
#
#@app.route('/_dahJsonA')
#def dahJsonA():
#    dates=[parser.parse(i["created_at"]) for i in W]
#    #names=[i["user"]["screen_name"] for i in W]
#    names=[i["user"]["name"] for i in W]
#    snames=[i["user"]["screen_name"] for i in W]
#    fcount=[i["user"]["friends_count"] for i in W]
#    focount=[i["user"]["followers_count"] for i in W]
#    scount=[i["user"]["statuses_count"] for i in W]
#    location=[i["user"]["location"] for i in W]
#
#    names_=list(set(names))
#    hnames_=[names.count(i) for i in names_]
#    args=n.argsort(hnames_)
#    N=[names_[i] for i in  args][::-1]
#    H=[hnames_[i] for i in args][::-1]
#    M=[]
#    #for i in xrange(len(N)):
#    for i in xrange(20):
#        m={}
#        #m["date"]=dates[i]
#        #dt=dates[i]
#        #m["date"]=(dt.month,dt.day,dt.hour,dt.minute)
#        m["posicao"]=i+1
#        m["nome"]=N[i]
#        m["sname"]=snames[names.index(N[i])]
#        m["atividade"]=H[i]
#        m["amigos"]=fcount[names.index(N[i])]
#        m["location"]=location[names.index(N[i])]
#        m["atv_total"]=scount[names.index(N[i])]
#        m["comprom"]="%.2f"%((H[i]/float(scount[names.index(N[i])]))*100,)
#        M.append(m)
#    return jsonify(M=M)
#
#
#
#@app.route('/_dahJson')
#def dahJson():
#    dates=[parser.parse(i["created_at"]) for i in W]
#    #names=[i["user"]["screen_name"] for i in W]
#    names=[i["user"]["name"] for i in W]
#    fcount=[i["user"]["friends_count"] for i in W]
#    focount=[i["user"]["followers_count"] for i in W]
#    scount=[i["user"]["statuses_count"] for i in W]
#    location=[i["user"]["location"] for i in W]
#
#    names_=list(set(names))
#    hnames_=[names.count(i) for i in names_]
#    args=n.argsort(hnames_)
#    N=[names_[i] for i in  args][::-1]
#    #H=n.log([hnames_[i] for i in args][::-1])+5
#    H=[hnames_[i] for i in args][::-1]
#    M=[]
#    #for i in xrange(len(N)):
#    #    m=Mensagem()
#    #    m.date=dates[i]
#    #    m.delay=H[i]
#    #    m.distance=fcount[i]
#    #    m.origin=N[i]
#    #    m.destination=location[i]
#    #    M.append(m)
#    for i in xrange(len(N)):
#        m={}
#        #m["date"]=dates[i]
#        dt=dates[i]
#        m["date"]=(dt.month,dt.day,dt.hour,dt.minute)
#        m["delay"]=H[i]
#        m["distance"]=fcount[i]
#        m["origin"]=N[i]
#        m["destination"]=location[i]
#        M.append(m)
#    M_=[]
#    for i in xrange(len(dates)):
#        m={}
#        #m["date"]=dates[i]
#        dt=dates[i]
#        m["date"]=(dt.month,dt.day,dt.hour,dt.minute)
#        #m["delay"]=H[i]
#        m["delay"]=fcount[i]
#        m["distance"]=focount[i]
#        m["origin"]=names[i]
#        m["destination"]=location[i]
#        m["activity"]=hnames_[names_.index(names[i])]
#        M_.append(m)
#
#
#
#    #return jsonify(N=N,H=H,date=dates)
#    #return jsonify(N=N,H=H,date=dates)
#    return jsonify(M=M_)
#
#
#
#@app.route('/_add_numbers')
#def add_numbers():
#    """Add two numbers server side, ridiculous but well..."""
#    a = request.args.get('a', 0, type=int)
#    b = request.args.get('b', 0, type=int)
#    c = request.args.get('c', 0, type=int)
#    foo=C.find()
#    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
#    dates=[parser.parse(i["created_at"]) for i in W]
#    months=[d.month for d in dates]
#    days=[d.day for d in dates]
#    md=[(d.month,d.day) for d in dates]
#    lsmd=list(set(md))
#    lsmd1=sorted(lsmd, key=lambda i: i[1])
#    lsmd2=sorted(lsmd1, key=lambda i: i[0])
#    cdia=[(i[0],i[1],md.count(i)) for i in lsmd2]
#    wdays=[d.weekday() for d in dates]
#    hwdays=[wdays.count(i) for i in xrange(7)]
#
#    return jsonify(result=a + b+c,hwdays=str(hwdays),hwdays2=hwdays,cdia=str(cdia),cdia2=cdia)
#
#@app.route('/_add_numbers2')
#def add_numbers2():
#    """Add two numbers server side, ridiculous but well..."""
#    a = request.args.get('a', 0, type=int)
#    b = request.args.get('b', 0, type=int)
#    c = request.args.get('c', 0, type=int)
#    foo=C.find()
#    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
#    dates=[parser.parse(i["created_at"]) for i in W]
#    months=[d.month for d in dates]
#    days=[d.day for d in dates]
#    md=[(d.month,d.day) for d in dates]
#    lsmd=list(set(md))
#    lsmd1=sorted(lsmd, key=lambda i: i[1])
#    lsmd2=sorted(lsmd1, key=lambda i: i[0])
#    cdia=[(i[0],i[1],md.count(i)) for i in lsmd2]
#    wdays=[d.weekday() for d in dates]
#    hwdays=[wdays.count(i) for i in xrange(7)]
#
#    return jsonify(result=a + b+c,hwdays=str(hwdays),hwdays2=hwdays,cdia=str(cdia),cdia2=cdia)
#
#meses=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"]
#@app.route('/_sendFoo')
#def sendFoo():
#    """Send a veriable."""
#    a = request.args.get('name', 0, type=str)
#    foo=C.find()
#    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
#    dates=[parser.parse(i["created_at"]) for i in W]
#    months=[d.month for d in dates]
#    days=[d.day for d in dates]
#    md=[(d.month,d.day) for d in dates]
#    lsmd=list(set(md))
#    lsmd1=sorted(lsmd, key=lambda i: i[1])
#    lsmd2=sorted(lsmd1, key=lambda i: i[0])
#    cdia=[(meses[i[0]],i[1],md.count(i)) for i in lsmd2]
#    wdays=[d.weekday() for d in dates]
#    hwdays=[wdays.count(i) for i in xrange(7)]
#
#    return jsonify(cdia2=cdia)
#
#import numpy as n
#@app.route('/_sendTop')
#def sendTop():
#    """Send a veriable."""
#    a = request.args.get('name', 0, type=str)
#    foo=C.find()
#    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
#    names=[i["user"]["screen_name"] for i in W]
#    names_=list(set(names))
#    hnames_=[names.count(i) for i in names_]
#    args=n.argsort(hnames_)
#    N=[names_[i] for i in  args][::-1]
#    H=[hnames_[i] for i in args][::-1]
#
#
#    return jsonify(N=N,H=H)
#
#
#
#
#
#
#@app.route('/contas/')
#def contas():
#    return render_template('contas.html')
#
#@app.route('/contas2/')
#def contas2():
#    return render_template('contas2.html')
#
#
#@app.route('/contas3/')
#def contas3():
#    return render_template('contas3.html')
#
#
#@app.route("/tweets/")
#def tweets():
#    foo=C.find()
#    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
#    dates=[parser.parse(i["created_at"]) for i in W]
#    months=[d.month for d in dates]
#    days=[d.day for d in dates]
#    md=[(d.month,d.day) for d in dates]
#    lsmd=list(set(md))
#    lsmd1=sorted(lsmd, key=lambda i: i[1])
#    lsmd2=sorted(lsmd1, key=lambda i: i[0])
#    cdia=[(i[0],i[1],md.count(i)) for i in lsmd2]
#    wdays=[d.weekday() for d in dates]
#    hwdays=[wdays.count(i) for i in xrange(7)]
#    #return str(len(W))+"<br />"+str(hwdays)+"<br />"+str(cdia)
#    bb=render_template('Ttweets.html', name=cdia)
#    return bb
# CUT
@app.route("/hello/")
@app.route("/hello/<name>::::/")
@app.route("/hello/<name>ooo/")
def hello(name=None):
    #return "Hello World!! "+__name__
    bb=render_template('hello.html', name=name)
    aa=make_response(render_template('hello.html', name=name))
    #aa.headers["name"]="uga"
    #return aa
    return bb
    #return     return make_response('hello.html')

@app.route('/twitter/<hashtag>/')
def twitter(hashtag=None):
    if hashtag:
        if hashtag.lower()=="arenanetmundial":
            return render_template('crossf/rosto.html')
    return u"em construção. Sua tag: #%s"%(hashtag,)

#@app.route('/rosto/')
#def rosto():
#    return render_template('crossf/rosto.html')
@app.route('/face/<hashtag>/')
def face(hashtag=None):
    return "in construction"

from maccess import dbc

import nltk as k
from maccess import dbc
import string


@app.route("/jsonTest/")
def jsonTest():
    return jsonify(thedata=[{"data":"footeste"},{"data":"barteste"}])
foo=open("pickledir/stopwords.cpickle","rb")
sw=cPickle.load(foo)
foo.close()
import numpy as n
@app.route("/arenaCheias/")
def arenaCheias():
    
    avar=(CLIENT.sna.HHarenaNETmundial.count(),n.random.randint(1000))
    aa=client.sna.HHarenaNETmundial.find({},{"text":1,"user.screen_name":1,"created_at":1,"_id":0}).sort("id",pymongo.DESCENDING).limit(100)
    msgs=[a for a in aa]
    print msgs[0]
    text=string.join([i["text"] for i in msgs]," ")
    #exclude = set(string.punctuation)
    simplest=0
    if simplest:
        exclude = set(string.punctuation.replace("#",""))
        text= ''.join(ch for ch in text if ch not in exclude)
        text_=text.encode('utf-8').lower().split()
        text=[tt for tt in text_ if not tt.startswith("#")] #hashtags são tratadas separado
        text=[tt for tt in text if tt not in sw]
    else:
        text_=text
        exclude = set(string.punctuation.replace("#","").replace("@",""))
        text__= ''.join(ch for ch in text_ if ch not in exclude)
        # tokenização na unha
        text=text__.encode('utf-8').lower().split()
        #tx=k.Text(text)
        # separar os users:
        users=[i for i in text if i.startswith("@") and "\xe2\x80\xa6" not in i]
        text2_=[i for i in text if not i.startswith("@")]
        nusers=len(users)
        nusers_rotos=(len(text)-len(text2_))-nusers

        # separar tags:
        tags=[i for i in text2_ if i.startswith("#") and "\xe2\x80\xa6" not in i]
        text2=[i for i in text2_ if not i.startswith("#")]
        ntags=len(tags)
        ntags_rotas=(len(text)-len(text2))-ntags
        # separar stopwords
        foo=open("pickledir/stopwords.cpickle","rb")
        sw=cPickle.load(foo)
        foo.close()
        text3=[tt for tt in text2 if tt not in sw]
        sws=[tt for tt in text2 if tt in sw]
        nsws=len(sws)
        # radicalizar
        #radicalizador=k.stem.RSLPStemmer()
        #text4=[radicalizador.stem(i.decode("utf-8")).encode("utf-8") for i in text3]
        #text=text4
        text=text3
    kk=k.Text(text) # aqui o text novo



    # end not simples
    bigram_measures = k.collocations.BigramAssocMeasures()
    finder=k.collocations.BigramCollocationFinder.from_words(text)
    finder.apply_freq_filter(3)
    col10=finder.nbest(bigram_measures.pmi,50)

    freq=kk.vocab()
    npal=freq.B()
    hist=freq.items()
    hist_=[]
    for hh in hist[int(npal*0.05):int(npal*0.2)]:
        d={"name":hh[0],"count":hh[1]}
        hist_+=[d]
    ####
    palavras=freq.samples()[int(npal*0.05):int(npal*0.2)]
    nodes=[]
    links=[]
    cp={}
    cu={}
    i=0
    for palavra in palavras:
        nodes.append({"nome":palavra,"group":1,"count":i})
        cp[palavra]=i
        i+=1
    users__=set([mm["user"]["screen_name"] for mm in msgs])
    for user in users__:
        if not user:
            onome="foobar"
        # faz o amálgama de todos os textos dele
        mmsgs=string.join([mmm["text"].encode('utf-8') for mmm in msgs if mmm["user"]["screen_name"]==user])
        for palavra in palavras:
            peso=mmsgs.count(palavra)
            if peso > 0:
                if user not in cu.keys():
                    nodes.append({"nome":user,"group":2, "count":i})
                    cu[user]=i; i+=1
                countpal=cp[palavra]
                countus=cu[user]
                links.append({"source":countpal,"target":countus,"value":peso})
    graph={"nodes":nodes,"links":links}

    # rede de retweets
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
    # pegar a listagem dos vertices por grau
    graus=g.degree()
    vertices=sorted(graus,key=graus.get)
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
                           "count":i})
        cu[node]=i
        i+=1
    edges=g.edges()
    links=[]
    for edge in edges:
        links.append({"source":cu[edge[0]],"target":cu[edge[1]],"value":1})
    graph2={"nodes":nodes_,"links":links}

    # graph3 de hashtags
    #tags=[i.lower() for i in text_ if i.startswith("#") and "\xe2\x80\xa6" not in i]
    tags=tags
    tags_=list(set(tags))
    ctags=[tags.count(i) for i in tags_]
    # achar os outros vértices: participantes que emitiram as tags
    users=list(set([i["user"]["screen_name"] for i in msgs]))
    print len(users),"==="
    cu={}
    nodes=[]
    links=[]
    i=0
    for tag in tags_:
        nodes.append({"nome":tag,"group":1,"count":i})
        cu[tag]=i
        i+=1
    print len(tags_)
    for user in users:
        nodes.append({"nome":user,"group":2,"count":i})
        cu[user]=i
        i+=1
        text=string.join([msg["text"] for msg in msgs if msg["user"]["screen_name"]==user]," ").encode('utf-8').lower()
        for tag in tags_:
            tcount=text.count(tag)
            if tcount>0:
                links.append({"source":cu[user],"target":cu[tag],"value":tcount})
    graph3={"nodes":nodes,"links":links}

    return jsonify(avar=avar,hist=hist_,collocations=col10,msgs=msgs,graph=graph,graph2=graph2,graph3=graph3)






@app.route("/arenaBase/")
def arenaBase():
    avar=(CLIENT.sna.HHarenaNETmundial.count(),n.random.randint(1000))
    aa=client.sna.HHarenaNETmundial.find({},{"text":1,"user.screen_name":1,"created_at":1,"_id":0}).sort("id",pymongo.DESCENDING).limit(100)
    msgs=[a for a in aa]
    text=string.join([i["text"] for i in msgs]," ")
    exclude = set(string.punctuation)
    text= ''.join(ch for ch in text if ch not in exclude)
    text=text.encode('utf-8').split()
    text=[tt for tt in text if tt not in sw]
    #print text
    kk=k.Text(text)

    bigram_measures = k.collocations.BigramAssocMeasures()
    finder=k.collocations.BigramCollocationFinder.from_words(text)
    finder.apply_freq_filter(3)
    col10=finder.nbest(bigram_measures.pmi,50)

    freq=kk.vocab()
    npal=freq.B()
    hist=freq.items()
    hist_=[]
    for hh in hist[int(npal*0.05):int(npal*0.2)]:
        d={"name":hh[0],"count":hh[1]}
        hist_+=[d]
    ####
    palavras=freq.samples()[int(npal*0.05):int(npal*0.2)]
    nodes=[]
    links=[]
    cp={}
    cu={}
    i=0
    for palavra in palavras:
        nodes.append({"nome":palavra,"group":1,"count":i})
        cp[palavra]=i
        i+=1
    users__=set([mm["user"]["screen_name"] for mm in msgs])
    print users__
    for user in users__:
        if not user:
            onome="foobar"
        # faz o amálgama de todos os textos dele
        mmsgs=string.join([mmm["text"].encode('utf-8') for mmm in msgs if mmm["user"]["screen_name"]==user])
        for palavra in palavras:
            peso=mmsgs.count(palavra)
            if peso > 0:
                if user not in cu.keys():
                    nodes.append({"nome":user,"group":2, "count":i})
                    cu[user]=i; i+=1
                countpal=cp[palavra]
                countus=cu[user]
                links.append({"source":countpal,"target":countus,"value":peso})
    graph={"nodes":nodes,"links":links}


    return jsonify(avar=avar,hist=hist_,collocations=col10,msgs=msgs,graph=graph)



@app.route("/participaBase/")
def partcipaBase():
    avar=(CLIENT.sna.HHParticipabr.count(),n.random.randint(1000))
    aa=client.sna.HHParticipabr.find({},{"text":1,"user.screen_name":1,"created_at":1,"_id":0}).sort("id",pymongo.DESCENDING).limit(100)
    msgs=[a for a in aa]
    text=string.join([i["text"] for i in msgs]," ")
    exclude = set(string.punctuation)
    text= ''.join(ch for ch in text if ch not in exclude)
    text=text.encode('utf-8').split()
    text=[tt for tt in text if tt not in sw]
    #print text
    kk=k.Text(text)

    bigram_measures = k.collocations.BigramAssocMeasures()
    finder=k.collocations.BigramCollocationFinder.from_words(text)
    finder.apply_freq_filter(3)
    col10=finder.nbest(bigram_measures.pmi,50)

    freq=kk.vocab()
    npal=freq.B()
    hist=freq.items()
    hist_=[]
    for hh in hist[int(npal*0.05):int(npal*0.2)]:
        d={"name":hh[0],"count":hh[1]}
        hist_+=[d]
    ####
    palavras=freq.samples()[int(npal*0.05):int(npal*0.2)]
    nodes=[]
    links=[]
    cp={}
    cu={}
    i=0
    for palavra in palavras:
        nodes.append({"nome":palavra,"group":1,"count":i})
        cp[palavra]=i
        i+=1
    users__=set([mm["user"]["screen_name"] for mm in msgs])
    print users__
    for user in users__:
        if not user:
            onome="foobar"
        # faz o amálgama de todos os textos dele
        mmsgs=string.join([mmm["text"].encode('utf-8') for mmm in msgs if mmm["user"]["screen_name"]==user])
        for palavra in palavras:
            peso=mmsgs.count(palavra)
            if peso > 0:
                if user not in cu.keys():
                    nodes.append({"nome":user,"group":2, "count":i})
                    cu[user]=i; i+=1
                countpal=cp[palavra]
                countus=cu[user]
                links.append({"source":countpal,"target":countus,"value":peso})
    graph={"nodes":nodes,"links":links}


    return jsonify(avar=avar,hist=hist_,collocations=col10,msgs=msgs,graph=graph)

@app.route("/aaRedeBipartida/")
def aaRedeBipartida():
    db = MySQLdb.connect(host=dbc.h,    # your host, usually localhost
                         user=dbc.u,    # your username
                          passwd=dbc.p, # your password
                          db=dbc.d)     # name of the data base
    cur = db.cursor()
    #msg_inicial=100
    #msg_final=300
    #cur.execute("SELECT user_id,message from messages limit %i OFFSET %i;"%(msg_final-msg_inicial,msg_inicial))
    quantas=1000
    cur.execute("select user_id,message,created from messages order by `id` desc limit %i;"%(quantas,))

    msgs=cur.fetchall()

    cur.execute("SELECT id,nick from users;")
    users=cur.fetchall()
    cur.execute("select count(*) from messages where messages.message not like '%TIMESLOT%';")
    ccount=cur.fetchall()[0][0]

    db.close()

    users_={}
    for uu in users:
        users_[uu[0]]=uu[1]
    nusers=len(users)
    # ordenar as palavras decrescente pela ocorrencia
    msgs=[i for i in msgs if "TIMESLOT" not in i[1]]
    print msgs[0]
    tokensFOO=string.join([i[1] for i in msgs]," ")
    exclude = set(string.punctuation)
    tokensFOO = ''.join(ch for ch in tokensFOO if ch not in exclude)
    tokens=tokensFOO.split()
    tokens=[tt for tt in tokens if tt not in sw]
    kk=k.Text(tokens)

    # selecionar as X palavras mais ocorrentes (ou fazer o corte e luhn)
    bigram_measures = k.collocations.BigramAssocMeasures()
    finder=k.collocations.BigramCollocationFinder.from_words(tokens)
    finder.apply_freq_filter(3)
    col10=finder.nbest(bigram_measures.pmi,50)

    freq=kk.vocab()
    npal=freq.B()
    hist=freq.items()
    hist_=[]
    for hh in hist[int(npal*0.05):int(npal*0.2)]:
        d={"name":hh[0],"count":hh[1]}
        hist_+=[d]
    print len(hist), len(hist_)
    palavras=freq.samples()[int(npal*0.05):int(npal*0.2)]
    nodes=[]
    links=[]
    cp={}
    cu={}
    i=0
    for palavra in palavras:
        nodes.append({"nome":palavra,"group":1,"count":i})
        cp[palavra]=i
        i+=1
    users__=set([mm[0] for mm in msgs])
    for user in users__:
        onome=users_[user]
        if not onome:
            onome="foobar"
        # faz o amálgama de todos os textos dele
        mmsgs=string.join([mmm[1] for mmm in msgs if mmm[0]==user])
        for palavra in palavras:
            peso=mmsgs.count(palavra)
            if peso > 0:
                if user not in cu.keys():
                    nodes.append({"nome":onome,"group":2, "count":i})
                    cu[user]=i; i+=1
                countpal=cp[palavra]
                countus=cu[user]
                links.append({"source":countpal,"target":countus,"value":peso})
    graph={"nodes":nodes,"links":links}

    return jsonify(collocations=col10,nmsgs=ccount,nusers=nusers,msgs=msgs,users=users_,graph=graph,hist=hist_)


@app.route("/aajson/")
def aajson():
    db = MySQLdb.connect(host=dbc.h,    # your host, usually localhost
                         user=dbc.u,    # your username
                          passwd=dbc.p, # your password
                          db=dbc.d)     # name of the data base
    cur = db.cursor()
    cur.execute("SELECT message from messages limit 200, 100;")
    msgs=cur.fetchall()
    msgs=[i[0] for i in msgs]
    MM=string.join(msgs)
    MM_=list(set(MM))
    CC_=[MM.count(i) for i in MM_]
    HH_=zip(MM_,CC_)
    # fazer contagem de tokens e ver qual o limiat p marcadores:
    MM2=string.join(msgs).split()
    MM2_=list(set(MM2))
    CC2_=[MM2.count(i) for i in MM2_]
    HH2_=zip(MM2_,CC2_)
    #return json.dumps({"data":{"messages":msgs,"hc":HH_,"ht":HH2_}})
    return jsonify(data={"messages":msgs,"hc":HH_,"ht":HH2_})


@app.route("/aatexto/")
def aatexto(users=0,nmsg1=1,nmsg2=100):
    """Análise textual das mensagens do AA.

    - dos usuários users (0 é todos
    - da mensagem do AA nmsg1 (ordem de ocorrência desde a primeira)
    - até a mensagem nmsg2"""
    db = MySQLdb.connect(host=dbc.h,    # your host, usually localhost
                         user=dbc.u,    # your username
                          passwd=dbc.p, # your password
                          db=dbc.d)     # name of the data base
    cur = db.cursor()

    cur.execute("SELECT message from messages limit 200, 100;")
    msgs=cur.fetchall()
    msgs=[i[0] for i in msgs]
    MM=string.join(msgs)
    MM_=list(set(MM))
    CC_=[MM.count(i) for i in MM_]
    HH_=zip(MM_,CC_)
    # fazer contagem de tokens e ver qual o limiat p marcadores:
    MM2=string.join(msgs).split()
    MM2_=list(set(MM2))
    CC2_=[MM2.count(i) for i in MM2_]
    HH2_=zip(MM2_,CC2_)


    aa=make_response(render_template('aatext.html', hw=HH2_,hc=HH_))
    return aa
    # shout notify alert start stop
    #return jsonify(msgs=msgs,histogram_chars=HH_,histogram_words=HH2_)
   
@app.route('/d3testsB/')
def d3testsB():
    aa=make_response(render_template('d3testsB.html'))
    return aa
    
@app.route('/d3tests/')
def d3tests():
    aa=make_response(render_template('d3tests.html'))
    return aa
    
import json
@app.route('/jsonAAtext/')
def jsonAAtext():
    avar= request.args.get('avar')
    print avar
    db = MySQLdb.connect(host=dbc.h,    # your host, usually localhost
                         user=dbc.u,    # your username
                          passwd=dbc.p, # your password
                          db=dbc.d)     # name of the data base
    cur = db.cursor()

    cur.execute("SELECT message from messages limit 200, 100;")
    msgs=cur.fetchall()
    msgs=[i[0] for i in msgs]
    if avar=="char":
        MM=string.join(msgs)
        MM_=list(set(MM))
        CC_=[MM.count(i) for i in MM_]
        HH_=zip(MM_,CC_)
        HH__=[{"letter":i[0],"frequency":i[1]} for i in HH_]
        return jsonify(data=HH__)
    # fazer contagem de tokens e ver qual o limiat p marcadores:
    MM2=string.join(msgs).split()
    MM2_=list(set(MM2))
    CC2_=[MM2.count(i) for i in MM2_]
    HH2_=zip(MM2_,CC2_)
    HH2__=[{"letter":i[0],"frequency":i[1]} for i in HH2_]
    #return jsonify(data=HH2__)
    return json.dumps(HH2__)
    #return jsonify({"hw_":HH2__,"hc_":HH__,"hc":HH_})




@app.route('/aajsonify/<table>/')
def aajsonify(table=None):
    if not table:
        return redirect(url_for('aa'))
    db = MySQLdb.connect(host=mdc.h, # your host, usually localhost
                         user=mdc.u, # your username
                          passwd=mdc.p, # your password
                          db=mdc.d) # name of the data base
    cur = db.cursor()

    cur.execute("SELECT * FROM %s;"%(table,))
    ttable=cur.fetchall()
    try:
        return jsonify(table=ttable)
    except:
        #return jsonify(table=unicode(ttable,"utf-8","ignore"))
        return jsonify(table=str(ttable))

    return "in construction"
@app.route('/aauser/<nick>/')
def aauser(nick=None):
    if not nick:
        return redirect(url_for('aa'))
    db = MySQLdb.connect(host=mdc.h, # your host, usually localhost
                         user=mdc.u, # your username
                          passwd=mdc.p, # your password
                          db=mdc.d) # name of the data base
    cur = db.cursor()

   
    cur.execute("SELECT id from users WHERE nick='%s';"%(nick,))
    nid=cur.fetchall()[0][0]
    cur.execute("SELECT session_id,task_id,message,created,valid FROM messages WHERE user_id='%s';"%(nid,))
    msgs=cur.fetchall()
    #msgs_=[list(ff[:3])+[str(ff[3]),ff[4]] for ff in msgs]
    #aa=make_response(render_template('aauser.html', msgs=msgs))
    try:
        return jsonify({"msgs":msgs,"campos":["session_id","task_id","message","created_at","valid"]})
    except:
        msgs=[list(i) for i in msgs]
        for i in xrange(len(msgs)):
            #msgs[i][3]=msgs[i][3]
            msgs[i][2]=unicode(msgs[i][2],"utf-8","ignore")
            #msgs[i][2]=msgs[i][2].decode("utf-8")
        return jsonify({"msgs":msgs,"campos":["session_id","task_id","message","created_at","valid"]})

from maccess import dbc
@app.route('/aa/<nusers>/<nmsgs1>/<nmsgs2>/')
@app.route('/aa/')
def aa(nusers=None,nmsgs1=None,nmsgs2=None):
    global nicks
    db = MySQLdb.connect(host=dbc.h,    # your host, usually localhost
                         user=dbc.u,    # your username
                          passwd=dbc.p, # your password
                          db=dbc.d)     # name of the data base
    cur = db.cursor()

    cur.execute("SELECT COUNT(*) FROM users;")
    n_users=cur.fetchall()[0][0]
    cur.execute("SELECT COUNT(*) FROM messages;")
    n_messages=cur.fetchall()[0][0]
    cur.execute("SELECT COUNT(*) FROM sessions;")
    n_sessions=cur.fetchall()[0][0]
    nn_=(("users",n_users),("messages",n_messages),("sessions",n_sessions))
    cur.execute("SELECT user_id, Count(*) as total FROM messages GROUP BY user_id ORDER BY Count(*) DESC;")
    top_users=cur.fetchall()
    tids=[i[0] for i in top_users[:20]]
    acts=[i[1] for i in top_users[:20]]
    tids_=str(tids).replace("L","").replace("[","(").replace("]",")")
    tids=[i[0] for i in top_users[:20]]
    #cur.execute("SELECT id,nick FROM users WHERE id in %s;"%(tids_,))
    cur.execute("SELECT id,nick FROM users")
    #nicks=[i for i in cur.fetchall()]
    nicks=dict([i for i in cur.fetchall()])
    print tids
    nicks_=[nicks[i] for i in tids]

    na=zip(nicks_[:20],acts[:20])
    cur.execute("SELECT user_id, session_id,task_id,message,created,valid from messages ORDER BY created DESC limit 20;")
    newest_msgs=cur.fetchall()
    print newest_msgs
    newest_msgs=[list(i) for i in newest_msgs]
    for i in xrange(len(newest_msgs)):
        newest_msgs[i][3]=unicode(newest_msgs[i][3],"utf-8","ignore")
    # depois coloca as msgs + recentes
    #print na
    print newest_msgs
    aa=make_response(render_template('aa.html', na=na,nn=nn_,msgs=newest_msgs,nicks=nicks))
    return aa
    #return "in construction %su %sm %ss"%(str(tids),str(acts),str(nicks_))
    #return "in construction %du %dm %ds"%(n_users,n_messages,n_sessions)

@app.route('/jsonAAover/')
def jsonAAover():
    db = MySQLdb.connect(host=dbc.h,    # your host, usually localhost
                         user=dbc.u,    # your username
                          passwd=dbc.p, # your password
                          db=dbc.d)     # name of the data base
    cur = db.cursor()

    cur.execute("SELECT COUNT(*) FROM users;")
    n_users=cur.fetchall()[0][0]
    cur.execute("SELECT COUNT(*) FROM messages;")
    n_messages=cur.fetchall()[0][0]
    cur.execute("SELECT COUNT(*) FROM sessions;")
    n_sessions=cur.fetchall()[0][0]
    #js=["users":n_users,"messages":n_messages,"sessions":n_sessions]
    js=(("users",n_users),("messages",n_messages),("sessions",n_sessions))
    return Response(json.dumps(js),  mimetype='application/json')

@app.route('/opa/')
def opa():
    return "in construction"

@app.route('/rosto/')
def rosto():
    return redirect(url_for('twitter',hashtag="ArenaNetMundial"))

@app.route('/sobre/')
def sobre():
    return "in construction"

@app.route('/megarrede/')
def megarrede():
    return "in construction"

@app.route('/users/')
def users():
    n_users=CLIENT.sna.users.count()
    usuarios=CLIENT.sna.users.find({},{"username":1,"visitas":1,"_id":0})
    aa=make_response(render_template('users.html', n_users=n_users, usuarios=usuarios))
    return aa

@app.route('/user/<username>/')
@app.route('/user/')
def user(username=None):
    if not username:
        if "username" in session.keys():
            username=session["username"]
        else:
            return redirect(url_for('index'))
    dados=CLIENT.sna.users.find({"username":username})
    if dados.count():
        dados=dados[0]
        chaves=dados.keys()
        visitas=dados["visitas"]
    else:
        visitas=0
        dados={}
        chaves=[]
    #if not username:
    #    name=session["username"]
    aa=make_response(render_template('user.html', dados=dados,chaves=chaves,username=username))
    #return session["logged"]
    return aa

@app.route('/')
def index():
    #if 'username' in session.keys():
    #    username=session["username"]
    #else:
    #    username=u"usuário não logado"
    if "itime" in session.keys():
        dur=str(datetime.timedelta(seconds=T.time()-session["itime"]))
        #sdur="%dh%dm%ds%dms"%(dur.)
        dur_=dur.replace(":","h",1).replace(":","m").replace(".","s")
        dur__=dur_[:dur_.index("s")+1]
        #session["ttime"]=dur[:-dur[::-1].index(".")+2]
        session["ttime"]=dur__
    
    aa=make_response(render_template('indice.html'))
    return aa
    #return 'You are not logged in. <a href="%s">Login</a>.'%(url_for('login'),)

@app.route('/login', methods=['GET', 'POST'])
def login():
    global atime
    if request.method == 'POST':
        if request.form['url']:
            url=request.form['url']
        else:
            url=""
        session['username'] = username = request.form['username']
        busca=CLIENT.sna.users.find({"username": username})
        if busca.count():
            if not url:
                url=request.form['url']
            idUser=CLIENT.sna.users.update({"username": username},
               { "$inc" : {"visitas": 1 }, 
               "$set" : {"url":url}, 
               "$push" : {"logins" : {"datetime":datetime.datetime.now(),"agent":request.headers.get('User-Agent')}}
                                       })
            # dar update da url e visitas no BD
        else:
            idUser=CLIENT.sna.users.insert({"username":username,"url":url,"visitas":1, "logins":[{"datetime":datetime.datetime.now(),"agent":request.headers.get('User-Agent')}]})
            # adicionar que é a primeira visita
        session["url"]=url
        session['logged'] = True
        session['itime'] =T.time() 
        atime=T.time()
        return redirect(url_for('index'))
    return '''
        <form action="" method="post">
            <p>username:<input type=text name=username>
            <p><input type=submit value=Login>
            <p>url de preferência:<input type=text name=url value="http://participa.br">
        </form>
    '''

@app.route('/logout/')
def logout():
    # remove the username from the session if it's there
    session['logged'] = False
    idUser=CLIENT.sna.users.update({"username": session["username"]},{ "$set" : {"tempo_online":T.time()-session["itime"]}})
    session.pop('username', None)
    return redirect(url_for('index'))

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

#@app.route("/asum/<inte1>/<inte2>/")
#def asum(inte1,inte2):
#    #return int(inte1)+int(inte2)
#    #return inte1+inte2,len(inte1),len(inte2)
#    return inte1+inte2
#
#@app.route("/bsum/<int:inte1>/<int:inte2>/")
#def bsum(inte1,inte2):
#    return "%d"%(inte1+inte2,)
#
#
@app.route("/tag", methods=['GET', 'POST'])
def bsum():
    if request.method == 'POST':
        session['tag'] = request.form['atag']
        return redirect(url_for('procura',atag=session['tag']))
        #return "Procurando tag: %s"%(session['tag'],)
    else:
        return '''
        <form action="" method="post">
            <p><input type=text name=atag>
            <p><input type=submit value=Procurar>
        </form>
    '''
@app.route("/procura/<atag>")
def procura(atag):
    return "Tag procurada: %s.<br />Resultados no face:<br />Resultados no twitter:"%(atag,)

#@app.route("/tag/<atag>/")
#def bsum(atag):
#    return "Tag procurada: %s.\n\nResultados no face:\nResultados no twitter:"%(atag,)

#@app.route("/palavra/<atag>/")
#def bsum(atag):
#    return "Palavra procurada: %s.\n\nResultados no face:\nResultados no twitter:"%(atag,)

if __name__ == "__main__":
    #app.run()
    app.debug = True
    app.run(host='0.0.0.0')
    #app.run(debug=True)
