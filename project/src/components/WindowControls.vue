<template>
  <div class="window-controls" style="display: unset" @mousedown="doDragMove">
    <a v-if="settings !== false" @click="doSettings">
      <svg
        id="settings"
        data-name="settings"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
      >
        <g>
          <rect class="container" width="30" height="30" fill="none" />
          <path
            class="icon light"
            d="M14,22h2V19.9a5,5,0,0,0,1.75-.73l1.49,1.49,1.41-1.41-1.49-1.49A5,5,0,0,0,19.9,16H22V14H19.9a5,5,0,0,0-.73-1.75l1.49-1.49L19.24,9.34l-1.49,1.49A5,5,0,0,0,16,10.1V8H14v2.1a5,5,0,0,0-1.76.73L10.76,9.34,9.34,10.76l1.49,1.49A5,5,0,0,0,10.1,14H8v2h2.1a5,5,0,0,0,.73,1.75L9.34,19.24l1.41,1.41,1.49-1.49A5,5,0,0,0,14,19.9Zm-2-7a3,3,0,1,1,3,3A3,3,0,0,1,12,15Z"
          />
        </g>
      </svg>
    </a>

    <a
      v-if="support !== undefined"
      @click="support"
      id="support"
      :href="support"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        data-name="info"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
      >
        <g>
          <rect class="container" width="30" height="30" fill="none" />
          <rect class="icon light" x="14" y="19" width="2" height="2" />
          <path
            class="icon light"
            d="M16.5,9H12v1h4.5A1.5,1.5,0,0,1,18,11.5v1A1.5,1.5,0,0,1,16.5,14H14v3h1V15h1.5A2.5,2.5,0,0,0,19,12.5v-1A2.5,2.5,0,0,0,16.5,9Z"
          />
        </g>
      </svg>
    </a>

    <i v-if="hide !== false">
      <svg
        @click="doMinimize"
        id="minimize"
        data-name="min"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
      >
        <g>
          <rect class="container" width="30" height="30" fill="none" />
          <rect class="icon light" x="10" y="19" width="10" height="1" />
        </g>
      </svg>
    </i>

    <i v-if="close !== false">
      <svg
        @click="doClose"
        id="close"
        data-name="close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
      >
        <g>
          <rect class="container" width="30" height="30" fill="none" />
          <path
            class="icon light"
            d="M15.71,15l4.15-4.15a.5.5,0,0,0-.71-.71L15,14.29l-4.15-4.15a.5.5,0,1,0-.71.71L14.29,15l-4.15,4.15a.5.5,0,1,0,.71.71L15,15.71l4.15,4.15a.5.5,0,1,0,.71-.71Z"
          />
        </g>
      </svg>
    </i>
  </div>
</template>

<script>
import { close, minimize, dragMove } from "@/services/ow-async.js";

export default {
  props: ["close", "hide", "settings", "support"],
  methods: {
    doDragMove() {
      dragMove();
    },
    doClose() {
      close();
    },
    doMinimize() {
      minimize();
    },
    doSettings() {
      this.$router.push("settings");
    }
  }
};
</script>

<style lang="scss" scoped>
$button-size: 32px;

.window-controls {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: $button-size;
  text-align: right;
  background-color: rgba(0, 0, 0, 0.1);
}

i,
a {
  z-index: 100;
  svg {
    width: $button-size;
    height: $button-size;

    &:hover {
      background-color: lightblue;
    }
  }
}

#close {
  &:hover {
    background-color: red;
  }
}
</style>
