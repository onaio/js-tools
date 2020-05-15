// stories of DrillDownTablev7
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
/* eslint-enable import/no-extraneous-dependencies */
import notes from '../../packages/DrillDown/README.md';
import { DrillDownTablev7, DropDownCellProps } from '../../packages/DrillDown/src';
import { data } from '../../packages/DrillDown/src/components/tests/fixtures';
import { jurisdictions } from './fixtures';

function renderTable() {
  const columns = [
    {
      Header: 'Name',
      accessor: 'location'
    },
    {
      Header: 'Spray Coverage',
      accessor: 'spray_coverage'
    },
    {
      Header: 'Spray Effectiveness',
      accessor: 'spray_effectiveness'
    }
  ];
  const props = {
    columns,
    data,
    linkerField: 'location'
  };
  return <DrillDownTablev7 {...props} />;
}

// function renderNestedColumnTable() {
//   const columns = [
//     {
//       Header: 'Header Group',
//       columns: [
//         {
//           Header: 'ID',
//           accessor: 'id'
//         },
//         {
//           Header: 'Name',
//           accessor: 'location'
//         }
//       ]
//     },
//     {
//       Header: 'Spray Coverage',
//       accessor: 'spray_coverage'
//     }
//   ];
//   const props = {
//     columns,
//     data,
//     linkerField: 'location'
//   };
//   return <DrillDownTable {...props} />;
// }

// function renderDerivedTable() {
//   const props = {
//     data,
//     linkerField: 'location'
//   };
//   return <DrillDownTable {...props} />;
// }

// function renderNoTrPropsTable() {
//   const props = {
//     data,
//     linkerField: 'location',
//     useDrillDownTrProps: false
//   };
//   return <DrillDownTable {...props} />;
// }

// function renderCustomCellTable() {
//   /** Interface for cell props */
//   interface NewCellProps extends DropDownCellProps {
//     urlPath: string;
//     caret: string;
//   }

//   /** Custom cell component for testing.
//    */
//   const NewCell: React.ElementType = (props: NewCellProps) => {
//     const { cellValue, hasChildren, urlPath, caret } = props;
//     return (
//       <div>
//         <span>
//           {hasChildren ? (
//             <a href={urlPath}>
//               {cellValue} {caret}
//             </a>
//           ) : (
//             cellValue
//           )}
//         </span>
//       </div>
//     );
//   };
//   const cellProps = {
//     CellComponent: NewCell,
//     data,
//     extraCellProps: { urlPath: 'http://example.com', caret: <span>&#43;</span> },
//     linkerField: 'location',
//     useDrillDownTrProps: false
//   };
//   return <DrillDownTable {...cellProps} />;
// }

// function largeDataSet() {
//   const columns = [
//     {
//       Header: 'Name',
//       accessor: 'name'
//     },
//     {
//       Header: 'id',
//       accessor: 'id'
//     },
//     {
//       Header: 'parent',
//       accessor: 'parent_id'
//     },
//     {
//       Header: 'Level',
//       accessor: 'geographic_level'
//     }
//   ];
//   const props = {
//     columns,
//     data: jurisdictions,
//     linkerField: 'name',
//     rootParentId: ''
//   };
//   return <DrillDownTable {...props} />;
// }

storiesOf('DrillDownTable', module).add('simple', renderTable, { notes });
// .add('get columns from data', renderDerivedTable, { notes })
// .add('with nested columns', renderNestedColumnTable, { notes })
// .add('with no getTrProps', renderNoTrPropsTable, { notes })
// .add('custom cell component', renderCustomCellTable, { notes })
// .add('large dataset', largeDataSet, { notes });
