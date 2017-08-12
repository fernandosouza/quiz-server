function objectToArray(obj, keyName = 'id', valueName = 'value') {
  return Object.keys(obj).map(key => {
    return { [keyName]: key, [valueName]: obj[key] };
  });
}

function generateORQuery(data, key) {
  return data.join(' OR ' + key + ' = ');
}

/**
 * Maps options for each question. It also removes duplications from the 
 * query result.
 * 
 * The formart returned is: { 'questionId': { 'optionsid': optionText } }
 * 
 * @param {any} options 
 * @returns 
 */
function mapOptionsByQuestionId(options) {
  let optionsMap = {};
  options.forEach(element => {
    if (!optionsMap[element.id_question]) {
      optionsMap[element.id_question] = {}
    };
    optionsMap[element.id_question][element.id] = element.text;
  });
  return optionsMap;
}

module.exports = {objectToArray, generateORQuery, mapOptionsByQuestionId} 