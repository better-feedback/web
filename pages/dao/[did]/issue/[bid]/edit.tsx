import {
  Box,
  Form,
  Heading,
  TextInput,
  Button,
  TextArea,
  Select,
} from 'grommet'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Layout from '../../../../../components/Layout'
import { DAOMethod, IssueCategory, ToastType } from '../../../../../type'
import { createIssue } from '../../../../../utils/contract'
import _ from 'lodash'
import { toast, validateIssueForm } from '../../../../../utils/common'
import { useDAOviewMethod } from '../../../../../hooks/query'

export default function EditIssue({}) {
  const router = useRouter()
  const daoAddress = router.query.did as string
  const issueId = router.query.bid as string
  const [isLoading, setIsLoading] = useState(false)

  const params = useMemo(() => ({ id: Number(issueId) }), [issueId])
  const categories = useDAOviewMethod(
    daoAddress,
    DAOMethod.getCategories,
    undefined,
    []
  )
  const council = useDAOviewMethod(daoAddress, DAOMethod.getCouncil, params, [])
  const _issue = useDAOviewMethod(daoAddress, DAOMethod.getIssue, params, null)
  const [issue, setIssue] = useState({
    title: '',
    description: '',
    category: '',
  })

  useEffect(() => {
    if (_issue) {
      setIssue(_issue)
    }
  }, [categories, issue, _issue])

  const onCreateIssue = () => {
    if (!validateIssueForm(issue)) {
      return
    }
    setIsLoading(true)
    createIssue(daoAddress, {
      title: issue.title,
      description: issue.description,
      category: issue.category,
    })
      .then((tx) => {
        router.back()
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        toast(ToastType.ERROR, error.message)
      })
  }
  return (
    <Layout title="Create an issue" isLoading={isLoading}>
      <Box direction="column" align="center" gap="small">
        <Heading level="2">Edit an issue</Heading>
        <Form
          value={issue}
          onChange={(nextValue) => setIssue(nextValue)}
          onSubmit={({ value }) => {}}
          style={{ width: 500 }}
        >
          <TextInput
            placeholder="Bounty title"
            id="title"
            name="title"
            style={{ marginBottom: 20 }}
            maxLength={100}
          />
          <TextArea
            placeholder="Description"
            id="description"
            name="description"
            style={{ marginBottom: 20, height: 160 }}
            maxLength={2000}
          />
          <Select
            id="category"
            name="category"
            style={{ width: 450 }}
            options={
              categories || [
                IssueCategory.BUG,
                IssueCategory.FEATURE_REQUEST,
                IssueCategory.SMART_CONTRACT,
                IssueCategory.UI,
                IssueCategory.OTHER,
              ]
            }
          />

          <Box
            direction="row"
            justify="center"
            gap="medium"
            style={{ marginTop: 20 }}
          >
            <Button
              type="submit"
              size="large"
              primary
              label="Submit"
              color="#333"
              onClick={onCreateIssue}
            />
          </Box>
        </Form>
      </Box>
    </Layout>
  )
}
