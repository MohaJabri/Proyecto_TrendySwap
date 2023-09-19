include .env
up:
	docker compose up
init:
	docker compose up --build -d
	
	docker exec -it ${PROJECT_NAME}_server python manage.py makemigrations
	docker exec -it ${PROJECT_NAME}_server python manage.py migrate
	
	