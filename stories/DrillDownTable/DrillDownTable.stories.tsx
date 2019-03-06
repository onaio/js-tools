// stories of DrillDownTable
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
/* eslint-enable import/no-extraneous-dependencies */
import 'react-table/react-table.css';
import DrillDownTable from '../../packages/DrillDownTable/src/DrillDownTable';

/* tslint:disable:object-literal-sort-keys */
const data = [
  {
    first_name: 'Laurene',
    last_name: 'Bennett',
    company_name: 'Elbin Internatl Baskets',
    address: '5 Richmond Ct',
    state: 'WA',
    post: 6906,
    city: 'North Perth',
    phone1: '08-2969-2908',
    phone2: '0468-234-875',
    email: 'laurene_bennett@gmail.com',
    web: 'http://www.elbininternatlbaskets.com.au'
  },
  {
    first_name: 'Emelda',
    last_name: 'Geffers',
    company_name: 'D L Downing General Contr Inc',
    address: '95431 34th Ave #62',
    state: 'WA',
    post: 6909,
    city: 'Nedlands',
    phone1: '08-7097-3947',
    phone2: '0454-643-433',
    email: 'emelda.geffers@gmail.com',
    web: 'http://www.dldowninggeneralcontrinc.com.au'
  },
  {
    first_name: 'Paulina',
    last_name: 'Maker',
    company_name: 'Swanson Peterson Fnrl Home Inc',
    address: '6 S Hanover Ave',
    state: 'WA',
    post: 6931,
    city: 'Maylands',
    phone1: '08-8344-8929',
    phone2: '0420-123-282',
    email: 'paulina_maker@maker.net.au',
    web: 'http://www.swansonpetersonfnrlhomeinc.com.au'
  },
  {
    first_name: 'Mertie',
    last_name: 'Kazeck',
    company_name: 'Electra Gear Divsn Regal',
    address: '35662 S University Blvd',
    state: 'WA',
    post: 6935,
    city: 'Guildford',
    phone1: '08-5475-6162',
    phone2: '0446-422-535',
    email: 'mertie.kazeck@kazeck.com.au',
    web: 'http://www.electrageardivsnregal.com.au'
  },
  {
    first_name: 'Rosendo',
    last_name: 'Jelsma',
    company_name: 'Dileo, Lucille A Esq',
    address: '94 I 55s S',
    state: 'WA',
    post: 6953,
    city: 'Applecross',
    phone1: '08-7712-4785',
    phone2: '0477-239-199',
    email: 'rosendo_jelsma@hotmail.com',
    web: 'http://www.dileolucilleaesq.com.au'
  },
  {
    first_name: 'Reiko',
    last_name: 'Dejarme',
    company_name: 'Gilardis Frozen Food',
    address: '57869 Alemany Blvd',
    state: 'WA',
    post: 6983,
    city: 'Bentley Dc',
    phone1: '08-3733-5261',
    phone2: '0414-715-583',
    email: 'rdejarme@dejarme.net.au',
    web: 'http://www.gilardisfrozenfood.com.au'
  }
];
/* tslint:enable:object-literal-sort-keys */

function renderTable() {
  const props = { data };
  return <DrillDownTable {...props} />;
}

storiesOf('DrillDownTable', module).add('simple', renderTable);
