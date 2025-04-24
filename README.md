# ai-spoons

An energy management app to detect patterns in energy usage and help make daily life easier to overcome

## Building

This app runs in a docker container. To build it, execute the following docker command:

    docker build -t ai-spoons .

## Development

You must build the app first as described in Building. Then, execute this command:

    docker run -e RELEASE=--dev ai-spoons

Or simply:

    docker run ai-spoons

## Deploying

Deploying the node server is not yet supported. In the future, to deploy it, execute this command:

    docker run -e RELEASE=--prod ai-spoons