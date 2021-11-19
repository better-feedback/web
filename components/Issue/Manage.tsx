import { Box } from 'grommet'
import * as Icons from 'react-feather'
import { Status, ToastType } from '../../type'
import { getStatusConfig, toast } from '../../utils/common'
import ButtonWrap from './ButtonWrap'

export default function Manage({
  status,
  daoAddress,
  feedbackId,
  setIsLoading,
}: {
  status: Status
  daoAddress: string
  feedbackId: number
  setIsLoading: any
}) {
  const { actions } = getStatusConfig(status)
  return (
    <Box>
      {actions.map(({ icon, nextStatus, call }) => {
        const Icon = Icons[icon]
        const { color, actionName } = getStatusConfig(nextStatus)
        return (
          <ButtonWrap
            key={nextStatus}
            title={actionName}
            icon={<Icon size={16} />}
            background={color}
            onClick={() => {
              setIsLoading(true)
              call(daoAddress, feedbackId)
                .then(() => {
                  setIsLoading(false)
                  window.location.reload()
                })
                .catch((error) => {
                  setIsLoading(false)
                  toast(ToastType.ERROR, error.message)
                })
            }}
          />
        )
      })}
    </Box>
  )
}
