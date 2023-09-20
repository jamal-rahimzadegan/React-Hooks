import { useSearchParams } from 'react-router-dom'

type Output<T> = {
  updateSearchParams: (param: string, newValue: string) => void
  searchParams: URLSearchParams
  retrieveParam: (param: keyof T) => string
}

export default function useManageParam<T extends Record<string, any>>(
  value: T,
): Output<T> {
  const [searchParams, setSearchParams] = useSearchParams(value)

  const updateSearchParams = (param: string, newValue: string) => {
    setSearchParams((prev) => {
      prev.set(param, newValue)
      return prev
    })
  }

  const retrieveParam = (param: keyof T): string => {
    return searchParams.get(param as string) || ''
  }

  return { searchParams, updateSearchParams, retrieveParam }
}
