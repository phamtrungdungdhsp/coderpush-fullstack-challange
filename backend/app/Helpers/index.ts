export const formatPageAndLimit = (input: { page: number | null, limit: number | null }) => ({
  page: input.page ? input.page : 1,
  limit: input.limit ? input.limit : 10
})

export const snakeToCamel = (str: string) => str
  .replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
    .replace('-', '')
    .replace('_', '')
  )
