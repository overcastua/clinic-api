<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## About the project

The project was developed as a part of the ITRex Group internship during October - December 2021.

The service consists of three independent microservices and a common library. Microservices communicate with each other via gRPC protocol.Project's monorepo structure was set up using yarn workspaces.

## Technologies & tools

TypeScript, Nest.js, Docker, PostgreSQL, gRPC, Jest, JWT, eslint, AWS S3, CloudWatch, Parameter Store.

## Docker

Create local.env file in the root directory with AWS credentials: AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_DEFAULT_REGION.
The user has to have access to S3: put, CloudWatch Logs and Parameter Store.

```bash
# start
$ docker-compose --profile full up -d

# stop
$ docker-compose down -v
```

## Routes documentation

Go to http://localhost:{service_port}/documentation

## Migrations

TypeORM runs migrations automatically

## Relations

![relations](/images/relations.png?raw=true)
