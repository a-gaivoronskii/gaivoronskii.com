const styles = {
  linen: { name: 'Fresh Linen', colors: ['#E5F0FB', '#C8DEF2', '#0F1F3A', '#3C5A85', '#2A7DC4', '#9BB8D8'], mood: 'is breathing easy.', alt: 'A calm room with a cream sofa, pale blue walls, and a wooden coffee table' },
  wood: { name: 'Quiet Wood', colors: ['#DDF0DC', '#B8DCB6', '#0E2A0F', '#2D5530', '#2E8B3D', '#88B486'], mood: 'feels composed.', alt: 'A warm, quiet room in the Quiet Wood home style' },
  loft: { name: 'Studio Loft', colors: ['#FAE5E0', '#F4C8BF', '#2C0F08', '#6E2E20', '#C75035', '#DDA89A'], mood: 'has room to think.', alt: 'A room with industrial character in the Studio Loft home style' },
};
const buttons = document.querySelectorAll('[data-style]');
buttons.forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.style;
  const style = styles[key];
  if (button.getAttribute('aria-pressed') === 'true') return;
  const update = () => {
    ['top', 'bottom', 'ink', 'muted', 'accent', 'line'].forEach((token, index) => document.documentElement.style.setProperty(`--${token}`, style.colors[index]));
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const image = document.getElementById('hero-art');
    image.src = `assets/${key}.jpg`;
    image.alt = style.alt;
    document.getElementById('home-mood').textContent = style.mood;
    document.getElementById('style-status').textContent = `${style.name} preview selected`;
    document.querySelector('meta[name="theme-color"]').content = style.colors[0];
  };
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(update);
  else update();
}));

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.faq details').forEach(details => {
  const summary = details.querySelector('summary');
  const answer = details.querySelector('p');
  let animation;
  let fade;
  let expanding = details.open;

  const settle = () => {
    details.open = expanding;
    delete details.dataset.expanding;
    details.style.removeProperty('overflow');
    animation = undefined;
    fade?.cancel();
    fade = undefined;
  };

  summary.addEventListener('click', event => {
    if (reducedMotion.matches || !details.animate) return;
    event.preventDefault();
    const startHeight = details.getBoundingClientRect().height;
    expanding = animation ? !expanding : !details.open;
    details.dataset.expanding = String(expanding);
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
    }
    fade?.cancel();

    // Measure the native closed/open layout, then keep content rendered through the animation.
    details.open = expanding;
    const endHeight = details.getBoundingClientRect().height;
    details.open = true;
    details.style.overflow = 'hidden';
    animation = details.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: 280, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
    fade = answer.animate(
      { opacity: expanding ? [0, 1] : [1, 0] },
      { duration: 180, easing: 'ease-out', fill: 'both' }
    );
    animation.onfinish = settle;
  });

  // Return to natural sizing if the viewport or motion preference changes mid-transition.
  window.addEventListener('resize', () => animation?.finish());
  reducedMotion.addEventListener('change', () => animation?.finish());
});
