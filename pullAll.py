import pymongo, time as T
from twython import Twython
client=pymongo.MongoClient()
db = client['mytest']
C = db['twitter'] #collection
foo=C.find()
tweets=[ff for ff in foo if "arenaNETmundial" in ff.keys()][0]["arenaNETmundial"]

import __builtin__ as B

TWITTER_API_KEY = 'AI2A7Ts772TesPoK38njA' #supply the appropriate value
TWITTER_API_KEY_SECRET = 'dmrMuSkX78WyKrvp2s9VUTWKcRbnGa46uREcWjfzad4' 
TWITTER_ACCESS_TOKEN = '18882547-ylXgGFI1FfqR4XpsA3HASBnMLDEbUKxUM1IXb7sD2'
TWITTER_ACCESS_TOKEN_SECRET = 'gZYe00t5UCTFukHTgtchZECiFN8W5Easho5u4dB5EoPEm'

t = Twython(app_key=TWITTER_API_KEY, 
            app_secret=TWITTER_API_KEY_SECRET, 
            oauth_token=TWITTER_ACCESS_TOKEN, 
            oauth_token_secret=TWITTER_ACCESS_TOKEN_SECRET)

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
        search = t.search(q='#arenaNETmundial',
                          count=150,
                          max_id=tweets[-1]['id']-1)
        print "older", i, len(tweets),search['statuses']; i+=1

    search = t.search(q='#arenaNETmundial',count=150,since_id=tweets[0]['id'])
    i=0
    while len(search['statuses'])>0:
        tweets =search['statuses']+tweets
        search = t.search(q='#arenaNETmundial',
                          count=150,
                          since_id=tweets[0]['id'])
        print "newer", i, len(tweets),search['statuses']; i+=1

    db.twitter.remove()
    C = db['twitter'] #collection
    C.insert({"arenaNETmundial":tweets})
    print("atualizado")
    T.sleep(2*60) # atualizar BD de 2 em 2 minutos
