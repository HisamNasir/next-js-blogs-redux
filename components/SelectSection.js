// SelectSection.js
const SelectSection = ({ optionbtn, relodbtn }) => {
  return (
    <div className="selectsectio" style={{ marginTop: '80px', justifyContent: 'center', display: 'flex' }}>
      <select name="select" id="selectcity" onChange={optionbtn} style={{ padding: '20px' }}>
        <option value="defaultselect" id="defaultselect">Select Specific Project</option>
      </select>
      <button style={{ padding: '20px' }} onClick={relodbtn}>Clear</button>
    </div>
  );
};

export default SelectSection;