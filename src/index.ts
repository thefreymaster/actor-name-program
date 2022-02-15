import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = 8080; // default port to listen

const onlyUnique = (value: any, index: any, self: any) =>
  self.indexOf(value) === index;

const readAndParseFile = async (filePath: string) => {
  try {
    const file = await fs.readFileSync(
      path.resolve(__dirname, filePath),
      "utf8"
    );
    const data = file
      .split(/\ -- (.*?)(\n)(.*?)(\n)/)
      .filter((item: string) =>
        item.match(/^[A-Za-z0-9_']+\s?,\s?[A-Za-z0-9_']+$/)
      );
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getUniqueNames = (data: string[]) => {
  return data.filter(onlyUnique);
};

const getUniqueLastNames = (data: string[]) => {
  const lastNames = data
    .map((name: string) => {
      const n = name.split(", ");
      return n[0];
    })
    .filter(onlyUnique);
  return lastNames;
};

const getUniqueFirstNames = (data: string[]) => {
  const lastNames = data
    .map((name: string) => {
      const n = name.split(", ");
      return n[1];
    })
    .filter(onlyUnique);
  return lastNames;
};

const getTopTenLastNames = (data: string[]) => {
  const lastNamesObj: any = {};
  data.forEach((name: string) => {
    const n = name.split(", ");
    if (lastNamesObj[n[0]]) {
      lastNamesObj[n[0]] = lastNamesObj[n[0]] + 1;
    } else {
      lastNamesObj[n[0]] = 1;
    }
  });
  const lastNamesArr = Object.entries(lastNamesObj)
    .map(([key, value]) => ({
      name: key,
      count: value,
    }))
    .sort(function (a: any, b: any) {
      return b.count - a.count;
    });
  return lastNamesArr.slice(0, 10);
};

const getTopTenFirstNames = (data: string[]) => {
  const firstNamesObj: any = {};
  data.forEach((name: string) => {
    const n = name.split(", ");
    if (firstNamesObj[n[1]]) {
      firstNamesObj[n[1]] = firstNamesObj[n[1]] + 1;
    } else {
      firstNamesObj[n[1]] = 1;
    }
  });
  const firstNamesArr = Object.entries(firstNamesObj)
    .map(([key, value]) => ({
      name: key,
      count: value,
    }))
    .sort(function (a: any, b: any) {
      return b.count - a.count;
    });
  return firstNamesArr.slice(0, 10);
};

const getSpecificallyUnique = (data: string[], size: number) => data.slice(0, size)

const getUniqueModified = (data: string[], size: number) => {
  const modified: string[] = [];
  data.map((name, index) => {
    const splitName = name.split(", ");
    if (data.length - 1 === index) {
      return modified.push(
        `${splitName[0]}, ${data[0]?.split(", ")[1]}`
      );
    }
    const currentLastname = splitName[0];
    const nextFirstName = data[index + 1]?.split(", ")[1]
    return modified.push(`${currentLastname}, ${nextFirstName}`);
  });
  return modified.slice(0, size);
};

const run = (data: string[]) => {
  const unique = getUniqueNames(data);
  const uniqueLastNames = getUniqueLastNames(data);
  const uniqueFirstNames = getUniqueFirstNames(data);
  const topTenLastNames = getTopTenLastNames(data);
  const topTenFirstNames = getTopTenFirstNames(data);
  const uniqueSpecificially = getSpecificallyUnique(data, 25);
  const uniqueModified = getUniqueModified(uniqueSpecificially, 25);

  return {
    unique: {
      names: unique?.length,
      lastNames: uniqueLastNames?.length,
      firstNames: uniqueFirstNames?.length,
    },
    top: {
      lastNames: topTenLastNames,
      firstNames: topTenFirstNames,
    },
    list: {
      specifically: uniqueSpecificially,
      modified: uniqueModified,
    },
  };
};

// start the Express server
app.listen(port, async () => {
  console.log(`server started at http://localhost:${port}`);
  const data: string[] = await readAndParseFile("../data.txt");
  console.log(run(data));
});