import { useState } from 'react'
import { Layer, Box, Text, Button, Heading, TextInput } from 'grommet'
import { ToastType } from 'type'
import { toast } from 'utils/common'
import { useAccount } from 'hooks/wallet'
import { addCouncilMember, removeCouncilMember } from 'utils/contract'
import { getEnv } from 'utils/config'
import { XCircle } from 'react-feather'

export default function CouncilManageModal({
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
  const account = useAccount()
  const [accountId, setAccountId] = useState('')
  const onRemove = async (accountId: string) => {
    if (accountId === account?.accountId) {
      toast(ToastType.ERROR, 'Cannot remove yourself')
      return
    }
    if (council.length === 1) {
      toast(ToastType.ERROR, 'Cannot remove the last member')
      return
    }
    setIsLoading(true)
    removeCouncilMember(daoAddress, accountId)
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
      <Box pad="medium" gap="medium" width="600px">
        <XCircle
          color="#999"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            cursor: 'pointer',
          }}
        />
        <Heading level={3} margin="none">
          Council Manage
        </Heading>

        <Box direction="column" gap="small">
          <Box direction="row" gap="small">
            <TextInput
              placeholder="Input account"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
            />
            <Button primary label="Add" size="small" onClick={onAdd} />
          </Box>
          {council.map((c, index) => {
            return (
              <Box key={index} direction="row" align="center" justify="between">
                <Text weight="bold">{c}</Text>
                <Button
                  size="small"
                  label="Remove"
                  primary
                  onClick={() => onRemove(c)}
                />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Layer>
  )
}
