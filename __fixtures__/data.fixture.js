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
  {id: '20', fields: {name: 'Oh no: A disaster name - 0'}},
  {id: '21', fields: {name: 'Oh no: A disaster name - 1'}},
  {id: '22', fields: {name: 'Oh no: A disaster name - 2'}},
  {id: '23', fields: {name: 'Oh no: A disaster name - 3'}},
  {id: '24', fields: {name: 'Oh no: A disaster name - 4'}},
  {id: '25', fields: {name: 'Oh no: A disaster name - 5'}},
  {id: '26', fields: {name: 'Oh no: A disaster name - 6'}},
  {id: '27', fields: {name: 'Oh no: A disaster name - 7'}},
  {id: '28', fields: {name: 'Oh no: A disaster name - 8'}},
  {id: '29', fields: {name: 'Oh no: A disaster name-  9'}}
]

const mockEndpoints = {
  featuredCountries: 'https://api.reliefweb.int/v1/countries?appname=rwmob-dev&limit=20&filter[field]=featured&filter[value]=true',
  featuredDisasters: 'https://api.reliefweb.int/v1/disasters?appname=rwmob-dev&limit=20&filter[field]=featured&filter[value]=true'
}

export { mockCountries, mockDisasters, mockEndpoints }
