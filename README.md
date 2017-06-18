# Nyssa BE Generator

## Usage

First, install [Yeoman](http://yeoman.io) and generator-nyssa-be using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-nyssa-be
```

## Templates

### Project

To generate a new project:

```bash
yo nyssa-be
```

### Authentication

To generate authentication for the project:

```bash
yo nyssa-be:auth
```

### Connection

To generate a connection for the project:

```bash
yo nyssa-be:connection
```

NOTE: This will create a setup file for testing, it will work only for mongodb. If another database is to be used there needs to be changes so a mock DB is initialized.

### Hook

To generate a hook for the project:

```bash
yo nyssa-be:hook
```

### Middleware

To generate middleware for the project:

```bash
yo nyssa-be:middleware
```

### Service

To generate a service for the project:

```bash
yo nyssa-be:service
```
