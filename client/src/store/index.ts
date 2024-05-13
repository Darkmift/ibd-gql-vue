import { defineStore } from 'pinia'
import type { BuildModel, GroupedBuildModel } from '@/types'
import { getAllBuilds, getBuildById, getBuildsCount, getBuildsGroupedByDay } from '@/client'

type State = {
  builds: BuildModel[]
  selectedBuild: BuildModel | null
  groupedBuilds: GroupedBuildModel[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
  }
}
const initialState: State = {
  builds: [],
  selectedBuild: null,
  groupedBuilds: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  },
  loading: false,
  error: null
}

export const useBuildsStore = defineStore({
  id: 'builds',
  state: () => initialState,
  actions: {
    async setBuilds(page: number, limit: number) {
      console.log("🚀 ~ setBuilds ~ page:", page)
      try {
        this.loading = true
        const builds = await getAllBuilds(page, limit)
        this.builds = builds || []
        const count = await getBuildsCount()
        this.setPagination(count || 0, page, limit)
      } catch (error) {
        console.error(error)
        this.error = (error as Error)?.message || 'Failed to fetch builds.'
      } finally {
        this.loading = false
      }
    },
    async setSelectedBuild(buildId: number) {
      try {
        this.loading = true
        this.selectedBuild = await getBuildById(buildId)
      } catch (error) {
        console.error(error)
        this.error = (error as Error)?.message || 'Failed to fetch builds.'
      } finally {
        this.loading = false
      }
    },
    async setGroupedBuilds() {
      try {
        this.loading = true
        const groupedBuilds = await getBuildsGroupedByDay()
        this.groupedBuilds = groupedBuilds || []
      } catch (error) {
        console.error(error)
        this.error = (error as Error)?.message || 'Failed to fetch builds.'
      } finally {
        this.loading = false
      }
    },
    setPagination(count: number, page: number, limit: number) {
      this.pagination.total = count
      this.pagination.page = page
      this.pagination.limit = limit
    }
  }
})
