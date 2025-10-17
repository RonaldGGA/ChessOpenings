// app/practice/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getOpening } from '../../lib/actions'
import PracticeClient from './practiceClient'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PracticePage({ params }: PageProps) {
  // Esperar los params antes de usar sus propiedades
  const { id } = await params
  const opening = await getOpening(id)

  if (!opening) {
    notFound()
  }

  return <PracticeClient opening={opening} />
}