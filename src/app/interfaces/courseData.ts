export type HoleType = {
  teeBoxes: {
    yards: number
    teeType: string
  }[]
}

export interface CourseData {
  addr1: string,
  city: string,
  name: string,
  phone: string,
  website: string,
  zipcode: string,
  holeCount: string,
  holes: HoleType[]
}