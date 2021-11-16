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
import { useState } from 'react'
import Layout from '../../components/Layout'
import { BetterDAO, ToastType } from '../../type'
import { toast } from '../../utils/common'
import { createDAO } from '../../utils/contract'

export default function DAONew({}) {
  const [dao, setDAO] = useState<BetterDAO>({
    name: ``,
    projectUrl: '',
    logoUrl: '',
    description: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const onCreateDAO = () => {
    if (!/^[a-z1-9_-]{1,13}$/.test(dao.name)) {
      toast(ToastType.ERROR, 'Invalid DAO name')
      return
    }

    if (
      dao.projectUrl &&
      !/^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/.test(
        dao.projectUrl
      )
    ) {
      toast(ToastType.ERROR, 'Invalid project url')
      return
    }

    if (
      dao.logoUrl &&
      !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(dao.logoUrl)
    ) {
      toast(ToastType.ERROR, 'Invalid logo url')
      return
    }

    if (dao.description.length > 200) {
      toast(ToastType.ERROR, 'Description too long')
      return
    }

    setIsLoading(true)
    createDAO(dao)
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }
  return (
    <Layout title="New DAO" isLoading={isLoading}>
      <Box direction="column" align="center" gap="small">
        <Heading level="2">Create new DAO</Heading>
        <Form
          value={dao}
          onChange={(nextValue) => setDAO(nextValue)}
          style={{ width: 400 }}
        >
          <Text weight="bold">DAO name</Text>
          <MaskedInput
            mask={[{ regexp: /^[a-z1-9_-]{1,13}$/ }, { fixed: '.better.near' }]}
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
            style={{ marginBottom: 10, marginTop: 5 }}
          />
          <Text weight="bold">Description</Text>
          <TextArea
            placeholder="Description"
            id="description"
            name="description"
            maxLength={200}
            style={{ marginBottom: 10, marginTop: 5, height: 160 }}
          />
          <Box direction="row" justify="center" gap="medium">
            <Button
              type="submit"
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
