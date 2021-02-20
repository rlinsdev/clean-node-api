# API em NodeJS com Clean Architecture e TDD
 
Rodrigo Manguinho

## Packages
```
npm install standard -D -> Visualização de erros ao desenvolver no ambiente de desenvolvimento (JS)
npm i lint-staged -D -> Validar arquivos JSs que ainda não foram commitados. Checar se está tudo OK
npm i husky -D -> Disparará hooks em alguma determinada ação
npm i jest -g -> Instalar globalmente
npm i jest -D -> Ferramenta de testes - Apenas em dev enviroment
    Jest --init -> Configuração do Jest -> Cobertura de testes
npm i ts-jest -g
npm install -D typescript
npm install -D ts-node
npm test -w -> Watch the test
npm i validator
npx husky add .husky/pre-commit "lint-staged"
npx husky add .husky/pre-push "npm run test:ci"
npm i jsonwebtoken
```

After tsc --init, just let run tsc -w in one window command 

### Observações

Vídeo: https://www.youtube.com/watch?v=sKcer-tzYtk
Minuto 3": O que está errado no código naquele exato momento

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

To add a YouTube video:
http://embedyoutube.org/