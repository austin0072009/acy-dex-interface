import React, { useState } from 'react';
import { Table } from 'antd';
import SampleStakeHistoryData, {sampleStakeHistoryColumns} from './SampleStakeHistoryData';
import styles from './styles.less';


const StakeHistoryTable = () => {
  const [stakeDisplayNumber, setStakeDisplayNumber] = useState(5)

  return (
    <Table
      columns={sampleStakeHistoryColumns}
      dataSource={SampleStakeHistoryData.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, stakeDisplayNumber)}
      pagination={false}
      footer={() => (
        <div className={styles.tableSeeMoreWrapper}>
          <a
            className={styles.tableSeeMore}
            onClick={() => setStakeDisplayNumber((prevState) => prevState + 5)}
          >
            See More...
          </a>
        </div>
      )}
    />
  )
}

export default StakeHistoryTable;
