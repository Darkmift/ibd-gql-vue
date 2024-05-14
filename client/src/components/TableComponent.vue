<script setup lang="ts">
import type { BuildModel } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { useBuildsStore } from '@/store'
// Assets
import cancelledSvg from '@/assets/svg/cancelled.svg?raw'
import failedSvg from '@/assets/svg/failed.svg?raw'
import successSvg from '@/assets/svg/success.svg?raw'
import arrowLeftSvg from '@/assets/svg/arrowLeft.svg?raw'
import arrowRightSvg from '@/assets/svg/arrowRight.svg?raw'

const store = useBuildsStore()

const customSortMap: Record<string, { number: number; string: string }> = {
  buildId: { number: 1, string: 'Build ID' },
  startTime: { number: 4, string: 'Start Time' },
  endTime: { number: 5, string: 'End Time' },
  status: { number: 0, string: 'Status' },
  caption: { number: 2, string: 'Caption' },
  command: { number: 3, string: 'Command' },
  errorsNumber: { number: 6, string: 'Errors Number' },
  warningsNumber: { number: 7, string: 'Warnings Number' }
}

// a fn that orders the row by the key in the customSortMap
const sortBuilds = (build: BuildModel) => {
  return Object.keys(build)
    .sort((a, b) => customSortMap[a].number - customSortMap[b].number)
    .reduce(
      (acc, key) => {
        acc[key as keyof BuildModel] = build[key as keyof BuildModel]
        return acc
      },
      {} as Record<keyof BuildModel, unknown>
    ) as BuildModel
}

const pagination = computed(() => store.pagination)
const builds = computed(() => store.builds.map((build) => sortBuilds(build)))
const currentPage = computed(() => store.pagination.page)
const limit = ref(15)
const nextPage = computed(() => {
  const nextPageNumber = pagination.value.page + 1
  return nextPageNumber <= pagination.value.total ? nextPageNumber : null
})

const tableKeys = computed(() => {
  const buildObject = builds.value[0] || {}
  return Object.keys(sortBuilds(buildObject)).map((k) => customSortMap[k].string)
})

onMounted(() => {
  store.setBuilds(1, limit.value)
})

// a fn that check status and return the right svg
const SvgImage = (status: string) => {
  switch (status) {
    case 'success':
      return successSvg
    case 'failed':
      return failedSvg
    case 'canceled':
      return cancelledSvg
    default:
      return ''
  }
}

const handlePagination = (action: 'increment' | 'decrement') => {
  const page =
    action === 'increment'
      ? pagination.value.page < 1
        ? 1
        : pagination.value.page + 1
      : pagination.value.page - 1
  store.setBuilds(page, limit.value)
}
</script>

<template>
  <div class="wrapper">
    <div class="table-container">
      <table class="h-1 w-[90vw]">
        <thead>
          <tr>
            <th v-for="key in tableKeys" :key="key">
              <span>{{ key }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="build in builds" :key="build.buildId">
            <td v-for="(value, key) in build" :key="key">
              <div :class="key === 'status' ? `status ${value}` : ''">
                <div
                  v-if="key === 'status'"
                  class="svg-image"
                  v-html="SvgImage(build.status)"
                ></div>
                <span>{{ value }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <div class="total">{{ pagination.total }} <span class="total">total builds</span></div>
      <div class="pagination-navs">
        <button
          :disabled="currentPage <= 1"
          @click="handlePagination('decrement')"
          v-html="arrowLeftSvg"
        ></button>
        <span
          :class="{ highlighted: index + 1 === currentPage }"
          v-for="index in [currentPage - 1, currentPage]"
          :key="index"
        >
          {{ index + 1 }}
        </span>
        <button
          :disabled="!nextPage"
          @click="handlePagination('increment')"
          v-html="arrowRightSvg"
        ></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  @apply my-5;

  .table-container {
    @apply flex w-[90vw] min-w-[900px] flex-col overflow-auto whitespace-nowrap bg-[theme(colors.background.white)];
    table {
      @apply flex-1;
      thead {
        @apply sticky top-0 z-10 bg-[theme(colors.background.grey)];
      }
      tr {
        @apply h-10 border-b border-[theme(colors.border.grey)] text-left;
        td,
        th {
          @apply pl-4;
        }

        td {
          &:first-child {
            @apply pl-0;
          }
          .status {
            @apply flex h-full items-center gap-3 border-l-[3px] border-solid border-l-[theme(colors.background.grey)] pl-3 capitalize leading-8;
            .svg-image {
              @apply mb-[2px];
            }
            &.success {
              @apply border-l-[3px] border-solid border-l-[theme(colors.background.green)];
            }
            &.failed {
              @apply border-l-[3px] border-solid border-l-[theme(colors.background.red)];
            }
            &.canceled {
              @apply border-l-[3px] border-solid border-l-[theme(colors.background.grey)];
            }
          }
        }
      }
    }
  }
  .pagination {
    @apply flex h-10 w-full items-center justify-between px-2 font-gorditaLight;
    .total {
      @apply text-[11px] text-[theme(colors.text.grey)];
    }
    .pagination-navs {
      @apply flex items-center gap-[11px];
      .highlighted {
        @apply rounded-[50%] bg-[#525765] px-2 py-0 text-[theme(colors.text.white)];
      }
      button {
        @apply flex cursor-pointer items-center border-[none] p-0 text-xs text-[rgba(110,122,125,0.4)] disabled:cursor-not-allowed;
      }
    }
  }
}
</style>
