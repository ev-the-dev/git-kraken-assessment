  ##########
 # DOCKER #
##########

.PHONY: up
up:
	docker compose up --detach

.PHONY: down
down:
	docker compose down

.PHONY: logs_app
logs_app:
	docker compose logs --follow --since=10m app

.PHONY: logs_db
logs_db:
	docker compose logs --follow --since=10m db

.PHONY: rebuild
rebuild:
	docker compose down && docker compose up --detach --build


  ############
 # DATABASE #
############

.PHONY: migrate
migrate:
	docker compose exec app node dist/src/data/migrate.js

.PHONY: seed
seed:
	docker compose exec app node dist/src/data/seed.js
