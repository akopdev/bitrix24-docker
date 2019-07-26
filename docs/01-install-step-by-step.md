# Пошаговая инструкция по установке портала Битрикс24

Инструкция описывает процесс запуска Bitrix24 Docker образа на локальной машине.

## Шаг 1: Проверка на наличие установленных программ

Убедитесь в том, что у вас локально установлен и запущен Docker. Для пользователей Linux дополнительно [потребуется установка Docker Compose](https://docs.docker.com/compose/install/). 

```shell
$ docker --version
Docker version 18.09.2, build 6247962

$ docker-compose --version
docker-compose version 1.23.2, build 1110ad01
```

Если у вас не установлен Docker, воспользуйтесь официальным руководством.

- [Windows](https://docs.docker.com/docker-for-windows/install/)
- [Linux (Ubuntu, CentOS, Debian)](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [Mac](https://docs.docker.com/docker-for-mac/install/)

> Для пользователей Windows 10, перед установкой, следует обратить внимание на версию своей операционной системы. 
> 
> Так, если у вас установлен `Windows 10 Pro` вам подойдет обычная версия Docker CE, если у вас `Windows 10 Home`, то потребуется дополнительная установка `Docker Toolbox`.
> 
> Следуйте инструкциям официального руководства.

## Шаг 2: Инициализация проекта

Создайте новую папку, в которой будет размещаться наш проект, и перейдите в нее.

В консоли это будет выглядеть вот так:

```shell
mkdir myproject
cd myproject
```

## Шаг 3: Создание конфигурационного файла

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
```

## Шаг 4: Запуск Bitrix24 Docker

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
```

В случае возникновения ошибок, убедитесь что вы находитесь в директории проекта (см. шаг 2) и у вас установлен Docker Compose.

## Шаг 4: Установка портала

Откройте браузер и перейдите по адресу http://localhost, вы увидите стандартный инсталлятор  Битрикс. В результате его работы, вы получите полностью рабочий портал.

Все файлы, размещенные в директории проекта будут доступны в папке `/local`. Если вы еще не используете эту директорию для разработки собственных решений, настоятельно рекомендуется ознакомиться с официальным курсом ["Разработчик Bitrix Framework"](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=43&LESSON_ID=2705&LESSON_PATH=3913.4776.2483.2705)