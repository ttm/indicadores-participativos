from twython import Twython
import __builtin__ as B

TWITTER_API_KEY             = tw.tak
TWITTER_API_KEY_SECRET      = tw.taks
TWITTER_ACCESS_TOKEN        = tw.tat
TWITTER_ACCESS_TOKEN_SECRET = tw.tats

t = Twython(app_key=TWITTER_API_KEY, 
            app_secret=TWITTER_API_KEY_SECRET, 
            oauth_token=TWITTER_ACCESS_TOKEN, 
            oauth_token_secret=TWITTER_ACCESS_TOKEN_SECRET)

#ttweets=[]
#search = t.search(q='#arenaNETmundial',count=150)
#tweets = search['statuses']
#ttweets+=[tweets]
ttweets=B.tts
i=0
while len(ttweets[-1])>1:
    search = t.search(q='#arenaNETmundial',
                      count=150,
                      max_id=ttweets[-1][-1]['id'])
    tweets = search['statuses']
    ttweets+=[tweets]
    print i, len(tweets); i+=1

#for tweet in tweets:
#  print tweet['id_str'], '\n', tweet['text'], '\n\n\n'
