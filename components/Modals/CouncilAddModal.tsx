import { useState } from 'react'
import { Layer, Box, TextArea, Text, Button, Heading, TextInput } from 'grommet'
import { Issue, ToastType } from 'type'
import { addCouncilMember, applyIssue } from 'utils/contract'
import { validateApplyForm, toast } from 'utils/common'
import { useAccount } from 'hooks/wallet'
import { getEnv } from 'utils/config'
import { useRouter } from 'next/router'

export default function CouncilAddModal({
  council,
  daoAddress,
  onClose,
  setIsLoading,
}: {
  council: string[]
  daoAddress: string
  onClose: any
  setIsLoading: any
}) {
  const [accountId, setAccountId] = useState('')
  const onAdd = async () => {
    const env = getEnv()
    if (env === 'mainnet') {
      if (!/[a-z1-9]{1,}\.near/.test(accountId)) {
        toast(ToastType.ERROR, 'Invalid accountId')
        return
      }
    } else {
      if (!/[a-z1-9]{1,}\.testnet/.test(accountId)) {
        toast(ToastType.ERROR, 'Invalid accountId')
        return
      }
    }
    if (council.includes(accountId)) {
      toast(ToastType.ERROR, `${accountId} is already in council`)
      return
    }
    setIsLoading(true)
    addCouncilMember(daoAddress, accountId)
      .then(() => {
        setIsLoading(false)
        onClose()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }
  return (
    <Layer onClickOutside={onClose}>
      <Box pad="medium" gap="medium" width="400px">
        <Heading level={3} margin="none">
          Council Manage
        </Heading>

        <Box direction="column" gap="small">
          <TextInput
            placeholder="Input account"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
        </Box>

        <Box direction="row" justify="around">
          <Button label="Add" primary onClick={() => onAdd()} />
        </Box>
      </Box>
    </Layer>
  )
}
