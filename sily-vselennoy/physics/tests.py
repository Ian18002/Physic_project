from django.test import TestCase
from django.urls import reverse

from .models import Category, Example, Force, Problem


class PhysicsPagesTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.category = Category.objects.create(
            name="Механика",
            description="Движение и силы",
        )
        cls.force = Force.objects.create(
            category=cls.category,
            title="Сила трения",
            definition="Сила, возникающая при соприкосновении поверхностей.",
            explanation="Она направлена против возможного движения.",
            formula="F = μN",
            formula_explanation="μ — коэффициент трения.",
            applications="Торможение и ходьба.",
            interesting_fact="Без трения не завязать узел.",
            published=True,
        )
        cls.draft = Force.objects.create(
            category=cls.category,
            title="Черновик",
            definition="Этот материал не опубликован.",
            published=False,
        )
        Example.objects.create(
            force=cls.force,
            title="Ходьба",
            description="Подошва отталкивается от поверхности.",
        )
        Problem.objects.create(
            force=cls.force,
            title="Брусок на поверхности",
            condition="m = 5 кг, μ = 0,3.",
            solution="F = μmg ≈ 14,7 Н.",
            answer="≈ 14,7 Н",
        )

    def test_home_page_renders_published_content(self):
        response = self.client.get(reverse("physics:home"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Сила трения")
        self.assertContains(response, "Механика")
        self.assertNotContains(response, "Черновик")

    def test_catalog_lists_only_published_forces(self):
        response = self.client.get(reverse("physics:catalog"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Сила трения")
        self.assertNotContains(response, "Черновик")

    def test_catalog_search_is_case_insensitive_for_cyrillic(self):
        response = self.client.get(reverse("physics:catalog"), {"q": "сила"})

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Сила трения")

    def test_catalog_filters_by_category(self):
        response = self.client.get(
            reverse("physics:catalog"),
            {"category": self.category.slug},
        )

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Сила трения")
        self.assertContains(response, "is-active")

    def test_detail_page_shows_examples_and_problems(self):
        response = self.client.get(
            reverse("physics:detail", args=[self.force.slug])
        )

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "F = μN")
        self.assertContains(response, "Ходьба")
        self.assertContains(response, "Брусок на поверхности")
        self.assertContains(response, "14,7 Н")

    def test_draft_detail_is_not_available(self):
        response = self.client.get(
            reverse("physics:detail", args=[self.draft.slug])
        )

        self.assertEqual(response.status_code, 404)
