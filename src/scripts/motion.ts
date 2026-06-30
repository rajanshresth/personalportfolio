// Site-wide GSAP motion: scroll reveals, sticky-nav state, magnetic CTAs.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Sticky nav: compact + shadow once scrolled past the hero edge ──────────
const navWrap = document.querySelector<HTMLElement>('.nav-wrap');
if (navWrap) {
  ScrollTrigger.create({
    start: 'top -64',
    onUpdate: (self) => {
      navWrap.classList.toggle('nav-wrap--scrolled', self.scroll() > 64);
    },
  });
}

// ── Scroll reveals ──────────────────────────────────────────────────────────
const singles = gsap.utils.toArray<HTMLElement>('[data-reveal]');
const groups = gsap.utils.toArray<HTMLElement>('[data-reveal-group]');

if (prefersReducedMotion) {
  gsap.set(singles, { opacity: 1, y: 0 });
  groups.forEach((group) => gsap.set(Array.from(group.children), { opacity: 1, y: 0 }));
} else {
  singles.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    );
  });

  groups.forEach((group) => {
    const items = Array.from(group.children) as HTMLElement[];
    if (!items.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      },
    );
  });
}

// ── Magnetic CTAs (fine pointer only) ───────────────────────────────────────
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canHover && !prefersReducedMotion) {
  gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * 0.25);
      yTo((e.clientY - rect.top - rect.height / 2) * 0.35);
    });
    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}
