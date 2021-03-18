POSTGRES_USER=prisma_starter
PGPASSWORD=mysecretpassword

db:
	docker run  --rm -itd \
	--name db \
	-e POSTGRES_PASSWORD=$(PGPASSWORD) \
	-e POSTGRES_USER=$(POSTGRES_USER) \
	-p 5432:5432 \
	postgres
	npx prisma migrate dev --name init --preview-feature

db_stop:
	docker stop db

connect_db:
	PGPASSWORD=$(PGPASSWORD) psql -h localhost -p 5432 -U $(POSTGRES_USER)
