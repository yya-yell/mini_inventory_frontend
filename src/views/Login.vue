<template>
    <div>
        <div class="container">
            <!-- Outer Row -->
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <!-- Nested Row within Card Body -->
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <Alert v-if="credential_message" condition="alert-danger">{{credential_message}}</Alert>
                                        <form @submit.prevent="submit" class="user">
                                            <div class="form-group">
                                                <input type="email" v-model="form.email"
                                                    class=" form-control form-control-user" id="exampleInputEmail"
                                                    :class="{ 'is-invalid': email_error_message }"
                                                    aria-describedby="emailHelp" placeholder="Enter Email Address...">
                                                <ErrorMessage v-if="email_error_message">{{ email_error_message }}
                                                </ErrorMessage>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" v-model="form.password"
                                                    class="form-control form-control-user" id="exampleInputPassword"
                                                    :class="{ 'is-invalid': password_error_message }"
                                                    placeholder="Password">
                                                <ErrorMessage v-if="password_error_message">{{ password_error_message }}
                                                </ErrorMessage>
                                            </div>
                                            <hr>
                                            <button type="submit" class="btn btn-primary btn-user btn-block">
                                                <Loader v-if="loader_status" /> Login
                                            </button>
                                            <hr>
                                            additional
                                        </form>
                                        <hr>
                                        <div class="text-center">
                                            optinal
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Loader from '@/components/Helper/Loader'
import ErrorMessage from '@/components/Helper/ErrorMessage'
import Alert from '@/components/Helper/Alert'
export default {
    name: "Login",
    components: { Loader, ErrorMessage, Alert },
    data() {
        return {
            loader_status: false,
            form: { email: '', password: '' },
            email_error_message: null,
            password_error_message: null,
            credential_message : null
        }
    },
    methods: {
        ...mapActions(['submitScript']),
        submit() {
            this.loader_status = true;
            this.submitScript(this.form).then(() => {
                this.loader_status = false;
                this.$router.replace({
                    'name': 'Inventories'
                })
            }).catch((e) => {
                this.loader_status = false;
                if (e.response.status == 422) {
                    const error = e.response.data.errors
                    this.email_error_message = error.email ? error.email[0] : null
                    this.password_error_message = error.password ? error.password[0] : null
                }
                if (e.response.status == 401) {
                    this.credential_message = e.response.data ? e.response.data : null
                }
            })
        }
    },


}
</script>

<style>
</style>