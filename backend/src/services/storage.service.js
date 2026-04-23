const { toFile } = require('@imagekit/nodejs')

const ImageKit = require('@imagekit/nodejs').default


const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
})


const uploadFile = async ({fileBuffer , filename , folder=""}) => {

        const file = await client.files.upload({
            file: await toFile(Buffer.from(fileBuffer)),
            fileName:filename,
            folder
        })


        return file
}

module.exports = {
    uploadFile
}