export type DrawingCard = {
  id: string
  number: string
  title: string
  revision: string
}

export const eilansDrawings: DrawingCard[] = [
  { id: 'a-101', number: 'A-101', title: 'Site Plan', revision: 'Rev C' },
  { id: 'a-102', number: 'A-102', title: 'Ground Floor Plan', revision: 'Rev B' },
  { id: 'a-103', number: 'A-103', title: 'First Floor Plan', revision: 'Rev B' },
  { id: 'a-201', number: 'A-201', title: 'North Elevation', revision: 'Rev A' },
  { id: 'a-202', number: 'A-202', title: 'South Elevation', revision: 'Rev A' },
  { id: 's-101', number: 'S-101', title: 'Foundation Plan', revision: 'Rev D' },
]

export const drawingSetOptions = [
  { value: '', label: 'Select drawing set…' },
  {
    value: 'architectural-issued-for-construction',
    label: 'Architectural — Issued for Construction',
  },
]
