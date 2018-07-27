import fsExtra from 'fs-extra';
import path from 'path';

import contentOrigin from './logo.svg';
import contentRemoveXmlns from './logo-xmlns.svg?-xmlns';
import contentXmlns from './logo.svg?+xmlns';
import contentFillRed from './logo.svg?fill=red&+xmlns';
import contentFillColor from './logo.svg?fill=#008489&+xmlns';
import contentStrockBlue from './logo.svg?stroke=blue&+xmlns';

export const main = async t => {
  t.notRegex(contentOrigin, /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  t.notRegex(contentRemoveXmlns, /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  t.regex(contentXmlns, /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  t.regex(contentFillRed, /fill="red"/);
  t.regex(contentFillColor, /fill="#008489"/);
  t.regex(contentStrockBlue, /stroke="blue"/);
};
