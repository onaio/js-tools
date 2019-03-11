import { FlexObject } from '../helpers/utils';

export const data = [
  {
    id: 1,
    location: 'District A',
    parent_id: null,
    spray_coverage: '80%',
    spray_effectiveness: '80%'
  },
  {
    id: 4,
    location: 'HFC 1',
    parent_id: 1,
    spray_coverage: '80%',
    spray_effectiveness: '80%'
  },
  {
    id: 9,
    location: 'Operational Area 9',
    parent_id: 4,
    spray_coverage: '70%',
    spray_effectiveness: '90%'
  },
  {
    id: 10,
    location: 'Operational Area 10',
    parent_id: 4,
    spray_coverage: '80%',
    spray_effectiveness: '100%'
  },
  {
    id: 11,
    location: 'Operational Area 11',
    parent_id: 4,
    spray_coverage: '100%',
    spray_effectiveness: '100%'
  },
  {
    id: 5,
    location: 'HFC 2',
    parent_id: 1,
    spray_coverage: '80%',
    spray_effectiveness: '80%'
  },
  {
    id: 12,
    location: 'Operational Area 12',
    parent_id: 5,
    spray_coverage: '86%',
    spray_effectiveness: '100%'
  },
  {
    id: 2,
    location: 'District B',
    parent_id: null,
    spray_coverage: '75%',
    spray_effectiveness: '85%'
  },
  {
    id: 6,
    location: 'HFC 3',
    parent_id: 2,
    spray_coverage: '80%',
    spray_effectiveness: '80%'
  },
  {
    id: 17,
    location: 'HFC 17',
    parent_id: 2,
    spray_coverage: '0%',
    spray_effectiveness: '0%'
  },
  {
    id: 13,
    location: 'Operational Area 13',
    parent_id: 6,
    spray_coverage: '86%',
    spray_effectiveness: '100%'
  },
  {
    id: 14,
    location: 'Operational Area 14',
    parent_id: 6,
    spray_coverage: '86%',
    spray_effectiveness: '90%'
  },
  {
    id: 17,
    location: 'Operational Area 17',
    parent_id: 6,
    spray_coverage: '86%',
    spray_effectiveness: '78%'
  },
  {
    id: 18,
    location: 'Operational Area 18',
    parent_id: 6,
    spray_coverage: '80%',
    spray_effectiveness: '100%'
  },
  {
    id: 3,
    location: 'District C',
    parent_id: null,
    spray_coverage: '90%',
    spray_effectiveness: '90%'
  },
  {
    id: 7,
    location: 'HFC 4',
    parent_id: 3,
    spray_coverage: '80%',
    spray_effectiveness: '80%'
  },
  {
    id: 15,
    location: 'Operational Area 15',
    parent_id: 7,
    spray_coverage: '80%',
    spray_effectiveness: '100%'
  },
  {
    id: 8,
    location: 'HFC 5',
    parent_id: 3,
    spray_coverage: '80%',
    spray_effectiveness: '80%'
  },
  {
    id: 16,
    location: 'Operational Area 16',
    parent_id: 8,
    spray_coverage: '80%',
    spray_effectiveness: '100%'
  },
  {
    id: 18,
    location: 'District D',
    parent_id: null,
    spray_coverage: '0%',
    spray_effectiveness: '0%'
  }
];

export const dataParentsOnly = data.map((el: FlexObject) => el.parent_id);

export const dataLowestLevel = data.filter((element: FlexObject) => {
  return element.parent_id === 4;
});
