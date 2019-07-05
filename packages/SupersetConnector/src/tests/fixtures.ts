/* tslint:disable object-literal-sort-keys */
export const sliceResponse = {
  cache_key: null,
  cached_dttm: null,
  cache_timeout: 86400,
  error: null,
  form_data: {
    datasource: '15__table',
    viz_type: 'table',
    slice_id: 892,
    url_params: {},
    granularity_sqla: null,
    time_grain_sqla: null,
    time_range: 'Last year',
    groupby: ['pd_number', 'general_info_info_data_giq3', 'general_info_info_data_giq11_measure'],
    metrics: [
      {
        expressionType: 'SIMPLE',
        column: {
          id: 1242,
          column_name: 'general_info_info_data_giq12',
          verbose_name: 'Population Served by Station',
          description: 'Population Served by Station',
          expression: '.0f',
          filterable: true,
          groupby: true,
          is_dttm: false,
          type: 'BIGINT',
          database_expression: '',
          python_date_format: '',
          optionName: '_col_general_info_info_data_giq12'
        },
        aggregate: 'SUM',
        sqlExpression: null,
        hasCustomLabel: true,
        fromFormData: true,
        label: 'PD Reported Population',
        optionName: 'metric_4porpj1rpqh_wtm6vgi5nq'
      },
      {
        expressionType: 'SIMPLE',
        column: {
          id: 1243,
          column_name: 'doc_pop',
          verbose_name: 'Pre-Survey Population',
          description: 'Pre-Survey Population',
          expression: '.0f',
          filterable: true,
          groupby: true,
          is_dttm: false,
          type: 'INTEGER',
          database_expression: '',
          python_date_format: '',
          optionName: '_col_doc_pop'
        },
        aggregate: 'SUM',
        sqlExpression: null,
        hasCustomLabel: true,
        fromFormData: true,
        label: 'Population - Official Statistics',
        optionName: 'metric_s8uo71810j_2zbllr8my76'
      },
      {
        expressionType: 'SQL',
        sqlExpression: 'SUM(general_info_info_data_giq12)/SUM(general_info_info_data_giq11)',
        column: null,
        aggregate: null,
        hasCustomLabel: true,
        fromFormData: true,
        label: 'Population Density - PD Reported',
        optionName: 'metric_ytc6g9ioghi_34wxpd2yb4e'
      },
      {
        expressionType: 'SQL',
        sqlExpression: 'SUM(doc_pop)/SUM(general_info_info_data_giq11)',
        column: null,
        aggregate: null,
        hasCustomLabel: true,
        fromFormData: true,
        label: 'Population Density - Official Statistics',
        optionName: 'metric_rgxbkflwz5o_dk6div82nln'
      }
    ],
    percent_metrics: [],
    timeseries_limit_metric: {
      expressionType: 'SIMPLE',
      column: {
        id: 2012,
        column_name: 'number_pd',
        verbose_name: 'PD Number',
        description: 'PD Number',
        expression: "SUBSTRING(pd_number, POSITION('PD' IN pd_number) + 2)",
        filterable: true,
        groupby: true,
        is_dttm: false,
        type: 'INTEGER',
        database_expression: '',
        python_date_format: '',
        optionName: '_col_number_pd'
      },
      aggregate: 'MIN',
      sqlExpression: null,
      hasCustomLabel: false,
      fromFormData: true,
      label: 'MIN(number_pd)',
      optionName: 'metric_18ithcjlw33_mymxvpocni'
    },
    row_limit: 10000,
    include_time: false,
    order_desc: false,
    all_columns: [],
    order_by_cols: [],
    adhoc_filters: [],
    table_timestamp_format: '%Y-%m-%d %H:%M:%S',
    page_length: 0,
    include_search: false,
    table_filter: true,
    align_pn: false,
    color_pn: true,
    where: '',
    having: '',
    having_filters: [],
    filters: []
  },
  is_cached: false,
  query:
    'SELECT pd_number AS pd_number,\n       general_info_info_data_giq3 AS general_info_info_data_giq3,\n       general_info_info_data_giq11_measure AS general_info_info_data_giq11_measure,\n       SUM(general_info_info_data_giq12) AS "PD Reported Population",\n       SUM(doc_pop) AS "Population - Official Statistics",\n       SUM(general_info_info_data_giq12)/SUM(general_info_info_data_giq11) AS "Population Density - PD Reported",\n       SUM(doc_pop)/SUM(general_info_info_data_giq11) AS "Population Density - Official Statistics",\n       MIN(SUBSTRING(pd_number, POSITION(\'PD\' IN pd_number) + 2)) AS "MIN(number_pd)"\nFROM pd_data_afghanistan\nGROUP BY pd_number,\n         general_info_info_data_giq3,\n         general_info_info_data_giq11_measure\nORDER BY MIN(SUBSTRING(pd_number, POSITION(\'PD\' IN pd_number) + 2)) ASC\nLIMIT 10000;',
  status: 'success',
  stacktrace: null,
  rowcount: 17,
  data: {
    records: [
      {
        pd_number: 'PD1',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 216000.0,
        'Population - Official Statistics': 105195.0,
        'Population Density - PD Reported': 19907.8341013825,
        'Population Density - Official Statistics': 9695.39170506913,
        'MIN(number_pd)': '1'
      },
      {
        pd_number: 'PD10',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Hectares',
        'PD Reported Population': 95000.0,
        'Population - Official Statistics': 355939.0,
        'Population Density - PD Reported': 69.0909090909091,
        'Population Density - Official Statistics': 258.864727272727,
        'MIN(number_pd)': '10'
      },
      {
        pd_number: 'PD11',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Hectares',
        'PD Reported Population': 1150000.0,
        'Population - Official Statistics': 278580.0,
        'Population Density - PD Reported': 6693.05086718659,
        'Population Density - Official Statistics': 1621.34792224421,
        'MIN(number_pd)': '11'
      },
      {
        pd_number: 'PD12',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 333500.0,
        'Population - Official Statistics': 51310.0,
        'Population Density - PD Reported': 5379.03225806452,
        'Population Density - Official Statistics': 827.58064516129,
        'MIN(number_pd)': '12'
      },
      {
        pd_number: 'PD13',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 710000.0,
        'Population - Official Statistics': 235542.0,
        'Population Density - PD Reported': 10923.0769230769,
        'Population Density - Official Statistics': 3623.72307692308,
        'MIN(number_pd)': '13'
      },
      {
        pd_number: 'PD15',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 580000.0,
        'Population - Official Statistics': 381091.0,
        'Population Density - PD Reported': 18125.0,
        'Population Density - Official Statistics': 11909.09375,
        'MIN(number_pd)': '15'
      },
      {
        pd_number: 'PD16',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 250000.0,
        'Population - Official Statistics': 165336.0,
        'Population Density - PD Reported': 6944.44444444444,
        'Population Density - Official Statistics': 4592.66666666667,
        'MIN(number_pd)': '16'
      },
      {
        pd_number: 'PD17',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 700000.0,
        'Population - Official Statistics': 103739.0,
        'Population Density - PD Reported': 38888.8888888889,
        'Population Density - Official Statistics': 5763.27777777778,
        'MIN(number_pd)': '17'
      },
      {
        pd_number: 'PD18',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 903000.0,
        'Population - Official Statistics': 0.0,
        'Population Density - PD Reported': 15842.1052631579,
        'Population Density - Official Statistics': 0.0,
        'MIN(number_pd)': '18'
      },
      {
        pd_number: 'PD2',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Hectares',
        'PD Reported Population': 280000.0,
        'Population - Official Statistics': 128111.0,
        'Population Density - PD Reported': 29473.6842105263,
        'Population Density - Official Statistics': 13485.3684210526,
        'MIN(number_pd)': '2'
      },
      {
        pd_number: 'PD3',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Hectares',
        'PD Reported Population': 454167.0,
        'Population - Official Statistics': 155164.0,
        'Population Density - PD Reported': 76977.4576271186,
        'Population Density - Official Statistics': 26298.9830508475,
        'MIN(number_pd)': '3'
      },
      {
        pd_number: 'PD4',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 600000.0,
        'Population - Official Statistics': 330115.0,
        'Population Density - PD Reported': 64405.324173465,
        'Population Density - Official Statistics': 35435.2726492057,
        'MIN(number_pd)': '4'
      },
      {
        pd_number: 'PD5',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Hectares',
        'PD Reported Population': 1000000.0,
        'Population - Official Statistics': 304738.0,
        'Population Density - PD Reported': 13333.3333333333,
        'Population Density - Official Statistics': 4063.17333333333,
        'MIN(number_pd)': '5'
      },
      {
        pd_number: 'PD6',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Hectares',
        'PD Reported Population': 900000.0,
        'Population - Official Statistics': 337380.0,
        'Population Density - PD Reported': 20000.0,
        'Population Density - Official Statistics': 7497.33333333333,
        'MIN(number_pd)': '6'
      },
      {
        pd_number: 'PD7',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 475000.0,
        'Population - Official Statistics': 403561.0,
        'Population Density - PD Reported': 13380.2816901408,
        'Population Density - Official Statistics': 11367.9154929577,
        'MIN(number_pd)': '7'
      },
      {
        pd_number: 'PD8',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 750000.0,
        'Population - Official Statistics': 335481.0,
        'Population Density - PD Reported': 10416.6666666667,
        'Population Density - Official Statistics': 4659.45833333333,
        'MIN(number_pd)': '8'
      },
      {
        pd_number: 'PD9',
        general_info_info_data_giq3: 'Kabul',
        general_info_info_data_giq11_measure: 'Squared Kilometers',
        'PD Reported Population': 832000.0,
        'Population - Official Statistics': 290205.0,
        'Population Density - PD Reported': 104.0,
        'Population Density - Official Statistics': 36.275625,
        'MIN(number_pd)': '9'
      }
    ],
    columns: [
      'pd_number',
      'general_info_info_data_giq3',
      'general_info_info_data_giq11_measure',
      'PD Reported Population',
      'Population - Official Statistics',
      'Population Density - PD Reported',
      'Population Density - Official Statistics',
      'MIN(number_pd)'
    ]
  }
};

export const parsedSliceResponse = [
  {
    pd_number: 'PD1',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 216000.0,
    'Population - Official Statistics': 105195.0,
    'Population Density - PD Reported': 19907.8341013825,
    'Population Density - Official Statistics': 9695.39170506913,
    'MIN(number_pd)': '1'
  },
  {
    pd_number: 'PD10',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Hectares',
    'PD Reported Population': 95000.0,
    'Population - Official Statistics': 355939.0,
    'Population Density - PD Reported': 69.0909090909091,
    'Population Density - Official Statistics': 258.864727272727,
    'MIN(number_pd)': '10'
  },
  {
    pd_number: 'PD11',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Hectares',
    'PD Reported Population': 1150000.0,
    'Population - Official Statistics': 278580.0,
    'Population Density - PD Reported': 6693.05086718659,
    'Population Density - Official Statistics': 1621.34792224421,
    'MIN(number_pd)': '11'
  },
  {
    pd_number: 'PD12',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 333500.0,
    'Population - Official Statistics': 51310.0,
    'Population Density - PD Reported': 5379.03225806452,
    'Population Density - Official Statistics': 827.58064516129,
    'MIN(number_pd)': '12'
  },
  {
    pd_number: 'PD13',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 710000.0,
    'Population - Official Statistics': 235542.0,
    'Population Density - PD Reported': 10923.0769230769,
    'Population Density - Official Statistics': 3623.72307692308,
    'MIN(number_pd)': '13'
  },
  {
    pd_number: 'PD15',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 580000.0,
    'Population - Official Statistics': 381091.0,
    'Population Density - PD Reported': 18125.0,
    'Population Density - Official Statistics': 11909.09375,
    'MIN(number_pd)': '15'
  },
  {
    pd_number: 'PD16',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 250000.0,
    'Population - Official Statistics': 165336.0,
    'Population Density - PD Reported': 6944.44444444444,
    'Population Density - Official Statistics': 4592.66666666667,
    'MIN(number_pd)': '16'
  },
  {
    pd_number: 'PD17',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 700000.0,
    'Population - Official Statistics': 103739.0,
    'Population Density - PD Reported': 38888.8888888889,
    'Population Density - Official Statistics': 5763.27777777778,
    'MIN(number_pd)': '17'
  },
  {
    pd_number: 'PD18',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 903000.0,
    'Population - Official Statistics': 0.0,
    'Population Density - PD Reported': 15842.1052631579,
    'Population Density - Official Statistics': 0.0,
    'MIN(number_pd)': '18'
  },
  {
    pd_number: 'PD2',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Hectares',
    'PD Reported Population': 280000.0,
    'Population - Official Statistics': 128111.0,
    'Population Density - PD Reported': 29473.6842105263,
    'Population Density - Official Statistics': 13485.3684210526,
    'MIN(number_pd)': '2'
  },
  {
    pd_number: 'PD3',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Hectares',
    'PD Reported Population': 454167.0,
    'Population - Official Statistics': 155164.0,
    'Population Density - PD Reported': 76977.4576271186,
    'Population Density - Official Statistics': 26298.9830508475,
    'MIN(number_pd)': '3'
  },
  {
    pd_number: 'PD4',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 600000.0,
    'Population - Official Statistics': 330115.0,
    'Population Density - PD Reported': 64405.324173465,
    'Population Density - Official Statistics': 35435.2726492057,
    'MIN(number_pd)': '4'
  },
  {
    pd_number: 'PD5',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Hectares',
    'PD Reported Population': 1000000.0,
    'Population - Official Statistics': 304738.0,
    'Population Density - PD Reported': 13333.3333333333,
    'Population Density - Official Statistics': 4063.17333333333,
    'MIN(number_pd)': '5'
  },
  {
    pd_number: 'PD6',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Hectares',
    'PD Reported Population': 900000.0,
    'Population - Official Statistics': 337380.0,
    'Population Density - PD Reported': 20000.0,
    'Population Density - Official Statistics': 7497.33333333333,
    'MIN(number_pd)': '6'
  },
  {
    pd_number: 'PD7',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 475000.0,
    'Population - Official Statistics': 403561.0,
    'Population Density - PD Reported': 13380.2816901408,
    'Population Density - Official Statistics': 11367.9154929577,
    'MIN(number_pd)': '7'
  },
  {
    pd_number: 'PD8',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 750000.0,
    'Population - Official Statistics': 335481.0,
    'Population Density - PD Reported': 10416.6666666667,
    'Population Density - Official Statistics': 4659.45833333333,
    'MIN(number_pd)': '8'
  },
  {
    pd_number: 'PD9',
    general_info_info_data_giq3: 'Kabul',
    general_info_info_data_giq11_measure: 'Squared Kilometers',
    'PD Reported Population': 832000.0,
    'Population - Official Statistics': 290205.0,
    'Population Density - PD Reported': 104.0,
    'Population Density - Official Statistics': 36.275625,
    'MIN(number_pd)': '9'
  }
];

export const testCSV = 'id,a,b,c,d\n0,1,1,1,1\n1,2,2,2,2\n2,3,3,3,3';

export const parsedCSV = [
  {
    id: 0,
    a: 1,
    b: 1,
    c: 1,
    d: 1
  },
  {
    id: 1,
    a: 2,
    b: 2,
    c: 2,
    d: 2
  },
  {
    id: 2,
    a: 3,
    b: 3,
    c: 3,
    d: 3
  },
  {
    id: 3,
    a: 4,
    b: 4,
    c: 4,
    d: 4
  }
];

export default {
  sliceResponse,
  parsedSliceResponse
};
