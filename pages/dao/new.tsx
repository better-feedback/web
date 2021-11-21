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
import { useEffect, useState } from 'react'
import TagsInput from 'components/Common/TagsInput'
import Layout from 'components/Layout'
import { BetterDAO, ToastType } from 'type'
import { toast, validateDAOForm } from 'utils/common'
import { createDAO } from 'utils/contract'
import BN from 'bn.js'
import { useAccount } from 'hooks/wallet'
import { CONTRACT_NAME } from 'utils/config'
import { utils } from 'near-api-js'
import { useRouter } from 'next/router'

const DEFAULT_CATEGORIES = ['Bug', 'Feature Request', 'UI', 'Smart Contract']

export default function DAONew({}) {
  const account = useAccount()
  const [dao, setDAO] = useState<BetterDAO>({
    name: '',
    projectUrl: '',
    logoUrl: '',
    description: '',
  })
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES)
  const [isLoading, setIsLoading] = useState(false)

  const onCreateDAO = () => {
    if (!validateDAOForm({ ...dao, categories })) {
      return
    }

    setIsLoading(true)

    const _amount = utils.format.parseNearAmount('1')
    if (account) {
      const args = Buffer.from(
        JSON.stringify({
          projectUrl: dao.projectUrl,
          logoUrl: dao.logoUrl,
          description: dao.description,
          categories,
        })
      ).toString('base64')
      account
        .functionCall({
          contractId: CONTRACT_NAME,
          methodName: 'create',
          args: {
            name: dao.name,
            args,
          },
          gas: new BN('300000000000000'),
          attachedDeposit: _amount,
        })
        .then(() => {
          setIsLoading(false)
        })
        .catch((error) => {
          toast(ToastType.ERROR, error.message)
          setIsLoading(false)
        })
    }
  }

  const router = useRouter()
  useEffect(() => {
    if (router.query.transactionHashes) {
      router.replace('/')
    }
  }, [router.query])

  return (
    <Layout title="New DAO" isLoading={isLoading}>
      <Box direction="column" align="center" gap="small">
        <Heading level="2">Create new DAO</Heading>
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
            placeholder="URL must be end with svg/png/jpeg/jpg"
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
              onClick={onCreateDAO}
            />
          </Box>
        </Form>
      </Box>
    </Layout>
  )
}
