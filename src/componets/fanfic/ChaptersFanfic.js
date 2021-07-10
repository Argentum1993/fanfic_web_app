import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import Box from "@material-ui/core/Box";



const ChaptersFanfic = ({chapters, className, clickHandler}) => {
    return (
        <Box display="flex" justifyContent="center">
            <TableContainer className={className} component={Paper}>
                <Box margin={2}>Chapters</Box>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        { chapters.map(
                            (name, i) => {
                                return(
                                    <TableRow hover key={name} >
                                        <TableCell
                                            align="left"
                                            onClick={ () => { clickHandler(i + 1) } }
                                        >
                                            {(i + 1) + ") " + name}
                                        </TableCell>
                                    </TableRow>)
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ChaptersFanfic;