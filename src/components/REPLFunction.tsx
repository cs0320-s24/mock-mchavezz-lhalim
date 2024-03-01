import {Dispatch, SetStateAction, useState} from 'react';
import "../styles.main.css";
import "../src/mocked_dataJson.ts"
import {mocked_data, mocked_data_2, mocked_data_3, mocked_data_4, mocked_data_5, mocked_data_6} from "../mocked_dataJson"

export interface REPLFunction {
    (args: Array<String>, isBrief: boolean, setIsBrief: Dispatch<SetStateAction<boolean>>): string|string[][]|JSX.Element
}

// map containing mocked data 
 let loadedFile: string[][] = [];
 let loadedFileName: string;
 let isLoaded: boolean = false;
 const dataMap: { [index: string]: string [][]} = {
    mocked_data: mocked_data,
    mocked_data_2: mocked_data_2,
    mocked_data_3: mocked_data_3,
    mocked_data_4: mocked_data_4,
    mocked_data_5: mocked_data_5,
    mocked_data_6: mocked_data_6,
 };

 // mocked data query map for mocked calls to search command
 const queryMap; {[key: string]: {[key: string]; string | string[][]}} = {
    mocked_data; {'0 1': [["Name", "Age"]], '5, 10': [[]]}, 


 }