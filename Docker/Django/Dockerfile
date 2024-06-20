FROM python:3.10.2-slim-bullseye
ENV 	PYTHONUNBUFFERED 1
EXPOSE 	8000

WORKDIR /usr/src/app

COPY	./requirements.txt ./
RUN 	pip install -r requirements.txt 

CMD python manage.py runserver 0.0.0.0:8000