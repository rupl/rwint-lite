import Link from 'next/link'

const Nav = (props) => (
  <nav role='navigation'>
    <Link prefetch href='/'>
      <a>Home</a>
    </Link>
    <Link prefetch as='/report/listing' href='/updates'>
      <a>Updates</a>
    </Link>
    <style jsx>{`
    `}</style>
  </nav>
)

export default Nav
