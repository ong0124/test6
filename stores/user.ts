import { defineStore } from "pinia";
import liff from "@line/liff"; // 直接 import LIFF SDK
import { LIFF_ID } from '@/utils/liff.config'; 

export const useUserStore = defineStore("user", {
  state: () => ({
    user_id: null as string | null,
    user_name: null as string | null,
    user_picture: null as string | null,
  }),
  actions: {
    async loginWithLINE() {
      if (typeof window === "undefined") return; // 確保只在瀏覽器端執行
      
      await liff.init({ liffId: LIFF_ID }); // 初始化 LIFF
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const profile = await liff.getProfile();
      this.user_id = profile.userId;
      this.user_name = profile.displayName;
      this.user_picture = profile.pictureUrl ?? null;

      localStorage.setItem("user_id", profile.userId);
      localStorage.setItem("user_name", profile.displayName);
      localStorage.setItem("user_picture", profile.pictureUrl ?? "");
    },

    logout() {
      if (typeof window === "undefined") return;

      liff.logout();
      this.user_id = null;
      this.user_name = null;
      this.user_picture = null;

      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_picture");
    },

    loadUser() {
      if (typeof window === "undefined") return;

      const storedUserId = localStorage.getItem("user_id");
      const storedUserName = localStorage.getItem("user_name");
      const storedUserPicture = localStorage.getItem("user_picture");

      if (storedUserId) {
        this.user_id = storedUserId;
        this.user_name = storedUserName;
        this.user_picture = storedUserPicture;
      }
    },

    async checkLoginStatus() {
      if (typeof window === "undefined") return;

      this.loadUser(); // 先检查 localStorage

      if (this.user_id) return; // 如果 localStorage 里有 user_id，就直接返回

      await liff.init({ liffId: LIFF_ID });

      if (liff.isLoggedIn()) {
        try {
          const profile = await liff.getProfile();
          this.user_id = profile.userId;
          this.user_name = profile.displayName;
          this.user_picture = profile.pictureUrl ?? null;

          localStorage.setItem("user_id", profile.userId);
          localStorage.setItem("user_name", profile.displayName);
          localStorage.setItem("user_picture", profile.pictureUrl ?? "");
        } catch (error) {
          console.error("获取 LIFF 用户信息失败", error);
        }
      }
    },
  },
});
