<script lang="ts">
  let { active } = $props();
</script>  

<g class="female">
  <path class="solid" d="M15 21C16 20.3333 18 18.3 18 15.5C18 12 17.5 9.49999 19 7.99999C20.5 6.49999 23 4.99999 25 5.49999C27 5.99999 26.5 7 27.5 7C28.5 7 30.5 20.5 32 21"/>
  <path d="M19.5 12.5C19.5 15.5 23.5 19 23.5 19.5C24.5 18.6667 26.6 16.8 27 16C27.5 15 28 10 28 9C28 8 27 7.00001 25.5 6.50001C24 6.00001 22.5 6.50001 21.5 7.00001C20.5 7.50001 19.5 9.50001 19.5 12.5Z"/>
  <path d="M22 19.5C21.5 20.1667 20.2 21.5 19 21.5C17.5 21.5 14 21 13 22.5C12 24 11.5 27 11.5 28.5C11.5 30 10.5 45 10.5 44.5C10.5 44.1 12.5 42.3333 13.5 41.5L15 27L16 34C16.3333 35 17.1 37.1 17.5 37.5C18 38 18 46.5 17.5 47.5C17 48.5 15.5 55.5 16 59.5C16.4 62.7 18.5 86.8333 19.5 98.5L23.5 54.5L27 98.5C28 88.1667 30 67.3 30 66.5C30 65.5 31 57 31 54.5C31 52 30 46.5 29.5 44.5C29.1 42.9 29.3333 38.5 29.5 36.5C30.1667 35.8333 31.5 34.3 31.5 33.5C31.5 32.7 32.1667 28.8333 32.5 27L33.5 41L36.5 43.5C36.3333 36.3333 35.8 22.9 35 22.5C34 22 33 21.5 31.5 21.5C30 21.5 28 21.5 27 21.5C26 21.5 25 20.5 25 19.5C24.5 19.8333 23.2 20.3 22 19.5Z"/>
</g>
<g data-active={ active } class="arm-right">
  <path d="M13.5 41C12.5 42 10.5 44.1 10.5 44.5L21.5 58.5H23V57.5L13.5 41Z"/>
</g>
<g data-active={ active } class="arm-left">
  <path d="M24 58L33.5 41L36.5 44L26.5 58H24Z"/>
</g>

<style>
.arm-left,
.arm-right {
    transform: rotate(0deg);
    transition: transform 1s ease-in-out;
}

.arm-left {
    transform: rotate(0);
    transform-origin: 69% 42%;
}

.arm-right {
    transform: rotate(0);
    transform-origin: 31% 42%;
}

[data-active=true] {
  &.arm-left {
    transform: rotate(-45deg);
  }
  &.arm-right {
    transform: rotate(45deg);
  }
}

path.solid {
  fill: var(--color-text-strong);
}

path {
  fill: var(--color-text-muted);
  stroke: none;
}

:global([data-animations="false"]) {
  .arm-left,
  .arm-right {
    transition: none;
    transition-duration: 0;
  }
}
</style>