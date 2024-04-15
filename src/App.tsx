import { useState } from 'react'
import './App.css'

type Status = 'typing' | 'submitting' | 'success'

function App() {
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState<Status>('typing')
  const [error, setError] = useState(null)

  if (status === 'success') {
    return <h1>That's right! ✅</h1>
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await submitForm(answer)
      setStatus('success')
    } catch (err) {
      setStatus('typing')
      setError(err)
    }
  }
  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value)
  }

  return (
    <>
      <h1>Reacting to Input with State</h1>
      <div>
        <h2>City quiz</h2>
        <p>What city is located on two continents?</p>
        {status === 'submitting' ? (
          <p>Loading....</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
            value={answer}
            onChange={handleTextareaChange}
            disabled={status as Status === 'submitting'}
            ></textarea>
            <br />
            <button disabled={answer.length === 0 || status as Status === 'submitting'}>Submit</button>
            {error !== null && (
              <p className='error'>
                {error.message}
              </p>
            )}
          </form>
        )}
      </div>
    </>
  )
}

function submitForm(answer: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'))
      } else {
        resolve(undefined)
      }
    }, 1500)
  })
}

export default App
