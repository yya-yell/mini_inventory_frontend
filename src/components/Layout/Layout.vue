<template>
    <div>
        <div v-if="$route.name == 'Login'">
        <Login />
        </div>
        <div v-else>
            <!-- Page Wrapper -->
            <div id="wrapper">
                <!-- Sidebar -->
                <Sidebar @sideBarToggling="sidebarToggler = false" v-if="sidebarToggler" />
                <div v-else-if="!sidebarToggler" class="bg-primary">
                    <div class="px-3">

                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                        <p>sdfsd</p>
                    </div>

                    <div class="text-center d-none d-md-inline">
                        <button @click="sidebarToggler = true" class="rounded-circle border-0 bg-warning"
                            id="sidebarToggle"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
                <!-- End of Sidebar -->

                <!-- Content Wrapper -->
                <div id="content-wrapper" class="d-flex flex-column">

                    <!-- Main Content -->
                    <div id="content">
                        <!-- Topbar -->
                        <TopBar />
                        <!-- End of Topbar -->
                        <!-- Begin Page Content -->
                        <div class="container-fluid">
                            <!-- Page Heading -->
                            <!-- Content Row -->

                            <router-view></router-view>
                        </div>
                        <!-- /.container-fluid -->

                    </div>
                    <!-- End of Main Content -->

                    <!-- Footer -->
                    <!-- <x-footer />  --> footer
                    <!-- End of Footer -->

                </div>
                <!-- End of Content Wrapper -->

            </div>
            <!-- End of Page Wrapper -->

            <!-- Scroll to Top Button-->
            <a class="scroll-to-top rounded" href="#page-top">
                <i class="fas fa-angle-up"></i>
            </a>


        </div>
    </div>
</template>

<script>
import Sidebar from '../Sidebar.vue'
import TopBar from '../TopBar.vue'
import Login from '@/views/Login'
export default {
    name: 'Layout',
    components: { Sidebar, TopBar , Login },
    data() {
        return {
            sidebarToggler: true
        }
    }
}
</script>

<style>
</style>