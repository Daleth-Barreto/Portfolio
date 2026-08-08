import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

async function init() {
  const html = document.documentElement;
  if (html.getAttribute('data-mode') !== 'experience') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const ghostCanvas = document.querySelector('[data-ghost]');
  if (ghostCanvas) {
    const { createGhostScene } = await import('./ghost.js');
    createGhostScene(ghostCanvas);
  }

  const hero = document.querySelector('.hero');
  if (hero) {
    gsap.from('.hero-kicker, .hero-title, .hero-sub, .hero-note, .hero-cta, .bubble', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.15,
    });

    gsap.from('.hero-title .accent', {
      rotation: -6,
      transformOrigin: 'center bottom',
      duration: 0.9,
      ease: 'back.out(2)',
      delay: 0.55,
    });

    gsap.fromTo(
      '.ghost-stage',
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.35 }
    );

    gsap.to('.hero-inner', {
      yPercent: 42,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to('.ghost-stage', {
      yPercent: 16,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.utils.toArray('.sticker').forEach((s, i) => {
      gsap.to(s, {
        y: (i % 2 === 0 ? -1 : 1) * 22,
        x: (i % 2 === 0 ? 10 : -10),
        rotation: (i % 2 === 0 ? 2 : -2),
        duration: 2.4 + i * 0.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });
  }

  const bar = document.querySelector('.progress-bar i');
  if (bar) {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        bar.style.width = self.progress * 100 + '%';
      },
    });
  }

  const section = document.querySelector('.journey');
  if (section) {
    const scenes = gsap.utils.toArray('.journey-scene');
    const dots = gsap.utils.toArray('.journey-progress i');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=600%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.addLabel('s0', 0);
    tl.set(scenes[0], { autoAlpha: 1 });

    scenes.forEach((scene, i) => {
      if (i === 0) return;
      tl.fromTo(
        scene,
        { autoAlpha: 0, yPercent: 9, scale: 1.06 },
        { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1, ease: 'power2.out' },
        's' + (i - 1) + '+=0.1'
      )
        .to(scenes[i - 1], { autoAlpha: 0, yPercent: -6, scale: 0.95, duration: 0.8, ease: 'power2.in' }, '<0.15')
        .addLabel('s' + i, 's' + (i - 1) + '+=1.4');
    });

    tl.eventCallback('onUpdate', () => {
      const p = tl.progress();
      const idx = Math.min(dots.length - 1, Math.round(p * (scenes.length - 1)));
      dots.forEach((d, i) => d.classList.toggle('on', i === idx));
    });
  }

  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    const hashIdx = href.indexOf('#');
    if (hashIdx === -1 || href.length === 1) return;
    const id = href.slice(hashIdx + 1);
    const target = document.getElementById(id);
    if (!target) return;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -64, duration: 1.2 });
    });
  });

  const menu = document.querySelector('.menu');
  if (menu) {
    const onScroll = () => menu.classList.toggle('is-scrolled', lenis.scroll > 24);
    lenis.on('scroll', onScroll);
    onScroll();
  }

  html.classList.add('exp');
  ScrollTrigger.refresh();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}