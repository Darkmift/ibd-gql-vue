<script setup lang="ts">
import type { BuildModel } from '@/types'
import { computed, onMounted } from 'vue'
import cancelledSvg from '@/assets/svg/cancelled.svg?raw'
import failedSvg from '@/assets/svg/failed.svg?raw'
import successSvg from '@/assets/svg/success.svg?raw'
import { useBuildsStore } from '@/store'

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

onMounted(() => {
  store.setBuilds(1, 10)
})

const pagination = computed(() => store.pagination)
const builds = computed(() => store.builds.map((build) => sortBuilds(build)))

const tableKeys = computed(() => {
  const buildObject = builds.value[0] || {}
  return Object.keys(sortBuilds(buildObject)).map((k) => customSortMap[k].string)
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
  store.setBuilds(page, 10)
}
</script>

<template>
  <table class="container">
    <thead>
      <tr>
        <th v-for="key in tableKeys" :key="key">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="build in builds" :key="build.buildId">
        <td
          v-for="(value, key) in build"
          :key="key"
          :class="key === 'status' ? `status ${value}` : ''"
        >
          <span v-if="key === 'status'">
            <div class="svg-image" v-html="SvgImage(build.status)"></div>
          </span>
          <span>{{ value }}</span>
        </td>
      </tr>
      <tr>
        <td :colspan="tableKeys.length" class="pagination">
          <div class="pagination-content">
            <div class="total">{{ pagination.total }} <span class="total">total builds</span></div>
            <div class="pagination-navs">
              <button :disabled="pagination.page <= 1" @click="handlePagination('decrement')">
                &lt;
              </button>
              <button @click="handlePagination('increment')">&gt;</button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.status {
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 32px;
  .svg-image {
    // width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  border-left: 3px solid $borderColorGrey;
}
.success {
  border-left: 3px solid $cellGreen;
}
.failed {
  border-left: 3px solid $cellRed;
}
.cancelled {
  border-left: 3px solid $cellGrey;
}

.pagination {
  justify-content: space-between;
  background-color: $bgColorWhite;
  border-radius: 0 0 8px 8px;
  padding: 0 8px;
  font-family: $fontGordita400;
  .pagination-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    .total {
      font-size: 11px;
      color: $textColorGrey;
    }

    .pagination-navs {
      button {
        background-color: rgb(113, 113, 192);
        border: 1px solid $borderColorGrey;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 12px;
        color: $textColorGrey;
        cursor: pointer;
        &:hover {
          background-color: $bgColorWhite;
        }
        &:disabled {
          cursor: not-allowed;
          color: $textColorGrey;
          background-color: $bgColorWhite;
        }
      }
    }
  }
}
table {
  border-radius: 8px;
  margin-top: 20px;
  width: 100%;
  background-color: $headerGrey;
  border-collapse: collapse;
  border-style: hidden;
  border-radius: 8px;
  box-shadow: 0 0 0 1px $borderColorGrey;
  margin-bottom: 50px;
  color: $textColorGrey;
  tr {
    height: 40px;
  }
  td,
  th {
    text-align: left;
    padding-left: 20px;
    font-size: 12px;
  }
  thead {
    width: 1624px;
  }
  tbody {
    tr {
      padding: 8px;
      font-size: 16px;
      border-bottom: 1px solid $borderColorGrey;
      td {
        text-align: left;
        background-color: $bgColorWhite;
      }
      // &:last-child {
      //   // border-bottom-left-radius: 8px;
      //   // background-color: $bgColorWhite;
      //   // td {
      //   //   &:first-child {
      //   //     border-bottom-left-radius: 8px;
      //   //   }
      //   //   &:last-child {
      //   //     border-bottom-right-radius: 8px;
      //   //   }
      //   // }
      // }
    }
  }
}
</style>
