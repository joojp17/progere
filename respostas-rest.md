# 2

## 1. O que é uma API RESTful?
É uma interface de comunicação entre sistemas baseada no REST. Normalmente usamos ela por urls, fazendo operações via HTTP (GET, POST, PUT, DELETE,etc.) que é verificado no sistema e realizando ações, que podem retornar dados geralmente em formato JSON.

## 2. Diferença entre Parâmetros de Rota (Route Params) e Parâmetros de Consulta (Query Params)

- **Parâmetros de Rota (Route Params):**
  Parâmetros passados na própria URL, que determina algo em específico.  
  Exemplo:  
    GET /usuarios/123

    O `123` é o ID do usuário buscado.  
    Geralmente usamos para acessar ou trabalhar com algo em específico.

- **Parâmetros de Consulta (Query Params):**
  Parâmetros passados depois do `?` na URL e servem para filtros, paginação ou qualquer outra config.  
  Exemplo:  
    GET /usuarios?idade=25&cidade=SãoPaulo

    Nesse exemplo, estou passando por parâmetro valores nas chaves `idade` e `cidade`.  
    Geralmente usamos para filtrar ou modificar a consulta.

## 3. Para que serve o HttpClient no Angular?
O `HttpClient` é usado para requisições HTTP (GET, POST, PUT, DELETE etc.) em Angular. 

O modo de utilizar é importando o HttpClient no módulo principal do app: 
import { HttpClientModule } from '@angular/common/http';

## 4. O que é um Observable no contexto do RxJS e do Angular? Por que ele é útil ao fazer requisições HTTP?

Um Observable é uma estrutura reativa que contém um ou um conjunto de valores por um tempo determinado.

Eles são úteis porque permitem fazer uma ação quando a resposta chegar, podendo emitir vários valores que uma promise não conseguiria por exemplo, e também permitem o cancelamento de requisições.