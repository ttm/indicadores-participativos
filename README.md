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
--> (para os tweets)
Exemplo:

from maccess impor mdc # maccess.py arquivo com acesso ao BD mongo
client2=pymongo.MongoClient(mdc.ui)
idUser=client2.sna.users.insert({"username":username,"url":url,"visitas":1})

chaves: id do mongo, username

Os endereços e chaves de acesso ficam fora dos scripts publicados,
por padrão no arquivo maccess.py. Para que o programa rode no heroku,
é conveniente criar um branch com este arquivo, o qual é enviado para
o heroku.

$ git checkout -b deploy
$ git add maccess.py
$ git commit -m 'adicionado arquivo com os acessos aos bancos'
$ git push heroku HEAD:master

E manterá uma versão em sync com o repo de desenvolvimento,
já com o arquivo do BD, para mandar para a nuvem.

para atualizar, git pull master HEAD ou git pull origin HEAD.
aa ..


== TODO ==
- Fazer versões mínimas do hello.py e do ex5.js
- Possibilizar que se faça a rede de amizades completa (de todos os que twitaram)
e a rede de interações (quem responde quem). Junto aos filtros multivariáveis para o sistema.
-* Adicionar sons para a rede complexa ou as tabelas. Iniciar as sonificações e possibilidades*
de composições e disponibilização das músicas/mídia.
- Nas facilidades de uso, acrescentar decomposicao espectral e outras contas com as divs de barra.
- Fazer com áudio, dar N<controlavel> amostras para a síntese do período, decompor ela e plotar as equações, permitir modificar as variáveis e as curvas. Tocar o som.
-* Colocar documentação em latex nas páginas e baixável.*
- uso de cofeescript.
- colocar espaços para os usuários doarem seus dados (quais quiser, com dicas).
- iniciar etiquetação semântica da plataforma.
-* explicitar estrutura: servidor json, apresentador meteor e node+express, mineradores python, servidores heroku, bases de dado mongolab ou mongohq. Participabr. Especificar limites por usuário e outras +. Não esquecer do bot local p fazer backup dos dados, já que eh muito reativa e aberta para modificações e rasuras.*
- abrir espaço para criações de gambis com os dados.
- abrir espaço para produção de mídia (sons, música, imagens, animações)
- renderizar com o d3 um svg interessante para o fundo do body, talvez já liberar controle do fundo com widgets apropriadas.
- colocar logos svgzadas com d3 p brincar.
- visitar libs de álgebra linear, estatística, cálculo diferencial, geometria e álgebra (grupos, aneis, etc).
- priorizar coleta e publicização de sugestões e pedidos (com espaço no header e listagens especiais).
- manter um campo aberto no minimongo, para a pessoa inscrever o que quiser no BD (qualquer estrutura representável como variável JS/json). 
- estudar integração com carnaval, vivace, leet, meemoo e noflo.
