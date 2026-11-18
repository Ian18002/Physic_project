from django.contrib import admin

from .models import Category, Example, Force, Problem


class ExampleInline(admin.TabularInline):
    model = Example
    extra = 1


class ProblemInline(admin.StackedInline):
    model = Problem
    extra = 0


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)


@admin.register(Force)
class ForceAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "published", "updated_at")
    list_filter = ("category", "published")
    search_fields = ("title", "definition")
    list_editable = ("published",)
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ExampleInline, ProblemInline]


@admin.register(Example)
class ExampleAdmin(admin.ModelAdmin):
    list_display = ("title", "force", "order")
    search_fields = ("title", "description")


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ("title", "force", "order")
    search_fields = ("title", "condition")