<template>
    <footer class="border-t bg-gray-50 fixed inset-x-0 bottom-0 z-20">
        <div class="flex justify-between py-2">
            <button
             v-for="page in pages"
             :key="page.name"
             @click="selectPage(page.name, page.route)"
             class="flex flex-col items-center mx-auto text-sm">
                <Icon
                :name="page.icon"
                class="h-5 w-5"
                :class="selectedPage === page.name ? 'text-amber-500' : 'text-gray-400'"
                />
                <span
                :class="selectedPage === page.name ? 'text-amber-500 font-bold' : 'text-gray-500'"
                >
                {{ $t(`Management.${page.name}`) }}
                </span>
            </button>
        </div>
    </footer>
</template>


<script setup lang="ts">
import { ref,watch } from "vue";
const localPath = useLocalePath();
const selectedPage = ref("");

const pages = [
  { name: "ManageOrder", icon: "material-symbols-grid-view-outline-rounded", route: "/" },
  { name: "checkUser", icon: "material-symbols-person-search-outline", route: "/checkUsers" },
  { name: "refundApprove", icon: "hugeicons-stamp-02", route: "/approveRefund" },
  { name: "offDaySetting", icon: "material-symbols-calendar-month-outline", route: "/offDaySetting" },
];

const selectPage = (pageName: string, route: string) => {
  selectedPage.value = pageName;
  const selectedRoute = localPath(route);
  navigateTo(selectedRoute);
};

</script>