import * as THREE from 'three';

function makeToonGradient() {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 1;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 4, 0);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.55, '#f4f4f2');
  grad.addColorStop(0.85, '#dcdcd8');
  grad.addColorStop(1, '#c0c0ba');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 4, 1);
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  return tex;
}

function ghostProfile() {
  return [
    new THREE.Vector2(0.0, 1.5),
    new THREE.Vector2(0.55, 1.4),
    new THREE.Vector2(0.92, 1.0),
    new THREE.Vector2(1.0, 0.6),
    new THREE.Vector2(0.98, 0.2),
    new THREE.Vector2(0.88, -0.1),
    new THREE.Vector2(0.78, -0.3),
  ];
}

function waveOffset(y, i, t) {
  const strength = THREE.MathUtils.clamp((0.15 - y) / 0.45, 0, 1);
  if (strength <= 0) return 0;
  return Math.sin(y * 6 + t * 3 + i * 0.7) * 0.14 * strength;
}

export function createGhostScene(canvas) {
  if (!canvas) return null;
  const mode = document.documentElement.getAttribute('data-mode');
  if (mode !== 'experience') return null;

  const container = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);

  const gradientMap = makeToonGradient();

  const ghost = new THREE.Group();

  const bodyGeo = new THREE.LatheGeometry(ghostProfile(), 60);
  // LatheGeometry with this profile is wound inward (normals point to the axis),
  // which made the BackSide outline render on the NEAR shell and cover the body.
  // Flip the winding so normals point outward.
  {
    const idx = bodyGeo.index;
    const arr = idx.array;
    for (let t = 0; t < arr.length; t += 3) {
      const tmp = arr[t + 1];
      arr[t + 1] = arr[t + 2];
      arr[t + 2] = tmp;
    }
    idx.needsUpdate = true;
  }
  const outlineGeo = bodyGeo.clone();

  const bodyBase = bodyGeo.attributes.position.array.slice();
  const outlineBase = new Float32Array(bodyGeo.attributes.position.count * 3);
  {
    const pos = bodyGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      outlineBase[i * 3] = x * 1.07;
      outlineBase[i * 3 + 1] = y + 0.05;
      outlineBase[i * 3 + 2] = z * 1.07;
    }
  }

  const bodyMat = new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap });
  const outlineMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a, side: THREE.BackSide });

  const body = new THREE.Mesh(bodyGeo, bodyMat);
  const outline = new THREE.Mesh(outlineGeo, outlineMat);
  outline.renderOrder = -1;

  const bodyGroup = new THREE.Group();
  bodyGroup.add(outline, body);
  ghost.add(bodyGroup);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
  const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const eyeGeo = new THREE.SphereGeometry(0.15, 24, 24);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.31, 0.42, 0.93);
  eyeL.scale.set(1, 1.45, 0.55);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.31;
  const glintGeo = new THREE.SphereGeometry(0.04, 12, 12);
  const glintL = new THREE.Mesh(glintGeo, glintMat);
  glintL.position.set(-0.37, 0.47, 0.98);
  const glintR = glintL.clone();
  glintR.position.x = 0.25;
  ghost.add(eyeL, eyeR, glintL, glintR);

  const mouthMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.07, 18, 18), mouthMat);
  mouth.position.set(0, 0.03, 1.0);
  mouth.scale.set(1, 0.85, 0.5);
  ghost.add(mouth);

  const glassesMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
  const lensGeo = new THREE.TorusGeometry(0.16, 0.028, 14, 32);
  const lensL = new THREE.Mesh(lensGeo, glassesMat);
  lensL.position.set(-0.31, 0.42, 1.03);
  lensL.rotation.x = Math.PI / 2;
  const lensR = lensL.clone();
  lensR.position.x = 0.31;
  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.34, 10), glassesMat);
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, 0.42, 1.03);
  ghost.add(lensL, lensR, bridge);

  const tieMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
  const tieGeo = new THREE.SphereGeometry(0.11, 20, 20);
  const tieL = new THREE.Mesh(tieGeo, tieMat);
  tieL.position.set(-0.15, -0.06, 1.0);
  tieL.scale.set(1, 0.7, 0.5);
  const tieR = tieL.clone();
  tieR.position.x = 0.15;
  const tieKnot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), tieMat);
  tieKnot.position.set(0, -0.06, 1.04);
  ghost.add(tieL, tieR, tieKnot);

  const hat = new THREE.Group();
  const brimGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.07, 40);
  const brim = new THREE.Mesh(brimGeo, new THREE.MeshToonMaterial({ color: 0x0a0a0a, gradientMap }));
  brim.position.y = 1.44;
  const crownGeo = new THREE.CylinderGeometry(0.3, 0.34, 0.52, 40);
  const crown = new THREE.Mesh(crownGeo, new THREE.MeshToonMaterial({ color: 0x0a0a0a, gradientMap }));
  crown.position.y = 1.73;
  const bandGeo = new THREE.CylinderGeometry(0.315, 0.345, 0.1, 40);
  const band = new THREE.Mesh(bandGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  band.position.y = 1.5;
  hat.add(brim, crown, band);
  ghost.add(hat);

  const armMat = new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap });
  const armOutlineMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a, side: THREE.BackSide });
  const armGeo = new THREE.CapsuleGeometry(0.09, 0.34, 6, 18);
  function makeArm(side) {
    const g = new THREE.Group();
    const a = new THREE.Mesh(armGeo, armMat);
    a.rotation.z = side === 1 ? -Math.PI / 2 : Math.PI / 2;
    a.position.x = side === 1 ? 0.62 : -0.62;
    const o = new THREE.Mesh(armGeo, armOutlineMat);
    o.scale.set(1.09, 1.09, 1.09);
    o.rotation.z = a.rotation.z;
    o.position.copy(a.position);
    g.add(o, a);
    g.position.set(side * 0.5, 0.28, 0);
    return g;
  }
  const armL = makeArm(-1);
  const armR = makeArm(1);
  ghost.add(armL, armR);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.95, 40),
    new THREE.MeshBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.14 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0.3, -1.05, 0);
  scene.add(shadow);

  ghost.position.x = 0.3;
  scene.add(ghost);

  camera.position.set(0, 0.25, 8.6);
  camera.lookAt(0.3, 0.12, 0);

  const light = new THREE.DirectionalLight(0xfff3e0, 1.6);
  light.position.set(0, 2.5, 6);
  scene.add(light);
  const fill = new THREE.DirectionalLight(0xb7c4ff, 0.5);
  fill.position.set(-5, 1.5, -3);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.35);
  rim.position.set(4, 0, -4);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const clock = new THREE.Clock();
  let raf = 0;
  let visible = true;
  let blinkAt = performance.now() + 2600 + Math.random() * 2400;
  let blinking = false;
  let blinkT = 0;
  const pointer = { x: 0, y: 0 };
  const targetCam = { x: 0, y: 0.25 };

  function onPointer(e) {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  window.addEventListener('pointermove', onPointer, { passive: true });

  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
  });
  io.observe(canvas);

  function applyWave(geo, base, t) {
    const pos = geo.attributes.position;
    const n = pos.count;
    for (let i = 0; i < n; i++) {
      const y = base[i * 3 + 1];
      const off = waveOffset(y, i, t);
      pos.setXYZ(i, base[i * 3] + off, y, base[i * 3 + 2] + off);
    }
    pos.needsUpdate = true;
  }

  function tick() {
    raf = requestAnimationFrame(tick);
    if (!visible || document.hidden) return;

    const t = clock.getElapsedTime();
    const bob = Math.sin(t * 1.5) * 0.12;

    ghost.position.y = -0.35 + bob;
    ghost.rotation.y = Math.sin(t * 0.5) * 0.09;
    ghost.rotation.z = Math.sin(t * 0.35) * 0.02;

    hat.rotation.z = Math.sin(t * 0.8) * 0.05;

    armL.rotation.z = Math.sin(t * 2.2) * 0.14 - 0.1;
    armR.rotation.z = Math.sin(t * 2.2 + Math.PI) * 0.14 + 0.1;

    const now = performance.now();
    if (!blinking && now > blinkAt) {
      blinking = true;
      blinkT = 0;
    }
    if (blinking) {
      blinkT += 0.02;
      const k = Math.sin(blinkT * Math.PI * 4);
      const sy = THREE.MathUtils.clamp(k, 0.12, 1);
      eyeL.scale.y = 1.45 * sy;
      eyeR.scale.y = 1.45 * sy;
      if (blinkT > 0.5) {
        blinking = false;
        eyeL.scale.y = 1.45;
        eyeR.scale.y = 1.45;
        blinkAt = now + 2600 + Math.random() * 2800;
      }
    }

    applyWave(outlineGeo, outlineBase, t);
    applyWave(bodyGeo, bodyBase, t);
    bodyGeo.computeVertexNormals();

    const shadowK = 0.78 + Math.abs(Math.sin(t * 1.5)) * 0.22;
    shadow.scale.set(shadowK, shadowK, 1);

    targetCam.x = THREE.MathUtils.lerp(targetCam.x, pointer.x * 0.35, 0.05);
    targetCam.y = THREE.MathUtils.lerp(targetCam.y, 0.25 - pointer.y * 0.18, 0.05);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCam.x, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCam.y, 0.06);
    camera.lookAt(0.3 + targetCam.x * 0.3, 0.12 + targetCam.y, 0);

    renderer.render(scene, camera);
  }
  tick();

  return function cleanup() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener('pointermove', onPointer);
    renderer.dispose();
    scene.traverse((o) => {
      if (o.isMesh) {
        o.geometry.dispose();
        o.material.dispose();
      }
    });
    gradientMap.dispose();
  };
}
