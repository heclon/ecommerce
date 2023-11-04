import toast from 'react-hot-toast'
import { OperationResult } from 'urql'
import waait from 'waait'

type WithToastFunction = () => Promise<OperationResult>
interface WithToastOptions {
  loadingMessage?: string
  successMessage?: string
  errorMessage?: string
}

export const withToast = async (f: WithToastFunction, options: WithToastOptions = {}) => {
  const {
    loadingMessage = 'Processing...',
    successMessage = 'Success',
    errorMessage = `Error occurred, our team has been notified and is looking into it. \n Something urgent?  \n Please contact us on participants@ecommerce.com.au`,
  } = options
  const toastId = toast.loading(loadingMessage, {
    style: {
      backgroundColor: '#8C14FC',
      color: '#FFF',
    },
  })
  const result = await f()
  if (result.error) {
    console.error(result.error.message)
    toast.error(errorMessage, {
      id: toastId,
      duration: 3000,
      style: {
        backgroundColor: '#ef4444',
        color: '#fff',
      },
    })
    return
  }
  toast.success(successMessage, {
    id: toastId,
    duration: 3000,
    style: {
      backgroundColor: '#8C14FC',
      color: '#fff',
    },
  })
  await waait(2000)
  toast.dismiss()
}
