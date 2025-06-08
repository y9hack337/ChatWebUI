<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="https://i.imgur.com/dYuod5A.png" width="30%" style="position: relative; top: 0; right: 0;" alt="Логотип проекта"/>

# CHATWEBUI

<em>Расширение возможностей диалогов с помощью взаимодействия с ИИ</em>

<div align="center">
<p>Выберите ваш язык:</p>
<a href="README.md">
    <img src="https://img.shields.io/badge/Language-English-blue?style=for-the-badge&logo=us&logoColor=white" alt="English">
</a>
<a href="README.ru.md">
    <img src="https://img.shields.io/badge/Язык-Русский-red?style=for-the-badge&logo=ru&logoColor=white" alt="Русский">
</a>
</div>
<br>

<!-- BADGES -->
<!-- local repository, no metadata badges. -->

<em>Создано с использованием инструментов и технологий:</em>

<img src="https://img.shields.io/badge/npm-CB3837.svg?style=default&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Org-77AA99.svg?style=default&logo=Org&logoColor=white" alt="Org">
<img src="https://img.shields.io/badge/Gradle-02303A.svg?style=default&logo=Gradle&logoColor=white" alt="Gradle">
<img src="https://img.shields.io/badge/jQuery-0769AD.svg?style=default&logo=jQuery&logoColor=white" alt="jQuery">
<img src="https://img.shields.io/badge/bat-31369E.svg?style=default&logo=bat&logoColor=white" alt="bat">
<img src="https://img.shields.io/badge/Java-ED8B00.svg?style=default&logo=Java&logoColor=white" alt="Java">
<img src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style=default&logo=Bootstrap&logoColor=white" alt="Bootstrap">

</div>
<br>

---

## Оглавление

- [Оглавление](#оглавление)
- [Обзор](#обзор)
- [Структура проекта](#структура-проекта)
    - [Индекс проекта](#индекс-проекта)
- [Начало работы](#начало-работы)
    - [Предварительные требования](#предварительные-требования)
    - [Установка](#установка)
    - [Использование](#использование)
    - [Тестирование](#тестирование)
- [План развития](#план-развития)
- [Вклад](#вклад)
- [Лицензия](#лицензия)
- [Благодарности](#благодарности)

---

## Обзор

ChatWebUI – это удобный чат с надежным хранением данных, безопасной аутентификацией и встроенной поддержкой ChatGPT.

---

## Структура проекта

```sh
└── ChatWebUI/
    ├── build.gradle.kts
    ├── gptchatdb.mv.db
    ├── gradle
    │   └── wrapper
    ├── gradlew
    ├── gradlew.bat
    ├── settings.gradle.kts
    └── src
        └── main
  ```

### Индекс проекта
<details open>
<summary><b><code>CHATWEBUI/</code></b></summary>
<!-- __root__ Submodule -->
<details>
<summary><b>__root__</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ __root__</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='build.gradle.kts'>build.gradle.kts</a></b></td>
<td style='padding: 8px;'>- Определяет конфигурации проекта и зависимости для приложения Spring Boot, поддерживающего веб-разработку, сохранение данных и безопасную аутентификацию пользователей.<br>- Создает среду на основе Kotlin с необходимыми библиотеками, включая JPA для взаимодействия с базой данных, JWT для безопасности на основе токенов и различные стартеры Spring Boot для упрощения функций приложения.<br>- Дополнительно способствует тестированию и улучшению пользовательского интерфейса с помощью интегрированных веб-ресурсов и фреймворков, способствуя хорошо структурированной и функциональной архитектуре программного обеспечения.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='gradlew.bat'>gradlew.bat</a></b></td>
<td style='padding: 8px;'>- Предоставляет скрипт запуска Gradle для сред Windows, облегчающий выполнение задач автоматизации сборки для проекта.<br>- Он устанавливает необходимые конфигурации, включая домашний каталог приложений и параметры JVM по умолчанию, обеспечивая правильную идентификацию среды выполнения Java.<br>- Этот скрипт служит ключевой точкой входа для инициализации оболочки Gradle, упрощая общий процесс сборки в архитектуре кодовой базы.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='settings.gradle.kts'>settings.gradle.kts</a></b></td>
<td style='padding: 8px;'>- Определяет имя корневого проекта как ChatWebUI, устанавливая четкую идентификацию для проекта в его общей архитектуре.<br>- Этот базовый элемент помогает организовать различные модули и компоненты, обеспечивая согласованность и последовательность по всей кодовой базе.<br>- Как часть структуры проекта, он играет решающую роль в облегчении сборок и зависимостей, в конечном итоге поддерживая бесперебойную разработку и совместную работу.</td>
</tr>
</table>
</blockquote>
</details>
<!-- src Submodule -->
<details>
<summary><b>src</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src</b></code>
<!-- main Submodule -->
<details>
<summary><b>main</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main</b></code>
<!-- java Submodule -->
<details>
<summary><b>java</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java</b></code>
<!-- org Submodule -->
<details>
<summary><b>org</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org</b></code>
<!-- hack337 Submodule -->
<details>
<summary><b>hack337</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat</b></code>
<!-- gptchat Submodule -->
<details>
<summary><b>gptchat</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\GptChatApplication.java'>GptChatApplication.java</a></b></td>
<td style='padding: 8px;'>- Запускает приложение GptChat, служащее основной точкой входа в архитектуру проекта.<br>- Используя Spring Boot, он инициализирует контекст и конфигурации приложения, обеспечивая бесшовную интеграцию функций.<br>- Сканируя свойства конфигурации, он позволяет гибко настраивать, тем самым облегчая разработку надежного чат-приложения, основанного на передовых возможностях ИИ.</td>
</tr>
</table>
<!-- config Submodule -->
<details>
<summary><b>config</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat.config</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\config\JwtProperties.java'>JwtProperties.java</a></b></td>
<td style='padding: 8px;'>- Управляет свойствами JWT (JSON Web Token) в приложении GPTChat, облегчая безопасную аутентификацию и авторизацию пользователей.<br>- Определяя основные атрибуты конфигурации, такие как секретный ключ и время истечения срока действия, он обеспечивает правильную проверку и применение мер безопасности, тем самым играя критически важную роль в общей архитектуре для защиты конфиденциальных данных и поддержания целостности сеанса на протяжении всего приложения.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\config\SecurityConfig.java'>SecurityConfig.java</a></b></td>
<td style='padding: 8px;'>- Устанавливает конфигурации безопасности для приложения, обеспечивая надежную систему аутентификации и авторизации.<br>- Он интегрирует аутентификацию на основе JWT, настраивая правила доступа и управление сеансами.<br>- Разрешая доступ к определенным конечным точкам для общественности и защищая другие, он создает безопасную среду для взаимодействия пользователей в рамках более широкой архитектуры чат-приложения, эффективно защищая конфиденциальные операции.</td>
</tr>
</table>
</blockquote>
</details>
<!-- controller Submodule -->
<details>
<summary><b>controller</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat.controller</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\controller\AuthController.java'>AuthController.java</a></b></td>
<td style='padding: 8px;'>- AuthController облегчает аутентификацию и регистрацию пользователей в приложении gptchat.<br>- Он предоставляет конечные точки для входа и регистрации пользователей, обеспечивая безопасное взаимодействие с системой аутентификации.<br>- Управляя допустимыми запросами и отвечая соответствующими кодами состояния, он улучшает пользовательский опыт, используя базовый AuthService для обработки логики аутентификации.<br>- Этот компонент играет критически важную роль в общей архитектуре, управляя доступом и безопасностью пользователей.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\controller\ChatApiController.java'>ChatApiController.java</a></b></td>
<td style='padding: 8px;'>- ChatApiController облегчает взаимодействие пользователей в чат-приложении, управляя сеансами чата и обменом сообщениями.<br>- Он позволяет пользователям инициировать новые чаты, извлекать свои существующие чаты и сообщения, отправлять новые сообщения, а также редактировать или генерировать ответы.<br>- Этот контроллер служит основой функциональности чата, обеспечивая бесперебойный опыт вовлечения пользователей в разговоры в отзывчивой и динамичной манере.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\controller\ChatWebController.java'>ChatWebController.java</a></b></td>
<td style='padding: 8px;'>- ChatWebController управляет взаимодействием пользователей в приложении, управляя маршрутизацией для входа, регистрации и функций чата.<br>- Он интегрирует службы пользователей и чата для извлечения и представления данных, специфичных для пользователя, обеспечивая бесперебойный опыт навигации по интерфейсу чата.<br>- Используя архитектуру Spring MVC, он служит центральным узлом для обработки аутентификации пользователей и операций, связанных с чатом.</td>
</tr>
</table>
</blockquote>
</details>
<!-- dto Submodule -->
<details>
<summary><b>dto</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat.dto</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\AuthRequest.java'>AuthRequest.java</a></b></td>
<td style='padding: 8px;'>- AuthRequest служит объектом передачи данных (DTO) в приложении gptchat, инкапсулирующим данные аутентификации пользователя, в частности, электронную почту и пароль.<br>- Он гарантирует, что предоставленный адрес электронной почты соответствует действительному формату и что оба поля не оставлены пустыми, тем самым обеспечивая соблюдение основных правил проверки.<br>- Эта функциональность упрощает процесс аутентификации пользователя, облегчая безопасные операции входа по всей архитектуре кодовой базы.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\ChatDto.java'>ChatDto.java</a></b></td>
<td style='padding: 8px;'>- ChatDto служит объектом передачи данных в проекте, инкапсулирующим важную информацию о сеансе чата.<br>- Он включает такие атрибуты, как уникальный идентификатор чата, связанный идентификатор пользователя, временную метку создания и коллекцию сообщений.<br>- Эта модель облегчает связь между различными уровнями приложения, гарантируя, что данные, связанные с чатом, структурированы и легко управляемы по всей архитектуре кодовой базы.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\EditMessageRequest.java'>EditMessageRequest.java</a></b></td>
<td style='padding: 8px;'>- Облегчает редактирование содержимого сообщений в чат-приложении, определяя структуру для запросов на редактирование сообщений.<br>- Гарантирует, что любое отправленное содержимое проверяется для предотвращения пустых сообщений, повышая общую целостность и удобство использования системы обмена сообщениями.<br>- Этот DTO играет решающую роль в поддержании надежной связи в архитектуре проекта.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\GptApiResponse.java'>GptApiResponse.java</a></b></td>
<td style='padding: 8px;'>- GptApiResponse служит объектом передачи данных в приложении GPT-чата, инкапсулируя структуру ответа, полученного от GPT API.<br>- Он обеспечивает бесшовную интеграцию, обрабатывая различные свойства, включая статистику использования и варианты ответа, при этом надежно управляя потенциальными изменениями в API.<br>- Этот класс также предоставляет метод для извлечения содержимого первого варианта ответа, повышая удобство использования в общей архитектуре.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\GptRequest.java'>GptRequest.java</a></b></td>
<td style='padding: 8px;'>- GptRequest служит объектом передачи данных, который инкапсулирует основные параметры для выполнения запросов к модели GPT.<br>- Он определяет тип модели и содержит список полезных нагрузок сообщений, каждая из которых представляет взаимодействие пользователя, помощника или системы.<br>- Эта структура облегчает беспрепятственный обмен информацией в более широкой архитектуре приложения GPT-чата, обеспечивая эффективную связь и обработку данных.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\GptResponse.java'>GptResponse.java</a></b></td>
<td style='padding: 8px;'>- Облегчает представление ответов, сгенерированных моделью GPT в приложении.<br>- Используя аннотации данных, он определяет структуру, которая включает ответ и его тип, обеспечивая согласованность по всей кодовой базе.<br>- Этот DTO (объект передачи данных) играет решающую роль в управлении связью между различными компонентами, улучшая общую обработку данных и управление ответами в архитектуре проекта.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\JwtResponse.java'>JwtResponse.java</a></b></td>
<td style='padding: 8px;'>- JwtResponse служит объектом передачи данных, который инкапсулирует структуру ответа JSON Web Token (JWT) в приложении.<br>- Он предоставляет важную информацию, включая сгенерированный токен доступа и его тип, поддерживая безопасные рабочие процессы аутентификации и авторизации пользователей.<br>- Этот объект является неотъемлемой частью архитектуры кодовой базы, облегчая эффективную связь между клиентом и сервером во время процесса аутентификации.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\MessageDto.java'>MessageDto.java</a></b></td>
<td style='padding: 8px;'>- MessageDto служит объектом передачи данных в архитектуре приложения GPT Chat, инкапсулирующим основные атрибуты чат-сообщения, включая его уникальный идентификатор, связанный идентификатор чата, роль пользователя, текстовое содержимое и временную метку.<br>- Эта структура облегчает эффективную обработку данных между различными уровнями приложения, способствуя чистому взаимодействию и поддержанию согласованности в представлении сообщений по всей системе.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\RegisterRequest.java'>RegisterRequest.java</a></b></td>
<td style='padding: 8px;'>- RegisterRequest служит объектом передачи данных в приложении GPT Chat, облегчая регистрацию пользователя путем инкапсуляции важной информации о пользователе.<br>- Он гарантирует, что предоставленный адрес электронной почты является действительным и не пустым, одновременно обеспечивая соблюдение требований к длине пароля.<br>- Этот механизм проверки играет решающую роль в поддержании целостности данных и повышении безопасности в процессе регистрации пользователей приложения.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\dto\SendMessageResponse.java'>SendMessageResponse.java</a></b></td>
<td style='padding: 8px;'>- Определяет объект передачи данных для инкапсуляции ответа от функции отправки сообщений в приложении GPT Chat.<br>- Он облегчает обмен пользовательскими и помощниковыми сообщениями, оптимизируя связь между различными компонентами системы.<br>- Эта структура улучшает читаемость и поддерживаемость кода, обеспечивая четкое представление результатов взаимодействия в более широкой архитектуре.</td>
</tr>
</table>
</blockquote>
</details>
<!-- entity Submodule -->
<details>
<summary><b>entity</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat.entity</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\entity\Chat.java'>Chat.java</a></b></td>
<td style='padding: 8px;'>- Определяет сущность Chat в приложении GPT Chat, представляющую разговор, связанный с конкретным пользователем.<br>- Он автоматически отслеживает временную метку создания и поддерживает список связанных сообщений, обеспечивая структурированное и постоянное хранение взаимодействий в чате.<br>- Эта сущность играет решающую роль в управлении пользовательскими разговорами, способствуя общей функциональности чат-системы как части архитектуры проекта.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\entity\Message.java'>Message.java</a></b></td>
<td style='padding: 8px;'>- Определяет сущность Message, представляющую запись разговора в приложении GPT Chat.<br>- Он устанавливает связи с сущностью Chat и обеспечивает проверку необходимых полей.<br>- Захватывая содержимое сообщения, связанную роль и временную метку создания, эта сущность играет решающую роль в управлении взаимодействием пользователей и поддержании целостности историй чата в общей архитектуре проекта.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\entity\Role.java'>Role.java</a></b></td>
<td style='padding: 8px;'>- Определяет набор ролей в приложении, в частности Пользователь, Помощник и Система.<br>- Эти роли являются неотъемлемой частью общей архитектуры проекта, облегчая четкие различия между различными сущностями, которые взаимодействуют в экосистеме чат-приложений.<br>- Назначенные роли определяют поведение и разрешения, обеспечивая организованный поток взаимодействий и улучшая пользовательский опыт в системе.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\entity\User.java'>User.java</a></b></td>
<td style='padding: 8px;'>- Сущность User моделирует пользователя приложения, инкапсулируя важные атрибуты, такие как адрес электронной почты, пароль и информация о временной метке для создания и последнего входа.<br>- Он обеспечивает уникальность электронной почты и обеспечивает проверку важных полей.<br>- Кроме того, он устанавливает связь с сущностями чата, позволяя эффективно извлекать и управлять данными чата, специфичными для пользователя.<br>- Эта архитектура поддерживает аутентификацию и взаимодействие пользователей в рамках более широкого фреймворка чат-приложения.</td>
</tr>
</table>
</blockquote>
</details>
<!-- exception Submodule -->
<details>
<summary><b>exception</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat.exception</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\exception\GlobalExceptionHandler.java'>GlobalExceptionHandler.java</a></b></td>
<td style='padding: 8px;'>- GlobalExceptionHandler охватывает основную функциональность для централизованной обработки исключений в приложении, гарантируя, что все сценарии ошибок управляются согласованно.<br>- Он обрабатывает различные исключения, такие как отсутствие ресурса, сбои проверки, проблемы аутентификации и отказы в доступе, предоставляя структурированные ответы с соответствующими деталями.<br>- Это улучшает общий пользовательский опыт, предоставляя значимую обратную связь для ошибок, возникающих во время взаимодействия с API.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\exception\ResourceNotFoundException.java'>ResourceNotFoundException.java</a></b></td>
<td style='padding: 8px;'>- ResourceNotFoundException служит настраиваемым исключением в архитектуре проекта, специально разработанным для обработки сценариев, когда запрошенные ресурсы не найдены.<br>- Интегрируясь с управлением статусом ответа Spring, он гарантирует, что пользователи получают соответствующие HTTP-ответы NOT FOUND.<br>- Это повышает общую надежность и удобство использования приложения, предоставляя значимую обратную связь во время операций, связанных с извлечением ресурсов.</td>
</tr>
</table>
</blockquote>
</details>
<!-- repository Submodule -->
<details>
<summary><b>repository</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat.repository</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\repository\ChatRepository.java'>ChatRepository.java</a></b></td>
<td style='padding: 8px;'>- Облегчает управление и извлечение данных чата в приложении, предоставляя основные методы запросов, которые связывают сущности чата с их связанными пользователями.<br>- Этот интерфейс позволяет беспрепятственно извлекать записи чата, поддерживает упорядочивание по дате создания и позволяет включать сообщения при доступе к определенным чатам.<br>- Он играет критически важную роль в улучшении общей функциональности функции чата в системе.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\repository\MessageRepository.java'>MessageRepository.java</a></b></td>
<td style='padding: 8px;'>- Предоставляет интерфейс репозитория для управления сущностями Message в приложении.<br>- Он использует Spring Data JPA для облегчения операций CRUD, обеспечивая бесперебойное сохранение и извлечение данных.<br>- Эта функциональность имеет решающее значение для общей архитектуры, обеспечивая эффективное хранение и доступ к сообщениям, тем самым поддерживая основную цель приложения по облегчению взаимодействия в чате.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\repository\UserRepository.java'>UserRepository.java</a></b></td>
<td style='padding: 8px;'>- UserRepository служит важным компонентом проекта, предоставляя интерфейс для доступа к данным и их манипулирования, связанных с сущностями User.<br>- Благодаря своим методам он облегчает извлечение и проверку пользователей на основе адресов электронной почты, тем самым расширяя возможности управления пользователями в более широкой архитектуре.<br>- Этот репозиторий играет жизненно важную роль в обеспечении бесшовной интеграции с базой данных, поддерживая эффективные операции, связанные с пользователями, в приложении.</td>
</tr>
</table>
</blockquote>
</details>
<!-- security Submodule -->
<details>
<summary><b>security</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat.security</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\security\JwtAuthenticationFilter.java'>JwtAuthenticationFilter.java</a></b></td>
<td style='padding: 8px;'>- JwtAuthenticationFilter служит жизненно важным компонентом в архитектуре безопасности приложения, управляя проверкой JSON Web Token (JWT) и аутентификацией пользователей.<br>- Он перехватывает HTTP-запросы для извлечения и проверки JWT, впоследствии обновляя контекст безопасности с данными аутентификации пользователя.<br>- Этот процесс обеспечивает безопасный контроль доступа, тем самым повышая общую защиту ресурсов приложения от несанкционированного доступа.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\security\JwtTokenProvider.java'>JwtTokenProvider.java</a></b></td>
<td style='padding: 8px;'>- JwtTokenProvider облегчает безопасную аутентификацию и авторизацию пользователей в приложении, управляя JSON Web Tokens (JWT).<br>- Он генерирует токены на основе учетных данных пользователя, проверяет их и извлекает информацию о пользователе из токенов.<br>- Разрешая токены из HTTP-запросов, он гарантирует, что только аутентифицированные пользователи могут получать доступ к защищенным ресурсам, тем самым улучшая общую архитектуру безопасности кодовой базы.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\security\UserDetailsServiceImpl.java'>UserDetailsServiceImpl.java</a></b></td>
<td style='padding: 8px;'>- Облегчает аутентификацию и управление пользователями в приложении, реализуя интерфейс UserDetailsService.<br>- Он извлекает информацию о пользователе из базы данных на основе электронной почты или идентификатора пользователя, обеспечивая безопасную идентификацию во время процессов входа.<br>- Инкапсулируя пользовательские данные и роли, он поддерживает общую архитектуру безопасности проекта, обеспечивая надежную авторизацию пользователей и контроль доступа.</td>
</tr>
</table>
</blockquote>
</details>
<!-- service Submodule -->
<details>
<summary><b>service</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.java.org.hack337.gptchat.service</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\service\AuthService.java'>AuthService.java</a></b></td>
<td style='padding: 8px;'>- AuthService служит критически важным компонентом системы аутентификации в архитектуре проекта, облегчая процессы регистрации и входа пользователей.<br>- Он обеспечивает безопасное управление учетными данными пользователей, подтверждая уникальность адресов электронной почты при регистрации и генерируя токены JWT при успешном входе.<br>- Кроме того, он отслеживает активность пользователей, обновляя временные метки входа, повышая общую безопасность и удобство использования.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\service\ChatService.java'>ChatService.java</a></b></td>
<td style='padding: 8px;'>- ChatService координирует основные функции чат-приложения, позволяя пользователям инициировать новые чаты, извлекать истории своих чатов и взаимодействовать с разговорным ИИ.<br>- Управляя обменом сообщениями, включая отправку и повторную генерацию пользовательских и помощниковых сообщений, он обеспечивает бесперебойное общение.<br>- Его интеграция с репозиториями и пользовательскими службами лежит в основе надежной архитектуры, которая уделяет приоритетное внимание вовлечению пользователей и взаимодействию с ответами, управляемыми ИИ.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\service\GptService.java'>GptService.java</a></b></td>
<td style='padding: 8px;'>- GptService облегчает взаимодействие с GPT API, позволяя извлекать ответы, сгенерированные ИИ, на основе истории чата пользователя.<br>- Собирая запросы из сохраненных сообщений и обрабатывая связь с API, он обеспечивает бесшовную интеграцию возможностей ИИ в приложение.<br>- Эта служба улучшает пользовательский опыт, предоставляя динамические и контекстуально релевантные ответы, в конечном итоге способствуя достижению цели проекта по обеспечению интеллектуального взаимодействия в чате.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\java\org\hack337\gptchat\service\UserService.java'>UserService.java</a></b></td>
<td style='padding: 8px;'>- UserService предоставляет функциональность для получения текущего аутентифицированного пользователя в приложении.<br>- Он использует Spring Security для доступа к деталям аутентификации пользователя и извлекает информацию о пользователе из UserRepository по их электронной почте.<br>- Инкапсулируя эту логику, служба упрощает управление пользователями и улучшает общую архитектуру приложения, обеспечивая безопасный доступ к пользовательским данным на протяжении всего проекта.</td>
</tr>
</table>
</blockquote>
</details>
</blockquote>
</details>
</blockquote>
</details>
</blockquote>
</details>
</blockquote>
</details>
<!-- resources Submodule -->
<details>
<summary><b>resources</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.resources</b></code>
<!-- templates Submodule -->
<details>
<summary><b>templates</b></summary>
<blockquote>
<div class='directory-path' style='padding: 8px 0; color: #666;'>
<code><b>⦿ src.main.resources.templates</b></code>
<table style='width: 100%; border-collapse: collapse;'>
<thead>
<tr style='background-color: #f8f9fa;'>
<th style='width: 30%; text-align: left; padding: 8px;'>Имя файла</th>
<th style='text-align: left; padding: 8px;'>Краткое описание</th>
</tr>
</thead>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\resources\templates\chat.html'>chat.html</a></b></td>
<td style='padding: 8px;'>- HTML-шаблон чата облегчает взаимодействие пользователей в ChatApp, предоставляя динамичный и визуально привлекательный интерфейс.<br>- Он включает боковую панель для навигации по чату, область отображения сообщений и элементы управления вводом для отправки сообщений.<br>- Улучшенный с помощью Tailwind CSS и jQuery, этот шаблон упрощает работу с чатом, обеспечивая связь в реальном времени и управление пользователями, что является неотъемлемой частью общей структуры приложения.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\resources\templates\login.html'>login.html</a></b></td>
<td style='padding: 8px;'>- Облегчая аутентификацию пользователей для ChatApp, HTML-шаблон входа предоставляет удобный интерфейс для безопасного входа пользователей с их электронной почтой и паролем.<br>- Улучшенный отзывчивым дизайном и стильными компонентами с использованием Tailwind CSS и анимации, он также направляет новых пользователей на страницу регистрации, обеспечивая плавный переход между созданием учетной записи и доступом, способствуя общей надежности пользовательского опыта приложения.</td>
</tr>
<tr style='border-bottom: 1px solid #eee;'>
<td style='padding: 8px;'><b><a href='src\main\resources\templates\register.html'>register.html</a></b></td>
<td style='padding: 8px;'>- Облегчает регистрацию пользователей для ChatApp, предоставляя интуитивно понятную, адаптивную HTML-форму.<br>- Пользователи могут вводить свой адрес электронной почты, пароль и подтверждение пароля, обеспечивая оптимизированный процесс адаптации.<br>- Включает клиентскую проверку и обратную связь с пользователем для обработки ошибок и сообщений об успехе.<br>- Расположенный в каталоге шаблонов, он легко интегрируется в более широкую архитектуру приложения, улучшая взаимодействие с пользователем и доступность.</td>
</tr>
</table>
</blockquote>
</details>
</blockquote>
</details>
</blockquote>
</details>
</blockquote>
</details>
</blockquote>
</details>
</blockquote>
</details>
</blockquote>
</details>
</details>

---

## Начало работы

### Необходимые условия

Для этого проекта требуются следующие зависимости:

- **Язык программирования:** Java
- **Менеджер пакетов:** Gradle

### Установка

Соберите ChatWebUI из исходников и установите зависимости:

1. **Клонируйте репозиторий:**

    ```sh
    ❯ git clone https://github.com/y9hack337/ChatWebUI
    ```

2. **Перейдите в директорию проекта:**

    ```sh
    ❯ cd ChatWebUI
    ```

3. **Установите зависимости:**

<!-- ЗНАЧОК SHIELDS В ДАННЫЙ МОМЕНТ ОТКЛЮЧЁН -->
<!-- [![gradle][gradle-shield]][gradle-link] -->
<!-- ССЫЛКИ -->
<!-- [gradle-shield]: https://img.shields.io/badge/Gradle-02303A.svg?style={badge_style}&logo=gradle&logoColor=white -->
<!-- [gradle-link]: https://gradle.org/ -->

```sh
❯ gradle build
```

### Использование

Запустите проект с помощью:
```sh
gradle run
```

### Тестирование

Chatwebui использует фреймворк для тестирования {__test_framework__}. Запустите набор тестов с помощью:
```sh
gradle test
```

---

## Участие в разработке

- **💬 [Присоединяйтесь к обсуждениям](https://github.com/y9hack337/ChatWebUI/discussions)**: Делитесь своими мыслями, оставляйте отзывы или задавайте вопросы.
- **🐛 [Сообщайте о проблемах](https://github.com/y9hack337/ChatWebUI/issues)**: Отправляйте найденные ошибки или запросы на добавление функций для проекта `ChatWebUI`.


<details closed>
<summary>График участников</summary>
<br>
<p align="left">
   <a href="https://github.com/y9hack337/ChatWebUI/graphs/contributors">
      <img src="https://contrib.rocks/image?repo=y9hack337/ChatWebUI">
   </a>
</p>
</details>

[![][back-to-top]](#top)

</div>


[back-to-top]: https://img.shields.io/badge/-НАВЕРХ-151515?style=flat-square

---
