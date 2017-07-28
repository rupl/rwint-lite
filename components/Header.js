import Link from 'next/link'

const Header = () => (
  <header role='banner'>
    <Link prefetch href='/'>
      <a>Home</a>
    </Link>
    <Link prefetch as='/report/listing' href='/updates'>
      <a>Updates</a>
    </Link>
  </header>
)

export default Header
