import {
  Box,
  Form,
  Heading,
  TextInput,
  Button,
  TextArea,
  MaskedInput,
  Text,
} from 'grommet'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TagsInput from 'components/Common/TagsInput'
import Layout from 'components/Layout'
import { useDAOviewMethod } from 'hooks/query'
import { BetterDAO, DAOMethod, ToastType } from 'type'
import { getDAOName, toast, validateDAOForm } from 'utils/common'
import { updateDAO } from 'utils/contract'
import { getContractName } from 'utils/config'

export default function EditDAO({}) {
  const { query } = useRouter()
  const daoAddress = getContractName()
  const _dao = useDAOviewMethod(
    daoAddress,
    DAOMethod.getDAOInfo,
    undefined,
    null
  )

  const [dao, setDAO] = useState<BetterDAO>({
    name: '',
    projectUrl: '',
    logoUrl: '',
    description: '',
  })
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (_dao) {
      setDAO(_dao)
      setCategories(_dao.categories)
    }
  }, [_dao])

  const onUpdateDAO = () => {
    if (!validateDAOForm({ ...dao, categories })) {
      return
    }

    setIsLoading(true)
    updateDAO(
      daoAddress,
      dao.projectUrl,
      dao.logoUrl,
      dao.description,
      categories
    )
      .then(() => {
        router.back()
        setIsLoading(false)
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }
  return (
    <Layout title="Edit the DAO" isLoading={isLoading}>
      <Box direction="column" align="center" gap="small">
        <Heading level="2">Edit the DAO</Heading>
        <Form
          value={dao}
          onChange={(nextValue) => setDAO(nextValue)}
          style={{ width: 500 }}
        >
          <Text weight="bold">DAO name</Text>
          <TextInput
            placeholder="will be prefix of .better.near"
            id="name"
            name="name"
            value={getDAOName(daoAddress)}
            disabled
            style={{ marginBottom: 10, marginTop: 5 }}
          />
          <Text weight="bold">Project URL</Text>
          <MaskedInput
            mask={[{ fixed: 'https://' }, { regexp: /^.*$/ }]}
            id="projectUrl"
            name="projectUrl"
            type="url"
            style={{ marginBottom: 10, marginTop: 5 }}
          />
          <Text weight="bold">Logo URL</Text>
          <MaskedInput
            mask={[{ fixed: 'https://' }, { regexp: /^.*(svg|png|jpg|jpeg)$/ }]}
            id="logoUrl"
            name="logoUrl"
            type="url"
            style={{ marginBottom: 10, marginTop: 5 }}
          />

          <Text weight="bold">Categories</Text>
          <TagsInput
            value={categories}
            onAdd={(tag) => setCategories([...categories, tag])}
            onRemove={(tag) =>
              setCategories(categories.filter((t) => t !== tag))
            }
            onChange={() => {}}
          />

          <Text weight="bold">Description</Text>
          <TextArea
            placeholder="Description"
            id="description"
            name="description"
            maxLength={200}
            style={{ marginBottom: 10, marginTop: 5, height: 160 }}
          />

          <Box
            direction="row"
            justify="center"
            gap="medium"
            margin={{ top: '10px' }}
          >
            <Button
              size="large"
              primary
              label="Submit"
              color="#333"
              onClick={onUpdateDAO}
            />
          </Box>
        </Form>
      </Box>
    </Layout>
  )
}
