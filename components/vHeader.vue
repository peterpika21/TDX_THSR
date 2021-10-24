<template>
  <header class="header">
    <div class="mx-auto my-0 h-container d-flex justify-content-between align-items-center" style="height: 100%">
      <h1 class="header__logo">
        <a href="/">
          <img src="https://www.thsrc.com.tw/Event/Logo.svg" alt="台灣高鐵" />
        </a>
      </h1>

      <ul class="header__navbar">
        <li>
          <a href="javascript:void(0)" class="header__link" @click="goAnchor('trainSearch')">時刻表與票價</a>
        </li>
        <li>
          <a href="javascript:void(0)" class="header__link" @click="goAnchor('newMessage')">最新消息</a>
        </li>
        <li>
          <a href="javascript:void(0)" class="header__link" @click="goAnchor('footer')">相關說明</a>
        </li>
      </ul>

      <div class="header__icon">
        <input id="nav-toggle" v-model="isToggleNav" type="checkbox" />
        <label for="nav-toggle" class="ham">
          <div class="ham__origin">
            <div class="ham__bar ham__bar--top"></div>
            <div class="ham__bar ham__bar--middle"></div>
            <div class="ham__bar ham__bar--bottom"></div>
          </div>
        </label>

        <ul class="header__navbar--md">
          <li>
            <a href="javascript:void(0)" class="header__link--md" @click="goAnchor('trainSearch')">時刻表與票價</a>
          </li>
          <li>
            <a href="javascript:void(0)" class="header__link--md" @click="goAnchor('newMessage')">最新消息</a>
          </li>
          <li>
            <a href="javascript:void(0)" class="header__link--md" @click="goAnchor('footer')">相關說明</a>
          </li>
          <li>
            <a href="javascript:void(0)" class="header__link--md" @click="isToggleNav = false">關閉</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isToggleNav: false
    }
  },
  methods: {
    goAnchor(selector) {
      this.$router.push({ path: '/', query: { anchor: selector } })

      if (this.$route.path === '/') {
        this.findID(this.$nuxt, selector)
      } else {
        setTimeout(() => {
          this.findID(this.$nuxt, selector)
        }, 500)
      }
    },
    findID(component, selector) {
      const arr = component.$children
      const id = component.$el.id

      if (id === selector) {
        component.$el.scrollIntoView({ behavior: 'smooth' })
        return
      }

      for (let i = 0; i < arr.length; i++) {
        this.findID(arr[i], selector)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/helpers/_mixin.scss';

.header {
  background: #fff;
  box-shadow: 0 0 3px #000;

  &__logo {
    margin: 0;
    width: 210px;
  }

  &__navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__link {
    margin: 12px;
    padding-bottom: 8px;
    color: #333333;
    font-size: 22px;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      border-bottom: 4px solid #ca4f0f;
    }
  }

  &__navbar--md {
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background: #000;
    opacity: 0.9;
    z-index: 30;
    transform: translateX(-200px);
    transition: all 0.3s;
  }

  &__link--md {
    display: flex;
    justify-content: center;
    padding: 16px;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    text-decoration: none;
  }

  &__icon {
    display: none;
    margin-right: 12px;
    font-size: 24px;
    color: #5c5c5c;
  }

  .ham {
    display: block;
    width: 36px;
    height: 36px;
    position: relative;
  }

  .ham__origin {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .ham__bar {
    height: 3px;
    width: 26px;
    position: absolute;
    background: #5c5c5c;
    margin: -1px 0 0 -13px;
    transition: all 0.5s;
  }

  .ham__bar--top {
    transform: translateY(-6px);
  }

  .ham__bar--bottom {
    transform: translateY(6px);
  }

  #nav-toggle {
    display: none;
  }

  #nav-toggle:checked ~ .ham .ham__bar--middle {
    opacity: 0;
  }

  #nav-toggle:checked ~ .ham .ham__bar--top {
    transform: rotate(-45deg);
  }

  #nav-toggle:checked ~ .ham .ham__bar--bottom {
    transform: rotate(45deg);
  }

  @include breakpoint('md') {
    &__logo {
      width: 150px;
    }

    &__navbar {
      display: none;
    }

    &__icon {
      display: block;
    }

    #nav-toggle:checked ~ .header__navbar--md {
      transform: none;
    }
  }
}
</style>
