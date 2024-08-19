import { IPhotoFile } from '~/types/user'

export const hasPhotoFileError = (photoFile: IPhotoFile) => {
  const mediaFileFormats = /jpg|png|webp|svg/i
  console.log(photoFile, mediaFileFormats)
  if (photoFile) {
    if (!mediaFileFormats.test(photoFile.type.split('/')[1])) {
      return "Only following media files are allowed 'jpg' 'pdf' 'png' 'webp' 'svg'"
    } else if (photoFile.size > 1000000) {
      return 'Maximum image size must be 1mb'
    }
  } else {
    return ''
  }
}
