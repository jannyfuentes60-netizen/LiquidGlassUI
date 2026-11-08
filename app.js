import { LiquidGlass } from "https://cdn.jsdelivr.net/npm/@ybouane/liquidglass/dist/index.js";

const root = document.querySelector("#root");
const glassElements = [...root.querySelectorAll("[data-glass]")];

const base = {
  nav: { cornerRadius: 22, zRadius: 18, refraction: 0.58, chromAberration: 0.025, edgeHighlight: 0.22, specular: 0.38, fresnel: 0.9, opacity: 0.96, tintStrength: 0.09, saturation: 0.12, shadowOpacity: 0.14, button: true },
  feature: { cornerRadius: 30, zRadius: 28, refraction: 0.72, chromAberration: 0.035, edgeHighlight: 0.3, specular: 0.55, fresnel: 1, blurAmount: 0.08, opacity: 0.96, tintStrength: 0.1, saturation: 0.16, shadowOpacity: 0.2 },
  side: { cornerRadius: 26, zRadius: 22, refraction: 0.68, chromAberration: 0.025, edgeHighlight: 0.25, specular: 0.48, fresnel: 1, blurAmount: 0.06, opacity: 0.96, tintStrength: 0.1, saturation: 0.12, shadowOpacity: 0.18 },
  controls: { cornerRadius: 26, zRadius: 22, refraction: 0.68, chromAberration: 0.025, edgeHighlight: 0.25, specular: 0.48, fresnel: 1, blurAmount: 0.06, opacity: 0.96, tintStrength: 0.1, saturation: 0.12, shadowOpacity: 0.18 }
};

function applyConfig(element, config) {
  element.dataset.config = JSON.stringify(config);
}

for (const element of glassElements) {
  applyConfig(element, base[element.dataset.glass]);
}

const refraction = document.querySelector("#refraction");
const blur = document.querySelector("#blur");
const light = document.querySelector("#light");
const refractionOutput = document.querySelector("#refraction-output");
const blurOutput = document.querySelector("#blur-output");
const lightOutput = document.querySelector("#light-output");
const refractionValue = document.querySelector("#refraction-value");

function updateMaterial() {
  const r = Number(refraction.value);
  const b = Number(blur.value);
  const l = Number(light.value);
  const feature = { ...base.feature, refraction: r, blurAmount: b, specular: l, edgeHighlight: Math.min(0.65, l * 0.55) };
  applyConfig(document.querySelector('[data-glass="feature"]'), feature);
  refractionOutput.value = r.toFixed(2);
  blurOutput.value = b.toFixed(2);
  lightOutput.value = l.toFixed(2);
  refractionValue.textContent = r.toFixed(2);
}

[refraction, blur, light].forEach((input) => input.addEventListener("input", updateMaterial));

document.querySelector("#reset").addEventListener("click", () => {
  refraction.value = "0.72";
  blur.value = "0.08";
  light.value = "0.55";
  updateMaterial();
});

try {
  const instance = await LiquidGlass.init({
    root,
    glassElements,
    defaults: { refraction: 0.68, chromAberration: 0.025, edgeHighlight: 0.24, specular: 0.45, fresnel: 1, opacity: 0.96 }
  });
  const gpuState = document.querySelector(".gpu-state");
  gpuState.lastChild.textContent = " WEBGL ACTIVE";
  window.addEventListener("pagehide", () => instance.destroy(), { once: true });
  window.liquidGlassUI = instance;
} catch (error) {
  console.error("LiquidGlassUI could not initialize:", error);
  const gpuState = document.querySelector(".gpu-state");
  gpuState.lastChild.textContent = " FALLBACK MODE";
  document.body.classList.add("glass-fallback");
}