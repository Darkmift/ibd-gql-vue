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
const limit = ref(50)
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
  <div class="table-fix-head">
    <table>
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
              <div v-if="key === 'status'" class="svg-image" v-html="SvgImage(build.status)"></div>
              <span>{{ value }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td :colspan="tableKeys.length" class="pagination">
            <div class="pagination-content">
              <div class="total">
                {{ pagination.total }} <span class="total">total builds</span>
              </div>
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table-fix-head {
  display: flex;
  overflow: auto;
  min-width: 900px;
  width: 90vw;
  height: 676px;
  margin-top: 24px;
  background-color: $bgColorWhite;
  padding-bottom: 24px;
}

table {
  white-space: nowrap;
  flex: 1;
  height: 100%;
  overflow: scroll;
  border-radius: 8px;
  background-color: $headerGrey;
  border-collapse: collapse;
  border-style: hidden;
  border-radius: 8px;
  box-shadow: 0 0 0 1px $borderColorGrey;
  color: $textColorGrey;
  thead {
    position: sticky;
    box-shadow: 0 0 0 1px $borderColorGrey;
    top: 0;
    th {
      background-color: $headerGrey;
      &:first-child {
        span {
          padding-left: 20px;
        }
        padding-left: 0;
        border-top-left-radius: 8px;
      }
      &:last-child {
        border-top-right-radius: 8px;
      }
    }
  }
  td,
  th {
    height: 40px;
    text-align: left;
    padding-left: 20px;
    font-size: 12px;
    &:first-child {
      padding-left: 0;
    }
  }
  tbody {
    tr {
      font-size: 16px;
      border-bottom: 1px solid $borderColorGrey;
      td {
        text-align: left;
        background-color: $bgColorWhite;
      }
    }
  }
}

th:first-child,
th:last-child {
  border-radius: none;
  border-left: none;
  box-shadow: 0 0 0 5.6rem $bgColorWhite;
}

.status {
  display: flex;
  align-items: center;
  line-height: 32px;
  padding-left: 20px;
  height: 100%;
  text-transform: capitalize;
  .svg-image {
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
    padding: 5px 20px;
    .total {
      font-size: 11px;
      color: $textColorGrey;
    }

    .pagination-navs {
      display: flex;
      gap: 11px;
      align-items: center;
      .highlighted {
        padding: 0 4px;
        color: $textColorWhite;
        background-color: $textColorGrey;
        border-radius: 50%;
      }
      button {
        display: flex;
        align-items: center;
        border: none;
        background: none;
        padding: 0;
        font-size: 12px;
        color: rgba(110, 122, 125, 0.4);
        cursor: pointer;
        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
