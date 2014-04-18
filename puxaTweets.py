#-*- coding: utf8 -*-
import pymongo, time as T, threading as t, sys
from twython import TwythonStreamer
from twython import Twython

from maccess import TW, mdc
HTAG=["#aao0","#arenaNETmundial","#Participabr"]
HTAG_=[i.replace("#","H") for i in HTAG]

class MyStreamer(TwythonStreamer):
    def on_success(self, data):
        if 'text' in data:
            self.C.insert(data)            
            print data['text'].encode('utf-8')
    def on_error(self, status_code, data):
        print status_code

class AcompanhaTweet(t.Thread):
    def __init__(self,hashtag="#aao0",connection_specs=TW[0],mongo_uri=mdc.u1,collection=None):
        t.Thread.__init__(self)
        self.hashtag=hashtag
        if collection==None:
            collection=hashtag.replace("#","HH")
        self.collection=collection
        self.mongo_collection  =self.connectMongo(mongo_uri,collection)
        self.twitter_connection=self.connectAPI(connection_specs)
        self.cs=connection_specs
        self._stop = t.Event()
        print "iniciado", self.hashtag
    def stop(self):
        self._stop.set()
        self._client.disconnect()
    def connectMongo(self,mongo_uri,collection):
        client=pymongo.MongoClient(mongo_uri)
        self._client=client
        db = client['sna']
        self.mdb=db
        C=db[collection]
        print "conectado ao mongo", self.hashtag
        return C
    def connectAPI(self,cs):
        c = Twython(app_key=cs.tak,
                 app_secret=cs.taks,
                oauth_token=cs.tat,
         oauth_token_secret=cs.tats)
        print "conectado ao twitter", self.hashtag
        return c
    def run(self):
        if self.mongo_collection.count(): # caso a coleção já exista
            self.syncExisting()
        else: # caso a coleção não exista
            self.syncNonExisting()
        self.startStreaming()

    def startStreaming(self):
        print "iniciando streaming", self.hashtag
        cs=self.cs
        stream=MyStreamer(cs.tak,cs.taks,cs.tat,cs.tats)
        stream.C=self.mongo_collection
        print "estabelecendo hashtag para o streaming", self.hashtag
        stream.statuses.filter(track=self.hashtag)

    def syncNonExisting(self):
        tweets= self.twitter_connection.search(q=self.hashtag,count=100,result_type="recent")["statuses"][::-1]
        self.ttweets=tweets
        primeira= tweets[0]["id"] # mais antiga
        ultima=   tweets[-1]["id"]
        print "sync no bd não existente", self.hashtag
        self.theSync(primeira,ultima)

    def syncExisting(self):
        quantos=self.mongo_collection.count()
        #self.query=query=self.mongo_collection.find()
        self.query=query=self.mongo_collection.find({},{"id":1,"_id":0}).sort("id",pymongo.ASCENDING).limit(1)
        primeira= query[0]["id"] # mais antiga
        self.query=query=self.mongo_collection.find({},{"id":1,"_id":0}).sort("id",pymongo.DESCENDING).limit(1)
        ultima=   query[0]["id"]
        #ultima=   query[quantos-1]["id"]
        print "sync no bd existente ", self.hashtag
        self.theSync(primeira,ultima)

    def theSync(self,primeira,ultima):

        tweets_antes =self.todosDeAntes(max_id=primeira)
        tweets_depois=self.todosDeDepois(since_id=ultima)
        if len(tweets_antes):
            if self.mongo_collection.count():
                self.ttweets=[i for i in self.query]
            tweets=tweets_antes+self.ttweets+tweets_depois
            self.mdb.drop_collection(self.collection)
            self.mongo_collection.insert(tweets)
        elif len(tweets_depois):
            self.mongo_collection.insert(tweets_depois)
        elif 'ttweets' in dir(self):
            self.mongo_collection.insert(self.ttweets)
        print "sync"
    def todosDeDepois(self,since_id):
        tweets=[]
        tweets_=self.buscaProgressiva(since_id=since_id)[::-1]
        while len(tweets_):
            tweets+=tweets_[::-1]
            T.sleep(20)
            tweets_=self.buscaProgressiva(since_id=tweets[-1]["id"])
        print "puxados todos os tweets mais recentes ",self.hashtag
        return tweets
    def todosDeAntes(self,max_id):
        tweets=[]
        tweets_=self.buscaRetroativa(max_id=max_id)
        while len(tweets_):
            tweets+=tweets_
            T.sleep(60)
            tweets_=self.buscaRetroativa(max_id=tweets[-1]["id"])
        print "puxados todos os tweets de antes ",self.hashtag
        return tweets[::-1]
    def buscaRetroativa(self,max_id):
        tweets=self.twitter_connection.search(q=self.hashtag,count=100,max_id=max_id-1,result_type="recent")["statuses"]
        print "puxado retroativo",len(tweets),self.hashtag
        return tweets
    def buscaProgressiva(self,since_id):
        tweets = self.twitter_connection.search(q=self.hashtag,count=100,since_id=since_id,result_type="recent")["statuses"]
        print "puxado progressivo",len(tweets),self.hashtag
        return tweets
    
aa=AcompanhaTweet()
aa.start()
bb=AcompanhaTweet("#arenaNETmundial",TW[1])
bb.start()
cc=AcompanhaTweet("#Participabr",TW[2])
cc.start()
def texit():
    global aa, bb, cc
    #global cc
    aa.stop()
    bb.stop()
    cc.stop()
