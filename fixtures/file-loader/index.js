import fsExtra from 'fs-extra';
import path from 'path';

import fileOrigin from './logo.svg';
import fileXmlns from './logo.svg?+xmlns';
import fileRemoveXmlns from './logo-xmlns.svg?-xmlns';
import fileFillRed from './logo.svg?fill=red&+xmlns';
import fileFillColor from './logo.svg?fill=#008489&+xmlns';
import fileStrockBlue from './logo.svg?stroke=blue&+xmlns'

const read = async file => {
  const buffer = await fsExtra.readFile(file);
  return buffer.toString();
};

export const main = async t => {
  const contentOrigin = await read(fileOrigin);
  const contentRemoveXmlns = await read(fileRemoveXmlns);
  const contentXmlns = await read(fileXmlns);
  const contentFillRed = await read(fileFillRed);
  const contentFillColor = await read(fileFillColor);
  const contentStrockBlue = await read(fileStrockBlue);
  t.notRegex(contentOrigin, /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  t.notRegex(contentRemoveXmlns, /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  t.regex(contentXmlns, /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  t.regex(contentFillRed, /fill="red"/);
  t.regex(contentFillColor, /fill="#008489"/);
  t.regex(contentStrockBlue, /stroke="blue"/);
};
