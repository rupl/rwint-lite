import Link from 'next/link'

const Featured = (props) => (
  <div>
    <h3>Featured</h3>
    <ul>
      {props.featured && props.featured.length > 0 &&
        props.featured.map((item, i) => (
          <li key={item.id}>
            <Link
              prefetch
              as={`/${item.type}/${item.id}/${item.urlName}`}
              href={`/${item.type}?id=${item.id}&name=${item.urlName}`}>
              <a>{item.fields.name}</a>
            </Link>
          </li>
        )
      )}
    </ul>
  </div>
)

export default Featured
