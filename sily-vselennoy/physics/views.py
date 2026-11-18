from django.shortcuts import render

from .models import Category, Force


def home(request):
    forces = Force.objects.filter(published=True)[:6]
    categories = (
        Category.objects.filter(forces__published=True)
        .distinct()
        .order_by("name")
    )
    return render(
        request,
        "physics/home.html",
        {
            "forces": forces,
            "categories": categories,
        },
    )


def catalog(request):
    forces = Force.objects.filter(published=True).select_related("category")
    categories = (
        Category.objects.filter(forces__published=True)
        .distinct()
        .order_by("name")
    )

    query = request.GET.get("q", "").strip()
    category_slug = request.GET.get("category", "")

    if query:
        forces = forces.filter(title__icontains=query)
    if category_slug:
        forces = forces.filter(category__slug=category_slug)

    return render(
        request,
        "physics/catalog.html",
        {
            "forces": forces,
            "categories": categories,
            "query": query,
            "selected_category": category_slug,
        },
    )


def force_detail(request, slug):
    force = Force.objects.filter(published=True).select_related("category").get(slug=slug)
    examples = force.examples.all()
    problems = force.problems.all()
    return render(
        request,
        "physics/detail.html",
        {
            "force": force,
            "examples": examples,
            "problems": problems,
        },
    )