import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";

const App = () => {
	const [, dispatch] = useStateValue();

	React.useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);
		//if (!patients) {
			const fetchPatientList = async () => {
				try {
					const { data: patientListFromApi } = await axios.get<Patient[]>(
						`${apiBaseUrl}/patients`
					);
					const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
						`${apiBaseUrl}/diagnoses`
					);
					dispatch(setPatientList(patientListFromApi));
					dispatch(setDiagnosisList(diagnosisListFromApi));
				} catch (e) {
					console.error(e);
				}
			};
			void fetchPatientList();
		//}

	}, [dispatch]);

	return (
		<div className="App">
			<Router>
				<Container>
					<Header as="h1">Patientor</Header>
					<Button as={Link} to="/" primary>
						Home
					</Button>
					<Divider hidden />
					<Switch>
						<Route path="/">
							<PatientListPage />
						</Route>
					</Switch>
				</Container>
			</Router>
		</div>
	);
};

export default App;