const indexOfTrait = (targetTraitName, listOfTraits) => {
  let traitIndex = 0
  for (const traitObj of listOfTraits) {
    if (traitObj['name'] == targetTraitName) {
      return traitIndex
    }
    traitIndex++
  }
  return -1
}

exports.indexOfTrait = indexOfTrait
