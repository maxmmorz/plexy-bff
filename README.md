<div align="center">
    <img alt="nestjs-starter" width="250" height="auto" src="https://raw.githubusercontent.com/rudemex/nestjs-starter/master/.readme-static/logo-nestjs.svg" />
    <h1>NestJS Starter</h1>
</div>

<p align="center">
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=NodeJS&message=v20.19.3&labelColor=339933&color=757575&logoColor=FFFFFF&logo=Node.js" alt="Node.js"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=NPM&message=v11.5.2&labelColor=CB3837&logoColor=FFFFFF&color=757575&logo=npm" alt="Npm"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=NestJS&message=v11.1.6&labelColor=E0234E&logoColor=FFFFFF&color=757575&logo=Nestjs" alt="NestJs"/>
    <a href="https://github.com/rudemex/nestjs-starter/releases/latest">
        <img alt="Last Release" src="https://img.shields.io/github/v/tag/rudemex/nestjs-starter?label=release">
    </a>
    <a href="./license.md">
        <img alt="GitHub license" src="https://img.shields.io/github/license/rudemex/nestjs-starter?style=flat">
    </a>
    <br>
    <a href="https://github.com/rudemex/nestjs-starter/actions/workflows/master.yml" target="_blank">
        <img alt="GitHub Workflow Status" src="https://github.com/rudemex/nestjs-starter/actions/workflows/master.yml/badge.svg?branch=master">
    </a>
    <a href="https://app.codecov.io/gh/rudemex/nestjs-starter/" target="_blank">
        <img alt="Codecov" src="https://img.shields.io/codecov/c/github/rudemex/nestjs-starter?logoColor=FFFFFF&logo=Codecov&labelColor=#F01F7A">
    </a>
    <a href="https://sonarcloud.io/summary/new_code?id=rudemex_nestjs-starter" target="_blank">    
        <img src="https://sonarcloud.io/api/project_badges/measure?project=rudemex_nestjs-starter&metric=alert_status" alt="sonarcloud">
    </a>    
    <a href="https://snyk.io/test/github/rudemex/nestjs-starter" target="_blank">
        <img src="https://snyk.io/test/github/rudemex/nestjs-starter/badge.svg" alt="Snyk">
    </a>
    <br/> 
</p>

<p>NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It is built with and fully compatible with TypeScript and JavaScript, combining elements of object-oriented programming, functional programming, and reactive functional programming.</p>
<br>
<div>
    <a href="https://railway.app/template/BOGqHd?referralCode=mexdelgado" target="_blank">
        <img src="https://railway.app/button.svg" alt="Deploy to Railway"/>
    </a>
    <a href="https://www.buymeacoffee.com/rudemex" target="_blank">
        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;" >
    </a>
</div>

## Table of Contents

- [🥳 Demo](https://nestjs-starter.tresdoce.com.ar/v1)
- [🤓 Objective](#objective)
- [📝 Basic Requirements](#basic-requirements)
- [🛠️ Install Dependencies](#install-dependencies)
- [⚙️ Configuration](#configurations)
- [💻 Scripts](#scripts)
- [📚 Swagger](#swagger-info)
- [🐳 Docker](#docker)
- [🧰 Toolkit](https://github.com/tresdoce/tresdoce-nestjs-toolkit)
- [📤 Commits](#commits)
- [🏷️ Versioning](#versioning)
- [📄 Changelog](./CHANGELOG.md)
- [📜 License MIT](license.md)

---

<a name="objective"></a>

## 🤓 Objective

### Extensibility

Thanks to its modular architecture, it is flexible and allows us to use other existing libraries in our project.

### Architecture

It has a project architecture that provides testability, scalability, and maintainability without much effort.

### Versatility

Provides an adaptable ecosystem, which is developed to create all types of server-side applications.

### Progressiveness

Makes use of the latest JavaScript features and implements mature solutions and design patterns in software development.

### Transactionality

Service orchestration. The BFF is responsible for orchestrating calls to different services and managing them transactionally in a transparent way for the client.

### Performance

Reduces data transmission. The BFF APIs are designed based on screen requirements and only expose the data they require. User session/cache. Can handle session caching for frontend experience.

### Security

Reduces exposure of sensitive data. The BFF contains APIs that filter this data and only expose necessary data. Token management. The BFF is responsible for storage and manages access-token renewal.

<a name="basic-requirements"></a>

## 📝 Basic Requirements

- Node.js v20.19.3 or higher ([Download](https://nodejs.org/en/download/))
- YARN ≥ 1.22.22 or NPM ≥ 11.5.2
- NestJS v11.1.6 or higher ([Documentation](https://nestjs.com/))

<a name="install-dependencies"></a>

## 🛠️ Install Dependencies

Once we have the basic requirements, we clone the repository, go to the project folder and install its dependencies.

```
yarn install
```

```
npm install
```

<a name="configurations"></a>

## ⚙️ Configuration

This starter comes with the **.env.example** and **.env.test** files, which contain the basic configurations for the application to work.

For the local development environment, it is necessary to have a **.env** file which can be generated using the example file.

```sh
# SERVER
APP_STAGE=local
PORT=8080
API_PREFIX=TD_MY_API
CONTEXT=v1
ORIGINS=http://localhost:3000,http://localhost:8080
ALLOWED_HEADERS=Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma
ALLOWED_METHODS=GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS
PROPAGATE_HEADERS=x-custom-header
CORS_ENABLED=true
CORS_CREDENTIALS=false

# SWAGGER ENVIRONMENTS
SWAGGER_PATH=docs
SWAGGER_ENABLED=true

# PARAMS
TEST_KEY="testKeyEnv-dev"

# SERVICES
RICK_AND_MORTY_API_URL=https://rickandmortyapi.com/api
```

<details>
<summary>💬 To see all configuration properties in detail, click here.</summary>

#### Server

`APP_STAGE`: The environment in which the application is running.

- Type: `String`
- Default: `local`
- Values: `local | test | snd | dev | qa | homo | prod`

`PORT`: The port on which the server will run.

- Type: `Number`
- Default: `8080`

`API_PREFIX`: The prefix that references the API and feeds other modules, such as the filter exceptions.

- Type: `String`
- Default: `TD_MY_API`

`CONTEXT`: The context through which the server API can be accessed, so endpoints are not exposed on the main application route. Written without the `/` (slash).

- Type: `String`
- Default: `v1`

`ORIGINS`: A whitelist so the application can only be consumed by trusted URLs and avoid any unwanted and malicious requests. You must write the URLs separated by commas.

- Type: `String`
- Default: `http://localhost:3000,http://localhost:8080`

`ALLOWED_HEADERS`: Parameters that will be received in the header of requests.

- Type: `String`
- Default: `Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma`

`ALLOWED_METHODS`: HTTP methods available for CORS.

- Type: `String`
- Default: `GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS`

`PROPAGATE_HEADERS`: List of headers you want to propagate in the controller response.

- Type: `String`
- Example: `x-custom-header,x-custom-header-2,x-custom-header-n`

`CORS_ENABLED`: Enables or disables the use of CORS on the server.

- Type: `Boolean`
- Default: `false`

`CORS_CREDENTIALS`: Enables or disables the use of credentials in CORS requests on the server.

- Type: `Boolean`
- Default: `false`

#### Swagger

`SWAGGER_PATH`: Defines the **Swagger** documentation path, written without the `/` (slash).

- Type: `String`
- Default: `docs`

`SWAGGER_ENABLED`: Enable or disable **Swagger** documentation for server endpoints.

- Type: `Boolean`
- Default: `true`

#### Params, Services and Other Environments

As an example, you can load all the environment variables you need, it's important to follow the `key:value` schema to configure them.

```
# PARAMS
TEST_KEY="testKeyEnv-dev"

# SERVICES
RICK_AND_MORTY_API_URL=https://rickandmortyapi.com/api
```

</details>

This project uses the `@nestjs/config` module, which centralizes all environment variables in one place and allows you to consume them as **typing** to avoid typo errors, as well as avoid using **process.env** throughout the project, which allows easier support if you need to change the **KEY** of the environment variable.

It also has an environment variable validator, which allows us to validate the data type, whether or not the variable is required, and many more validations.

All these features can be found in the **./src/config** folder, where we can find the **environments.ts** file which is an env files handler depending on the **NODE_ENV** our application has.

<a name="scripts"></a>

## 💻 Scripts

Start the application in development mode

```
yarn start:dev
```

```
npm run start:dev
```

Start tests with coverage

```
yarn test
```

```
npm run test
```

Build the application

```
yarn build
```

```
npm run build
```

Start the application in production mode

```
yarn start
```

```
npm run start
```

#### Other Scripts

Format the code

```
yarn format
```

```
npm run format
```

Lint the code

```
yarn lint
```

```
npm run lint
```

<a name="swagger-info"></a>

## 📚 Swagger

The project has **Swagger** (OpenAPI 3.0.0) that documents the endpoints with their definitions. [Demo Swagger](https://nestjs-starter.tresdoce.com.ar/v1/docs/)

To expand the documentation, it is important to apply the corresponding decorators to the application. [NestJS OpenApi](https://docs.nestjs.com/openapi/introduction)

This documentation can be activated or deactivated from the configuration through the project's environment variables.

```sh
SWAGGER_PATH=docs
SWAGGER_ENABLED=true
```

#### URL

Access to documentation and endpoint testing: `http://localhost:8080/v1/docs`

#### Scheme

```
<http|https>://<server_url><:port>/<app-context>/<swagger-path>
```

#### Export Swagger to JSON

You can export the documentation to **JSON** by adding the **-json** suffix to the defined path. [Demo Swagger JSON](https://nestjs-starter.tresdoce.com.ar/v1/docs-json)

- Default: `http://localhost:8080/v1/docs-json`
- Schema: `<http|https>://<server_url><:port>/<app-context>/<swagger-path>-json`

<a name="docker"></a>

## 🐳 Docker

The project has a base `dockerfile` and `docker-compose.yml`, ready to use and expand its capabilities.

### Docker Build

Schema: `docker build -t <user-docker>/<app-name> .`

Schema: `docker run -d -p 8080:8080 --name <container-name> --env-file <.env> <user-docker>/<app-name>`

### Ejemplo

```
docker build -t nestjs-starter .
```

```
docker run -d -p 8080:8080 --name nestjs-starter-app --env-file .env nestjs-starter
```

<a name="commits"></a>

## 📤 Commits

For commit messages, [`conventional commits`](https://www.conventionalcommits.org/en/v1.0.0/#summary) is used as reference.

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

- **type:** chore, docs, feat, fix, refactor (most common)
- **scope:** indicates the page, component, functionality
- **description:** starts in lowercase and should not exceed 72 characters.

### Ejemplo

```
git commit -m "docs(readme): add documentantion to readme"
```

### Breaking change

```
git commit -am 'feat!: changes in application'
```

<a name="versioning"></a>

## 🏷️ Versioning

This starter has the ability to auto-version itself through the GitHub Actions workflow (`./.github/workflows/release.yml`), as it uses the [standard-version](https://github.com/conventional-changelog/standard-version) dependency and the repository's `conventional commits`. Currently, it is configured to increment the version in a custom file and not in package.json.

To perform correct versioning in your project, follow these steps.

- Make sure the `package.json` version is at an initial value (`1.0.0`), and the application data is adjusted.
- Run the following script to delete any possible local or remote tags:

```sh
git tag -d $(git tag -l)
git fetch
git push origin --delete $(git tag -l)
git tag -d $(git tag -l)

git fetch
git tag -l | xargs -n 1 git push --delete origin
```

- Delete the `CHANGELOG.md` and `version.txt` files
- Edit the [`release.yml`](./.github/workflows/release.yml) workflow so that versioning only occurs if it's an application.

## 📄 Changelog

All notable changes to this project will be documented in [Changelog](./CHANGELOG.md) file.

---

<div align="center">
    <a href="mailto:mdelgado@tresdoce.com.ar" target="_blank" alt="Send an email">
        <img src="https://raw.githubusercontent.com/rudemex/nestjs-starter/master/.readme-static/logo-mex-red.svg" width="120" alt="Mex" />
    </a><br/>
    <p>Made with ❤️</p>
</div>
