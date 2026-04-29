# Лабораторная работа 4 — Express API

Собственный веб-сервис на Node.js + Express для работы с коллекцией продуктов.
Данные хранятся в JSON-файле.

## Что реализовано

- `GET /products` — список продуктов
- `GET /products/:id` — один продукт по id
- `POST /products` — добавление нового продукта
- `PATCH /products/:id` — редактирование продукта
- `DELETE /products/:id` — удаление продукта
- фильтрация списка по `title` и `category`

## Структура проекта

```text
lab4-api/
├── README.md
├── package.json
├── .gitignore
├── postman/
│   └── Lab4_Products_API.postman_collection.json
└── src/
    ├── index.js
    ├── routes/
    │   └── products.js
    ├── controllers/
    │   └── productsController.js
    ├── services/
    │   ├── fileService.js
    │   └── productsService.js
    └── data/
        └── products.json
```

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

или

```bash
npm start
```

## Базовый адрес

```text
http://localhost:3000
```

## Маршруты

### Получить список

```http
GET /products
```

### Получить список с фильтрацией

```http
GET /products?title=чек
GET /products?category=Документы
GET /products?title=инструкция&category=Обучение
```

### Получить продукт по id

```http
GET /products/1
```

### Добавить продукт

```http
POST /products
Content-Type: application/json
```

Пример body:

```json
{
  "image": "https://via.placeholder.com/300x200?text=New",
  "title": "Новый сервис проверки закупки",
  "description": "Сервис для анализа закупочной документации",
  "category": "Сервисы",
  "price": "1990 ₽"
}
```

### Обновить продукт

```http
PATCH /products/2
Content-Type: application/json
```

Пример body:

```json
{
  "price": "1290 ₽"
}
```

### Удалить продукт

```http
DELETE /products/4
```

## Коды состояний

- `200 OK` — успешное получение списка, одной записи или обновление
- `201 Created` — успешное создание новой записи
- `204 No Content` — успешное удаление
- `400 Bad Request` — некорректный id или неполные данные в POST
- `404 Not Found` — запись или маршрут не найдены
- `500 Internal Server Error` — внутренняя ошибка сервера

## Порядок показа в Postman

1. Показать коллекцию запросов
2. `GET /products`
3. `POST /products`
4. `GET /products/:id`
5. `DELETE /products/:id`
6. `GET /products?category=...` или `GET /products?title=...`

## Контрольные вопросы — короткие ответы

### Что такое Node.js
Node.js — это среда выполнения JavaScript вне браузера. Используется для серверов, API, микросервисов, CLI и realtime-приложений.

### Клиент-серверная модель
Клиент отправляет HTTP-запрос, сервер его обрабатывает и возвращает HTTP-ответ.

### SSR и SPA
- **SSR**: HTML формируется на сервере
- **SPA**: сервер чаще отдает JSON API, а интерфейс рисуется на клиенте

### Встроенные библиотеки Node.js
- `fs` — работа с файлами
- `path` — работа с путями
- `http` — создание HTTP-сервера
- `os` — информация об операционной системе

### Router
Роутер связывает URL и HTTP-метод с нужным обработчиком.

### Добавление новой записи
Контроллер берет данные из `req.body`, валидирует их, сервис создает новый объект с новым `id`, а затем записывает его в JSON-файл.
