<template>
  <q-page class="column justify-center" style="max-width:600px;" padding>
    <div class="row justify-center">
      <i class="col-12 material-icons text-positive" style="font-size:90px;" color>person_outline</i>
      <p class="q-mb-xl">ورود به سامانه</p>
      <q-field
        class="col-12"
        style="direction:ltr;"
        icon="person"
        label="نام کاربری"
        helper="نام کاربری خود را وارد کنید"
      >
        <q-input v-model="username"/>
      </q-field>
      <q-field
        class="col-12"
        style="direction:ltr;"
        icon="vpn_key"
        label="کلمه عبور"
        helper="کلمه عبور خود را وارد کنید"
      >
        <q-input type="password" v-model="password"/>
      </q-field>
      <q-btn class="col-12 q-mt-xl" color="primary" size="sm" label="ورود به سامانه"/>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style>
</style>
