<template>
  <g
    :transform="computedTransform"
    :style="{
      transformOrigin: `${props.anchor.x}px ${props.anchor.y}px`,
      transform: `rotate(${props.rotation}deg)`,
    }"
  >
    <slot />
    <circle :cx="anchor.x" :cy="anchor.y" r="8" :fill="`var(--bg-color-accent)`" stroke="none" />
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  part: string
  anchor: { x: number; y: number }
  rotation: number
}

const props = defineProps<Props>()

const computedTransform = computed(() => {
  const x = Math.round(props.anchor.x)
  const y = Math.round(props.anchor.y)
  return `rotate(${props.rotation}, ${x}, ${y})`
})
</script>
