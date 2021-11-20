import { Box, Text, Anchor, Button } from 'grommet'
import { useRouter } from 'next/router'
import { User, UserCheck } from 'react-feather'
import { Applicant, ToastType } from 'type'
import { approveApplicant, revokeApplicant } from 'utils/contract'
import { formatTimestamp } from 'utils/format'
import { toast } from 'utils/common'

export default function Applicants({
  applicants,
  isCouncil,
  setIsLoading,
}: {
  applicants: Applicant[]
  isCouncil: boolean
  setIsLoading: any
}) {
  const { query } = useRouter()
  const daoAddress = query.did as string
  const issueId = query.bid as string

  const isSomeoneApproved = applicants.some((app) => app.approved)

  const onApprove = async (applicant: Applicant) => {
    setIsLoading(true)
    approveApplicant(daoAddress, Number(issueId), applicant.applicant)
      .then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        setIsLoading(false)
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }

  const onRevoke = async (applicant: Applicant) => {
    setIsLoading(true)
    revokeApplicant(daoAddress, Number(issueId), applicant.applicant)
      .then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        setIsLoading(false)
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }

  return (
    <Box>
      {applicants.map((applicant, index) => {
        return (
          <Box direction="row" gap="medium" pad="medium">
            <Box style={{ flex: '0 0 120px' }}>
              <Text size="small">{formatTimestamp(applicant.timestamp)}</Text>
              <Text size="small">
                {formatTimestamp(applicant.timestamp, 'HH:MM:ss')}
              </Text>
            </Box>
            <Box
              flex="grow"
              gap="small"
              pad={{ bottom: 'small' }}
              style={{ borderBottom: '1px solid #e3e3e3', maxWidth: 600 }}
            >
              <Box direction="row" gap="small" align="center">
                {applicant.approved ? (
                  <Box
                    direction="row"
                    align="center"
                    background="status-ok"
                    gap="xsmall"
                    round
                    pad={{ vertical: 'xsmall', horizontal: 'small' }}
                  >
                    <UserCheck color="white" />
                    <Text size="small" color="white">
                      Approved
                    </Text>
                  </Box>
                ) : (
                  <Box
                    direction="row"
                    align="center"
                    background="accent-1"
                    pad={{ vertical: 'xsmall', horizontal: 'small' }}
                  >
                    <User color="white" />
                    <Text size="small" color="white">
                      Pending
                    </Text>
                  </Box>
                )}
                <Anchor label={applicant.applicant} />
              </Box>
              <Text>{applicant.message}</Text>
              <Box direction="row" align="center" justify="end">
                {!isSomeoneApproved && isCouncil && (
                  <Button
                    label="Approve"
                    primary
                    onClick={() => onApprove(applicant)}
                  />
                )}
                {applicant.approved && isCouncil && (
                  <Button
                    label="Revoke"
                    primary
                    onClick={() => onRevoke(applicant)}
                  />
                )}
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
