# openweather_comeia
Intereface VUE para teste técnico Comeia 🐝

## Tecnologias utilizadas
<ul>
  <li>
    <a href="https://v2.vuetifyjs.com/en/">Vuetify</a>
  </li>
  <li>
    <a href="https://v2.vuejs.org/">VueJs 2</a>
  </li>
  <li>
    <a href="https://axios-http.com/ptbr/docs/intro">Axios</a>
  </li>
    <li>
    <a href="https://github.com/jestjs/jest">Jest</a>
  </li>
</ul>

## Instalação

Primeiro certifique-se de ter instalado a [ultima versão do Node.js](https://nodejs.org/en/download).\
Depois, instale as dependencias rodando o seguinte comando em um terminal dentro da raiz do projeto:

```
  npm install
```

## Desenvolvimento
#### configurar o .env
Para utilizar o projeto é necessário configurar o .env, do contrário não será possível carregar a API;\
Crie um arquivo .env na raíz do projeto e siga as variáveis no arquivo .env.example com as suas configurações;\
Você pode obter uma chave de api no site da <a href="https://home.openweathermap.org/api_keys">openweathermap. <a/>


#### Iniciar o servidor de desenvolvimento
Após configurado o .env, basta rodar o seguinte comando em um terminal dentro da raiz do projeto e abrir o navegador no endereço retornado (padrão localhost:8080)
```bash
  npm run serve
```

#### Build de produção | gerar pasta /dist

```bash
  npm run serve
```

#### Rodar os testes (Jest)

```bash
  npm run test
```
 Alternativamente pode ser utilizado o nome de um dos arquvios na pasta /tests/unit, por exemplo
```bash
  npm run test AutocompleteCidade.spec.js
```

Verifique a [documentação oficial](https://nuxt.com/docs/getting-started/deployment) sobre a build de produção.
