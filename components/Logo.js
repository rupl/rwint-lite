import Link from 'next/link'

const LogoImg = () => (
  <img src='/static/rw-logo.svg' alt='ReliefWeb' />
)

const Logo = ({home}) => {
  return (
    <div>
      {home &&
        <h1>
          <LogoImg />
        </h1>
      }
      {!home &&
        <Link href='/'>
          <a><LogoImg /></a>
        </Link>
      }
    </div>
  )
}

export default Logo
