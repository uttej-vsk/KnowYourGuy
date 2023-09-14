/**
Renders a navigation component with a sticky header, containing a logo and a link to take a quiz.
@component
@returns {JSX.Element} The rendered navigation component.
*/

import Link from 'next/link'
import { Container } from '.'
import Image from 'next/image'
import { TbArrowBigRightFilled } from 'react-icons/tb'

export const Navigation = () => {
  return (
    <nav className="sticky top-0 backdrop-blur-xl bg-[rgba(0,0,0,0.8)] border-b border-blue-400 z-50">
      <Container className="flex justify-between py-5">
        <Link href="/">
          <Image src="/logo.png" alt="Family Guy" width={70} height={50} />
        </Link>

        <Link
          href="/quiz"
          className="flex items-center gap-3 px-3 font-semibold text-black transition-colors bg-green-500 rounded-md duration-500 hover:bg-green-600"
        >
          <TbArrowBigRightFilled className="text-lg" />
          Know Your Guy
        </Link>
      </Container>
    </nav>
  )
}
