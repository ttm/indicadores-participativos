#import __builtin__, as B
from flask import Flask, render_template, make_response, session, redirect, url_for, escape, request,jsonify
import pymongo, __builtin__
from dateutil import parser
import time as T, networkx as x
app = Flask(__name__)
atime=T.time()

#client=pymongo.MongoClient()
#db = client['mytest']
#C = db['twitter'] #collection

################ CUT
print 0
client=pymongo.MongoClient("mongodb://sna:Jockey67@ds041327.mongolab.com:41327/sna")
print 10
db = client['sna']
print 20

#foo=db.sna.find()
foo=db.sna.find({},{"created_at":1,"user.name":1,"user.screen_name":1,"user.friends_count":1,"user.location":1,"user.followers_count":1,"user.statuses_count":1,"user.id":1})
W=[ff for ff in foo]
snames=[i["user"]["screen_name"] for i in W]
IDS=[i["user"]["id"] for i in W]
IDS_=range(1,len(W)+1)
IDS_=[I for I in IDS_]
print 30

client2=pymongo.MongoClient("mongodb://sna:Jockey67@oceanic.mongohq.com:10021/sna")
print 40

ami=client2.sna.amizades.find()
#amis=[aa for aa in ami]
g=x.Graph()
#for aa in ami:
for ii in xrange(15):
    cha=ami[ii].keys()
    cha.pop(cha.index("_id"))
    id_orig=int(cha[0])
    idss=[i for i in ami[ii][cha[0]] if i in IDS]
    for iids in idss:
        g.add_edge(snames[IDS.index(id_orig)],snames[IDS.index(iids)])
print 50

@app.route('/crossf/')
def crossf():
    return render_template('crossf/index.html')

@app.route('/rosto/')
def rosto():
    return render_template('crossf/rosto.html')
from collections import OrderedDict
IID=range(g.number_of_nodes())
#IID=[str(ii) for ii in IID]
INN=g.nodes()
degree=g.degree()
closeness=x.closeness.closeness_centrality(g) 
clustering=x.clustering(g)
dd=OrderedDict(sorted(degree.items(), key=lambda t: t[1]))
tnames=dd.keys()
degrees=dd.values()
@app.route('/_dahJsonG2')
def dahJsonG2():
    d={"names":tnames,"degrees":degrees}
    return jsonify(d)

@app.route('/_dahJsonG')
def dahJsonG():
    N=g.number_of_nodes()
    GG=OrderedDict()
    GG["nodes"]=[]
#    for name in names[-N/20:]:
#        GG["nodes"].append({"id":IDS_[snames.index(name)],"name":name,"group":"0"})
#    for name in names[-N/5:-N/20]:
#        GG["nodes"].append({"id":IDS_[snames.index(name)],"name":name,"group":"1"})
#    for name in names[:-N/5]:
#        GG["nodes"].append({"id":IDS_[snames.index(name)],"name":name,"group":"2"})
    GG["links"]=[]
#    for (N1,N2) in g.edges():
#        GG["links"].append({"source":IDS_[snames.index(N1)],"target":IDS_[snames.index(N2)],"value":10})
    ########3
#    for name in tnames[:-N/5]: # perifericos
#        GG["nodes"].append({"id":INN.index(name),"name":name,"group":2})
#    for name in tnames[-N/5:-N/20]: #intermediarios
#        GG["nodes"].append({"id":INN.index(name),"name":name,"group":1})
#    for name in tnames[-N/20:]: #hubs
#        GG["nodes"].append({"id":INN.index(name),"name":name,"group":0})
#    GG["links"]=[]
#    for (N1,N2) in g.edges():
#        GG["links"].append({"source":INN.index(N1),"target":INN.index(N2),"value":1})
    for name in tnames[:-N/5]: # perifericos
        GG["nodes"].append({"id":tnames.index(name),"name":name,"group":2,"clo":"%.2f"%(closeness[name],),"clu":clustering[name],"gra":degree[name]})
    for name in tnames[-N/5:-N/20]: #intermediarios
        GG["nodes"].append({"id":tnames.index(name),"name":name,"group":1,"clo":"%.2f"%(closeness[name],),"clu":clustering[name],"gra":degree[name]})
    for name in tnames[-N/20:]: #hubs
        GG["nodes"].append({"id":tnames.index(name),"name":name,"group":0,"clo":closeness[name],"clu":"%.2f"%(clustering[name],),"gra":degree[name]})
    GG["links"]=[]
    for (N1,N2) in g.edges():
        GG["links"].append({"source":tnames.index(N1),"target":tnames.index(N2),"value":1})


#        print {"source":IDS_[snames.index(N1)],"target":IDS_[snames.index(N2)],"value":"1"}
    __builtin__.GG=GG
    return jsonify(GG)

@app.route('/_dahJsonA')
def dahJsonA():
    dates=[parser.parse(i["created_at"]) for i in W]
    #names=[i["user"]["screen_name"] for i in W]
    names=[i["user"]["name"] for i in W]
    snames=[i["user"]["screen_name"] for i in W]
    fcount=[i["user"]["friends_count"] for i in W]
    focount=[i["user"]["followers_count"] for i in W]
    scount=[i["user"]["statuses_count"] for i in W]
    location=[i["user"]["location"] for i in W]

    names_=list(set(names))
    hnames_=[names.count(i) for i in names_]
    args=n.argsort(hnames_)
    N=[names_[i] for i in  args][::-1]
    H=[hnames_[i] for i in args][::-1]
    M=[]
    #for i in xrange(len(N)):
    for i in xrange(20):
        m={}
        #m["date"]=dates[i]
        #dt=dates[i]
        #m["date"]=(dt.month,dt.day,dt.hour,dt.minute)
        m["posicao"]=i+1
        m["nome"]=N[i]
        m["sname"]=snames[names.index(N[i])]
        m["atividade"]=H[i]
        m["amigos"]=fcount[names.index(N[i])]
        m["location"]=location[names.index(N[i])]
        m["atv_total"]=scount[names.index(N[i])]
        m["comprom"]="%.2f"%((H[i]/float(scount[names.index(N[i])]))*100,)
        M.append(m)
    return jsonify(M=M)



@app.route('/_dahJson')
def dahJson():
    dates=[parser.parse(i["created_at"]) for i in W]
    #names=[i["user"]["screen_name"] for i in W]
    names=[i["user"]["name"] for i in W]
    fcount=[i["user"]["friends_count"] for i in W]
    focount=[i["user"]["followers_count"] for i in W]
    scount=[i["user"]["statuses_count"] for i in W]
    location=[i["user"]["location"] for i in W]

    names_=list(set(names))
    hnames_=[names.count(i) for i in names_]
    args=n.argsort(hnames_)
    N=[names_[i] for i in  args][::-1]
    #H=n.log([hnames_[i] for i in args][::-1])+5
    H=[hnames_[i] for i in args][::-1]
    M=[]
    #for i in xrange(len(N)):
    #    m=Mensagem()
    #    m.date=dates[i]
    #    m.delay=H[i]
    #    m.distance=fcount[i]
    #    m.origin=N[i]
    #    m.destination=location[i]
    #    M.append(m)
    for i in xrange(len(N)):
        m={}
        #m["date"]=dates[i]
        dt=dates[i]
        m["date"]=(dt.month,dt.day,dt.hour,dt.minute)
        m["delay"]=H[i]
        m["distance"]=fcount[i]
        m["origin"]=N[i]
        m["destination"]=location[i]
        M.append(m)
    M_=[]
    for i in xrange(len(dates)):
        m={}
        #m["date"]=dates[i]
        dt=dates[i]
        m["date"]=(dt.month,dt.day,dt.hour,dt.minute)
        #m["delay"]=H[i]
        m["delay"]=fcount[i]
        m["distance"]=focount[i]
        m["origin"]=names[i]
        m["destination"]=location[i]
        m["activity"]=hnames_[names_.index(names[i])]
        M_.append(m)



    #return jsonify(N=N,H=H,date=dates)
    #return jsonify(N=N,H=H,date=dates)
    return jsonify(M=M_)



@app.route('/_add_numbers')
def add_numbers():
    """Add two numbers server side, ridiculous but well..."""
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    c = request.args.get('c', 0, type=int)
    foo=C.find()
    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
    dates=[parser.parse(i["created_at"]) for i in W]
    months=[d.month for d in dates]
    days=[d.day for d in dates]
    md=[(d.month,d.day) for d in dates]
    lsmd=list(set(md))
    lsmd1=sorted(lsmd, key=lambda i: i[1])
    lsmd2=sorted(lsmd1, key=lambda i: i[0])
    cdia=[(i[0],i[1],md.count(i)) for i in lsmd2]
    wdays=[d.weekday() for d in dates]
    hwdays=[wdays.count(i) for i in xrange(7)]

    return jsonify(result=a + b+c,hwdays=str(hwdays),hwdays2=hwdays,cdia=str(cdia),cdia2=cdia)

@app.route('/_add_numbers2')
def add_numbers2():
    """Add two numbers server side, ridiculous but well..."""
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    c = request.args.get('c', 0, type=int)
    foo=C.find()
    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
    dates=[parser.parse(i["created_at"]) for i in W]
    months=[d.month for d in dates]
    days=[d.day for d in dates]
    md=[(d.month,d.day) for d in dates]
    lsmd=list(set(md))
    lsmd1=sorted(lsmd, key=lambda i: i[1])
    lsmd2=sorted(lsmd1, key=lambda i: i[0])
    cdia=[(i[0],i[1],md.count(i)) for i in lsmd2]
    wdays=[d.weekday() for d in dates]
    hwdays=[wdays.count(i) for i in xrange(7)]

    return jsonify(result=a + b+c,hwdays=str(hwdays),hwdays2=hwdays,cdia=str(cdia),cdia2=cdia)

meses=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"]
@app.route('/_sendFoo')
def sendFoo():
    """Send a veriable."""
    a = request.args.get('name', 0, type=str)
    foo=C.find()
    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
    dates=[parser.parse(i["created_at"]) for i in W]
    months=[d.month for d in dates]
    days=[d.day for d in dates]
    md=[(d.month,d.day) for d in dates]
    lsmd=list(set(md))
    lsmd1=sorted(lsmd, key=lambda i: i[1])
    lsmd2=sorted(lsmd1, key=lambda i: i[0])
    cdia=[(meses[i[0]],i[1],md.count(i)) for i in lsmd2]
    wdays=[d.weekday() for d in dates]
    hwdays=[wdays.count(i) for i in xrange(7)]

    return jsonify(cdia2=cdia)

import numpy as n
@app.route('/_sendTop')
def sendTop():
    """Send a veriable."""
    a = request.args.get('name', 0, type=str)
    foo=C.find()
    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
    names=[i["user"]["screen_name"] for i in W]
    names_=list(set(names))
    hnames_=[names.count(i) for i in names_]
    args=n.argsort(hnames_)
    N=[names_[i] for i in  args][::-1]
    H=[hnames_[i] for i in args][::-1]


    return jsonify(N=N,H=H)






@app.route('/contas/')
def contas():
    return render_template('contas.html')

@app.route('/contas2/')
def contas2():
    return render_template('contas2.html')


@app.route('/contas3/')
def contas3():
    return render_template('contas3.html')


@app.route("/tweets/")
def tweets():
    foo=C.find()
    W=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
    dates=[parser.parse(i["created_at"]) for i in W]
    months=[d.month for d in dates]
    days=[d.day for d in dates]
    md=[(d.month,d.day) for d in dates]
    lsmd=list(set(md))
    lsmd1=sorted(lsmd, key=lambda i: i[1])
    lsmd2=sorted(lsmd1, key=lambda i: i[0])
    cdia=[(i[0],i[1],md.count(i)) for i in lsmd2]
    wdays=[d.weekday() for d in dates]
    hwdays=[wdays.count(i) for i in xrange(7)]
    #return str(len(W))+"<br />"+str(hwdays)+"<br />"+str(cdia)
    bb=render_template('Ttweets.html', name=cdia)
    return bb
# CUT
@app.route("/hello/")
@app.route("/hello/<name>::::/")
@app.route("/hello/<name>ooo/")
def hello(name=None):
    #return "Hello World!! "+__name__
    bb=render_template('hello.html', name=name)
    aa=make_response(render_template('hello.html', name=name))
    #bb="uga"
    #return bb+str(dir(aa))+"<br /><br />"+str(dir(bb))
    #aa.headers["name"]="uga"
    #return aa
    return bb
    #return     return make_response('hello.html')

@app.route('/')
def index():
    if 'username' in session:
        return 'Logged in as %s, for %d seconds.' % (escape(session['username']),int(T.time()-atime))
        #return ' for %d seconds.' % (int(T.time()-atime),)
    return 'You are not logged in. <a href="%s">Login</a>.'%(url_for('login'),)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return '''
        <form action="" method="post">
            <p><input type=text name=username>
            <p><input type=submit value=Login>
        </form>
    '''

@app.route('/logout')
def logout():
    # remove the username from the session if it's there
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
