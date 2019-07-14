# 1С-Битрикс: Веб-окружение Корпоративный Портал

Образ 1С-Битрикс Веб Окружения для разработки и тестирования, с предустановленным корпоративным порталом. 

**Внимание**, это не официальная сборка и предназначена исключительно для локальной разработки. Не используйте данный образ для проектов production среде.

## Быстрый старт

Данный контейнер собран на базе CentOS 7 и содержит следующие программные продукты:

- nginx 1.6 
- apache2
- php 7.2
- crontab
- Bitrix24

База данных не входит в установку образа, и должна быть подключена отдельно. 


### Пример настройки Docker Compose

```yml
version: '3'
services:
  web:
    image: "akopkesheshyan/bitrix24:latest"
    ports:
      - "80:80"
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
```

#### Переменные окружения

Сам образ не использует параметры окружения, но в конфигурационных файлах портала, указаны следующие параметры подключения:

* `MYSQL_ROOT_PASSWORD` - +Tr+()8]!szl[HQIsoT5
* `MYSQL_DATABASE` - sitemanager
* `MYSQL_USER` - bitrix

Если вы хотите использовать другие параметры подключения к базе, вам следует отредактировать конфигурационные файлы .settings.php и dbconn.php

#### Тома (Volumes)

* `/home/bitrix/www/local` - Директория, в которой должен находиться весь разрабатываемый код.