import {
  Box,
  Form,
  Heading,
  TextInput,
  Button,
  TextArea,
  Select,
  Text,
} from 'grommet'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import { DAOMethod, IssueCategory, ToastType } from 'type'
import { createIssue } from 'utils/contract'
import _ from 'lodash'
import { toast, validateIssueForm } from 'utils/common'
import { useDAOviewMethod } from 'hooks/query'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import { getContractName } from 'utils/config'

const mdParser = new MarkdownIt()

export default function NewIssue({}) {
  const router = useRouter()
  const daoAddress = getContractName()
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')

  const categories = useDAOviewMethod(
    daoAddress,
    DAOMethod.getCategories,
    undefined,
    []
  )
  const [issue, setIssue] = useState({
    title: '',
    description: '',
    category: '',
  })

  useEffect(() => {
    if (categories.length > 0 && !issue.category) {
      setIssue({ ...issue, category: categories[0] })
    }
  }, [categories, issue])

  const query = router.query
  useEffect(() => {
    if (query.transactionHashes) {
      router.replace(`/dao/${daoAddress}`)
    }
  }, [query])

  const onCreateIssue = () => {
    if (!validateIssueForm({ ...issue, description: content })) {
      return
    }
    setIsLoading(true)
    createIssue(daoAddress, {
      title: issue.title,
      description: content,
      category: issue.category,
    })
      .then(() => {
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
        <Heading level="2">Create an issue</Heading>
        <Form
          value={issue}
          onChange={(nextValue) => setIssue(nextValue)}
          onSubmit={({ value }) => {}}
          style={{ width: 800 }}
        >
          <TextInput
            placeholder="Bounty title"
            id="title"
            name="title"
            style={{ marginBottom: 20, background: 'white' }}
            maxLength={100}
          />
          <MdEditor
            style={{ height: '500px', marginBottom: 20 }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }) => {
              setContent(text)
            }}
            view={{ menu: false, md: true, html: true }}
          />
          <Select
            id="category"
            name="category"
            style={{ width: 750 }}
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
