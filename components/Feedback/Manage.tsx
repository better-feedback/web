import { Box } from 'grommet'
import * as Icons from 'react-feather'
import { Status } from '../../type'
import { getStatusConfig } from '../../utils/common'
import ButtonWrap from './ButtonWrap'

export default function Manage({
  status,
  daoAddress,
  feedbackId,
}: {
  status: Status
  daoAddress: string
  feedbackId: number
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
              call(daoAddress, feedbackId)
            }}
          />
        )
      })}
    </Box>
  )
}
