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
            <p>{p * 100}% : {Math.round(result * p)} {unitShown}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;
