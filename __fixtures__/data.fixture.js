const mockCountries = [
  {id: '10', fields: {name: 'A country name 0'}},
  {id: '11', fields: {name: 'A country name 1'}},
  {id: '12', fields: {name: 'A country name 2'}},
  {id: '13', fields: {name: 'A country name 3'}},
  {id: '14', fields: {name: 'A country name 4'}},
  {id: '15', fields: {name: 'A country name 5'}},
  {id: '16', fields: {name: 'A country name 6'}},
  {id: '17', fields: {name: 'A country name 7'}},
  {id: '18', fields: {name: 'A country name 8'}},
  {id: '19', fields: {name: 'A country name 9'}}
]

const mockDisasters = [
  {id: '30', fields: {name: 'Oh no: A disaster name - 0'}},
  {id: '21', fields: {name: 'Oh no: A disaster name - 1'}},
  {id: '22', fields: {name: 'Oh no: A disaster name - 2'}},
  {id: '23', fields: {name: 'Oh no: A disaster name - 3'}},
  {id: '24', fields: {name: 'Oh no: A disaster name - 4'}},
  {id: '25', fields: {name: 'Oh no: A disaster name - 5'}},
  {id: '26', fields: {name: 'Oh no: A disaster name - 6'}},
  {id: '27', fields: {name: 'Oh no: A disaster name - 7'}},
  {id: '28', fields: {name: 'Oh no: A disaster name - 8'}},
  {id: '29', fields: {name: 'Oh no: A disaster name - 9'}}
]

const mockFeatured = [
  {id: '10', fields: {name: 'A country name 0'}},
  {id: '11', fields: {name: 'A country name 1'}},
  {id: '23', fields: {name: 'Oh no: A disaster name - 3'}},
  {id: '24', fields: {name: 'Oh no: A disaster name - 4'}},
  {id: '18', fields: {name: 'A country name 8'}},
  {id: '19', fields: {name: 'A country name 9'}}
]

const mockHeadlines = [
  {
    id: '30',
    fields: {
      date: {
        created: '2017-08-03T13:20:12+00:00'
      },
      primary_country: {
        shortname: 'So Yo'
      },
      source: [
        {
          shortname: 'Now Then'
        },
        {
          name: 'Exposed'
        }
      ],
      title: 'Report: Something - words [EN/UK] 0'
    }
  },
  {
    id: '31',
    fields: {
      title: 'Report: Something - words [EN/UK] 1',
      primary_country: {
        name: 'South Yorkshire'
      }
    }
  },
  {id: '32', fields: {title: 'Report: Something - words [EN/UK] 2'}},
  {id: '33', fields: {title: 'Report: Something - words [EN/UK] 3'}},
  {id: '34', fields: {title: 'Report: Something - words [EN/UK] 4'}},
  {id: '35', fields: {title: 'Report: Something - words [EN/UK] 5'}},
  {id: '36', fields: {title: 'Report: Something - words [EN/UK] 6'}},
  {id: '37', fields: {title: 'Report: Something - words [EN/UK] 7'}},
  {id: '38', fields: {title: 'Report: Something - words [EN/UK] 8'}},
  {id: '39', fields: {title: 'Report: Something - words [EN/UK] 9'}}
]

const mockReports = {
  totalCount: 22,
  data: [
    {
      id: '30',
      fields: {
        date: {
          created: '2017-08-03T13:20:12+00:00'
        },
        primary_country: {
          shortname: 'So Yo'
        },
        source: [
          {
            shortname: 'Now Then'
          },
          {
            name: 'Exposed'
          }
        ],
        title: 'Report: Something - words [EN/UK] 0'
      }
    },
    {
      id: '31',
      fields: {
        title: 'Report: Something - words [EN/UK] 1',
        primary_country: {
          name: 'South Yorkshire'
        }
      }
    },
    {id: '32', fields: {title: 'Report: Something - words [EN/UK] 2'}},
    {id: '33', fields: {title: 'Report: Something - words [EN/UK] 3'}},
    {id: '34', fields: {title: 'Report: Something - words [EN/UK] 4'}},
    {id: '35', fields: {title: 'Report: Something - words [EN/UK] 5'}},
    {id: '36', fields: {title: 'Report: Something - words [EN/UK] 6'}},
    {id: '37', fields: {title: 'Report: Something - words [EN/UK] 7'}},
    {id: '38', fields: {title: 'Report: Something - words [EN/UK] 8'}},
    {id: '39', fields: {title: 'Report: Something - words [EN/UK] 9'}}
  ]
}

const mockReportsPage2 = {
  totalCount: 22,
  data: [
    {id: '39', fields: {title: 'Report: Something - words [EN/UK] 9'}},
    {id: '40', fields: {title: 'Report: Something - words [EN/UK] 10'}},
    {id: '41', fields: {title: 'Report: Something - words [EN/UK] 11'}}
  ]
}

const mockEndpoints = {
  countries: 'https://api.reliefweb.int/v1/countries?appname=rwmob-dev&limit=300&offset=0&sort[]=name:asc&fields[include][]=name&fields[include][]=iso3',
  featuredCountries: 'https://api.reliefweb.int/v1/countries?appname=rwmob-dev&limit=20&offset=0&filter[field]=featured&filter[value]=true',
  featuredDisasters: 'https://api.reliefweb.int/v1/disasters?appname=rwmob-dev&limit=20&offset=0&filter[field]=featured&filter[value]=true',
  headlines: 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev&limit=16&offset=0&sort[]=date.created:desc&fields[include][]=headline.title&fields[include][]=date.created&fields[include][]=primary_country.name&fields[include][]=primary_country.shortname&fields[include][]=source.name&fields[include][]=source.shortname&filter[operator]=AND&filter[conditions][0][field]=status&filter[conditions][0][value][]=published&filter[conditions][0][value][]=to-review&filter[conditions][0][operator]=OR&filter[operator]=AND&filter[conditions][1][field]=headline',
  updates: 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev&limit=10&offset=0&sort[]=date.created:desc&fields[include][]=title&fields[include][]=date.created&fields[include][]=primary_country.name&fields[include][]=primary_country.shortname&fields[include][]=source.name&fields[include][]=source.shortname&filter[operator]=AND&filter[conditions][0][field]=status&filter[conditions][0][value][]=published&filter[conditions][0][value][]=to-review&filter[conditions][0][operator]=OR',
  updatesPage2: 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev&limit=10&offset=10&sort[]=date.created:desc&fields[include][]=title&fields[include][]=date.created&fields[include][]=primary_country.name&fields[include][]=primary_country.shortname&fields[include][]=source.name&fields[include][]=source.shortname&filter[operator]=AND&filter[conditions][0][field]=status&filter[conditions][0][value][]=published&filter[conditions][0][value][]=to-review&filter[conditions][0][operator]=OR'
}

export { mockCountries, mockDisasters, mockEndpoints, mockFeatured, mockHeadlines, mockReports, mockReportsPage2 }
