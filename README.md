
## Description

Microservicio de Backend for Frontend (BFF), es decir, backend o servicio para dar soporte a la ejecución de la aplicación, permitiendo agregar una capa de abstracción que permite manipular el Frontend bajo diferentes requerimientos por plataformas.
Este microservicio esta construido mediante el uso de NestJS.
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Ambiente

* APP_PORT: puerto por defecto.
* PROXY_TIMEOUT: proxy timeout para consultas rest.
* PROXY_MAX_REDIRECTS: proxy redirects para consultas rest.
* CACHE_TTL_SECONDS_DEFAULT: tiempo en segundos por defecto para la capa de cache.
* CACHE_MAX_ITEMS: numero de items/keys guardados por cache.

* REGION_ID: region de busqueda, en este caso, se filtra solo por la metropolitana
* URL_ENDPOINT_PROXY_OBTENER_COMUNAS_DE_REGION: url que permite obtener las comunas de la region solicitada
* URL_ENDPOINT_PROXY_OBTENER_FARMACIAS_TURNO_POR_REGION: url que permite obtneer las farmacias de turno


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
