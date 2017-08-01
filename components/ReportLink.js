import Link from 'next/link'

const ReportLink = ({report}) => {
  return (
    <li>
      <h3>
        <Link prefetch as={`/report/${report.id}/${report.urlCountry}/${report.urlTitle}`} href={`/report?id=${report.id}`}>
          <a>{report.fields.title}</a>
        </Link>
      </h3>
      <p>{report.fields.primary_country.shortname || report.fields.primary_country.name}</p>
      <p>{report.fields.source[0].shortname}</p>
      <p>{report.fields.date.created}</p>
    </li>
  )
}

export default ReportLink
