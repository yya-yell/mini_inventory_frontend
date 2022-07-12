<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Mini Mart Inventory</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <router-link class="nav-link" to="/dashboard">
        <i class="fas fa-border-all"></i>
        <span>Dashboard</span>
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" to="/">
        <i class="fas fa-border-all"></i>
        <span>Inventory</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">For Today</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <!-- <li class="nav-item">
      <router-link class="nav-link collapsed" to="/history" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-history"></i>
        <span>History</span>
      </router-link>
    </li> -->
    <li class="nav-item">
      <router-link class="nav-link" to="/todayinventory" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-calculator"></i>
        <span>Today Inventory</span>
      </router-link>
    </li>

    <li class="nav-item">
      <router-link @click="$root.todayHistory_notifier = false" class="nav-link" to="/todayhistory" aria-expanded="true"
        aria-controls="collapseTwo">
        <i class="fas fa-clock"></i>
        <span>Today History</span>
        <span class="badge bg-info mx-3" v-if="$root.todayHistory_notifier">New</span>
      </router-link>
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Records</div>
    <li class="nav-item">
      <router-link class="nav-link collapsed" to="/dailyrecords" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-th-list"></i>
        <span>Daily Records</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link collapsed" to="/montlyrecords" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-calendar-day"></i>
        <span>Montly Records</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Addons</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a class="nav-link" href="javascript:void(0)" @click="logoutAction">
        <i class="fas fa-power-off"></i>
        <span>Log out</span>
      </a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button @click="$emit('sideBarToggling')" class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Sidebar',
  emits: ['sideBarToggling'],
  methods: {
    ...mapActions(['logout']),
    logoutAction() {
      this.logout().then(() => {
        this.$router.replace({
          'name': 'Login'
        })
      })
    }
  }
};
</script>

<style>
</style>