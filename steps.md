## Steps to deploy
0. create an ssh-key for communicating with EC2
1. make sure you have a configured EC2 intance
2. build the image in Github Actions
3. Publish the image
4. deploy the container

## Useful commands
```sh
# remove containers and volumes for a docker compose file
$ docker compose --profile in_docker down --volumes
# start the application with rebuild
$ docker compose --profile in_docker up -d --build
# show the running containers
$ docker compose ps
# show service logs
$ docker compose logs SERVICE_NAME #e.g: app
```