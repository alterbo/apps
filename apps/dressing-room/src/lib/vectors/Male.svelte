<script lang="ts">
  let { active = false } = $props();
</script> 

<g class="body">
  <path d="M13.4 33.6H7.8l-.5-10c0-.9.2-2.5.7-3.6s3.4-2 4.4-2l6.5-.4c.4 0 1.4-.5 2-2.6h6q0 .6.7 1.6c.3.5 1.2.9 1.6 1 1.7 0 5.5.3 6.8.5 1.7.1 2 .8 3.4 1.6 1.1.6 1 2.4.8 3.2l-.5 11h-5.4l.2-10.4L31.3 50h-15l-3-26.5z"/>
  <path d="m23.5 50.5-5 48.5-3-26.5 1-23-2.5-26-.5 10L13 42l-5.5 1V23.5c0-2.5 2.5-5.5 4-5.5h7c.8 0 2-1.7 2.5-2.5h6c.3.8 1.3 2.5 2.5 2.5h7c1 0 4 2 4 4 0 1.6-.3 16.2-.5 19.5h-5.5v-18l-2.5 27v22L29.5 99zM18.5 7.5c-.4 2.8 1.5 6.2 2.5 7.5h6q2.1-3.7 2-7.5c0-2.5-2-5-3.5-5.5s-2 0-3.5 0-3 2-3.5 5.5Z"/>
</g>
<g data-active={ active } class="arm-right">
   <path d="m7 43 14.5 14 4-3-13-12.5"/>
</g>
<g data-active={ active } class="arm-left">
  <path d="M34.5 41 22 55.5l4.5 1.5 14-15.5"/>
</g>

<style>
.arm-left,
.arm-right {
    transform: rotate(0deg);
    transition: transform 1s ease-in-out;
}

.arm-left {
    transform: rotate(0);
    transform-origin: 70% 40%;
}

.arm-right {
    transform: rotate(0);
    transform-origin: 30% 41%;
}

[data-active=true] {
  &.arm-left {
    transform: rotate(-42.5deg);
  }
  &.arm-right {
    transform: rotate(42.5deg);
  }
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