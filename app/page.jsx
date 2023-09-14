/**

Renders a Next.js page component that displays a grid of character avatars with links to individual character pages.
@component
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { endpoint } from '@/utils/endpoint'

async function getAllCharacters() {
  const data = await fetch(`${endpoint}/characters`)

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }
  return data.json()
}

export default async function Page() {
  const data = await getAllCharacters()

  return (
    <main>
      <Container className="grid grid-cols-3 gap-3 py-5">
        {data?.characters?.map(item => {
          return (
            <Link
              href={`/characters/${item.slug}`}
              key={item.id}
              className="overflow-hidden rounded-lg"
            >
              <Image
                src={item.avatar}
                alt=""
                className="transition-all duration-500 hover:scale-125 "
                width={500}
                height={200}
              />
            </Link>
          )
        })}
      </Container>
    </main>
  )
}
