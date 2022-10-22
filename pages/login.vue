<script setup lang="ts">
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import InputField from '~~/components/InputField.vue'
import { useUserStore } from '~~/store/user.store'
import type { UserInput } from '~~/utils/types/user'

definePageMeta({
  middleware: 'auth',
})

useHead({
  title: 'Login',
})

const schema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(8).required('Password is required'),
})

const modal = ref(false)
const user = useSupabaseUser()

const onSubmit = async (values: UserInput) => {
  try {
    const { login } = useUserStore()
    const { email, password } = values
    return await login({ email, password })
  }
  catch (error) {
    modal.value = true
  }
}

watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <Form :validation-schema="schema" @submit="onSubmit">
          <InputField name="email" type="email" label="Email" placeholder="Your email address" />
          <InputField name="password" type="password" label="Password" placeholder="Your password" />
          <div class="form-control mt-6">
            <button class="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
