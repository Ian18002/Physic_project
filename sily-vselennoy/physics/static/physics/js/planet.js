import * as THREE from "three";

const hero = document.querySelector(".home-hero");
const canvas = document.getElementById("earth-canvas");

if (hero && canvas) {
    try {
        initPlanet();
    } catch (error) {
        hero.classList.remove("planet-ready");
        hero.classList.add("planet-failed");
        console.warn("Не удалось запустить 3D-планету, показан резервный вариант.", error);
    }
}

function initPlanet() {
    const stage = canvas.closest(".planet-stage");
    const dayUrl = stage ? stage.dataset.earthDay : "";
    const specularUrl = stage ? stage.dataset.earthSpecular : "";
    const cloudsUrl = stage ? stage.dataset.earthClouds : "";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 220);

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = THREE.MathUtils.degToRad(-23.4);
    scene.add(earthGroup);

    const earthGeometry = new THREE.SphereGeometry(1.6, 128, 96);
    const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x0b1c38,
        specular: new THREE.Color(0x4d6fa8),
        shininess: 14,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.rotation.y = -1.35;
    earthGroup.add(earth);

    const atmosphereGeometry = new THREE.SphereGeometry(1.72, 96, 72);
    const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vNormalView;
            void main() {
                vNormalView = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormalView;
            void main() {
                vec3 viewNormal = normalize(vNormalView);
                float rim = pow(0.68 - dot(viewNormal, vec3(0.0, 0.0, 1.0)), 3.0);
                rim = clamp(rim, 0.0, 1.0);
                vec3 glow = vec3(0.23, 0.38, 0.86) * rim;
                gl_FragColor = vec4(glow, rim * 0.85);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.renderOrder = 2;
    earthGroup.add(atmosphere);

    const sunLight = new THREE.DirectionalLight(0xfff1dc, 2.95);
    sunLight.position.set(-4.2, 1.6, 4.6);
    scene.add(sunLight);

    const fillLight = new THREE.AmbientLight(0x23395f, 0.8);
    scene.add(fillLight);

    const textureLoader = new THREE.TextureLoader();
    let clouds = null;

    if (dayUrl) {
        textureLoader.load(
            dayUrl,
            function (texture) {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
                earthMaterial.map = texture;
                earthMaterial.needsUpdate = true;
            },
            undefined,
            function () {
                console.warn("Не удалось загрузить текстуру Земли, используется резервный материал.");
            }
        );
    }

    if (specularUrl) {
        textureLoader.load(
            specularUrl,
            function (texture) {
                earthMaterial.specularMap = texture;
                earthMaterial.needsUpdate = true;
            },
            undefined,
            function () {
                console.warn("Не удалось загрузить карту бликов Земли.");
            }
        );
    }

    if (cloudsUrl) {
        textureLoader.load(
            cloudsUrl,
            function (texture) {
                texture.colorSpace = THREE.SRGBColorSpace;
                const cloudMaterial = new THREE.MeshPhongMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.66,
                    depthWrite: false,
                    color: 0xffffff,
                    specular: new THREE.Color(0x1b2f4f),
                    shininess: 4,
                });

                clouds = new THREE.Mesh(new THREE.SphereGeometry(1.612, 96, 72), cloudMaterial);
                clouds.rotation.y = earth.rotation.y;
                clouds.rotation.z = THREE.MathUtils.degToRad(2.5);
                clouds.renderOrder = 1;
                earthGroup.add(clouds);
            },
            undefined,
            function () {
                console.warn("Не удалось загрузить облака Земли.");
            }
        );
    }

    const starGroup = new THREE.Group();
    starGroup.add(createStarLayer(900, 24, 62, 0.052, 0xaebfe6, 0.72, 1));
    starGroup.add(createStarLayer(220, 20, 48, 0.095, 0xf5efe2, 0.6, 2));
    scene.add(starGroup);

    function createStarLayer(count, minRadius, maxRadius, size, color, opacity, seed) {
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i += 1) {
            const radius = minRadius + Math.random() * (maxRadius - minRadius);
            const vertical = Math.random() * 2 - 1;
            const angle = Math.random() * Math.PI * 2;
            const horizontal = Math.sqrt(1 - vertical * vertical);

            positions[i * 3] = radius * horizontal * Math.cos(angle);
            positions[i * 3 + 1] = radius * vertical;
            positions[i * 3 + 2] = radius * horizontal * Math.sin(angle);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: color,
            size: size,
            sizeAttenuation: true,
            transparent: true,
            opacity: opacity,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const stars = new THREE.Points(geometry, material);
        stars.userData.drift = seed * 0.0004;
        return stars;
    }

    const pointer = { x: 0, y: 0 };

    window.addEventListener(
        "pointermove",
        function (event) {
            if (event.pointerType === "touch") {
                return;
            }
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
        },
        { passive: true }
    );

    function resize() {
        const width = hero.clientWidth;
        const height = hero.clientHeight;
        if (!width || !height) {
            return;
        }

        renderer.setSize(width, height, false);
        camera.aspect = width / height;

        const halfVerticalFov = THREE.MathUtils.degToRad(camera.fov / 2);
        const halfHorizontalFov = Math.atan(Math.tan(halfVerticalFov) * camera.aspect);
        const limitingHalfFov = Math.min(halfVerticalFov, halfHorizontalFov);
        const fill = 0.86;

        camera.position.z = 1.72 / Math.sin(limitingHalfFov * fill);
        camera.position.y = 0.08;
        camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const clock = new THREE.Clock();
    let isVisible = true;
    let firstFrame = true;

    if ("IntersectionObserver" in window) {
        const visibilityObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    isVisible = entry.isIntersecting;
                });
            },
            { threshold: 0.02 }
        );
        visibilityObserver.observe(hero);
    }

    renderer.domElement.addEventListener("webglcontextlost", function (event) {
        event.preventDefault();
        hero.classList.remove("planet-ready");
        hero.classList.add("planet-failed");
    });

    function animate() {
        window.requestAnimationFrame(animate);

        if (!isVisible) {
            return;
        }

        const delta = Math.min(clock.getDelta(), 0.05);

        if (!reduceMotion) {
            earth.rotation.y += delta * 0.047;
            if (clouds) {
                clouds.rotation.y += delta * 0.061;
            }
            starGroup.rotation.y += delta * 0.0018;
            earthGroup.position.x += (pointer.x * 0.1 - earthGroup.position.x) * 0.025;
            earthGroup.position.y += (-pointer.y * 0.065 - earthGroup.position.y) * 0.025;
        }

        renderer.render(scene, camera);

        if (firstFrame) {
            firstFrame = false;
            window.requestAnimationFrame(function () {
                hero.classList.add("planet-ready");
            });
        }
    }

    animate();
}
