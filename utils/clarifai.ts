import type { Ref } from 'vue'

interface FacePosition {
  topRow: number
  rightCol: number
  bottomRow: number
  leftCol: number
}

interface FaceStyle {
  top: string
  right: string
  bottom: string
  left: string
}

interface FaceDisplay {
  style: FaceStyle
}

export async function fetchImageData(imageUrl: string) {
  try {
    const data = await $fetch('/api/image', {
      method: 'POST',
      headers: { pathName: '/api/image' },
      body: imageUrl,
    })

    return { data }
  }
  catch (error) {
    throw new Error('Error fetching image data')
  }
}

export function calculateFaceLocation(faceBox: any, imageRef: HTMLImageElement | undefined) {
  const faceArray: FacePosition[] = []
  const image = imageRef // access to <img> to manipulate the DOM.
  const width = Number(image?.width)
  const height = Number(image?.height)
  for (const faceObject of faceBox.outputs[0].data.regions) {
    const box = faceObject.region_info.bounding_box
    faceArray.push({
      topRow: box.top_row * height,
      rightCol: width - box.right_col * width,
      bottomRow: height - box.bottom_row * height,
      leftCol: box.left_col * width,
    })
  }
  // console.log(faceArray);
  // return an array of objects in which we calculated the value
  // of the boxes arround each face recognized by the API.
  return faceArray
}

export function displayFaceBox(faceArray: FacePosition[], listFace: Ref<FaceDisplay[]>) {
  listFace.value = []
  for (const face of faceArray) {
    const style = {
      top: `${face.topRow}px`,
      right: `${face.rightCol}px`,
      bottom: `${face.bottomRow}px`,
      left: `${face.leftCol}px`,
    }
    listFace.value.push({ style })
  }
}
