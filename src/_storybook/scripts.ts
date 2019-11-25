import json2md from "json2md";
import { section, collections } from "./propCollections";

export const getPropTable = (
  name: string,
  before: string = "",
  after: string = ""
): string => {
  const body = collections[name].map(row => {
    const type = row[1] ? row[1].replace("|", "\\|") : "";
    const required = !row[2] ? "-" : "yes";
    const defaultProp = !row[3] ? "-" : row[3];
    const description = row[4] ? row[4].replace("|", "\\|") : "-";
    return [row[0], type, required, defaultProp, description];
  });

  return `
  ${before}

  ${json2md([
    {
      table: {
        headers: section,
        rows: body
      }
    }
  ])}

  ${after}
  `;
};
