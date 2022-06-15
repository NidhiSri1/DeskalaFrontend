import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { InputLabel, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Update() {
    const [getData, setGetData] = useState([]);
    const [enterDetails, setEnterDetails] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        console.log(e.target.value);
        setEnterDetails({
            ...enterDetails,
            [e.target.id]: e.target.value,
        });
    };

    const handelSubmit = async () => {
        let id = localStorage.getItem("userId");
        console.log("koi");
        try {
            let data = await axios.patch(
                `http://localhost:2345/candiate/${id}`,
                enterDetails
            );
            console.log(data);
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Update Candidate
            </Typography>
            <Typography>Fill the fields that needs to be updated</Typography>
            <Paper
                elevation={7}
                sx={{ margin: "auto", width: 800, marginTop: 8, padding: 3 }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Name"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                            label="Name"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Address"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            label="Address"
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="DOB"
                            type="date"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="State"
                            label="State"
                            fullWidth
                            autoComplete="shipping postal-code"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="Email"
                            fullWidth
                            variant="outlined"
                            label="Email"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            autoComplete="shipping country"
                            variant="outlined"
                            label="Country"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>

                <Button
                    variant="outlined"
                    sx={{ marginRight: 4 }}
                    onClick={() => navigate("/main")}
                >
                    Back
                </Button>
                <Button
                    variant="outlined"
                    sx={{ marginRight: 4 }}
                    onClick={handelSubmit}
                >
                    Update
                </Button>
            </Paper>
        </React.Fragment>
    );
}
