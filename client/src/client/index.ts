import { gql, request } from 'graphql-request'
import type { BuildModel, BuildsCount, GroupedBuildModel } from '@/types'
import config from '@/config'

type GqlRequestParams = {
  query: string
  variables?: Record<string, unknown>
}

const makeRequest = async <T>({ query, variables }: GqlRequestParams): Promise<T | null> => {
  try {
    const data = await request<T>(config.VITE_BASE_URL, query, variables)
    console.log('🚀 ~ makeRequest ~ data:', data)
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

// get all builds
export const getAllBuilds = async (page: number, limit: number) => {
  const query = gql`
    query ($page: Int!, $limit: Int!) {
      builds(page: $page, limit: $limit) {
        buildId
        startTime
        endTime
        caption
        command
        status
        errorsNumber
        warningsNumber
      }
    }
  `
  const response = await makeRequest<{ builds: BuildModel[] }>({
    query,
    variables: {
      page,
      limit
    }
  })
  return response?.builds || []
}

// get build by id
export const getBuildById = async (id: number) => {
  const query = gql`
    query ($id: Int!) {
      build(id: $id) {
        buildId
        startTime
        endTime
        caption
        command
        status
        errorsNumber
        warningsNumber
      }
    }
  `
  return makeRequest<BuildModel | null>({ query, variables: { id } })
}

// get builds count
export const getBuildsCount = async () => {
  const query = gql`
    query {
      countBuilds
    }
  `
  const result = await makeRequest<BuildsCount>({ query })
  return result?.countBuilds
}

// get builds grouped by day
export const getBuildsGroupedByDay = async () => {
  const query = gql`
    query {
      buildsGroupedByDay {
        day
        count
      }
    }
  `
  return makeRequest<Promise<GroupedBuildModel[]>>({ query })
}
