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

const mockReports = [
  {
    id: '30',
    fields: {
      title: 'Report: Something - words [EN/UK] 0',
      primary_country: {
        name: 'South Yorkshire',
        shortname: 'So Yo'
      }
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

const mockEndpoints = {
  featuredCountries: 'https://api.reliefweb.int/v1/countries?appname=rwmob-dev&limit=20&filter[field]=featured&filter[value]=true',
  featuredDisasters: 'https://api.reliefweb.int/v1/disasters?appname=rwmob-dev&limit=20&filter[field]=featured&filter[value]=true',
  headlines: 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev&limit=16&sort[]=date.created:desc&fields[include][]=headline.title&fields[include][]=date.created&fields[include][]=primary_country.name&fields[include][]=primary_country.shortname&fields[include][]=source.name&fields[include][]=source.shortname&filter[operator]=AND&filter[conditions][0][field]=status&filter[conditions][0][value][]=published&filter[conditions][0][value][]=to-review&filter[conditions][0][operator]=OR&filter[operator]=AND&filter[conditions][1][field]=headline'
}

export { mockCountries, mockDisasters, mockEndpoints, mockReports }