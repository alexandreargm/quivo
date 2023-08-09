export const releaseDateTags = [
  { id: "2020", title: 'Recent 2020s' },
  { id: "2000", title: 'Rise of Streaming 2010s' },
  { id: "1990", title: 'Modern Classics 90s-2000s' },
  { id: "1970", title: 'Influential Movies 70s-80s' },
  { id: "1920", title: 'Classic Hollywood 20s-60s' },
  { id: "1890", title: 'Silent Films 1890s-1920s' }
]

const releaseDateTagValues = [
  { id: "2020", startDate: "2020", endDate: String(new Date().getFullYear()) },
  { id: "2000", startDate: "2000", endDate: "2010" },
  { id: "1990", startDate: "1990", endDate: "2000" },
  { id: "1970", startDate: "1970", endDate: "1980" },
  { id: "1920", startDate: "1920", endDate: "1960" },
  { id: "1890", startDate: "1890", endDate: "1920" }
]

export function getReleaseTagValues(tagId) {
  return releaseDateTagValues.find(tag => tag.id === tagId)
}

export function getReleaseTagId({startDate, endDate}) {
  return releaseDateTagValues.find(tag => tag.startDate === startDate && tag.endDate === endDate)?.id || 0
}

export const keywordTags = [
  { id: "818", title: 'based on book' },
  { id: "9717", title: 'based on comic' },
  { id: "34117", title: 'cult film' },
  { id: "156866", title: 'based on short story' },
  { id: "10181", title: 'based on musical' },
  { id: "158718", title: 'lgbt' },
  { id: "9672", title: 'based on true story' },
  { id: "10683", title: 'coming of age' },
  { id: "4344", title: 'musical' },
  { id: "3691", title: 'forbidden love' },
  { id: "11322", title: 'female protagonist' },
  { id: "4565", title: 'dystopia' },
  { id: "207317", title: 'christmas' },
  { id: "276130", title: 'paranormal events' },
  { id: "9715", title: 'superhero' },
  { id: "282", title: 'video game' },
  { id: "10714", title: 'serial killer' },
  { id: "210024", title: 'anime' },
  { id: "2964", title: 'future' },
  { id: "83", title: 'saving the world' },
  { id: "14602", title: 'break-up' },
  { id: "6956", title: 'treasure hunt' }
]