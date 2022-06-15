import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [user, setUser] = React.useState({
        email: "",
        mobileNum: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const data = new FormData(event.currentTarget);

        try {
            let data = await axios.post("http://localhost:2345/", user);
            if (data.data.errors) {
                alert("Please fill valid details");
            } else if (data.data.token) {
                navigate("/login");
            } else if (data.data == "User already Exist") {
                alert("User already Exist");
            }
        } catch (err) {
            console.log(err.message);
            if (err.message === "Request failed with status code 400") {
                alert("Please enter correct password or mobile Number");
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper
                elevation={7}
                sx={{ margin: "auto", width: 400, marginTop: 8, padding: 3 }}
            >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        type="number"
                                        fullWidth
                                        id="mobileNum"
                                        label="Mobile Num"
                                        name="mobileNum"
                                        autoComplete="mobileNum"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Typography
                                        sx={{
                                            fontWeight: "normal",
                                            color: "#d0d3c7",
                                        }}
                                    >
                                        Phone Number should be 10 digit
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                    />
                                    <Typography
                                        sx={{
                                            fontWeight: "normal",
                                            color: "#d0d3c7",
                                        }}
                                    >
                                        Enter Strong Password
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid item>
                                <Link to="/login">
                                    {"Already have an account"}
                                </Link>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Paper>
        </ThemeProvider>
    );
}
