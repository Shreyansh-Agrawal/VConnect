import { UnAuthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return

  throw new UnAuthenticatedError('Not authorized to access this route')
}

export const checkPermissionsClub = (requestClub, resourceClubId) => {
  if (requestClub.clubId === resourceClubId.toString()) return

  throw new UnAuthenticatedError('Not authorized to access this route')
}

export default checkPermissions
