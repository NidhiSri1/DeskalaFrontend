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
export default function AddressForm() {
    const [enterDetails, setEnterDetails] = useState({
        Name: "",
        Address: "",
        DOB: "",
        State: "",

        Pincode: "",
        Email: "",
        Result: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setEnterDetails({
            ...enterDetails,
            [e.target.id]: e.target.value,
        });
    };

    const handelSubmit = async () => {
        try {
            let data = await axios.post(
                "http://localhost:2345/candiate",
                enterDetails
            );
            alert("Candidate Added");
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Create Candidate
            </Typography>
            <Paper
                elevation={7}
                sx={{ margin: "auto", width: 800, marginTop: 8, padding: 3 }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Name"
                            name="Name"
                            label="Name"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Address"
                            name="Address"
                            label="Address"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="DOB"
                            name="Date Of Birth"
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
                            name="State"
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
                            name="Email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Pincode"
                            name="Pincode"
                            label="Pincode"
                            fullWidth
                            autoComplete="shipping country"
                            variant="outlined"
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
                    Create
                </Button>
            </Paper>
        </React.Fragment>
    );
}
