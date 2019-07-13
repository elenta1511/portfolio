const parallaxBudda = document.querySelector(".parallax_budda");
const layersBudda = parallaxBudda.children;

function moveLayers(wScroll) {

  Array.from(layersBudda).forEach(layerBudda => {
    const divider = layerBudda.dataset.speed;
    const strafe = wScroll*divider;

    layerBudda.style.transform = `translateY(-${strafe}%)`;
});
}

  window.addEventListener('scroll', e => {
    const wScroll = window.pageYOffset;
    moveLayers(wScroll);
  });