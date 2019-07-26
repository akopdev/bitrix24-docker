![Bitrix24 Docker](/docs/assets/bitrix24-docker-logo.png)

# Bitrix24 Docker: Веб-окружение 1С-Битрикс24 Корпоративный Портал

Позволяет быстро и легко запускать Битрикс24 на Docker для локальной разработки и автоматизации процесса тестирования.

## Введение

Bitrix24 Docker предоставляет готовую виртуальную среду, оптимизированную для разработки и тестирования портальных решений Битрикс24. 

### Используйте Bitrix24 Docker если вам необходимо:

- Быстро развернуть веб окружение для разработки компонентов и приложений для Битрикс24
- Избавиться от множества клонов виртуальных машин под каждый проект
- Запустить чистую копию портала без сложных технических заморочек
- Автоматизировать запуск тестов в облаке (Continuous Integration)

## Преимущества данной сборки

- Наличие специфических для Битрикс24 служб, отсутствующих в других сборках (Push & Pull сервер)
- Полная совместимость с bitrix-env, прохождение всех встроенных тестов портала
- База данных не входит в основной образ и подключается через Docker Compose
- Возможность расширять и подключать дополнительные сервисы (phpMyAdmin, Codeception и т.д.)
- Использование переменных окружения (для запуска одного контейнера с разными параметрами)

## Начало работы

Для работы с Bitrix24 Docker рекомендуется использовать Docker Compose. 

Ниже приведен конфигурационный файл `docker-compose.yml` с подключенной MariaDB, где директория запуска будет примонтирована к папке /local внутри контейнера. 

Вы можете поменять версию базы или подключить несколько разных баз данных одновременно, дополнив этот файл соответствующими инструкциями.

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
```

Bitrix24 Docker включает в себя первичные файлы установки, поэтому после старта контейнеров, вы сразу увидите страницу установки свежей копии портала по адресу http://localhost. 

Если вы подключаете Bitrix24 Docker к уже существующему проекту, поменяйте значение `volumes` секции `web` на `./:/home/bitrix/www`. 

### Другие сценарии запуска

- [Пошаговая инструкция по установке портала](/docs/01-install-step-by-step.md)
- [Как подключить phpMyAdmin](/docs/02-phpmyadmin-setup.md)
- Запуск Codeception тестов

## Примечание

Это неофициальная сборка и предназначена исключительно для локальной разработки. Не используйте данный образ в production среде.