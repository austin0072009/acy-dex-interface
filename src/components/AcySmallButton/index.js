import React, { useEffect, useState } from 'react';

const AcySmallButton = (
  { children, onClick, disabled, color, textColor, borderColor, borderRadius, padding }
) => (
  <button
    type="button"
    style={{
      flex: '1',
      background: String(color),
      color: { textColor },
      fontWeight: '600',
      border: `solid 1px ${borderColor}`,
      borderRadius: String(borderRadius),
      paddingTop: String(padding),
      paddingBottom: String(padding),
      paddingLeft: '15px',
      paddingRight: '15px',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

const AcySmallButtonGroup = ({ activeButton, buttonList, containerClass }) => {
  const [colorList, setColorList] = useState(buttonList.map((button, index) => index === 0 ? "#1b1b1c" : "#4c4c4d"))

  useEffect(() => {
    setColorList((prevState) => prevState.map((color, index) => index === activeButton ? "#1b1b1c" : "#4c4c4d"))
  }, [activeButton])

  return (
    <div className={containerClass}>
      {buttonList.map(([text, onClick], index) => {
        let borderRadius = '0 0 0 0'
        if (index === 0) {
          borderRadius = '15px 0 0 15px'
        } else if (index === buttonList.length - 1) {
          borderRadius = '0 15px 15px 0'
        }
        return (
          <AcySmallButton
            color={colorList[index]}
            textColor="white"
            borderColor="#4c4c4d"
            borderRadius={borderRadius}
            padding="5px"
            onClick={onClick}
            id={index}
          >
            {text}
          </AcySmallButton>
        )
      })}
    </div>
  )
}

export default AcySmallButton;

export { AcySmallButtonGroup }
