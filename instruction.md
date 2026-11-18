# **Проект «Силы Вселенной» — план разработки на 30 дней**

Давай строить это как настоящий веб-проект, а не набор отдельных HTML-страниц. Главная цель: через месяц у тебя должен быть красивый образовательный сайт, который можно показать на защите, а учительница сможет самостоятельно добавлять и редактировать физические законы после твоего завершения работы.

**Наш принцип разработки:** сначала делаем полностью работающий сайт с редактированием, затем добавляем визуальные эффекты и интерактивность. Так мы не потратим три недели на красивую главную страницу, забыв про самое важное — кабинет учителя.

**Визуальная концепция**

Светлые страницы теории, тёмные научные визуализации, синие и фиолетовые акценты.

**Архитектура**

Python + Django + база данных + HTML/CSS/JavaScript.

**Главное преимущество**

Учительница управляет содержимым через защищённый кабинет без редактирования программного кода.

## **1. Какую архитектуру мы строим**

Используем Django — это Python-фреймворк, который уже умеет обрабатывать страницы, работать с базой данных, управлять пользователями и предоставлять административную панель.

Не будем на первом этапе делать отдельные React-приложение, API-сервер и сложную инфраструктуру. Для одного разработчика с начальным уровнем Python это лишняя сложность.

**Сайт для посетителей**

Главная · Каталог · Страницы законов · Задачи

**Публичная часть**

Чтение и интерактивные схемы

**Кабинет учителя**

Вход, редактирование, публикация

**Django — логика сайта**

URL · представления · права доступа · шаблоны

**База данных**

Законы, силы, категории, примеры, задачи, публикации

### **Как это будет работать на практике**

Допустим, учительница добавляет новую тему «Сила Архимеда».

1. Открывает адрес кабинета учителя и входит в свою учётную запись.
2. Нажимает «Добавить материал».
3. Заполняет поля: название, описание, формула, примеры применения, задача и решение.
4. Сохраняет черновик и проверяет предпросмотр.
5. Нажимает «Опубликовать».

Django сохраняет материал в базе данных. Каталог и страница темы формируются автоматически из сохранённых данных. Тебе не приходится создавать новый HTML-файл для каждой силы.

Важно: это будет работать и для новых законов, которые появятся после завершения проекта, если они используют предусмотренные типы материалов. Совершенно новые типы интерактивных экспериментов могут потребовать программирования.

## **2. Подготовка MacBook и среды разработки**

Начнём с одного важного технического решения.

Для актуального Django нужна современная версия Python. В твоей прежней среде была Python 3.9.6; эта версия уже не подходит для современных поддерживаемых веток Django. Поэтому для нового проекта рекомендую **Python 3.12 или 3.13 и Django 5.2 LTS**. Это позволит использовать совместимую стабильную версию с длительной поддержкой.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.djangoproject.com\&sz=32)

Django+1



### **Шаг 1. Проверяем Python и Git**

Открой Terminal на MacBook и выполни:

```
python3 --version
git --version
```

Если Python показывает `3.9.6`, установи более новую версию с официального сайта: [Python для macOS](https://www.python.org/downloads/macos/?utm_source=chatgpt.com).

После установки открой новый терминал и проверь:

```
python3 --version
```

Убедись, что команда показывает Python 3.12 или 3.13.

### **Шаг 2. Создаём проект**

Выполняй команды по порядку:

```
mkdir silу-vselennoy
cd silу-vselennoy
```

Чтобы избежать проблем с кириллицей и похожими символами, рекомендую использовать латинское название `sily-vselennoy`:

```
mkdir sily-vselennoy
cd sily-vselennoy
```

Создаём изолированное окружение Python:

```
python3 -m venv .venv
source .venv/bin/activate
```

После активации в начале строки терминала обычно появляется `(.venv)`. Это означает, что зависимости проекта будут устанавливаться отдельно от остальных программ.

Устанавливаем Django:

```
python -m pip install --upgrade pip
python -m pip install "Django>=5.2,<5.3"
```

Проверяем установку:

```
python -m django --version
```

Подробнее: [официальное руководство по установке Django](https://docs.djangoproject.com/en/5.2/intro/install/?utm_source=chatgpt.com).

### **Шаг 3. Создаём каркас сайта**

```
django-admin startproject config .
python manage.py startapp physics
```

Что мы создали:

- `config` — настройки проекта и маршрутизация верхнего уровня.
- `physics` — приложение, в котором будут храниться модели физических материалов, страницы и логика каталога.
- `manage.py` — инструмент управления проектом, через который запускаются команды Django.

Открой проект в VS Code:

```
code .
```

Если команда `code` не работает, открой VS Code вручную и выбери **File → Open Folder**, затем папку `sily-vselennoy`.

## **3. Структура файлов проекта**

Вот структура, к которой будем стремиться к концу первой недели. Не нужно создавать все файлы вручную прямо сейчас — Django уже создал часть из них, остальные будем добавлять по мере реализации.

sily-vselennoy/

manage.py

Команды Django

config/

settings.py

urls.py

asgi.py / wsgi.py

physics/

models.py — модели данных

views.py — логика страниц

urls.py — адреса приложения

admin.py — кабинет редактирования

tests.py — автоматические тесты

migrations/ — изменения схемы базы данных

templates/physics/

base.html — общая оболочка сайта

home.html — главная

catalog.html — каталог сил

detail.html — страница отдельной силы

static/physics/

css/style.css — стили

js/main.js — интерактивность

images/ — локальные изображения

media/

Загруженные файлы

.gitignore

requirements.txt

Почему такая структура хороша: Python отвечает за данные и работу сайта, HTML — за содержание страниц, CSS — за внешний вид, JavaScript — за взаимодействие. Когда понадобится улучшить анимацию, не придётся переписывать базу данных или систему редактирования.

## **4. Модель данных: фундамент всего проекта**

Самая важная техническая задача — спроектировать данные так, чтобы учительница могла добавлять новые материалы без программиста.

Мы создадим четыре основных типа записей:

- `Category` — раздел, например «Механика».
- `Force` — физическая сила или тема, например «Сила трения».
- `Example` — интересный пример применения.
- `Problem` — задача с условием, решением и ответом.

Связи будут выглядеть так:

**Категория**

Механика

**Сила или закон**

Сила трения · Формула · Объяснение

**Примеры**

Ходьба, торможение

**Задачи**

Условие, решение, ответ

### **Создаём модели в&#x20;**`physics/models.py`

Открой этот файл, удали содержимое и вставь код:

```
from django.db import modelsfrom django.utils.text import slugifyclass Category(models.Model):    name = models.CharField("Название", max_length=100)    slug = models.SlugField(        "Адрес",        max_length=120,        unique=True,        blank=True,    )    description = models.TextField("Описание", blank=True)    def save(self, *args, **kwargs):        if not self.slug:            self.slug = slugify(self.name, allow_unicode=True)        super().save(*args, **kwargs)    def __str__(self):        return self.name    class Meta:        verbose_name = "Категория"        verbose_name_plural = "Категории"class Force(models.Model):    category = models.ForeignKey(        Category,        on_delete=models.PROTECT,        related_name="forces",        verbose_name="Категория",    )    title = models.CharField("Название", max_length=200)    slug = models.SlugField(        "Адрес",        max_length=220,        unique=True,        blank=True,    )    definition = models.TextField("Определение")    explanation = models.TextField("Объяснение", blank=True)
```

**Что здесь происходит:**

- `CharField` хранит короткий текст, например название или формулу.
- `TextField` хранит длинные объяснения.
- `ForeignKey` связывает материал с категорией, а пример или задачу — с конкретной силой.
- `published` позволяет сохранить материал как черновик.
- `slug` создаёт адрес страницы на основе названия.
- `on_delete=models.PROTECT` не позволяет случайно удалить категорию, пока к ней привязаны материалы.

Для первой версии мы намеренно используем текстовое поле для формулы. Позже подключим MathJax, чтобы красиво отображать математические выражения. Сначала учительница сможет вводить формулы обычным текстом, а затем — по согласованному синтаксису, например `F = ma`.

### **Применяем модели к базе данных**

В терминале, находясь в корневой папке проекта, выполни:

```
python manage.py makemigrations
python manage.py migrate
```

Первая команда создаёт инструкции по изменению структуры базы данных. Вторая применяет их.

Если команды завершились без ошибок, основа базы данных готова.

## **5. Кабинет учителя: первая работающая версия**

Не будем тратить время на создание авторизации с нуля. Используем встроенную административную панель Django, которая уже умеет создавать, изменять и удалять записи.

Открой `physics/admin.py` и вставь:

```
from django.contrib import adminfrom .models import Category, Force, Example, Problemclass ExampleInline(admin.TabularInline):    model = Example    extra = 1class ProblemInline(admin.StackedInline):    model = Problem    extra = 0@admin.register(Category)class CategoryAdmin(admin.ModelAdmin):    list_display = ("name", "slug")    search_fields = ("name",)@admin.register(Force)class ForceAdmin(admin.ModelAdmin):    list_display = (        "title",        "category",        "published",        "updated_at",    )    list_filter = ("category", "published")    search_fields = ("title", "definition")    list_editable = ("published",)    prepopulated_fields = {"slug": ("title",)}    inlines = [ExampleInline, ProblemInline]@admin.register(Example)class ExampleAdmin(admin.ModelAdmin):    list_display = ("title", "force", "order")    search_fields = ("title", "description")@admin.register(Problem)class ProblemAdmin(admin.ModelAdmin):    list_display = ("title", "force", "order")    search_fields = ("title", "condition")
```

Теперь создаём учётную запись администратора:

```
python manage.py createsuperuser
```

Django попросит указать имя пользователя, электронную почту (если потребуется) и пароль.

Запускаем сервер:

```
python manage.py runserver
```

Открой в браузере:

\- [Кабинет администратора на локальном сайте](http://127.0.0.1:8000/admin/?utm_source=chatgpt.com)

Войди под созданной учётной записью. Ты должен увидеть разделы категорий, сил, примеров и задач.

Это уже первая рабочая часть проекта. Добавь категорию «Механика», создай силу «Сила трения», заполни определение и формулу, добавь практический пример и задачу.

Пока интерфейс будет стандартным и не очень красивым. Это нормально: сейчас мы проверяем фундамент. В дальнейшем мы сможем сделать отдельный упрощённый кабинет учителя с русскими подсказками, кнопками предпросмотра и публикации.

## **6. Создаём страницы сайта**

Теперь сделаем так, чтобы данные из базы появлялись на обычных страницах сайта.

### **Шаг 1. Подключаем приложение**

Открой `config/settings.py`. Найди `INSTALLED_APPS` и добавь `"physics"`:

```
INSTALLED_APPS = [    "django.contrib.admin",    "django.contrib.auth",    "django.contrib.contenttypes",    "django.contrib.sessions",    "django.contrib.messages",    "django.contrib.staticfiles",    "physics",]
```

Остальные настройки в файле оставь без изменений.

### **Шаг 2. Создаём представления**

В файле `physics/views.py` размести:

```
from django.shortcuts import render, get_object_or_404from .models import Category, Forcedef home(request):    forces = Force.objects.filter(published=True)[:6]    categories = Category.objects.filter(        forces__published=True    ).distinct()    return render(        request,        "physics/home.html",        {            "forces": forces,            "categories": categories,        },    )def catalog(request):    forces = Force.objects.filter(published=True)    categories = Category.objects.filter(        forces__published=True    ).distinct()    query = request.GET.get("q", "").strip()    category_slug = request.GET.get("category", "")    if query:        forces = forces.filter(title__icontains=query)    if category_slug:        forces = forces.filter(category__slug=category_slug)
```

Обрати внимание на `published=True`. Это принципиальная деталь: черновики не попадут в публичный каталог и не откроются по прямой ссылке.

### **Шаг 3. Настраиваем адреса страниц**

Создай файл `physics/urls.py`:

```
from django.urls import pathfrom . import viewsapp_name = "physics"urlpatterns = [    path("", views.home, name="home"),    path("forces/", views.catalog, name="catalog"),    path(        "forces/<slug:slug>/",        views.force_detail,        name="detail",    ),]
```

Теперь открой `config/urls.py`:

```
from django.contrib import adminfrom django.urls import path, includeurlpatterns = [    path("admin/", admin.site.urls),    path("", include("physics.urls")),]
```

У нас появились три маршрута:

- `/` — главная страница.
- `/forces/` — каталог с поиском.
- `/forces/force-slug/` — страница конкретной силы.

### **Шаг 4. Создаём шаблоны**

Создай папки:

```
mkdir -p physics/templates/physics
mkdir -p physics/static/physics/css
mkdir -p physics/static/physics/js
```

Файл `physics/templates/physics/base.html` будет общей оболочкой:

```

{% load static %}
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Силы Вселенной{% endblock %}</title>
    <link rel="stylesheet"
          href="{% static 'physics/css/style.css' %}">
</head>
<body>
    <header class="site-header">
        <a class="logo" href="{% url 'physics:home' %}">
            СИЛЫ <span>ВСЕЛЕННОЙ</span>
        </a>
        <nav>
            <a href="{% url 'physics:home' %}">Главная</a>
            <a href="{% url 'physics:catalog' %}">Каталог</a>
        </nav>
    </header>

    <main class="container">
        {% block content %}{% endblock %}
    </main>

    <footer class="site-footer">
        Физика вокруг нас · Образовательный проект
    </footer>
</body>
</html>

```

Создай `physics/templates/physics/home.html`:

```

{% extends "physics/base.html" %}

{% block title %}Силы Вселенной — изучай физику{% endblock %}

{% block content %}
<section class="hero">
    <p class="eyebrow">ИНТЕРАКТИВНАЯ ЭНЦИКЛОПЕДИЯ ФИЗИКИ</p>
    <h1>Вселенная движется<br>по законам физики.</h1>
    <p class="hero-description">
        Изучи силы, которые управляют движением,
        взаимодействием тел и устройством природы.
    </p>
    <a class="button" href="{% url 'physics:catalog' %}">
        Исследовать силы →
    </a>
</section>

<section class="section">
    <h2>Исследуй физические явления</h2>
    <div class="card-grid">
        {% for force in forces %}
        <a class="force-card"
           href="{% url 'physics:detail' force.slug %}">
            <span class="card-category">
                {{ force.category.name }}
            </span>
            <h3>{{ force.title }}</h3>
            <p>{{ force.definition|truncatewords:22 }}</p>
            <span class="card-link">Изучить →</span>
        </a>
        {% empty %}
        <p>
            Материалы скоро появятся.
            Добавь первую силу в кабинете учителя.
        </p>
        {% endfor %}
    </div>
</section>
{% endblock %}

```

Создай `physics/templates/physics/catalog.html`:

```

{% extends "physics/base.html" %}

{% block title %}Каталог сил — Силы Вселенной{% endblock %}

{% block content %}
<section class="section">
    <p class="eyebrow">БИБЛИОТЕКА ЗНАНИЙ</p>
    <h1>Каталог сил и законов</h1>

    <form class="search-form" method="get">
        <input type="search" name="q"
               placeholder="Например, сила трения"
               value="{{ query }}">

        <select name="category">
            <option value="">Все категории</option>
            {% for category in categories %}
            <option value="{{ category.slug }}"
                {% if selected_category == category.slug %}
                    selected
                {% endif %}>
                {{ category.name }}
            </option>
            {% endfor %}
        </select>

        <button class="button" type="submit">Найти</button>
    </form>

    <div class="card-grid">
        {% for force in forces %}
        <a class="force-card"
           href="{% url 'physics:detail' force.slug %}">
            <span class="card-category">
                {{ force.category.name }}
            </span>
            <h3>{{ force.title }}</h3>
            <p>{{ force.definition|truncatewords:22 }}</p>
            <span class="card-link">Изучить →</span>
        </a>
        {% empty %}
        <p>По заданным условиям материалы не найдены.</p>
        {% endfor %}
    </div>
</section>
{% endblock %}

```

Создай `physics/templates/physics/detail.html`:

```

{% extends "physics/base.html" %}

{% block title %}{{ force.title }} — Силы Вселенной{% endblock %}

{% block content %}
<article class="lesson">
    <p class="eyebrow">{{ force.category.name }}</p>
    <h1>{{ force.title }}</h1>

    <section class="lesson-section">
        <h2>Что это такое?</h2>
        <p>{{ force.definition|linebreaksbr }}</p>
        {% if force.explanation %}
        <p>{{ force.explanation|linebreaksbr }}</p>
        {% endif %}
    </section>

    {% if force.formula %}
    <section class="formula-panel">
        <h2>Формула</h2>
        <p class="formula">{{ force.formula }}</p>
        <p>{{ force.formula_explanation|linebreaksbr }}</p>
    </section>
    {% endif %}

    {% if force.applications %}
    <section class="lesson-section">
        <h2>Применение в жизни</h2>
        <p>{{ force.applications|linebreaksbr }}</p>
    </section>
    {% endif %}

    {% if force.interesting_fact %}
    <section class="fact-panel">
        <h2>Интересный факт</h2>
        <p>{{ force.interesting_fact|linebreaksbr }}</p>
    </section>
    {% endif %}

    {% if force.examples.all %}
    <section class="lesson-section">
        <h2>Примеры из реальной жизни</h2>
        {% for example in force.examples.all %}
        <div class="content-block">
            <h3>{{ example.title }}</h3>
            <p>{{ example.description|linebreaksbr }}</p>
        </div>
        {% endfor %}
    </section>
    {% endif %}

    {% if force.problems.all %}
    <section class="lesson-section">
        <h2>Задачи с решениями</h2>
        {% for problem in force.problems.all %}
        <div class="content-block">
            <h3>{{ problem.title }}</h3>
            <p><strong>Условие:</strong>
                {{ problem.condition|linebreaksbr }}</p>
            <details>
                <summary>Показать решение</summary>
                <p>{{ problem.solution|linebreaksbr }}</p>
                <p><strong>Ответ:</strong> {{ problem.answer }}</p>
            </details>
        </div>
        {% endfor %}
    </section>
    {% endif %}

    <a class="button" href="{% url 'physics:catalog' %}">
        ← Вернуться в каталог
    </a>
</article>
{% endblock %}

```

Здесь мы используем обычный HTML-шаблонизатор Django. Тексты вставляются из базы данных, а блоки формулы, факта, примеров и задач появляются только тогда, когда для них есть данные.

Небольшая техническая оговорка: `force.examples.all` и `force.problems.all` в условиях шаблона проверяют связанные менеджеры, но не количество записей. Для правильного скрытия пустых разделов позже добавим отдельные проверки через `exists()` в представлении или заранее подготовленные списки. На первом этапе это не блокирует работу каталога.

## **7. Делаем гибридный дизайн**

Теперь оформим сайт. Мы используем светлую поверхность для чтения и тёмную научную обложку для первого впечатления. Это будет основой, которую потом можно дополнить графиками, изображениями и анимациями.

Создай файл `physics/static/physics/css/style.css`:

```

:root {
    --ink: #172033;
    --muted: #64748b;
    --blue: #315efb;
    --purple: #7455e8;
    --paper: #f6f8fc;
    --white: #ffffff;
    --line: #e3e8f2;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                 sans-serif;
    line-height: 1.65;
}

a {
    color: inherit;
    text-decoration: none;
}

.site-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 20px max(6%, calc((100% - 1180px) / 2));
    background: var(--white);
    border-bottom: 1px solid var(--line);
}

.logo {
    font-size: 16px;
    font-weight: 850;
    letter-spacing: 1px;
}

.logo span {
    color: var(--blue);
}

nav {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}

nav a {
    color: var(--muted);
    font-size: 14px;
}

nav a:hover {
    color: var(--blue);
}

.container {
    width: min(1180px, 88%);
    margin: 0 auto;
    min-height: 70vh;
}

.hero {
    margin-top: 36px;
    padding: clamp(32px, 7vw, 84px);
    border-radius: 28px;
    color: white;
    background:
        radial-gradient(ellipse at 85% 20%,
            rgba(116, 85, 232, .55), transparent 42%),
        radial-gradient(ellipse at 20% 90%,
            rgba(49, 94, 251, .35), transparent 45%),
        #10172c;
    overflow: hidden;
}

.eyebrow {
    color: var(--blue);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.hero .eyebrow {
    color: #aebfff;
}

h1 {
    font-size: clamp(34px, 5.5vw, 64px);
    line-height: 1.1;
    letter-spacing: -2px;
    margin: 18px 0;
}

.hero-description {
    max-width: 570px;
    color: #d0d8ed;
    font-size: 17px;
    margin-bottom: 30px;
}

.button {
    display: inline-block;
    padding: 12px 20px;
    border: 0;
    border-radius: 12px;
    background: var(--blue);
    color: white;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    transition: transform .2s, background .2s;
}

.button:hover {
    background: var(--purple);
    transform: translateY(-2px);
}

.section {
    padding: 54px 0;
}

.section h1,
.lesson h1 {
    font-size: clamp(34px, 5vw, 52px);
}

.section h2,
.lesson h2 {
    font-size: 25px;
    letter-spacing: -.5px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    margin-top: 28px;
}

.force-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 26px;
    min-height: 225px;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: var(--white);
    transition: transform .2s, box-shadow .2s;
}

.force-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(24, 39, 75, .08);
}

.force-card h3 {
    margin: 14px 0 4px;
    font-size: 21px;
}

.force-card p {
    color: var(--muted);
    font-size: 14px;
}

.card-category {
    color: var(--blue);
    font-size: 12px;
    font-weight: 750;
}

.card-link {
    margin-top: auto;
    color: var(--blue);
    font-size: 14px;
    font-weight: 700;
}

.search-form {
    display: flex;
    gap: 12px;
    margin: 28px 0;
}

input,
select {
    min-width: 0;
    padding: 12px 14px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: white;
    font: inherit;
}

input {
    flex: 1;
}

.lesson {
    max-width: 850px;
    margin: 56px auto;
}

.lesson-section,
.formula-panel,
.fact-panel,
.content-block {
    margin: 26px 0;
    padding: 26px;
    border-radius: 18px;
    background: white;
    border: 1px solid var(--line);
}

.formula-panel {
    background: #eef2ff;
    border-color: #dce4ff;
}

.formula {
    font-size: clamp(22px, 4vw, 34px);
    font-weight: 750;
    color: var(--blue);
    overflow-wrap: anywhere;
}

.fact-panel {
    background: #f0fdf9;
    border-color: #c9f2e5;
}

details {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid var(--line);
}

summary {
    color: var(--blue);
    cursor: pointer;
    font-weight: 700;
}

.site-footer {
    margin-top: 60px;
    padding: 30px 6%;
    border-top: 1px solid var(--line);
    color: var(--muted);
    text-align: center;
    font-size: 13px;
}

@media (max-width: 760px) {
    .site-header {
        align-items: flex-start;
        flex-direction: column;
        padding: 18px 6%;
    }

    .card-grid {
        grid-template-columns: 1fr;
    }

    .search-form {
        flex-direction: column;
    }

    .hero {
        border-radius: 20px;
    }
}

```

Это стартовая визуальная система, а не финальный дизайн. Она уже адаптируется к мобильному экрану, но позже мы добавим настоящую научную графику, оформление формул и визуальные детали.

### **Исправим вывод примеров и задач**

В `physics/views.py` замени функцию `force_detail` на следующую версию:

```
def force_detail(request, slug):    force = get_object_or_404(        Force.objects.filter(published=True),        slug=slug,    )    return render(        request,        "physics/detail.html",        {            "force": force,            "examples": force.examples.all(),            "problems": force.problems.all(),        },    )
```

А в `detail.html` замени:

```
{% if force.examples.all %}
```

на:

```
{% if examples %}
```

И замени:

```
{% for example in force.examples.all %}
```

на:

```
{% for example in examples %}
```

Аналогично для задач:

```
{% if problems %}
    ...
    {% for problem in problems %}
```

Так пустые разделы будут действительно скрываться, а не появляться без содержимого.

## **8. Первая проверка работающего сайта**

Запусти сервер:

```
python manage.py runserver
```

Перейди по адресу:

[Главная страница проекта](http://127.0.0.1:8000/?utm_source=chatgpt.com)

Пока сервер запущен, можно изменять файлы и обновлять страницу браузера.

Теперь проверь весь сценарий:

1. Войди в `/admin/`.
2. Создай категорию «Механика».
3. Создай силу «Сила трения».
4. Заполни определение, объяснение, формулу и применение.
5. Добавь пример и задачу.
6. Отметь материал как опубликованный.
7. Открой каталог и перейди на страницу этой силы.
8. Измени определение в админке и обнови публичную страницу.

Если всё работает, у тебя есть важнейший фундамент: контент управляется из базы данных, а публичные страницы создаются автоматически.

Если возникнет ошибка, не нужно переписывать весь проект. Скопируй полный текст ошибки из терминала — разберём её по строкам.

## **9. План на оставшиеся четыре недели**

Первый работающий прототип — это только фундамент. Теперь превратим его в проект, которым действительно приятно пользоваться.

## **1–7**

дни

**Неделя 1 — работающая основа**

Результат: база данных, каталог, главная, страницы материалов и административная панель.

- Настроить Python, Django и Git.
- Создать модели и редактор материалов.
- Реализовать основные страницы.
- Проверить публикацию и черновики.

## **8–14**

дни

**Неделя 2 — внешний вид и редактор**

Результат: узнаваемый научный дизайн и удобное управление контентом.

- Доработать навигацию, карточки и мобильную версию.
- Добавить изображения и отображение формул.
- Настроить понятные подписи полей и поиск в кабинете.
- Подготовить минимум 5 качественных материалов.

## **15–21**

дни

**Неделя 3 — интерактивность и научное содержание**

Результат: сайт не просто рассказывает о физике, но и позволяет исследовать её.

- Добавить одну полноценную интерактивную симуляцию.
- Сделать пошаговое раскрытие решений задач.
- Добавить ещё 3–5 материалов и проверить физическую точность.
- Написать тесты основных функций.

## **22–30**

дни

**Неделя 4 — проверка, запуск и демонстрация**

Результат: готовый проект, доступный по интернет-ссылке.

- Проверить права доступа, черновики и публикацию.
- Провести тестирование с учительницей.
- Настроить хостинг, домен при наличии бюджета и HTTPS.
- Настроить резервное копирование базы и загруженных файлов.
- Подготовить демонстрационный сценарий для защиты.

## **10. Какую интерактивную симуляцию сделать первой**

Я предлагаю начать с **силы трения**. Это хороший выбор для первого эксперимента: можно наглядно показать влияние силы прижатия и коэффициента трения.

## **Прототип физической лаборатории**

Ниже — интерактивная модель для проверки идеи. Она демонстрирует закон \\(F\_{\text{тр}}=\mu N\\) для модели предельного трения скольжения.

Масса тела

### **5 кг**

1 кг

10 кг

20 кг

Коэффициент трения μ

### **0.30**

0,05

0,4

0,8

Сила нормальной реакции N

### **49.05 Н**

Предельная сила трения μN

## **14.71 Н**

Упрощённая модель горизонтальной поверхности: \\(N=mg\\), \\(g=9{,}81\ \text{м/с}^2\\). В реальном случае сила трения покоя может быть меньше предельного значения, а направление трения зависит от возможного или фактического скольжения.

Эту модель пока не нужно встраивать в Django как есть: сначала проверим расчёт и логику, затем перенесём интерактивность в отдельный файл `static/physics/js/`. В итоге у учительницы будет возможность включить подходящую симуляцию в материал, а посетитель сможет менять параметры прямо на странице.

## **11. Git и контроль версий**

Ты уже работал с Git и GitHub, поэтому будем сохранять важные этапы разработки. Это поможет откатиться, если эксперимент с дизайном что-то сломает.

В корневой папке создай `.gitignore`:

```
.venv/
__pycache__/
*.py[cod]
.DS_Store
.env
db.sqlite3
media/
staticfiles/
```

Затем выполни:

```
git init
git add .
git commit -m "Initial physics website"
```

После каждого крупного этапа сохраняй изменения:

```
git add .
git commit -m "Add physics content models"
```

```
git add .
git commit -m "Create catalog and lesson pages"
```

Когда зависимости будут окончательно определены:

```
python -m pip freeze > requirements.txt
```

**Важно:** перед публикацией не добавляй пароли, секретный ключ Django и другие секреты в GitHub. Для первого локального прототипа стандартные настройки допустимы, но для публичного сайта их нужно подготовить отдельно.

## **12. Исправления перед расширением проекта**

Есть ещё два технических момента, которые лучше учесть до того, как учительница начнёт добавлять материалы.

**Первый — русские названия в адресах.** В `models.py` для обоих полей `slug` добавь параметр `allow_unicode=True`:

```
slug = models.SlugField(    "Адрес",    max_length=220,    unique=True,    blank=True,    allow_unicode=True,)
```

Для категории сделай аналогично. В `physics/urls.py` используй `<str:slug>` вместо `<slug:slug>` для страницы материала, чтобы маршрутизатор принимал кириллические адреса.

Если меняешь поле модели, проверь миграции:

```
python manage.py makemigrations
python manage.py migrate
```

**Второй — тестирование.** Минимум нужно проверить, что черновик не виден посетителям, опубликованный материал доступен, а поиск возвращает правильные результаты. Это лучше закрепить автоматическими тестами в `physics/tests.py`, прежде чем выкладывать сайт в интернет.

## **13. Публикация сайта в интернете**

На MacBook мы будем разрабатывать и проверять проект локально. Для демонстрации учительнице из другого места понадобится публичный сервер.

Для первой версии достаточно хостинга, который поддерживает Python/Django, переменные окружения, постоянное хранение загруженных файлов и PostgreSQL. Выбор конкретного провайдера сделаем ближе к четвёртой неделе, когда будет понятен бюджет и доступность сервиса.

Перед публикацией необходимо:

- установить `DEBUG = False`;
- задать уникальный секретный ключ через переменную окружения;
- настроить разрешённые домены;
- использовать HTTPS;
- проверить `python manage.py check --deploy`;
- настроить хранение загруженных изображений и резервные копии базы данных.

Официальная документация Django содержит подробный [чек-лист безопасного развёртывания](https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/?utm_source=chatgpt.com).&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.djangoproject.com\&sz=32)

Django



Не рассчитывай, что локальный `runserver` можно просто оставить запущенным вместо полноценного размещения. Он предназначен для разработки, а не для публичного production-сайта.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.djangoproject.com\&sz=32)

Django



## **14. Что должно быть готово к концу месяца**

## **Контрольный список проекта**

0 / 12

Неделя 1

Django запускается без ошибок

Каталог и страницы читают данные из базы

Учитель может создавать материалы в админке

Неделя 2

Готов гибридный дизайн

Работает поиск и фильтрация

Формулы и изображения отображаются корректно

Неделя 3

Работает интерактивная симуляция

Добавлены задачи с пошаговыми решениями

Подготовлены 8–12 качественных материалов

Неделя 4

Проверены черновики и права доступа

Учитель самостоятельно добавил материал

Сайт опубликован и подготовлен к защите

Скопировать план с отметками

**Мой главный совет:** в первую неделю не пытайся добиться идеального дизайна. Сначала добейся того, чтобы ты мог создать новую силу в админке, опубликовать её и увидеть на сайте. Это будет проверкой правильности всей архитектуры.

Затем будем последовательно улучшать визуал, добавлять научные эксперименты и делать кабинет учителя удобнее. Так за месяц ты получишь не просто эффектную презентацию, а работающий проект, который можно продолжать развивать после защиты.