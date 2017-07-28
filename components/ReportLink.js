import Link from 'next/link'

const ReportLink = ({report}) => {
  return (
    <li>
      <h3>
        <Link prefetch as={`/reports/${report.id}`} href={`/report?id=${report.id}`}>
          <a>{report.fields.title}</a>
        </Link>
      </h3>
      <p>{report.fields.country[0].name}</p>
      <p>{report.fields.source[0].shortname}</p>
      <p>{report.fields.date.created}</p>
    </li>
  )
}

export default ReportLink
