import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const LumelTable = ({ tableData }) => {
    // State to hold input values
    const [data, setData] = useState(tableData.rows);
    const initialState = JSON.parse(JSON.stringify(data))


    const handleInputChange = (e, rowId) => {
        const { name, value } = e.target;
        let cloneData = JSON.parse(JSON.stringify(data))

        const updateTree = (tree) => {
            if (tree.id === rowId) {
                tree[name] = value;
            } else if (tree.children) {
                tree.children.forEach(child => updateTree(child)); 
                tree.value = tree.children.reduce((acc, child) => acc + parseInt(child.value), 0);
            }
        };

        cloneData.forEach(tree => updateTree(tree));

        setData(cloneData);
    };


    const getVariancePercentage = (e, rowId) => {

        let cloneData = JSON.parse(JSON.stringify(data))
        
        const updateTree = (tree) => {
            if (tree.id === rowId) {
                if(tree.inputVal && !isNaN(tree.inputVal)) {
                    let userInput = Number(tree.inputVal);
                    let existingVal = Number(tree.value);
                    // console.log(userInput, existingVal)
                    let percentageValue = (userInput / 100) * existingVal;
                    tree["value"] = existingVal + percentageValue;
                    tree["variancePercentge"] = `${userInput}%`
                    tree["inputVal"] = ""
                } else {
                    alert("Input not found or invalid")
                }

            } else if (tree.children) {
                tree.children.forEach(child => updateTree(child)); 
                tree.value = tree.children.reduce((acc, child) => acc + parseInt(child.value), 0);
            }
        };

        cloneData.forEach(tree => updateTree(tree));

        setData(cloneData);
    }

    const getVarianceValue = (e, rowId) => {
        let cloneData = JSON.parse(JSON.stringify(data))
        
        const updateTree = (tree) => {
            if (tree.id === rowId) {
                if(tree.inputVal && !isNaN(tree.inputVal)) {
                    let userInput = Number(tree.inputVal);
                    let existingVal = Number(tree.value);

                    let percentageValue = ((userInput - existingVal) / existingVal) * 100;

                    if(tree["children"]) {
                        tree["children"].forEach((subTree) => {

                            let subExistingVal = Number(subTree.value);
                            let oldPercentage = (subExistingVal / existingVal) * 100

                            // console.log("subExistingVal >>>", subExistingVal)
                            // console.log("oldPercentage >>>", oldPercentage)
                            let subTreeValNew = (oldPercentage / 100) * userInput;
                            subTree["value"] = `${subTreeValNew}`;
                            subTree["variancePercentge"] = `${oldPercentage.toFixed(2)}`;
                        })
                    }

                    tree["variancePercentge"] = `${percentageValue.toFixed(2)}%`
                    tree["value"] = `${userInput}`;
                    tree["inputVal"] = ""

                } else {
                    alert("Input not found or invalid")
                }

            } else if (tree.children) {
                tree.children.forEach(child => updateTree(child)); 
                tree.value = tree.children.reduce((acc, child) => acc + parseInt(child.value), 0);
            }
        };

        cloneData.forEach(tree => updateTree(tree));

        setData(cloneData);
    }

    return (
        <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Input</TableCell>
                        <TableCell>Allocation %</TableCell>
                        <TableCell>Allocation Val</TableCell>
                        <TableCell>Variance %</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <React.Fragment key={row.id}>
                            <TableRow key={row.id}>
                                <TableCell>{row.label}</TableCell>
                                <TableCell>{row.value}</TableCell>
                                <TableCell>
                                    <TextField
                                        name="inputVal"
                                        value={row.inputVal || ""} // Assuming this should be numeric
                                        onChange={(e) => handleInputChange(e, row.id)}
                                        variant="outlined"
                                        size="small"
                                        type="input"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        name="allocationPercentageBtn"
                                        onClick={(e) => getVariancePercentage(e, row.id)}
                                        variant="contained"
                                        color='success'
                                        size="small"
                                    >
                                        Get Allocation %
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        name="allocationPercentageVal"
                                        onClick={(e) => getVarianceValue(e, row.id)}
                                        variant="contained"
                                        color='success'
                                        size="small"
                                    >
                                        Get Allocation Value
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="variancePercentge"
                                        value={row.variancePercentge || ""}
                                        onChange={(e) => handleInputChange(e, row.id)}
                                        variant="outlined"
                                        size="small"
                                        disabled
                                    />
                                </TableCell>
                            </TableRow>
                            {row.children && row.children.map((child) => (
                                <TableRow key={child.id}>
                                    <TableCell>{"➡️➡️"}{child.label}</TableCell>
                                    <TableCell>{child.value}</TableCell>
                                    <TableCell>
                                        <TextField
                                            name="inputVal"
                                            value={child.inputVal || ""} // Assuming this should be numeric
                                            onChange={(e) => handleInputChange(e, child.id)}
                                            variant="outlined"
                                            size="small"
                                            type="input"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            name="allocationPercentageBtn"
                                            onClick={(e) => getVariancePercentage(e, child.id)}
                                            variant="contained"
                                            color='success'
                                            size="small"
                                        >
                                            Get Allocation %
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            name="allocationPercentageVal"
                                            onClick={(e) => getVarianceValue(e, child.id)}
                                            variant="contained"
                                            color='success'
                                            size="small"
                                        >
                                            Get Allocation Value
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="variancePercentge"
                                            value={child.variancePercentge || ""}
                                            onChange={(e) => handleInputChange(e, child.id)}
                                            variant="outlined"
                                            size="small"
                                            disabled
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default LumelTable;
