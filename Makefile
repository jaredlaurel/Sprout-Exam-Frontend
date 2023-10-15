.DEFAULT_TARGET: build

build:
	docker build -t employeemanagement/vue .

run:
	docker-compose up -d

stop:
	docker-compose stop

logs:
	docker-compose logs -f