# Как подключить phpMyAdmin

Если вы используете phpMyAdmin для работы с базой данных, вы можете подключить его через Docker Compose. 

## Шаг 1: Создание конфигурационного файла

В папке проекта создайте `docker-compose.yml` со следующим содержимым:

```yml
version: '3'
services:
  web:
    image: "akopkesheshyan/bitrix24:latest"
    ports:
      - "80:80"
      - "443:443"
    cap_add:
      - SYS_ADMIN 
    security_opt:
      - seccomp:unconfined
    privileged: true
    volumes:
      - ./:/home/bitrix/www/local
    depends_on:
      - mysql
  mysql:
    image: mariadb
    healthcheck:
      test: "/usr/bin/mysql --user=root --password=+Tr+()8]!szl[HQIsoT5 --execute \"SHOW DATABASES;\""
      interval: 2s
      timeout: 20s
      retries: 10
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: +Tr+()8]!szl[HQIsoT5
      MYSQL_DATABASE: sitemanager
      MYSQL_USER: bitrix
      MYSQL_PASSWORD: +Tr+()8]!szl[HQIsoT5
    command: ['--character-set-server=utf8', '--collation-server=utf8_unicode_ci', '--skip-character-set-client-handshake', '--sql-mode=']
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    links:
      - mysql:mysql
    ports:
      - 8181:80
    environment:
      PMA_HOST: mysql
      MYSQL_USERNAME: bitrix
      MYSQL_PASSWORD: +Tr+()8]!szl[HQIsoT5
```

## Шаг 2: Запуск Bitrix24 Docker

В консоли выполните команду:

```shell
docker-compose up -d
```

На экране повится сообщение об успешном запуске контейнеров.

```shell
$ docker-compose up -d
Starting myproject_mysql_1 ... done
Starting myproject_tools_1 ... done
Starting myproject_web_1   ... done
Starting myproject_phpmyadmin_1 ... done
```

## Шаг 3: Подключение к phpMyAdmin

Откройте браузер и перейдите по адресу http://localhost:8181, вы увидите стандартное окно авторизации `phpMyAdmin`. 

Используйте параметры входа из конфигурационного файл:

- `Username`: bitrix
- `Password`: +Tr+()8]!szl[HQIsoT5

## Дополнительная информация

- [Официальная сборка phpMyAdmin](https://hub.docker.com/r/phpmyadmin/phpmyadmin/)