'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { FiRepeat } from 'react-icons/fi'
import { MdNearbyError } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'

export const Answer = ({ answers, questionId }) => {
  const [selected, setSelected] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let subscribed = true

    if (selected) {
      setLoading(true)
      fetch(`/api/quiz/answer/${questionId}`)
        .then(res => res.json())
        .then(res => {
          if (subscribed) {
            setResponseData(res)
          }
          setLoading(false)
        })
    }

    return () => {
      subscribed = false
    }
  }, [questionId, selected])

  const isCorrect = responseData?.correct === selected
  const isWrong = selected && !isCorrect

  const handleSelect = item => {
    setLoading(true)
    setSelected(item)
  }

  const handleTryAgain = () => {
    setSelected(null)
    setResponseData(null)
    setLoading(true)
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-4">
        {answers.map(item => {
          const isSelected = selected === item
          const isLoading = isSelected && loading
          return (
            <li key={item}>
              <button
                disabled={responseData || isLoading}
                onClick={() => handleSelect(item)}
                className={cn(
                  'p-2 rounded-md items-center justify-between w-full flex text-sm font-semibold disabled:cursor-not-allowed transition-all',
                  isLoading && 'animate-pulse',
                  isWrong && isSelected ? 'bg-red-700' : 'bg-slate-800',
                  isCorrect && isSelected ? 'outline text-green-500' : '',
                )}
              >
                {item}
                {isCorrect && isSelected && <FaCheck />}
                {isWrong && isSelected && <MdNearbyError />}
              </button>
            </li>
          )
        })}
      </ul>

      {isWrong && (
        <button
          onClick={handleTryAgain}
          className="flex items-center gap-1 text-blue-400"
        >
          <FiRepeat />
          Try Again
        </button>
      )}

      {isCorrect && responseData?.random && (
        <Link
          href={`/quiz/${responseData.random}`}
          className="flex items-center gap-1 text-blue-400"
        >
          <FiRepeat />
          Next
        </Link>
      )}
    </>
  )
}
