import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/LoginIn";
import BasicTable from "./components/CandidateList";
import AddressForm from "./components/CandiateCreation";
import { Routes, Route, Router } from "react-router-dom";
import Update from "./components/UpdateCandiate";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<SignUp></SignUp>} />
                <Route path="/login" element={<SignIn></SignIn>} />
                <Route path="/main" element={<BasicTable></BasicTable>} />
                <Route path="/address" element={<AddressForm></AddressForm>} />
                <Route path="/update" element={<Update></Update>} />
            </Routes>
        </div>
    );
}

export default App;
