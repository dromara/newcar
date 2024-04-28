<script setup>
import { useData } from "vitepress";
import tokens from "./StatusTokens.json";

const { lang } = useData();
</script>

<template>
  <div id="status-container" class="flex justify-center mt-4">
    <div
      id="status-box"
      class="flex flex-col md:flex-row md:justify-between bg-neutral-400 bg-opacity-20 max-w-6xl w-9/10 rounded-md px-4 py-3"
    >
      <div id="status-text" class="flex flex-col">
        <h2 class="font-bold">
          {{ tokens[lang].title }}
        </h2>
        <p class="mt-2 text-sm font-semibold text-neutral-400">
          {{ tokens[lang].msg }}
        </p>
      </div>
      <div
        id="status-button"
        class="flex md:justify-center justify-end items-center mt-3 md:mt-0 mb-1mb-1"
      >
        <a
          href="https://newcar-old.netlify.app"
          rel="noreferrer noopener"
          target="_blank"
          class="px-4 py-1.5 md:ml-2 bg-#FF8585 rounded-md font-bold text-sm hover:bg-#FF7B7B transition-colors whitespace-nowrap"
        >
          {{ tokens[lang].button }}
        </a>
      </div>
    </div>
  </div>
</template>
