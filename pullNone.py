import pymongo, time as T
from twython import Twython

TWITTER_API_KEY = 'AI2A7Ts772TesPoK38njA' #supply the appropriate value
TWITTER_API_KEY_SECRET = 'dmrMuSkX78WyKrvp2s9VUTWKcRbnGa46uREcWjfzad4' 
TWITTER_ACCESS_TOKEN = '18882547-ylXgGFI1FfqR4XpsA3HASBnMLDEbUKxUM1IXb7sD2'
TWITTER_ACCESS_TOKEN_SECRET = 'gZYe00t5UCTFukHTgtchZECiFN8W5Easho5u4dB5EoPEm'

t = Twython(app_key=TWITTER_API_KEY, 
            app_secret=TWITTER_API_KEY_SECRET, 
            oauth_token=TWITTER_ACCESS_TOKEN, 
            oauth_token_secret=TWITTER_ACCESS_TOKEN_SECRET)
s1= t.search(q='#arenaNETmundial', max_id="447046659764400128",result_type="mixed")
s2= t.search(q='#arenaNETmundial', max_id="447046659764400128",result_type="recent")
s3= t.search(q='#arenaNETmundial', max_id="447046659764400128",result_type="popular")
if s1 or s2 or s3:
    print "algum tweet foi adquirido"
else:
    print "mas nunca rola. Não pega tweet + antigo que X..."
