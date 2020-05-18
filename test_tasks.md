# Тестовое задание для соискателей вакансии Frontend-разработчик 

_(проект Doczilla, компания Лекс Борелис КС, Москва)_

Перед выполнением задания:

1. Склонируйте репозиторий фреймворка __Z8__ (https://github.com/zenframework/z8) и примера приложения на __Z8__ - __Z8 Template__ (https://github.com/zenframework/z8-template).
2. С помощью документации соберите и запустите проект __Z8 Template__.
   - https://github.com/zenframework/z8/wiki
   - https://github.com/zenframework/z8/wiki/2.-Импорт-Z8-Template
3. Разберитесь, каким образом осуществляется расширение стандартных JavaScript-компонентов, см. в проекте __Z8 Template__
   - [org/zenframework/z8/template/view/Documents.bl](org/zenframework/z8/template/view/Documents.bl)
   - [src/main/js/ui/control/EMail.js](src/main/js/ui/control/EMail.js)
4. Изучите исходные коды JavaScript-части фреймворка (подпроект `org.zenframework.z8.js`), разоберитесь, как устроены стандартные JavaScript-компоненты Z8.

## Задание №1

В языке BL, помимо `StringField` (см. `org/zenframework/z8/template/view/Document.bl`) с ограничением длины значения, предусмотрено поле `TextField` для хранения текста неограниченной длины.

В классе [Document.bl](org/zenframework/z8/template/model/Document.bl) добавить поле `xml` типа `TextField` для хранения XML-текста документа, добавить поле `xml` в массив `controls` в классе [Documents.bl](org/zenframework/z8/template/view/Documents.bl).

Реализовать JavaScript-расширение стандартного компонента `Z8.form.field.TextArea` (`js/form/field/TextArea.js`) таким образом, чтобы он подсвечивал синтаксис XML-текста документа в поле `xml`.

(В [Documents.bl](org/zenframework/z8/template/view/Documents.bl) использовать атрибут `[ui]`, аналогично тому, как это сделано для поля `email`.)

Допускается использование JavaScript-библиотек с открытым исходным кодом, реализующих подсветку синтаксиса, например, `highlight.js`, или аналогов.

## Задание №2

В классе [Document.bl](org/zenframework/z8/template/model/Document.bl) добавить поле `youtube` типа `StringField` для хранения URL-ссылки на видеоролик YouTube, добавить поле `youtube` в массив `controls` в классе [Documents.bl](org/zenframework/z8/template/view/Documents.bl).

Реализовать JavaScript-расширение стандартного компонента `Z8.form.field.Text` (`js/form/field/Text.js`) таким образом, чтобы он встраивал в форму проигрыватель YouTube, демонстрирующий ролик, доступный по ссылке в поле `youtube`.

(В [Documents.bl](org/zenframework/z8/template/view/Documents.bl) использовать атрибут `[ui]`, аналогично тому, как это сделано для поля `email`.)

## Задание №3(*)

В классе [Document.bl](org/zenframework/z8/template/model/Document.bl) есть поле `doc` типа `FileField`, хранящее ссылку на файл. Предполагая, что в это поле загружается аудиофайл (любой формат по выбору соискателя), реализовать JavaScript-расширение стандартного компонента `Z8.form.field.Text` (`js/form/field/Text.js`) таким образом, чтобы он встраивал в форму проигрыватель аудиофайлов, ссылки на которые хранятся в поле `doc`.

(В [Documents.bl](org/zenframework/z8/template/view/Documents.bl) использовать атрибут `[ui]`, аналогично тому, как это сделано для поля `email`.)

---

Срок выполнения - 4 дня.
