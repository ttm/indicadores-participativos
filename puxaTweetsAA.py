#-*- coding: utf8 -*-
import pymongo, time as T, sys
from twython import TwythonStreamer
from twython import Twython
#HTAG="#arenaNETmundial"
HTAG="#aao0"
HTAG_=HTAG.replace("#","H")
#client=pymongo.MongoClient()
#db = client['mytest']
#C = db['twitter'] #collection
#foo=C.find()
#tweets=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
#
from maccess import tw2 as tw
TWITTER_API_KEY             = tw.tak
TWITTER_API_KEY_SECRET      = tw.taks
TWITTER_ACCESS_TOKEN        = tw.tat
TWITTER_ACCESS_TOKEN_SECRET = tw.tats
#TWITTER_API_KEY = 'AI2A7Ts772TesPoK38njA' #supply the appropriate value
#TWITTER_API_KEY_SECRET = 'dmrMuSkX78WyKrvp2s9VUTWKcRbnGa46uREcWjfzad4' 
#TWITTER_ACCESS_TOKEN = '18882547-ylXgGFI1FfqR4XpsA3HASBnMLDEbUKxUM1IXb7sD2'
#TWITTER_ACCESS_TOKEN_SECRET = 'gZYe00t5UCTFukHTgtchZECiFN8W5Easho5u4dB5EoPEm'

print 1
t = Twython(app_key=TWITTER_API_KEY, 
            app_secret=TWITTER_API_KEY_SECRET, 
            oauth_token=TWITTER_ACCESS_TOKEN, 
            oauth_token_secret=TWITTER_ACCESS_TOKEN_SECRET)
print 1


#search = t.search(q=HTAG,count=150,max_id=tweets[-1]['id']-1)
search = t.search(q=HTAG,count=150)
from maccess import mdc
client=pymongo.MongoClient(mdc.u1)
db = client['sna']
C = db[HTAG_] #collection
foo=C.find()#twitterArena
print 2
ss=[]
if not foo.count(): # collection n existe
    print "colecao n existe"
    # fazer busca geral

    # e retroativa, tentar util
    # https://dev.twitter.com/docs/api/1.1/get/search/tweets
    # include_entities para true
    search = t.search(q=HTAG,count=100,result_type="recent")
    while search["statuses"]:
        print len(search["statuses"])
        print "batelada de status"
        ss+=search["statuses"]
        T.sleep(70)
        search = t.search(q=HTAG,count=150,max_id=ss[-1]['id']-1,result_type="recent")
    ss=ss[::-1]
# collection já existe, adicionar tweets mais reecntes
# inverter se realmente precisar

    search = t.search(q=HTAG,count=150,since_id=ss[-1]['id'],result_type="recent")
    while search["statuses"]:
        print len(search["statuses"])
        print "batelada de status mais recente"
        ss+=search["statuses"][::-1]
        T.sleep(70)
        search = t.search(q=HTAG,count=150,since_id=ss[-1]['id'],result_type="recent")

    C.insert(ss)
# else: se já existe, pegar os limites inferiores e superiores do BD
else:
    print "colecao jah existe"
    quantos=foo.count()
    primeira=foo[0]["id"]
    dprimeira=foo[0]["created_at"]
    ultima= foo[quantos-1]["id"]
    dultima=foo[0]["created_at"]
    
    search = t.search(q=HTAG,count=100,max_id=primeira-1,result_type="recent")
    ss=[]
    asd=[]
    ANTES=0
    while len(search["statuses"]):
        ANTES=1
        print len(search["statuses"])
        asd.append(search["statuses"])
        print "batelada de status"
        ss+=search["statuses"]
        T.sleep(70)
        search = t.search(q=HTAG,count=100,max_id=ss[-1]['id']-1,result_type="recent")
    asd.append(search["statuses"])
    ss=ss[::-1]
    antes=[i for i in C.find()]
    agora=ss+antes
    if ss:
        ss=agora
    oid=agora[-1]["id"]
    search = t.search(q=HTAG,count=150,since_id=oid,result_type="recent")
    while search["statuses"]:
        print len(search["statuses"])
        asd.append(search["statuses"])
        print "batelada de status mais recente"
        ss+=search["statuses"][::-1]
        T.sleep(70)
        search = t.search(q=HTAG,count=150,since_id=ss[-1]['id'],result_type="recent")
    asd.append(search["statuses"])
    if ss:
        if ANTES:
            C.remove()
        else:
            C.insert(ss)

# ativar interface de streaming
class MyStreamer(TwythonStreamer):
    def on_success(self, data):
        if 'text' in data:
            C.insert(data)            
            print data['text'].encode('utf-8')

    def on_error(self, status_code, data):
        print status_code

print "iniciando streaming"
stream=MyStreamer(tw.tak,tw.taks,tw.tat,tw.tats)
stream.statuses.filter(track=HTAG)

sys.exit()
    
tweets=[ff for ff in foo]
print 1


#since_id
#search = t.search(q='#arenaNETmundial', count=150,since_id="444663164026638336")
#search = t.search(q='#arenaNETmundial', max_id="445939520354406401",result_type="mixed")
#search = t.search(q='#arenaNETmundial', max_id="446756730140385280",result_type="recent")
#search = t.search(q='#arenaNETmundial', since_id="444663164026638336",max_id="445564745635348480",result_type="recent",count=150)
#
while 1:
    search = t.search(q='#arenaNETmundial',count=150,max_id=tweets[-1]['id']-1)
    i=0
    while len(search['statuses'])>0:
        tweets +=search['statuses']
        #search = t.search(q='#arenaNETmundial', count=150, max_id=tweets[-1]['id']-1)
        print "older", i, len(tweets),search['statuses']; i+=1

    search2 = t.search(q='#arenaNETmundial',count=150,since_id=tweets[0]['id'])
    i=0
    while len(search2['statuses'])>0:
        tweets =search2['statuses']+tweets
        #search = t.search(q='#arenaNETmundial', count=150, since_id=tweets[0]['id'])
        print "newer", i, len(tweets),search2['statuses']; i+=1

    #db.twitter.remove()
    if search['statuses'] or search2['statuses']:
        print "tweets"
        db.sna.remove()
        #C = db['twitter'] #collection
        #C.insert({"arenaNETmundial":tweets})
        db.sna.insert((i for i in tweets))
        #db2.sna.insert((i for i in db.sna.find()))
    print("atualizado")
    T.sleep(60*60) # atualizar BD de 2 em 2 minutos

stream=Twython.TwythonStreamer(tw.tak,tw.taks,tw.tat,tw.tats)
stream.statuses.filter(track=HTAG)
