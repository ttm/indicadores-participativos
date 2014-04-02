indicadores-participativos
==========================

indicadores criados com a participação da sociedade.
Com ferramentas livres e serviços (atualmente) gratuitos,
uma pessoa pode ativar instâncias desta ferramenta e variantes.

== Roteiro de instalação ==

exempliicado para uso de
- serviços gratuitos: heroku, mongolab/mongohq
- ferramentas python: pip, virtualenv, bibliotecas
- sistema operacional ubuntu

faça conta no heroku e mongolab, 
coloque a tag escolhida e o BD no pullTweets.py e rode-o em uma app,
suba a app para apresentar as infos.
monitore os tamanhos para não lotar os bds (limite de 500mb).
uso de multiplos bds para usar mais de 500mb e para analises conjuntas.









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
- Colocar medidas topológicas na tabela reordenável.
- Possibilizar que se faça a rede de amizades completa (de todos os que twitaram)
e a rede de interações (quem responde quem). Junto aos filtros multivariáveis para o sistema.
- Adicionar sons para a rede complexa ou as tabelas. Iniciar as sonificações e possibilidades
de composições e disponibilização das músicas/mídia.


