import pymongo, time as T, numpy as n
from twython import Twython
#client=pymongo.MongoClient()
#db = client['mytest']
#C = db['twitter'] #collection
#foo=C.find()
#tweets=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]
#
print 0
from maccess import mdc
client=pymongo.MongoClient(mdc.u1)
print 10
db = client['sna']
print 20
#C = db['twitter'] #collection
foo=db.sna.find()#twitterArena
print 30
tweets=[ff for ff in foo]
print 1
W=tweets
#names=[i["user"]["screen_name"] for i in W]

snames=[i["user"]["screen_name"] for i in W]
IDS=[i["user"]["id"] for i in W]

#fcount=[i["user"]["friends_count"] for i in W]
location=[i["user"]["location"] for i in W]

names_=list(set(snames))
hnames_=[snames.count(i) for i in names_]
args=n.argsort(hnames_)
N=[names_[i] for i in  args][::-1]
H=[hnames_[i] for i in args][::-1]
 
import __builtin__ as B

TWITTER_API_KEY = 'GlK4q2GXVC4RzTBtIeJ0Hw' #supply the appropriate value
TWITTER_API_KEY_SECRET = 'k5v7wlJR2Yx5qYlSVrsgAZpl4hyEbpn14ci2lsha5I' 
TWITTER_ACCESS_TOKEN = '18882547-sIua3cWZbBceYAobFe0REsBR3jse3yiPvDJzfR5t3'
TWITTER_ACCESS_TOKEN_SECRET = 'YdZme6bnk1zhbCs3Sn2yfNkga0vMWclE2JBvzLs22m8jv'

t = Twython(app_key=TWITTER_API_KEY, 
            app_secret=TWITTER_API_KEY_SECRET, 
            oauth_token=TWITTER_ACCESS_TOKEN, 
            oauth_token_secret=TWITTER_ACCESS_TOKEN_SECRET)

client2=pymongo.MongoClient(mdc.u2)
   
i=0
for nn in N:
    print i; i+=1
    teste=client2.sna.amizades.find({str(IDS[snames.index(nn)]):{"$exists":True}})
    teste=[testee for testee in teste]
    if not teste:
        print nn, "not teste"
        tids=t.get_friends_ids(screen_name=nn)["ids"]
        id_orig=W[snames.index(nn)]["user"]["id"]
        client2.sna.amizades.insert({str(id_orig):tids})
    else:
        print nn, "teste"
    T.sleep(90)

#
#while 1:
#    search = t.search(q='#arenaNETmundial',count=150,max_id=tweets[-1]['id']-1)
#    i=0
#    while len(search['statuses'])>0:
#        tweets +=search['statuses']
#        #search = t.search(q='#arenaNETmundial', count=150, max_id=tweets[-1]['id']-1)
#        print "older", i, len(tweets),search['statuses']; i+=1
#
#    search2 = t.search(q='#arenaNETmundial',count=150,since_id=tweets[0]['id'])
#    i=0
#    while len(search2['statuses'])>0:
#        tweets =search2['statuses']+tweets
#        #search = t.search(q='#arenaNETmundial', count=150, since_id=tweets[0]['id'])
#        print "newer", i, len(tweets),search2['statuses']; i+=1
#
#    #db.twitter.remove()
#    if search['statuses'] or search2['statuses']:
#        print "tweets"
#        db.sna.remove()
#        #C = db['twitter'] #collection
#        #C.insert({"arenaNETmundial":tweets})
#        db.sna.insert((i for i in tweets))
#        #db2.sna.insert((i for i in db.sna.find()))
#    print("atualizado")
#    T.sleep(60*60) # atualizar BD de 2 em 2 minutos
