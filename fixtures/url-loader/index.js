import fsExtra from 'fs-extra';
import path from 'path';

import contentOrigin from './logo.svg';
import contentRemoveXmlns from './logo-xmlns.svg?-xmlns';
import contentXmlns from './logo.svg?+xmlns';
import contentFillRed from './logo.svg?fill=red&+xmlns';
import contentFillColor from './logo.svg?fill=#008489&+xmlns';
import contentStrockBlue from './logo.svg?stroke=blue&+xmlns';

const decodeBase64 = str =>
  Buffer
    .from(str.replace(/^data:image\/svg\+xml;base64,/, ''), 'base64')
    .toString();

export const main = async t => {
  t.notRegex(decodeBase64(contentOrigin), /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  t.notRegex(decodeBase64(contentRemoveXmlns), /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  t.regex(decodeBase64(contentXmlns), /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  t.regex(decodeBase64(contentFillRed), /fill="red"/);
  t.regex(decodeBase64(contentFillColor), /fill="#008489"/);
  t.regex(decodeBase64(contentStrockBlue), /stroke="blue"/);
};
