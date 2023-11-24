<template>
  <div id="app">
    <nav>
      <router-link to="/">Retning</router-link>
      <router-link to="/map">Kort</router-link>
    </nav>
    <div class="content">
      <location-provider>
        <orientation-provider>
          <router-view />
        </orientation-provider>
      </location-provider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  display: flex;
  align-items: center;
  justify-content: stretch;
  min-height: 100vh;
  min-height: 100dvh;
  flex-direction: column;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 50px;

  a {
    color: #f7f4e1;
    font-size: 22px;
    text-decoration: none;
    margin: -20px;
    padding: 20px;

    &.router-link-exact-active {
      text-decoration: underline;
    }
  }
}
.content {
  flex: 1 2 auto;
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  flex-direction: column;
}
</style>
