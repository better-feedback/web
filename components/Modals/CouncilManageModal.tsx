import { Layer, Box, Text, Button, Heading } from 'grommet'
import { ToastType } from 'type'
import { toast } from 'utils/common'
import { useAccount } from 'hooks/wallet'
import { removeCouncilMember } from 'utils/contract'

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
  return (
    <Layer onClickOutside={onClose}>
      <Box pad="medium" gap="medium" width="400px">
        <Heading level={3} margin="none">
          Council Manage
        </Heading>

        <Box direction="column" gap="small">
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

        <Box direction="row" justify="around">
          <Button label="Close" onClick={onClose} />
        </Box>
      </Box>
    </Layer>
  )
}
