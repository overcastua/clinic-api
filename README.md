<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Docker

```bash
# start
$ docker-compose up -d

# stop
$ docker-compose down
```

## Test

```bash
# unit tests
$ yarn test
```

## Routes documentation

Go to http://localhost:{service_port}/documentation

Ports can be configured in the <b>.env</b> file of the root directory.

## Migrations

TypeORM runs migrations automatically. To change this, in config.env you can set the RUN_MIGRATIONS variable to 'false'.
To run migrations manually, start docker-compose and run:

```bash
docker exec -it {container-name} yarn migration
```

To revert the last migration use:

```bash
docker exec -it {container-name} yarn migration:revert
```

## Relations

![relations](/images/relations.png?raw=true)

[Original diagram](https://dbdiagram.io/d/61671337940c4c4eec93f8b0)
