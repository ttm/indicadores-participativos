import pymongo, time as T
from twython import Twython
from maccess import tw # importando os acessos (só pegar no api.twitter)
TWITTER_API_KEY             = tw.tak
TWITTER_API_KEY_SECRET      = tw.taks
TWITTER_ACCESS_TOKEN        = tw.tat
TWITTER_ACCESS_TOKEN_SECRET = tw.tats

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
