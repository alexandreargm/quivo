<template>
  <aside
    class="base-drawer"
    :class="[mode, size]"
  >
    <header class="base-drawer__header">
      <slot name="header" />
    </header>

    <div class="base-drawer__body">
      <slot />
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'absolute',
      validator: function (value) {
        return ['absolute', 'block', 'fixed'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'base',
      validator: function (value) {
        return ['base', 'sm', 'lg', 'full'].includes(value)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.base-drawer {
  background-color: var(--background-secondary);
}

// Mode
.base-drawer.absolute {
  bottom: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.base-drawer.block {
  position: sticky;
}

.base-drawer.fixed {
  bottom: 0;
  min-height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
}

// Size
.base-drawer.base {
  max-width: 600px;
}

.base-drawer.full {
  max-width: 100%;
}
</style>
