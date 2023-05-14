import { Response } from 'express'
import { TypedRequestBody } from '../types/request'
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
    res.status(404).send("error")
  }
}


export const get = async (req: TypedRequestBody<{}, { page: number }>, res: Response) => {
  try {
    const limit = 20
    const range = req.query.page
    const data = (await Post.findAll({ limit: 20, offset: (range - 1) * limit }))
    res.send(data)
  } catch (err) {
    res.status(404).send("error")
  }
}

export const deleteOne = async (req: TypedRequestBody<{}, { id: number }>, res: Response) => {
  try {
    const post = (await Post.findOne({ where: { id: req.query.id } }))?.dataValues
    if(req.user && req.user.firstName + req.user.lastName === post.author) {
      await Post.destroy({ where: { id: req.query.id } })
      return res.send("deleted")
    }
    res.status(404).send("error")
  } catch (err) {
    res.status(404).send("error")
  }
}


export const update = async (req: TypedRequestBody<UpdateData>, res: Response) => {
  try {
    const post = (await Post.findOne({ where: { id: req.body.id } }))?.dataValues
    if(req.user && `${req.user.firstName} ${req.user.lastName}` === post.author) {
      await Post.update({ text: req.body.text }, { where: { id: req.body.id } })
      return res.send('updated')
    }
    res.status(404).send("error")
  } catch (err) {
    res.status(404).send("error")
  }
}
