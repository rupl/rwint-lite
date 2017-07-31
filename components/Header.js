import Link from 'next/link'
import Logo from './Logo'

const Header = (props) => (
  <header role='banner'>
    <Logo home={props.home} />
    <Link href='/'>
      <a>Home</a>
    </Link>
    <Link as='/report/listing' href='/updates'>
      <a>Updates</a>
    </Link>
  </header>
)

export default Header
