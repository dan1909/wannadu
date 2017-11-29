const checkTraitInListOfTraits = (targetTraitName, listOfTraits) => {
  let traitIndex = 0
  for (const traitObj of listOfTraits) {
    if (traitObj['name'] == targetTraitName) {
      return traitIndex
    }
    traitIndex++
  }
  return -1
}

exports.checkTraitInListOfTraits = checkTraitInListOfTraits
