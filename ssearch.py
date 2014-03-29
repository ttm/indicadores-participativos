from twython import Twython
import __builtin__ as B

TWITTER_API_KEY = 'AI2A7Ts772TesPoK38njA' #supply the appropriate value
TWITTER_API_KEY_SECRET = 'dmrMuSkX78WyKrvp2s9VUTWKcRbnGa46uREcWjfzad4' 
TWITTER_ACCESS_TOKEN = '18882547-ylXgGFI1FfqR4XpsA3HASBnMLDEbUKxUM1IXb7sD2'
TWITTER_ACCESS_TOKEN_SECRET = 'gZYe00t5UCTFukHTgtchZECiFN8W5Easho5u4dB5EoPEm'

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
