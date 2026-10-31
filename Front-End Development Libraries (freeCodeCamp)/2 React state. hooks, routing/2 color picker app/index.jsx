const { useState } = React;

export const ColorPicker = () => {

  const [color, setColor] = useState("#ffffff")

  const HandleChange = (e) => {
    setColor(e.target.value)
  }

  return (
    <div id="color-picker-container" style={{backgroundColor: color}}>
      <input type="color" id="color-input" onChange={HandleChange} value={color} />
    </div>
  )
};