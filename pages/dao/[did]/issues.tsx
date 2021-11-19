import { Anchor, Box, Text } from 'grommet'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ChevronRight, Meh } from 'react-feather'
import IssueFilter from '../../../components/Common/IssueFilter'
import IssueItem from '../../../components/Issue/Item'
import Layout from '../../../components/Layout'
import { useDAOviewMethod } from '../../../hooks/query'
import { DAOMethod, Issue, StatusList } from '../../../type'
import { getDAOName } from '../../../utils/common'

function filterIssues(issues: Issue[], status: number, category: string) {
  console.log('###filterIssues', status, category)
  let _issues = issues
  if (status !== -1 && status !== undefined) {
    _issues = _issues.filter((issue) => issue.status === status)
  }
  if (category !== '') {
    _issues = _issues.filter((issue) => issue.category === category)
  }

  return _issues
}

export default function IssuesPage() {
  const { query } = useRouter()
  const daoAddress = query.did as string
  const _category = query.category as string
  const _status = query.status as string
  const [isInitial, setIsInitial] = useState(false)
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const issues = useDAOviewMethod(
    daoAddress,
    DAOMethod.getIssues,
    undefined,
    []
  )

  useEffect(() => {
    if (!isInitial) {
      if (!category && _category) {
        setCategory(_category)
        setIsInitial(true)
      }
      if (!status && _status) {
        setStatus(_status)
        setIsInitial(true)
      }
    }
  }, [category, _category, isInitial, _status, status])

  const _filteredIssues = filterIssues(
    issues,
    status !== '' ? StatusList.indexOf(status) : undefined,
    category
  )

  return (
    <Layout title="">
      <Box pad="small" />
      <Box direction="row" align="end" gap="xsmall">
        <Anchor
          label={getDAOName(daoAddress)}
          href={`/dao/${daoAddress}`}
          style={{ fontSize: 30 }}
        />
        <ChevronRight size={20} color="#999" />
        <Text>{'Issues'}</Text>
      </Box>
      <Box pad="small" />
      <Box direction="row" gap="medium">
        <Box pad="medium" background="light-1">
          <IssueFilter
            daoAddress={daoAddress}
            status={status}
            setStatus={setStatus}
            category={category}
            setCategory={setCategory}
          />
        </Box>

        <Box pad="medium" flex="grow" gap="small">
          {_filteredIssues.map((issue) => {
            return (
              <IssueItem key={issue.id} issue={issue} daoAddress={daoAddress} />
            )
          })}
          {_filteredIssues.length === 0 && (
            <Box direction="column" align="center" justify="center">
              <Meh size={50} />
              <Text>{"There's no issues"}</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  )
}
