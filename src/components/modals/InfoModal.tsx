import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the molecular formula in 10 tries. After each guess, the color of
        the tiles will change to show how close your guess was to the formula.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="C"
          status="correct"
        />
        <Cell value="a" />
        <Cell value="C" />
        <Cell value="O" />
        <Cell value="3" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter C is in the molecular formula and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="C" />
        <Cell value="5" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="H"
          status="present"
        />
        <Cell value="5" />
        <Cell value="N" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter H is in the molecular formula but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="H" />
        <Cell value="M" />
        <Cell value="n" />
        <Cell isRevealing={true} isCompleted={true} value="O" status="absent" />
        <Cell value="4" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter O is not in the molecular formula in any spot.
      </p>
      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is a chemical-based version of the word guessing game. Built on the
        open source version from cwackerfuss -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
