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

export const mockFeatured = {
  data: [
    {id: '10', fields: {name: 'A country name 0'}},
    {id: '11', fields: {name: 'A country name 1'}},
    {id: '23', fields: {name: 'Oh no: A disaster name - 3'}},
    {id: '24', fields: {name: 'Oh no: A disaster name - 4'}},
    {id: '18', fields: {name: 'A country name 8'}},
    {id: '19', fields: {name: 'A country name 9'}}
  ]
}

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

export const mockJobs = {
  totalCount: 12,
  data: [
    {
      id: '50',
      fields: {
        title: 'Job title 0',
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
        ]
      }
    },
    {
      id: '51',
      fields: {
        title: 'Job title 1',
        primary_country: {
          name: 'South Yorkshire'
        }
      }
    },
    {id: '52', fields: {title: 'Job title 2'}},
    {id: '53', fields: {title: 'Job title 3'}},
    {id: '54', fields: {title: 'Job title 4'}},
    {id: '55', fields: {title: 'Job title 5'}},
    {id: '56', fields: {title: 'Job title 6'}},
    {id: '57', fields: {title: 'Job title 7'}},
    {id: '58', fields: {title: 'Job title 8'}},
    {id: '59', fields: {title: 'Job title 9'}}
  ]
}

export const mockJobsPage2 = {
  totalCount: 12,
  data: [
    {id: '59', fields: {title: 'Job title 9'}},
    {id: '60', fields: {title: 'Job title 10'}},
    {id: '61', fields: {title: 'Job title 11'}}
  ]
}

export const mockTrainings = {
  totalCount: 12,
  data: [
    {
      id: '70',
      fields: {
        title: 'Training title 0',
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
        ]
      }
    },
    {
      id: '71',
      fields: {
        title: 'Training title 1',
        primary_country: {
          name: 'South Yorkshire'
        }
      }
    },
    {id: '72', fields: {title: 'Training title 2'}},
    {id: '73', fields: {title: 'Training title 3'}},
    {id: '74', fields: {title: 'Training title 4'}},
    {id: '75', fields: {title: 'Training title 5'}},
    {id: '76', fields: {title: 'Training title 6'}},
    {id: '77', fields: {title: 'Training title 7'}},
    {id: '78', fields: {title: 'Training title 8'}},
    {id: '79', fields: {title: 'Training title 9'}}
  ]
}

export const mockTrainingsPage2 = {
  totalCount: 12,
  data: [
    {id: '79', fields: {title: 'Training title 9'}},
    {id: '80', fields: {title: 'Training title 10'}},
    {id: '81', fields: {title: 'Training title 11'}}
  ]
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
  </ul>
  <h3>Useful Links</h3>
  <ul>
  <li>a link</li>
  </ul>`

export const mockCountry = {
  id: 100,
  fields: {
    id: 100,
    name: 'I am a country',
    iso3: 'qwe',
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
  country: 'https://api.reliefweb.int/v1/countries/100?appname=rwmob-dev&fields[include][]=name&fields[include][]=iso3',
  countries: 'https://api.reliefweb.int/v1/countries?appname=rwmob-dev',
  disaster: 'https://api.reliefweb.int/v1/disasters/200?appname=rwmob-dev',
  disasters: 'https://api.reliefweb.int/v1/disasters?appname=rwmob-dev',
  headlines: 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev',
  jobs: 'https://api.reliefweb.int/v1/jobs?appname=rwmob-dev',
  trainings: 'https://api.reliefweb.int/v1/training?appname=rwmob-dev',
  updates: 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev',
  update: 'https://api.reliefweb.int/v1/reports/100?appname=rwmob-dev'
}
