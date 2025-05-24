  ##########
 # DOCKER #
##########

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

.PHONY: rebuild
rebuild:
	docker compose down && docker compose up -d --build


  ############
 # DATABASE #
############

.PHONY: migrate
migrate:
	docker compose exec app node dist/src/data/migrate.js
