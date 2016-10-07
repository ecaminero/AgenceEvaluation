#!/bin/sh
# shell Script to migrate database and run node application
export db_user='develop' # Mysql User
export db_password='pass' # Mysql Password
export db_db='agence' # Mysql Database
export db_host='127.0.0.1' # Mysql Host

echo "Create and Migrate Database"
mysql -h localhost -u $db_user -p$db_password agence < ./backupsql/dates.sql

echo "Install Node Components"
npm install

echo "Install Node Components"
bower install

echo "Run app"
gulp start

echo "I'm Done"

