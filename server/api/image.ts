export default defineEventHandler(async (event) => {
  try {
    const API_URL = 'https://api.clarifai.com/v2/models/face-detection/outputs'
    const USER_ID = useRuntimeConfig().userId
    const APP_ID = useRuntimeConfig().appId
    const PAT = useRuntimeConfig().pat
    const body = await useBody(event)
    const imageUrl: string = body

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Key ${PAT}`,
      },
      body: {
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [{ data: { image: { url: imageUrl } } }],
      },
    }

    return await $fetch(API_URL, options)
  }
  catch (error: any) {
    event.res.statusCode = 400
    event.res.statusMessage = 'Error fetching image'
    event.res.write(error.message)
    event.res.end()
  }
})
