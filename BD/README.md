### How to set up the environment?

- Before starting, install Compose. Instructions here => https://docs.docker.com/compose/install/
- Change to the root of the project directory
- Run ```docker-compose up```. The container should be now up and running.
- Open a new terminal and run ```docker exec -it SplitItDB bash``` to access the container console
- Once inside run the database initialization script: ```python3 src/scripts/init.py```
- To connect to DB run: ' psql -U postgres postgres '
### Database credentials:

- host: localhost or SplitItBD
- port: 5432
- user: postgres
- database: postgres
- passqord: FDP


### How to install more python libraries?


- Add the library in requeriments.txt. It has to be a library available on https://pypi.org 
- Stop docker-compose, in case it is running, with either Ctrl+D from the terminal where it's running or by running ```docker compose stop``` with a new console from the root of the project directory
- From the root of the project directory run ```docker-compose build```
- Start the container with ```docker-compose up```
- Open a new terminal and run ```docker exec -it sp_postgres bash``` to access the container console

