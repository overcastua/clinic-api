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

## Workspaces

New worktrees should be created in the <b>packages</b> directory. Currently there is one monolith service 'app'.

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Routes documentation

Go to http://localhost:8080/documentation/

## Migrations

TypeORM runs migrations automatically. To change this, in docker-compose.yml you can set the RUN_MIGRATIONS environment variable to 'false'.
To run migrations manualy, start docker-compose and run:

```bash
docker exec -it main yarn migration
```

To revert the last migration use:

```bash
docker exec -it main yarn migration:revert
```

## Relations

![relations](/images/relations.png?raw=true)

[Original diagram](https://dbdiagram.io/d/61671337940c4c4eec93f8b0)
