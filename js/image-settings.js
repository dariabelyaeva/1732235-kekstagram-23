import '../nouislider/nouislider.js';
const SCALE_STEP_PERCENT = 25;
const SCALE_MIN_VALUE_PERCENT = 25;
const SCALE_MAX_VALUE_PERCENT = 100;
const DEFAULT_SCALE_VALUE_PERCENT = 100;

const scaleControl = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const uploadPhoto = document.querySelector('.img-upload__preview');
const imageEffects = document.querySelector('.img-upload__effects');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const imageUploadEffectLevel = document.querySelector('.img-upload__effect-level');

const scalePhotoHandler = (scale) => {
  uploadPhoto.style.transform = `scale(${scale/100})`;
};

const downscaleHandler = () => {
  const currentValue = parseInt(scaleControl.value, 10);
  const newValue = currentValue - SCALE_STEP_PERCENT;
  if (newValue < SCALE_MIN_VALUE_PERCENT) {
    return;
  }
  scaleControl.value = `${newValue}%`;
  scalePhotoHandler(newValue);
};
scaleSmaller.addEventListener('click', downscaleHandler);

const upscaleHandler = () => {
  const currentValue = parseInt(scaleControl.value, 10);
  const newValue = currentValue + SCALE_STEP_PERCENT;
  if (newValue > SCALE_MAX_VALUE_PERCENT) {
    return;
  }
  scaleControl.value = `${newValue}%`;
  scalePhotoHandler(newValue);
};
scaleBigger.addEventListener('click', upscaleHandler);

const getDefaultScale = () => {
  scaleControl.value = `${DEFAULT_SCALE_VALUE_PERCENT}%`;
  scalePhotoHandler(DEFAULT_SCALE_VALUE_PERCENT);
};


const effects = {
  none: {filter: '', step: 1, unit: '', min: 1, max: 100, className: 'effects__preview--none'},
  chrome: {filter: 'grayscale', step: 0.1, unit: '', min: 0, max: 1, className: 'effects__preview--chrome'},
  sepia: {filter: 'sepia', step: 0.1, unit:'', min: 0, max: 1, className: 'effects__preview--sepia'},
  marvin: {filter: 'invert', step: 1, unit: '%', min: 0, max: 100, className: 'effects__preview--marvin'},
  phobos: {filter: 'blur', step: 0.1, unit: 'px', min: 0, max: 3, className: 'effects__preview--phobos'},
  heat: {filter: 'brightness', step: 0.1, unit: '', min: 1, max: 3, className: 'effects__preview--heat'},
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const resetEffect = () => {
  imageUploadEffectLevel.classList.add('hidden');
  uploadPhoto.style.filter = 'none';
  getDefaultScale();
};

const addEffectHandler = (evt) => {
  const effectKey = evt.target.value;
  if (!effectKey) {
    return;
  }
  const effectDescription = effects[effectKey];
  slider.noUiSlider.updateOptions({
    range: {
      min: effectDescription.min,
      max: effectDescription.max,
    },
    step: effectDescription.step,
    start: effectDescription.max,
  });
  if(effectKey === 'none') {
    resetEffect();
  }
  uploadPhoto.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  uploadPhoto.classList.add(effectDescription.className);
};

slider.noUiSlider.on('update', (_, handle, unencoded) => {
  const level = unencoded[handle];
  const effectKey = document.querySelector('input[name=effect]:checked').value;
  const effectDescription = effects[effectKey];
  effectLevel.value = level;
  getDefaultScale();
  imageUploadEffectLevel.classList.remove('hidden');
  uploadPhoto.style.filter = `${effectDescription.filter}(${level}${effectDescription.unit})`;
});
imageEffects.addEventListener('click', addEffectHandler);

export {resetEffect};
