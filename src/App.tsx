import {
  Box,
  Button,
  Text,
  Textarea,
  theme,
  ThemeProvider
} from "@chakra-ui/core";

import * as React from "react";
import "./styles.css";

const customTheme = {
  ...theme
};

export default function App() {
  let [value, setValue] = React.useState("");
  let [structVal, setStructVal] = React.useState("");
  let [newArr, setNewArr] = React.useState<any[]>([]);

  let handleInputChange = (e: React.ChangeEvent<any>) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  let handleStructInputChange = (e: React.ChangeEvent<any>) => {
    let inputValue = e.target.value;
    setStructVal(inputValue);
  };

  const doConvert = () => {
    try {
      const json = JSON.parse(value);
      const jsonStruct = JSON.parse(structVal);
      const arrKey = Object.keys(jsonStruct)[0];
      const dataArr: any[] = json[arrKey];
      const structObj = jsonStruct[arrKey];
      const returnArr: any[] = [];
      // Loop throw data array
      dataArr.forEach((item) => {
        let newItem = { ...item };
        Object.keys(structObj).forEach((key) => {
          const newLabel = structObj[key];
          // check if new lable has period .

          const [newLabelFirst, newLabelLast] = ("" + newLabel).split(".");
          if (newLabelLast) {
            const newSubObject = { ...newItem[newLabelFirst] };
            newSubObject[newLabelLast] = newItem[key];
            newItem[newLabelFirst] = newSubObject;
          } else {
            newItem[newLabel] = newItem[key];
          }
          delete newItem[key];
          console.log(newItem);
          returnArr.push(newItem);
        });
      });
      setNewArr(returnArr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box w="70%">
        <Text mb=".5em" fontSize="1.2em">
          JSON OBJECT
        </Text>
        <div>
          <Textarea
            value={value}
            onChange={handleInputChange}
            placeholder="Enter Json"
            size="md"
          />
        </div>
      </Box>
      <Box w="70%">
        <Text mb=".5em" fontSize="1.2em">
          JSON Structure Mapper
        </Text>
        <div>
          <Textarea
            value={structVal}
            onChange={handleStructInputChange}
            placeholder="Enter Json"
            size="md"
          />
        </div>
      </Box>
      <Box d="flex" mt="1em">
        <Button variantColor="green" onClick={doConvert}>
          Convert
        </Button>
      </Box>
      <pre>{JSON.stringify(newArr, null, 2)}</pre>
    </ThemeProvider>
  );
}
