<template>
  <div>
    <div class="wrap">
      <div class="digitalitem hour-1" :class="`num-${num1}`">
        <div class="digitalbody h1"></div>
        <div class="digitalbody h2"></div>
        <div class="digitalbody h3"></div>
        <div class="digitalbody v1"></div>
        <div class="digitalbody v2"></div>
        <div class="digitalbody v3"></div>
        <div class="digitalbody v4"></div>
      </div>
      <div class="digitalitem hour-2" :class="`num-${num2}`">
        <div class="digitalbody h1"></div>
        <div class="digitalbody h2"></div>
        <div class="digitalbody h3"></div>
        <div class="digitalbody v1"></div>
        <div class="digitalbody v2"></div>
        <div class="digitalbody v3"></div>
        <div class="digitalbody v4"></div>
      </div>
      <div class="digitalitem separate1">
        <div class="dot"></div>
      </div>
      <div class="digitalitem min-1" :class="`num-${num3}`">
        <div class="digitalbody h1"></div>
        <div class="digitalbody h2"></div>
        <div class="digitalbody h3"></div>
        <div class="digitalbody v1"></div>
        <div class="digitalbody v2"></div>
        <div class="digitalbody v3"></div>
        <div class="digitalbody v4"></div>
      </div>
      <div class="digitalitem min-2" :class="`num-${num4}`">
        <div class="digitalbody h1"></div>
        <div class="digitalbody h2"></div>
        <div class="digitalbody h3"></div>
        <div class="digitalbody v1"></div>
        <div class="digitalbody v2"></div>
        <div class="digitalbody v3"></div>
        <div class="digitalbody v4"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: '00:00'
    }
  },
  data() {
    return {
      num1: '0',
      num2: '0',
      num3: '0',
      num4: '0'
    }
  },
  created() {
    for (let i = 0; i < this.time.length; i++) {
      if (i < 2) {
        this[`num${i + 1}`] = this.time[i]
      }

      if (i > 2) {
        this[`num${i}`] = this.time[i]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  width: 200px;
  height: 74px;
  padding: 8px;
  background: #202124;
}

.digitalitem {
  position: relative;
  top: 0;
}

.digitalitem.hour-1 {
  left: 0;
}

.digitalitem.hour-2 {
  left: 45px;
}

.digitalitem.separate1 {
  left: 86px;
}
.digitalitem.min-1 {
  left: 100px;
}
.digitalitem.min-2 {
  left: 145px;
}
.dot:before,
.dot:after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  top: 14px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #e78f0a;
  animation: dot-blink 1s infinite;
}
@keyframes dot-blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}
.dot:before {
  top: 14px;
}
.dot:after {
  top: 34px;
}
.digitalbody {
  background-color: #e78f0a;
  box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.6);
  position: absolute;
}
.digitalbody:before,
.digitalbody:after {
  content: '';
  width: 0;
  height: 0;
  border-width: 3px;
  border-style: solid;
  position: absolute;
}
.digitalbody.h1,
.digitalbody.h2,
.digitalbody.h3 {
  width: 20px;
  height: 6px;
  left: 8px;
  z-index: 20;
}
.digitalbody.h1:before,
.digitalbody.h2:before,
.digitalbody.h3:before {
  left: -6px;
  border-color: rgba(60, 60, 60, 0) #e78f0a rgba(60, 60, 60, 0) rgba(60, 60, 60, 0);
}
.digitalbody.h1:after,
.digitalbody.h2:after,
.digitalbody.h3:after {
  right: -6px;
  border-color: rgba(60, 60, 60, 0) rgba(60, 60, 60, 0) rgba(60, 60, 60, 0) #e78f0a;
}
.digitalbody.h1 {
  top: 0;
}
.digitalbody.h2 {
  top: 26px;
}
.digitalbody.h3 {
  top: 52px;
}
.digitalbody.v1,
.digitalbody.v2,
.digitalbody.v3,
.digitalbody.v4 {
  width: 6px;
  height: 20px;
  z-index: 10;
}
.digitalbody.v1:before,
.digitalbody.v2:before,
.digitalbody.v3:before,
.digitalbody.v4:before {
  top: -6px;
  border-color: rgba(60, 60, 60, 0) rgba(60, 60, 60, 0) #e78f0a rgba(60, 60, 60, 0);
}
.digitalbody.v1:after,
.digitalbody.v2:after,
.digitalbody.v3:after,
.digitalbody.v4:after {
  top: 20px;
  border-color: #e78f0a rgba(60, 60, 60, 0) rgba(60, 60, 60, 0) rgba(60, 60, 60, 0);
}
.digitalbody.v1 {
  top: 6px;
  left: 0;
}
.digitalbody.v2 {
  top: 6px;
  left: 30px;
}
.digitalbody.v3 {
  top: 32px;
  left: 0;
}
.digitalbody.v4 {
  top: 32px;
  left: 30px;
}
.num-1 > .h1,
.num-1 > .h2,
.num-1 > .h3,
.num-1 > .v1,
.num-1 > .v3 {
  opacity: 0.2;
}
.num-2 > .v1,
.num-2 > .v4 {
  opacity: 0.2;
}
.num-3 > .v1,
.num-3 > .v3 {
  opacity: 0.2;
}
.num-4 > .h1,
.num-4 > .h3,
.num-4 > .v3 {
  opacity: 0.2;
}
.num-5 > .v2,
.num-5 > .v3 {
  opacity: 0.2;
}

.num-6 > .v2 {
  opacity: 0.2;
}
.num-7 > .h2,
.num-7 > .h3,
.num-7 > .v1,
.num-7 > .v3 {
  opacity: 0.2;
}
.num-9 > .v3 {
  opacity: 0.2;
}
.num-0 > .h2 {
  opacity: 0.2;
}
</style>
