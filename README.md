> This page contains a short summary of the project itself, aimed mostly for developers. See [Wiki page of the project](docs/README.md) for more extensive resources, [DEVELOPMENT.md](scripts/taito/DEVELOPMENT.md) for common development conventions, and [CONFIGURATION.md](scripts/taito/CONFIGURATION.md) for common configuration conventions.

# BogeyBuddies

A web app for keeping score of friendly season-long golf competitions. Built on top of the [full-stack-template](https://github.com/TaitoUnited/full-stack-template) by Taito United.

Table of contents:

- [Live Deployments](#live-deployments)
- [Usage](#usage)
- [Conventions](#conventions)
- [Architecture Overview](#architecture-overview)

## Live Deployments

* Dev:
* Production: 

## Usage

To set up and run the project locally, you should first configure Taito CLI following these [instructions](https://taitounited.github.io/taito-cli/docs/02-installation/).

After that, with Docker running in the background, run:
```shell
taito develop
```
```shell
taito start
```
And open services with
```shell
taito open:client
```
```shell
taito open:server
```

For a full listing of all Taito CLI commands see:
```shell
taito -h
```

## Conventions

I am using [Taito version control conventions](https://taitounited.github.io/taito-cli/tutorial/03-version-control) for commit messages.

## Architecture Overview

<!---
DIAGRAM: You can use [Gravizo](https://www.gravizo.com) for making a architecture diagram if the diagram does not contain any confidential information. Note that architecture diagram is not mandatory if the architecture is very simple.
--->
