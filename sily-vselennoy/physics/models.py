from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """Раздел физики, например «Механика»."""

    name = models.CharField("Название", max_length=100)
    slug = models.SlugField(
        "Адрес",
        max_length=120,
        unique=True,
        blank=True,
        allow_unicode=True,
    )
    description = models.TextField("Описание", blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Force(models.Model):
    """Физическая сила, закон или тема."""

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="forces",
        verbose_name="Категория",
    )
    title = models.CharField("Название", max_length=200)
    slug = models.SlugField(
        "Адрес",
        max_length=220,
        unique=True,
        blank=True,
        allow_unicode=True,
    )
    definition = models.TextField("Определение")
    explanation = models.TextField("Объяснение", blank=True)
    formula = models.CharField("Формула", max_length=200, blank=True)
    formula_explanation = models.TextField("Расшифровка формулы", blank=True)
    applications = models.TextField("Применение в жизни", blank=True)
    interesting_fact = models.TextField("Интересный факт", blank=True)
    published = models.BooleanField("Опубликовано", default=True)
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Сила / закон"
        verbose_name_plural = "Силы и законы"
        ordering = ["-created_at"]


class Example(models.Model):
    """Пример применения силы из реальной жизни."""

    force = models.ForeignKey(
        Force,
        on_delete=models.CASCADE,
        related_name="examples",
        verbose_name="Сила",
    )
    title = models.CharField("Название примера", max_length=200)
    description = models.TextField("Описание")
    order = models.PositiveIntegerField("Порядок", default=1)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Пример"
        verbose_name_plural = "Примеры"
        ordering = ["order", "title"]


class Problem(models.Model):
    """Задача с условием, решением и ответом."""

    force = models.ForeignKey(
        Force,
        on_delete=models.CASCADE,
        related_name="problems",
        verbose_name="Сила",
    )
    title = models.CharField("Название задачи", max_length=200)
    condition = models.TextField("Условие")
    solution = models.TextField("Решение", blank=True)
    answer = models.CharField("Ответ", max_length=200, blank=True)
    order = models.PositiveIntegerField("Порядок", default=1)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"
        ordering = ["order", "title"]