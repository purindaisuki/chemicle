import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT, CAPS_TEST } from '../../constants/strings'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  onCaps: () => void
  guesses: string[]
  isRevealing?: boolean
  isCapital: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  onCaps,
  guesses,
  isRevealing,
  isCapital,
}: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: string) => {
    switch (value) {
      case 'ENTER':
        onEnter()
        break
      case 'DELETE':
        onDelete()
        break
      case 'CAPS':
        onCaps()
        break
      default:
        onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key
        if (
          key.length === 1 &&
          ((key >= '0' && key <= '9') ||
            (key.toUpperCase() >= 'A' && key.toUpperCase() <= 'Z'))
        ) {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((key) => {
          const realKey = isCapital ? key.toUpperCase() : key
          return (
            <Key
              value={realKey}
              key={realKey}
              onClick={onClick}
              status={charStatuses[realKey]}
              isRevealing={isRevealing}
            />
          )
        })}
      </div>
      <div className="flex justify-center mb-1">
        <Key width={65.4} value="CAPS" onClick={onClick}>
          {CAPS_TEST}
        </Key>
        {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((key) => {
          const realKey = isCapital ? key.toUpperCase() : key
          return (
            <Key
              value={realKey}
              key={realKey}
              onClick={onClick}
              status={charStatuses[realKey]}
              isRevealing={isRevealing}
            />
          )
        })}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((key) => {
          const realKey = isCapital ? key.toUpperCase() : key
          return (
            <Key
              value={realKey}
              key={realKey}
              onClick={onClick}
              status={charStatuses[realKey]}
              isRevealing={isRevealing}
            />
          )
        })}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}
