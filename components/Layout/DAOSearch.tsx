import { useState } from 'react'
import { TextInput } from 'grommet'
import { Search } from 'react-feather'
import { useDaoList } from 'hooks/query'
import { getDAOName } from 'utils/common'
import router from 'next/router'
import { getContractName } from 'utils/config'

export default function DAOSearch({}) {
  const [isSearching, setIsSearching] = useState(false)
  const [keyword, setKeyword] = useState('')
  const daos = useDaoList()
  const [suggestions, setSuggestions] = useState(daos)

  return isSearching ? (
    <TextInput
      value={keyword}
      onChange={(e) => {
        setKeyword(e.target.value)
        setSuggestions(
          daos
            .map((t) => getDAOName(t))
            .filter((t) => t.includes(e.target.value))
        )
      }}
      suggestions={suggestions}
      onSelect={(e) => {
        router.push(`/dao/${e.suggestion}.${getContractName()}`)
      }}
    />
  ) : (
    <Search onClick={() => setIsSearching(true)} />
  )
}
