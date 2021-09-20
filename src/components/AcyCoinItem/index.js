import React from 'react';
import AcyIcon from '@/components/AcyIcon';
import styles from './style.less';
import placeholder from '@/pages/Dao/placeholder-round.png';

// data refer to the token object that contains properties such as symbol, name, and logoURI.
// selectToken is the function to execute when the token row is clicked.
// setAsFav is the function to execute when the star icon is clicked.
const AcyCoinItem = ({ data, selectToken, setAsFav, hideFavButton = false, customIcon = true, ...rest }) => {
  return (
    // row container that contains the token icon, symbol, name, balance amount, and star icon.
    <div className={styles.tokenRowContainer} {...rest}>

      {/* token icon container. */}
      {/* display default ethereum icon if customIcon is true, else display the relative token icon. */}
      <div className={styles.tokenRowContent} onClick={() => selectToken(data) || null}>
        <div style={{ flex: '2' }}>
          {customIcon ? (
            <AcyIcon name="eth" />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '24px' }}>
              <img src={data.logoURI || placeholder} alt={data.symbol} style={{ maxHeight: '24px', maxWidth: '24px' }} />
            </div>
          )}
        </div>

        {/* token symbol container. */}
        <div style={{ flex: '2', color: 'white', fontWeight: '500' }}>{data.symbol}</div>

        {/* token name container. */}
        <div style={{ flex: '7' }}>{data.name}</div>

        {/* token balance container. */}
        <div style={{ flex: '1' }}>0.233</div>
      </div>

      {/* star button for user to set token as favourite. */}
      {/* star jsx is retrieved from heroicons.com. */}
      <div hidden={hideFavButton} className={styles.favButtonContainer} onClick={setAsFav}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ minWidth: '0.25rem', minHeight: '1.25rem' }} className={styles.favButton} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    </div>
  );
};
export default AcyCoinItem;
