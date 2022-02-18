import { MOLECULES } from '../constants/moleculelist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'

export const doesMoleculeExist = (molecule: string) => {
  // check whether a valid organic molecule
  if (molecule[0] === 'C') {
    let isOrganicMolecule = true
    const atomNums = { C: 0, H: 0, N: 0, O: 0, S: 0, F: 0, Cl: 0, Br: 0, I: 0 }
    let currAtom = 'C' as keyof typeof atomNums
    for (let i = 1; i <= molecule.length; i++) {
      if (!molecule[i] || (molecule[i] >= 'A' && molecule[i] <= 'Z')) {
        atomNums[currAtom] = atomNums[currAtom] || 1
        if (atomNums.hasOwnProperty(molecule[i])) {
          currAtom = molecule[i] as keyof typeof atomNums
        }
      } else if (molecule >= '1' && molecule[i] <= '9') {
        atomNums[currAtom] = +molecule[i]
      } else {
        currAtom += molecule[i]
        if (!atomNums.hasOwnProperty(currAtom)) {
          isOrganicMolecule = false
          break
        }
      }
    }

    if (isOrganicMolecule) {
      const ringOrPiBondNums =
        (2 * atomNums['C'] +
          atomNums['H'] +
          atomNums['F'] +
          atomNums['Cl'] +
          atomNums['Br'] +
          atomNums['I'] -
          atomNums['N'] +
          2) /
        2

      return ringOrPiBondNums >= 0 && ringOrPiBondNums % 1 === 0
    }
  }

  return MOLECULES.includes(molecule) || VALID_GUESSES.includes(molecule)
}

export const isWinningMolecule = (molecule: string) => {
  return solution === molecule
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (molecule: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(guess)

  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(guess[i])
    }
    if (statuses[i] === 'correct' && molecule[i] !== guess[i]) {
      return WRONG_SPOT_MESSAGE(guess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of molecule) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const getMoleculeOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: MOLECULES[index % MOLECULES.length],
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getMoleculeOfDay()
