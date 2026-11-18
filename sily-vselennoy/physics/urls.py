from django.urls import path

from . import views

app_name = "physics"

urlpatterns = [
    path("", views.home, name="home"),
    path("forces/", views.catalog, name="catalog"),
    path("forces/<str:slug>/", views.force_detail, name="detail"),
]