import React from 'react';
import './css/LaunchpadProject.css';
import tick from '@/assets/icon-tick-white.svg';
import moment from 'moment'
import { useState } from "react";
import { Button} from 'antd';

const VestingSchedule = ({ vestingDate, stageData, vestContract }) => {
  const len = vestingDate.length

  return (
    <div>
      {
        [...Array(len)].map((_1, index) => {
          return (
            <div className="procedure vesting-procedure">
              {index === len - 1 ? "" : <hr aria-orientation="vertical" className={moment(vestingDate[index]).isBefore() ? "verticalDivideLine vesting-schedule-line" : "verticalDivideLine_NotActive vesting-schedule-line"} />}
              <div className={moment(vestingDate[index]).isBefore() ? "procedureNumber_NotActive" : "procedureNumber"}>
                <img src={tick} alt="tick-icon" className="vesting-tick-icon" />
              </div>
              <div className="vesting-schedule-text">
                <div className='vesting-percentage-claim-container'>
                  <p className="vesting-percentage">{stageData[index]}%</p>
                  <Button
                    className={moment(vestingDate[index]).isBefore() ? "claim-btn claim-btn-active" : "claim-btn claim-btn-inactive"}
                    id="claim-btn"
                    disabled={!moment(vestingDate[index]).isBefore()}
                    onClick={()=>console.log("claim")}
                  >
                    Claim
                  </Button>
                </div>
                <p className="vesting-text">
                  <span className="claimable-text">Claimable at</span>
                  <br />
                  {vestingDate[index]}
                </p>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}; 

export default VestingSchedule;
