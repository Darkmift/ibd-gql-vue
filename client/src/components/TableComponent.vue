<script setup lang="ts">
import type { BuildModel } from '@/types'
import { ref, computed } from 'vue'
import cancelledSvg from '@/assets/svg/cancelled.svg?raw'
import failedSvg from '@/assets/svg/failed.svg?raw'
import successSvg from '@/assets/svg/success.svg?raw'

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

const builds = ref<BuildModel[]>(
  [
    {
      buildId: 1,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'success',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 2,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'failed',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 3,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'cancelled',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 4,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'success',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 5,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'success',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },

    {
      buildId: 6,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'success',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 7,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'failed',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 8,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'cancelled',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 9,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'success',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 10,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'success',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    // add 5 more
    {
      buildId: 11,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'success',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 12,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'failed',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 13,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'cancelled',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 14,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'success',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    },
    {
      buildId: 15,
      startTime: '2021-10-01T12:00:00Z',
      endTime: '2021-10-01T12:30:00Z',
      status: 'success',
      caption: 'Build #1',
      command: 'npm run build',
      errorsNumber: 0,
      warningsNumber: 0
    }
  ].map((b) => sortBuilds(b as BuildModel))
)

const tableKeys = computed(() =>
  Object.keys(sortBuilds(builds.value[0])).map((k) => customSortMap[k].string)
)

// a fn that check status and return the right svg
const SvgImage = (status: string) => {
  console.log('🚀 ~ SvgImage ~ status:', status)
  switch (status) {
    case 'success':
      return successSvg
    case 'failed':
      return failedSvg
    case 'cancelled':
      return cancelledSvg
    default:
      return ''
  }
}

const count = computed(() => builds.value.length)
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
          <div class="total">{{ count }} <span class="total">total builds</span></div>
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
  // height: 40px;
  background-color: $bgColorWhite;
  border-radius: 0 0 8px 8px;
  padding: 0 8px;
  font-family: $fontGordita400;
  .total {
    font-size: 11px;
    color: $textColorGrey;
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
