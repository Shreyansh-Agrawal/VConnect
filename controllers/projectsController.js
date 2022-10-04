import Project from '../models/Project.js'
import Events from '../models/Events.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import {checkPermissionsClub} from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'

const createProject = async (req, res) => {
  const { name, course } = req.body

  if (!name || !course) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const project = await Project.create(req.body)
  res.status(StatusCodes.CREATED).json({ project })
}
const getAllProjects = async (req, res) => {
  const { status, projectType, sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (projectType && projectType !== 'all') {
    queryObject.projectType = projectType
  }
  if (search) {
    queryObject.name = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Project.find(queryObject)

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('name')
  }
  if (sort === 'z-a') {
    result = result.sort('-name')
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const projects = await result

  const totalProjects = await Project.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalProjects / limit)

  res.status(StatusCodes.OK).json({ projects, totalProjects, numOfPages })
}
const updateProject = async (req, res) => {
  const { id: projectId } = req.params
  const { course, name } = req.body

  if (!name || !course) {
    throw new BadRequestError('Please provide all values')
  }
  const project = await Project.findOne({ _id: projectId })

  if (!project) {
    throw new NotFoundError(`No project with id :${projectId}`)
  }
  // check permissions

  checkPermissions(req.user, project.createdBy)

  const updatedProject = await Project.findOneAndUpdate({ _id: projectId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedProject })
}
const deleteProject = async (req, res) => {
  const { id: projectId } = req.params

  const project = await Project.findOne({ _id: projectId })

  if (!project) {
    throw new NotFoundError(`No project with id :${projectId}`)
  }

  checkPermissions(req.user, project.createdBy)

  await project.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Project removed' })
}
const showStats = async (req, res) => {
  let stats = await Project.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    completed: stats.completed || 0,
    planned: stats.planned || 0,
    ongoing: stats.ongoing || 0,
  }

  let monthlyApplications = await Project.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

// *******CLUB********

const createEvent = async (req, res) => {
  const { namec, coursec } = req.body

  if (!namec || !coursec) {
    throw new BadRequestError('Please provide all values')
  }
  try {
     req.body.createdBy = req.club.clubId;
     const project = await Events.create(req.body);
     res.status(StatusCodes.CREATED).json({ project });
  } catch (error) {
    res.send(error)
    console.log(error);
  }
 
}
const getAllEvents = async (req, res) => {
  const { statusc, projectTypec, sortc, searchc } = req.query

  const queryObject = {
    createdBy: req.club.clubId,
  }
  // add stuff based on condition

  if (statusc && statusc !== 'all') {
    queryObject.status = statusc
  }
  if (projectTypec && projectTypec !== 'all') {
    queryObject.projectTypec = projectTypec
  }
  if (searchc) {
    queryObject.namec = { $regex: searchc, $options: 'i' }
  }
  // NO AWAIT

  let result = Events.find(queryObject)

  // chain sort conditions

  if (sortc === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sortc === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sortc === 'a-z') {
    result = result.sort('name')
  }
  if (sortc === 'z-a') {
    result = result.sort('-name')
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const projects = await result

  const totalProjects = await Events.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalProjects / limit)

  res.status(StatusCodes.OK).json({ projects, totalProjects, numOfPages })
}
const updateEvent = async (req, res) => {
  const { id: projectId } = req.params
  const { coursec, namec } = req.body

  if (!namec || !coursec) {
    throw new BadRequestError('Please provide all values')
  }
  const project = await Events.findOne({ _id: projectId })

  if (!project) {
    throw new NotFoundError(`No project with id :${projectId}`)
  }
  // check permissions

  checkPermissionsClub(req.club, project.createdBy)

  const updatedProject = await Events.findOneAndUpdate({ _id: projectId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedProject })
}
const deleteEvent = async (req, res) => {
  const { id: projectId } = req.params

  const project = await Events.findOne({ _id: projectId })

  if (!project) {
    throw new NotFoundError(`No project with id :${projectId}`)
  }

  checkPermissionsClub(req.club, project.createdBy)

  await project.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Events removed' })
}
const showStatsClub = async (req, res) => {
  let stats = await Events.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.club.clubId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    completed: stats.completed || 0,
    planned: stats.planned || 0,
    ongoing: stats.ongoing || 0,
  }

  let monthlyApplications = await Events.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.club.clubId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
  showStats,
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
  showStatsClub,
};
