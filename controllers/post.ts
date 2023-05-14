import { Response } from 'express'
import { RequestWithUser, TypedRequestBody, TypedRequestQuery } from '../types/request'
import { CreateData, UpdateData } from './types/post'
import { HOST } from '../core/config'
import { Post } from '../models'
import { UploadedFile } from 'express-fileupload'

export const create = async (req: TypedRequestBody<CreateData>, res: Response) => {
  try {
    const data = req.body
    const media = req.files && req.files.media as UploadedFile
    if(media) {
      await media.mv(__dirname + '/../public/' + media.name);
      console.log("upload")
    }
    const newPost = await Post.create({
      ...data,
      author: req?.user && `${req?.user.firstName} ${req?.user.lastName}`,
      media: HOST && media ? `${HOST && HOST + '/' + media?.name}` : null
    })

    res.send(newPost.dataValues)
  } catch (err) {
    res.status(404)
  }
}


export const get = async (req: TypedRequestQuery<{ page: number }>, res: Response) => {
  try {
    const limit = 20
    const range = req.query.page
    const data = (await Post.findAll({ limit: 20, offset: (range - 1) * limit }))
    res.send(data)
  } catch (err) {
    res.status(404)
  }
}

export const deleteOne = async (req: TypedRequestQuery<{ id: number }>, res: Response) => {
  try {
    await Post.destroy({ where: { id: req.query.id } })
    res.send("deleted")
  } catch (err) {
    res.status(404)
  }
}


export const update = async (req: TypedRequestBody<UpdateData>, res: Response) => {
  try {
    await Post.update({ text: req.body.text }, { where: { id: req.body.id } })
    res.send('updated')
  } catch (err) {
    res.status(404)
  }
}
