'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')
const Env = use('Env')

class FileController {
  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)
    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
      const upload = request.file('file', {
        types: ['image'],
        size: '2mb'
        // extnames: ['png', 'gif', 'jpg']
      })

      if (!upload) return

      let fileName =
        Env.get('NODE_ENV') === 'testing'
          ? upload.className
          : `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })
      return file
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Unable to upload file' } })
    }
  }

  async destroy ({ params }) {
    const file = await File.findOrFail(params.id)
    await file.delete()
  }
}

module.exports = FileController
