// app/practice/[id]/page.tsx
import OpeningPracticeClient from "@/app/components/openingPracticeClient";
import { Alias, FromTo, Opening } from "@/app/generated/prisma/client";
import { findOpening } from "@/lib/actions";

interface PageProps {
  params: { id: string };
}

export type OpeningWithRelations = Opening & {
  aliases: Alias[];
  toTransitions?: (FromTo & {
    toOpening: Opening;
  })[];
};

export default async function PracticePage({ params }: PageProps) {
  const { id } = await params;

  const { opening, variations } = await findOpening(id);

  return opening ? (
    <OpeningPracticeClient opening={opening} variations={variations} />
  ) : (
    <span>Loading</span>
  );
}
