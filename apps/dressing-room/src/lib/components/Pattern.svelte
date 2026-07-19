<script lang="ts">
export let prefix: string = '';
</script>

<defs>
  <!-- Mint Blocks -->
  <pattern id="{prefix}mintBlocks" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="16" height="16" fill="#A8FFEB" />
    <rect x="0" y="0" width="8" height="8" fill="#5FFFD7" />
    <rect x="8" y="8" width="8" height="8" fill="#5FFFD7" />
  </pattern>

  <!-- Peach Stripes -->
  <pattern id="{prefix}peachStripes" width="12" height="12" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="12" height="12" fill="#FFD6B0" />
    <rect x="0" y="0" width="6" height="12" fill="#FFB07C" />
  </pattern>

  <!-- Sky Dots -->
  <pattern id="{prefix}skyDots" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="16" height="16" fill="#B3E5FC" />
    <circle cx="8" cy="8" r="4" fill="#4FC3F7" />
  </pattern>

  <!-- Lemon Grid -->
  <pattern id="{prefix}lemonGrid" width="20" height="20" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="20" height="20" fill="#FFF9B0" />
    <rect x="0" y="0" width="10" height="10" fill="#FFF176" />
    <rect x="10" y="10" width="10" height="10" fill="#FFF176" />
  </pattern>

  <!-- Lavender Diagonal -->
  <pattern id="{prefix}lavenderDiagonal" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="16" height="16" fill="#E1BEE7" />
    <polygon points="0,0 16,0 16,16" fill="#BA68C8" />
  </pattern>

  <!-- Aqua Checker -->
  <pattern id="{prefix}aquaChecker" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="16" height="16" fill="#B2EBF2" />
    <rect x="0" y="0" width="8" height="8" fill="#00BCD4" />
    <rect x="8" y="8" width="8" height="8" fill="#00BCD4" />
  </pattern>

  <!-- Rose Waves -->
  <pattern id="{prefix}roseWaves" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="16" height="16" fill="#FFB6C1" />
    <rect x="0" y="4" width="16" height="4" fill="#FF69B4" />
    <rect x="0" y="12" width="16" height="4" fill="#FF69B4" />
  </pattern>

  <!-- Lime Triangles -->
  <pattern id="{prefix}limeTriangles" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="16" height="16" fill="#D4FF72" />
    <polygon points="0,16 8,0 16,16" fill="#AEEA00" />
  </pattern>

  <!-- Sand Zigzag -->
  <pattern id="{prefix}sandZigzag" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="16" height="16" fill="#FFE0B2" />
    <polyline points="0,8 4,4 8,12 12,4 16,8" fill="none" stroke="#FFB300" stroke-width="3" />
  </pattern>

  <!-- Slate Cross -->
  <pattern id="{prefix}slateCross" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="16" height="16" fill="#B0BEC5" />
    <rect x="6" y="0" width="4" height="16" fill="#607D8B" />
    <rect x="0" y="6" width="16" height="4" fill="#607D8B" />
  </pattern>
</defs>