# api_portal
A backend to manage API proxies 

## Prerequisite:
Docker and docker-compose

To test the application, Clone it, and run

`docker-compose up --build
`

It builds the app into a docker image and deploy them using `docker-compose` along with two other community images ( postgres, redis )
Once the docker-compose stack is up, the swagger ui can be accessed at 

[http://localhost:9001/api-docs](http://localhost:9001/api-docs)

Feel free to try out !! 

- Get all subdomains : will return empty list
- Create a subdomain : will get created, object wil be returned in response
- Use the getSubdomain by Id Api : you will get the subdomain details returned
  - If you call this with 30 seconds of creation, it will be returned from cache ( redis )
  - After 30 seconds it will fetch from DB ( check logs to confirm this )
- Create gateway for non existent subdomain_id : It will throw error
- Create gateway for existing subdomain_id : It will get created
- List all Gateways for a subdomain
- Get one perticular gateway using gateway_id

## Application Structure
- Express js based http server
- Postgres DB as database
- Redis as a cache layer

## Features of the app
- External config management using env variables take a look at `config.js`
- Dynamic routing using express router, To add a new router, just drop a new file under `routes/api` . Application will automatically pick up
- [Sequelize](https://sequelize.org/) has been used as ORM. Again dynamic loading of DB models. Just add a new file under `database/models`, it will be loaded
- RBAC to be used as middleware ( Method stubs give )
- Swagger UI documentation of the backend APIs


