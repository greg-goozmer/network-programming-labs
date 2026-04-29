import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function renderProductModel(containerId, modelPath) {
    const modelContainer = document.getElementById(containerId);

    if (!modelContainer) {
        return;
    }

    modelContainer.innerHTML = '';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);

    const camera = new THREE.PerspectiveCamera(
        45,
        modelContainer.clientWidth / modelContainer.clientHeight,
        0.1,
        1000
    );

    camera.position.set(0, 1.5, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    modelContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(3, 5, 4);
    scene.add(directionalLight);

    const loader = new GLTFLoader();

    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene;
            scene.add(model);

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.x -= center.x;
            model.position.y -= box.min.y;
            model.position.z -= center.z;

            camera.position.set(0, size.y * 0.9 + 1, size.z * 2 + 2);
            controls.target.set(0, size.y * 0.5, 0);
            controls.update();

            animate();
        },
        undefined,
        (error) => {
            modelContainer.innerHTML = '<div class="text-danger">3D модель не загрузилась</div>';
            console.error(error);
        }
    );

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
}