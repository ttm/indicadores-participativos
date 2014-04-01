indicadores-participativos
==========================

indicadores criados com a participação da sociedade

== Databases ==
- Há várias bases com os tweets. Para a plataforma, uma base de dado é usada, na qual as seguintes coleções são criadas:
--> users (todos os dados sobre os usuários individualmente)
--> ??
Exemplo:

client2=pymongo.MongoClient("mongodb://sna:Jockey67@oceanic.mongohq.com:10021/sna")
idUser=client2.sna.users.insert({"username":username,"url":url,"visitas":1})

chaves: id do mongo, username

== TODO ==
- Passar a comunicação com o mongodb direto p JS.
- Fazer o hover dos vértices funcionarem.

