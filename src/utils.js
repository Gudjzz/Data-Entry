export const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const xmlDomToBlob = (xmlDom) => {
  var xmlSerialize = new XMLSerializer();
  var xmlString = xmlSerialize.serializeToString(xmlDom);

  var blobXML = new Blob([xmlString], { type: 'text/plain' });
  return blobXML;
};

export const downloadXml = (xmlDom, filename) => {
  const blobXML = xmlDomToBlob(xmlDom);
  const downloadTag = document.createElement('a');
  const downloadURL = URL.createObjectURL(blobXML);
  downloadTag.setAttribute('href', downloadURL);
  downloadTag.setAttribute('download', filename);
  downloadTag.style.display = 'none';
  document.body.appendChild(downloadTag);

  downloadTag.click();
  URL.revokeObjectURL(downloadURL);
  document.body.removeChild(downloadTag);
};

function handleFileSelection(file, callback) {
  if (file) {
    var reader = new FileReader();
    waitForTextReadComplete(reader, callback);
    reader.readAsText(file);
  }
}

function waitForTextReadComplete(reader, callback) {
  reader.onloadend = function (event) {
    var text = event.target.result;
    parseTextAsXml(text);
    callback(text);
  };
}

export const parseTextAsXml = (text) => {
  var parser = new DOMParser();
  var xmlDom = parser.parseFromString(text, 'text/xml');
  return xmlDom;
};

export const generateOE = (eid, nameQ, text, keepValidation) => {
  const xmlString = `<Open EntityId="${eid}" NotPerformDataCleaningOnMasking="true">
                          <Name>${nameQ}</Name>
                          <FormTexts>
                            <FormText Language="12">
                              <Title>&amp;nbsp;</Title>
                              <Text>${text}</Text>
                              <Instruction />
                            </FormText>
                          </FormTexts>
                          <TranslationStatuses />
                          <QuestionTriggers />
                          ${
                            keepValidation
                              ? '<ValidationCode>if ( !f(CurrentForm()).toBoolean() ) { RaiseError(); SetQuestionErrorMessage(LangIDs.fr,"Veuillez fournir une r&#233;ponse.");}</ValidationCode>'
                              : '<ValidationCode />'
                          }
                        </Open>`;
  const parser = new DOMParser();
  const $oe = parser.parseFromString(xmlString, 'text/xml').querySelector('*');

  return $oe;
};

export const generateCondition = (eid) => {
  const xmlString = `<Condition ElseEnabled="false" EntityId="${eid}" PerformDelete="true" ReadOnly="false">
                        <Expression>false</Expression>
                        <TrueNodes EntityId="${eid}_TrueNodes"></TrueNodes>
                        <FalseNodes EntityId="${eid}_FalseNodes" />
                    </Condition>`;
  const parser = new DOMParser();
  const $cond = parser
    .parseFromString(xmlString, 'text/xml')
    .querySelector('*');

  return $cond;
};

export const generateNUM = (eid, nameQ, text, customAttr) => {
  const xmlString = `<Open EntityId="${eid}" NotRequired="true" QuestionCategory="" ${customAttr} DefaultValue="" NotPerformDataCleaningOnMasking="true" Rows="1" Numeric="true" LowerLimitType="GreaterOrEqual" UpperLimitType="SmallerOrEqual">
                      <Name>${nameQ}</Name>
                      <FormTexts><FormText Language="12"><Title>&amp;nbsp;</Title><Text>${text}</Text><Instruction /></FormText></FormTexts><TranslationStatuses />
                      <QuestionTriggers />
                      <ValidationCode>if ( !f(CurrentForm()).toBoolean() ) {RaiseError(); SetQuestionErrorMessage(LangIDs.fr,"Veuillez fournir une réponse."); }</ValidationCode>
                      </Open>`;
  const parser = new DOMParser();
  const $oe = parser.parseFromString(xmlString, 'text/xml').querySelector('*');

  return $oe;
};

export const precodeMask = (qid) => {
  const xmlString = `<PrecodeMask>nset(f("${qid}").toNumber())</PrecodeMask>`;
  const parser = new DOMParser();
  const $mask = parser
    .parseFromString(xmlString, 'text/xml')
    .querySelector('*');
  return $mask;
};

export const loopMask = (qid) => {
  const mask = `nset(f("${qid}").toNumber())`;
  return mask;
};

export const generateEntityId = (xmlDom, start, qTitle) => {
  if (doesQuestionExists(xmlDom, qTitle)) {
    return null;
  }
  let eid = 1700;
  if (start) {
    eid = start + 1;
  }
  let node;

  do {
    node = xmlDom.querySelector(`[EntityId="${eid}"]`);
    if (node) {
      eid += 50;
    }
  } while (node);
  return eid;
};

export const doesQuestionExists = (xmlDom, qTitle) => {
  let questionExist = false;
  Array.from(xmlDom.querySelectorAll('Name')).forEach((element) => {
    if (element.innerHTML === qTitle) {
      questionExist = true;
    }
  });
  // if (node && node.querySelector('Name').innerHTML === qTitle) {
  //   return true;
  // }
  // return false;
  return questionExist;
};
export default handleFileSelection;
