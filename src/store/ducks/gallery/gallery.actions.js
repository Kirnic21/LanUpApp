import { UPLOAD_GALLERY, DELETE_GALLERY, UPDATE_GALLERY } from "../action.types"

const uploadGalleryImage = data => ({
  type: UPLOAD_GALLERY,
  data
})

const updateGalleryImage = data => ({
  type: UPDATE_GALLERY,
  data 
})

const deleteGalleryImage = data => ({
  type: DELETE_GALLERY,
  data
})

export {
  uploadGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
}