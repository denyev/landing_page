# landing_page

Для работы с лендингом должны быть установлены [NodeJS](https://nodejs.org) и [Bower](https://bower.io), также необходимо выполнить следующие действия:

* Склонировать репозиторий
```
git clone git@github.com:denyev/landing_page.git
```

* Зайти в папку сайта
```
cd landing_page
```

* Установить [gulp](http://gulpjs.com/) и пакеты, необходимые для его работы
```
npm install gulp gulp-sass browser-sync gulp-clean-css gulp-rename gulp-uglify
```

* Установить библиотеки, используемые в работе лендинга
```
bower install bootstrap font-awesome magnific-popup scrollreveal animate.css wowjs
```

* Запустить команду gulp.

После этого в директории сайта будет создана папка vendor, содержащая файлы библиотек. Стили будут скомпилированы из Sass в CSS. 

Во время разработки на локальном сервере можно использовать команду `gulp dev`. Данная команда, в случае сохранения какого-либо из текстовых файлов,
будет компилировать Sass в CSS код, минифицировать скрипты, копировать файлы библиотек в нужные папки и обновлять страницу браузера.
