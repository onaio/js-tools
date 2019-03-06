import React from 'react';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class DrillDownTable extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div>
        <ReactTable />
      </div>
    );
  }
}

export default DrillDownTable;
