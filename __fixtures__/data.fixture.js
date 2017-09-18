export const mockCountries = {
  data: [
    {id: '10', fields: {name: 'A country name 0'}},
    {id: '11', fields: {name: 'A country name 1'}},
    {id: '12', fields: {name: 'B country name 2'}},
    {id: '13', fields: {name: 'C country name 3'}},
    {id: '14', fields: {name: 'C country find 4'}},
    {id: '15', fields: {name: 'D country name 5'}},
    {id: '16', fields: {name: 'D country name 6'}},
    {id: '17', fields: {name: 'Z find me name 7'}},
    {id: '18', fields: {name: 'Z country name 8'}},
    {id: '19', fields: {name: 'Z country name 9'}}
  ]
}

export const mockDisasters = {
  totalCount: 12,
  data: [
    {
      id: '20',
      fields: {
        name: 'Oh no: A disaster name - 0',
        primary_country: {
          shortname: 'So Yo'
        },
        primary_type: {
          name: 'Cyclone'
        }
      }
    },
    {
      id: '21',
      fields: {
        name: 'Oh no: A disaster name - 1',
        primary_country: {
          name: 'South Yorkshire'
        }
      }
    },
    {id: '22', fields: {name: 'Oh no: A disaster name - 2'}},
    {id: '23', fields: {name: 'Oh no: A disaster name - 3'}},
    {id: '24', fields: {name: 'Oh no: A disaster name - 4'}},
    {id: '25', fields: {name: 'Oh no: A disaster name - 5'}},
    {id: '26', fields: {name: 'Oh no: A disaster name - 6'}},
    {id: '27', fields: {name: 'Oh no: A disaster name - 7'}},
    {id: '28', fields: {name: 'Oh no: A disaster name - 8'}},
    {id: '29', fields: {name: 'Oh no: A disaster name - 9'}}
  ]
}

export const mockDisastersPage2 = {
  totalCount: 12,
  data: [
    {id: '29', fields: {name: 'Oh no: A disaster name - 9'}},
    {id: '30', fields: {name: 'Oh no: A disaster name - 10'}},
    {id: '31', fields: {name: 'Oh no: A disaster name - 11'}}
  ]
}

export const mockFeatured = [
  {id: '10', fields: {name: 'A country name 0'}},
  {id: '11', fields: {name: 'A country name 1'}},
  {id: '23', fields: {name: 'Oh no: A disaster name - 3'}},
  {id: '24', fields: {name: 'Oh no: A disaster name - 4'}},
  {id: '18', fields: {name: 'A country name 8'}},
  {id: '19', fields: {name: 'A country name 9'}}
]

export const mockHeadlines = {
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

export const mockReports = {
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
          },
          {
            name: 'The Star'
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

export const mockReportsPage2 = {
  totalCount: 22,
  data: [
    {id: '39', fields: {title: 'Report: Something - words [EN/UK] 9'}},
    {id: '40', fields: {title: 'Report: Something - words [EN/UK] 10'}},
    {id: '41', fields: {title: 'Report: Something - words [EN/UK] 11'}}
  ]
}

export const mockUpdate = {
  id: 100,
  fields: {
    id: 100,
    title: 'This is the title',
    date: {
      created: new Date('Wed Aug 23 2017 17:11:26 GMT+0100 (BST)')
    },
    origin: 'http://something',
    'body-html': '<p>ddd</p>'
  }
}

export const mockUpdate2 = {
  fields: {
    id: 101,
    title: 'This is the title2'
  }
}

const mockCountryDescription = `
  <h3>Appeals and Funding</h3>
  <ul>
  <li><strong>document name</strong><a href="#"><img src="#" /></a></li>
  <li><strong>document name</strong><a href="#">A link</a><a href="#"><img src="#" /></a></li>
  <li><a href="#">A link</a></li>
  <li><a href="https://www.humanitarianresponse.info/something"><img src="#" /></a></li>
  <li><a href="https://fts.unocha.org/something"><img src="#" /></a></li>
  <li><a href="https://unhcr.org/something"><img src="#" /></a></li>
  </ul>`

export const mockCountry = {
  id: 100,
  fields: {
    id: 100,
    name: 'I am a country',
    'description-html': mockCountryDescription
  }
}

export const mockCountry2 = {
  id: 101,
  fields: {
    id: 101,
    name: 'I am another country',
    'description-html': '<p>ddd</p>'
  }
}

export const mockDisaster = {
  id: 200,
  fields: {
    id: 200,
    name: 'I am a disaster',
    'description-html': '<p>sdgsg</p>'
  }
}

export const mockDisaster2 = {
  id: 201,
  fields: {
    id: 201,
    name: 'I am a disaster to',
    'description-html': '<p>sdgsg</p>'
  }
}

export const mockEndpoints = {
  country: 'https://api.reliefweb.int/v1/countries/100?appname=rwmob-dev',
  countries: 'https://api.reliefweb.int/v1/countries?appname=rwmob-dev',
  disaster: 'https://api.reliefweb.int/v1/disasters/200?appname=rwmob-dev',
  disasters: 'https://api.reliefweb.int/v1/disasters?appname=rwmob-dev',
  headlines: 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev',
  updates: 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev',
  update: 'https://api.reliefweb.int/v1/reports/100?appname=rwmob-dev'
}
