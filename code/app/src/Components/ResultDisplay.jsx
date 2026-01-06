import settings from '../../settings.json'


const { weightPercents } = settings


const ResultDisplay = ({ result, unitShown }) => {
  return (
    <div>
      <div id="div_contents_mainarea_resultmaxweight">
        Max weight: <p /> <span id="span_maxweight_value">{result}</span> {unitShown}
      </div>
      <div id="div_additional_info">
        {weightPercents.map(p => (
          <div key={p} className="div_additional_info_weightpercents_item">
            <div className="weight_percent_column">{p * 100}% :</div>
            <div className="weight_value_column">{Math.round(result * p)} {unitShown}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;
