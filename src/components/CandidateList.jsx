import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicTable() {
    const [getData, setGetData] = useState([]);
    let date = new Date();
    const [enterDetails, setEnterDetails] = useState({});
    const [age, setAge] = React.useState("");

    const handleChange = async (event) => {
        let id = localStorage.getItem("userId");
        console.log("koi");
        try {
            let data = await axios.patch(
                `http://localhost:2345/candiate/${id}`,
                { Result: event.target.value }
            );
            setAge(event.target.value);
            console.log(data);
        } catch (err) {}
    };

    const navigate = useNavigate();

    useEffect(() => {
        getRequest();
    }, []);

    const getRequest = async () => {
        try {
            let data = await axios.get("http://localhost:2345/candiate");

            setGetData(data.data);
        } catch (err) {}
    };

    const handleDelete = async (id) => {
        try {
            let data = await axios.delete(
                `http://localhost:2345/candiate/${id}`
            );
            getRequest();
        } catch (err) {}
    };

    const handleEdit = async (id) => {
        localStorage.setItem("userId", id);
        navigate("/update", { UserId: id });
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h5">Student Details</Typography>
            <Button
                variant="outlined"
                sx={{ marginTop: 3 }}
                onClick={() => navigate("/address")}
            >
                Add Candidate
            </Button>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date Of Birth</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getData.map((row) => {
                        return (
                            <TableRow
                                key={row.Name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.Name}
                                </TableCell>
                                <TableCell>{row.DOB}</TableCell>
                                <TableCell>
                                    {date.getFullYear() - +row.DOB.slice(0, 4)}
                                </TableCell>
                                <TableCell>{row.Email}</TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Result
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Age"
                                            onChange={handleChange}
                                            sx={{ width: 100 }}
                                        >
                                            <MenuItem value={"ShortList"}>
                                                ShortList
                                            </MenuItem>
                                            <MenuItem value={"Rejected"}>
                                                Rejected
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>

                                <TableCell>
                                    <ModeEditIcon
                                        onClick={() => handleEdit(row._id)}
                                    ></ModeEditIcon>
                                </TableCell>
                                <TableCell>
                                    <DeleteIcon
                                        onClick={() => handleDelete(row._id)}
                                    ></DeleteIcon>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
