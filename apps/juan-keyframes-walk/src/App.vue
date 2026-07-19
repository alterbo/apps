<template>
  <div class="header">
    <h1>Juan Keyframes walk</h1>
    <p>21-03-2025. Alberto Ferrero</p>
  </div>
  <svg
    class="svg-main"
    fill="none"
    height="100%"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 858 1015"
    :style="{
      transform: `translate(${animationState.horizontalTranslation}px, ${animationState.verticalTranslation}px)`,
    }"
  >
    <BodyPart
      part="body"
      :anchor="INITIAL_ANCHOR_VALUES.BODY"
      :rotation="animationState.bodyRotation"
    >
      <BodyPart
        part="neck"
        :anchor="INITIAL_ANCHOR_VALUES.NECK"
        :rotation="animationState.headRotation"
      >
        <path
          d="M426 175c.8 8-9 20.7-14 26l31 54c7-18 20-54 16-54-5 0-10-7-10-18-3.4-35.2-16.7-20-23-8Z"
        />
        <BodyPart
          part="head"
          :anchor="INITIAL_ANCHOR_VALUES.HEAD"
          :rotation="animationState.headRotation"
        >
          <path
            d="M398 61c-3-16 28-36 45-38 11-1.3 36.4.2 50 17l-21 71-5 57c-13.7-2.3-42.8-9.8-50-21-9-14-16-70-19-86Z"
          />
        </BodyPart>
        <BodyPart
          part="mustache"
          :anchor="INITIAL_ANCHOR_VALUES.MUSTACHE"
          :rotation="animationState.headRotation"
        >
          <path
            class="mustache"
            :fill="`var(--color-accent)`"
            d="M434 108c7.2-2.4 17 5 21 9 9-6 5.2-20.7 22 0 13 16 31.2 9.5 41.5 7.5-1.7 4.3-13.5 9.7-21.5 14.5-10 6-21-2-30-8s-12 0-21 0-30 15-40 13c-8-1.6-12-9.3-13-13 29 4 32-20 41-23Z"
          />
          <text x="420" y="90" font-size="36">{{ countdownTimer[0] }}</text>
          <text x="460" y="90" font-size="36">{{ countdownTimer[1] }}</text>
        </BodyPart>
      </BodyPart>
      <BodyPart
        part="left-arm-1"
        :anchor="INITIAL_ANCHOR_VALUES.LEFT_ARM_1"
        :rotation="animationState.topRotation"
      >
        <path
          d="M467.4 215.4c-1.5-14.2 13-13.9 20.5-12 2.8 20 8.5 63.4 8.8 77.8.5 18-6.4 19.6-13.3 21.2-7 1.5-13.5-8.6-19.3-18.1-5.8-9.6 5.1-51.2 3.3-69Z"
        ></path>
        <BodyPart
          part="left-arm-2"
          :anchor="INITIAL_ANCHOR_VALUES.LEFT_ARM_2"
          :rotation="animationState.topRotation"
        >
          <path
            d="M469.9 292.3c2.8-8.4 16.4 2.7 22.9 9.3 3 3-.3 43.7.3 49 .4 4.3-.5 49.4-1 71.4l-11.7-12-7-59c-2.3-16-6.4-50.2-3.5-58.7Z"
          />
          <BodyPart
            part="left-arm-3"
            :anchor="INITIAL_ANCHOR_VALUES.LEFT_ARM_3"
            :parentRotation="0"
            :rotation="animationState.topRotation"
          >
            <path d="m493.1 464.7-.2-40.2-8.6-6.5c1.3 3.7-.7 19.3-.7 19.3s1.7 23 9.5 27.4Z" />
          </BodyPart>
        </BodyPart>
      </BodyPart>
      <path
        d="M458.2 456.9c-10 17-38 18-56 19-51-13-26-48-20-57s20-108 20-133-37-60-26-78c8.8-14.4 21-10.7 26-7l24 7 11 32c7-13 22.2-39 27-39 6 0 16 11 9 20s-2 169 0 180-5 39-15 56Z"
      />
      <BodyPart
        part="left-leg-1"
        :anchor="INITIAL_ANCHOR_VALUES.LEFT_LEG_1"
        :rotation="-animationState.mainLegRotation"
      >
        <path d="M456.5 728c-16.7-63-50.3-193-51.2-210l60.3-70-9.1 280Z" />
        <BodyPart
          part="left-leg-2"
          :anchor="INITIAL_ANCHOR_VALUES.LEFT_LEG_2"
          :rotation="animationState.rotation"
        >
          <path
            d="M430.5 711.1c-1.2-9.5 6.6-22.5 10.7-27.7 4.4-6.8 21.6 14 29.6 25.4l-3.6 215.8-11 51.2-3.5-18.9a31989 31989 0 0 0-22.2-245.8Z"
          />
          <BodyPart
            part="left-leg-3"
            :anchor="INITIAL_ANCHOR_VALUES.LEFT_LEG_3"
            :rotation="animationState.rotation"
          >
            <path d="M437 978c-4.8-16.8 7.3-27 14-30l56 10v20c-23.3-.3-70-.8-70 0Z" />
            <BodyPart
              part="left-leg-4"
              :anchor="INITIAL_ANCHOR_VALUES.LEFT_LEG_4"
              :rotation="-animationState.shoeRotation"
            >
              <path d="M510 977v-17l26 9v8h-26Z" />
            </BodyPart>
          </BodyPart>
        </BodyPart>
      </BodyPart>
      <BodyPart
        part="right-leg-1"
        :anchor="INITIAL_ANCHOR_VALUES.RIGHT_LEG_1"
        :rotation="animationState.mainLegRotation"
      >
        <path
          d="M421 424.7a74.6 74.6 0 0 1 31.6 36c15.9 50-18.5 176-22.5 194.1-4 18.2-15.6 43-17.6 52.8-1.7 7.8 0 21.2 1 27l-14.2-31.4c-13.1-89.2-36.2-270.4-23.5-281.5 15.7-13.8 21.9-9.9 45.1 3Z"
        />
        <BodyPart
          part="right-leg-2"
          :anchor="INITIAL_ANCHOR_VALUES.RIGHT_LEG_2"
          :rotation="-animationState.rotation"
        >
          <path
            d="M398 690.3c5-5.4 12-2 15 .3 6.5 7.5-2.4 14-7 18-3.6 3.1 3.6 18.1 7.6 25.2-4.6 81.5-14.3 246-17 252.6-3.4 8.3-18.6 3-26-13-7.5-16.2 15.5-52.2 17.8-66.2 2.4-14-8.6-155.8-7.2-177a62.5 62.5 0 0 1 16.9-40Z"
          />
          <BodyPart
            part="right-leg-3"
            :anchor="INITIAL_ANCHOR_VALUES.RIGHT_LEG_3"
            :rotation="animationState.rotation"
          >
            <path d="M371 991c-9.6-16.8-4-31 0-36l71 13v23h-71Z" />
            <BodyPart
              part="right-leg-4"
              :anchor="INITIAL_ANCHOR_VALUES.RIGHT_LEG_4"
              :rotation="-animationState.shoeRotation"
            >
              <path d="M442 992v-22l33 12v10h-33Z" />
            </BodyPart>
          </BodyPart>
        </BodyPart>
      </BodyPart>
      <BodyPart
        part="right-arm-1"
        :anchor="INITIAL_ANCHOR_VALUES.RIGHT_ARM_1"
        :rotation="-animationState.topRotation"
      >
        <path
          d="M358.6 312c-5.4-8.5-8.6-94.2-2.5-110.6 14.5-21.9 37.3 9.9 38.7 16.4 1.4 6.6-5.9 77.6-9.8 87.2-3.9 9.5-21 15.4-26.4 7Z"
        />
        <BodyPart
          part="right-arm-2"
          :anchor="INITIAL_ANCHOR_VALUES.RIGHT_ARM_2"
          :rotation="-animationState.topRotation"
        >
          <path
            d="M353.1 438.3c.5-35 1.7-106.2 2.2-111.5.4-15.3 22.3-8.9 25-10 2.9-1-11.7 103.6-12.3 110.3-.4 5.3-10.1 9.7-14.9 11.2Z"
          />
          <BodyPart
            part="right-arm-3"
            :anchor="INITIAL_ANCHOR_VALUES.RIGHT_ARM_3"
            :rotation="-animationState.topRotation"
          >
            <path d="M351.6 476a58.6 58.6 0 0 0 9.3-40l-12.5 8.4c.6 8 2.1 25.6 3.2 31.6Z" />
          </BodyPart>
        </BodyPart>
      </BodyPart>
    </BodyPart>
  </svg>
  <button :disabled="isAnimating" @click="startAnimation">Walk</button>
</template>

<script setup lang="ts">
import { ref, onUnmounted, reactive } from 'vue'
import BodyPart from './components/body-part.vue'

const INITIAL_ANCHOR_VALUES = {
  BODY: { x: 422.5, y: 435.5 },
  NECK: { x: 435.5, y: 208.5 },
  HEAD: { x: 440.5, y: 159.5 },
  MUSTACHE: { x: 440.5, y: 159.5 },
  LEFT_ARM_1: { x: 477.5, y: 213.5 },
  LEFT_ARM_2: { x: 480.5, y: 296.5 },
  LEFT_ARM_3: { x: 488.5, y: 420.5 },
  LEFT_LEG_1: { x: 422.5, y: 434.5 },
  LEFT_LEG_2: { x: 451.5, y: 694.5 },
  LEFT_LEG_3: { x: 456.5, y: 962.5 },
  LEFT_LEG_4: { x: 509.5, y: 968.5 },
  RIGHT_LEG_1: { x: 422.5, y: 434.5 },
  RIGHT_LEG_2: { x: 402.5, y: 703.5 },
  RIGHT_LEG_3: { x: 381.5, y: 968.5 },
  RIGHT_LEG_4: { x: 442.5, y: 980.5 },
  RIGHT_ARM_1: { x: 370.5, y: 217.5 },
  RIGHT_ARM_2: { x: 364.5, y: 315.5 },
  RIGHT_ARM_3: { x: 355.5, y: 439.5 },
}
const animationState = reactive({
  bodyRotation: 0,
  headRotation: 0,
  horizontalTranslation: 0,
  verticalTranslation: 0,
  mainLegRotation: 0,
  shoeRotation: 0,
  topRotation: 0,
  rotation: 0,
})
const isAnimating = ref(false)
const countdownTimer = ref('10')

const stepRotations = [
  {
    bodyRotation: 0.5,
    headRotation: 0.5,
    horizontalTranslation: 10,
    verticalTranslation: 2,
    mainLegRotation: 50,
    shoeRotation: 25,
    topRotation: 25,
    rotation: 20,
  },
  {
    bodyRotation: 0.5,
    headRotation: 0.5,
    horizontalTranslation: -10,
    verticalTranslation: 0,
    mainLegRotation: 10,
    shoeRotation: 0,
    topRotation: 10,
    rotation: 0,
  },
  {
    bodyRotation: -2.5,
    headRotation: -1.5,
    horizontalTranslation: -20,
    verticalTranslation: -5,
    mainLegRotation: -65,
    shoeRotation: 25,
    topRotation: -25,
    rotation: -20,
  },
  {
    bodyRotation: -0.5,
    headRotation: -0.5,
    horizontalTranslation: -10,
    verticalTranslation: 0,
    mainLegRotation: -10,
    shoeRotation: 0,
    topRotation: -10,
    rotation: 0,
  },
]

let intervalId: number
let timeoutId: number

const startAnimation = () => {
  if (!isAnimating.value) {
    isAnimating.value = true
    let stepIndex = 0
    let countdown = 10
    intervalId = setInterval(() => {
      const step = stepRotations[stepIndex]
      Object.assign(animationState, step)
      stepIndex = (stepIndex + 1) % stepRotations.length
      countdown -= 1
      countdownTimer.value = countdown.toString().padStart(2, '0')
    }, 500)
    timeoutId = setTimeout(() => {
      stopAnimation()
    }, 10000)
  }
}

const stopAnimation = () => {
  if (isAnimating.value) {
    isAnimating.value = false
    clearInterval(intervalId)
    clearTimeout(timeoutId)
    countdownTimer.value = '00'
    Object.assign(animationState, {
      bodyRotation: 0,
      headRotation: 0,
      horizontalTranslation: 0,
      verticalTranslation: 0,
      mainLegRotation: 0,
      shoeRotation: 0,
      topRotation: 0,
      rotation: 0,
    })
  }
}

onUnmounted(() => {
  stopAnimation()
})
</script>

<style>
button {
  border: 0;
  margin: 1rem auto 3rem;
  padding: 1rem;
  background-color: var(--color-accent);
  color: var(--bg-color);
}

button:disabled {
  background-color: initial;
  color: initial;
}

g {
  transition: transform 1000ms linear;
}

svg {
  fill: var(--bg-color);
  stroke: var(--color-accent);
  transition: transform 1000ms linear;
  margin: 0 auto;
  max-height: 50vh;
  overflow: visible;
  text {
    fill: var(--color-accent);
  }
  path:not(.mustache) {
    fill: var(--bg-color);
    stroke-width: 3;
  }
}

.header {
  color: var(--color);
  font-family: 'Arial', sans-serif;
  margin: 1rem auto;
  text-align: center;
}
</style>
