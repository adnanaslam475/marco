import React, { useEffect } from 'react';
import { Slide, Grow, Stack, Grid, Paper, Button, Link, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Container } from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// custom import 
import ResultBoxSearchList from '../ui/ResultBoxSearchlist';
import Facetsidebar from '../ui/Facetsidebar';
import DataPagination from '../ui/DataPagination';
import FullWidthTabs from '../ui/header/FullWidthTabs';
import ResultSummaryBar from '../ui/ResultSummaryBar';


const ResultList = (props) => {

	let location = useLocation();
	let params = new URLSearchParams(location.search);
	const navigate = useNavigate();
		// console.log('useLocation:',location);
		// console.log('data:', location.state.data_arr.risultati);
		// console.log('query', location.state.query);
		// console.log('filter:', location.state.filter);
		// console.log('online', location.state.online);

		return (

				<React.Fragment>
				<Grid container spacing={0} direction="row" align="center" > 
					<Grid item xs={12} display="flex" >
					{/* qui le tabs */}
					<FullWidthTabs tabfocus={params.get("fq")} />
					</Grid>
				</Grid>



{/* qui la ResultSummaryBar (è già un container) */}
<ResultSummaryBar queryraw={params.get("q").toString().replace(/,/g, ' ')} />

		<Container maxWidth="xl" sx={{
					'marginTop':'1rem', 
				}}>
		<Grid container spacing={2}>

				<Grid item xs={12} lg={12}>
				<Slide direction='right' in={true} timeout={{ appear: 500, enter: 500, exit: 500 }} >
					<Paper 
					elevation={2} 
					sx={{
						paddingY: '1rem'
					}}
					>
				
				<DataPagination count={location.state.data_arr.risultati} />
				</Paper>
				
				</Slide>
				</Grid>

				<Grid item xs={12} lg={12}>
				<Grow in={true} timeout={{ appear: 2000, enter: 2000, exit: 2000 }} >
					<Paper elevation={3} >
						
						<List>
						
							<ResultBoxSearchList data_array={location.state.data_arr.hits} boxtype={location.state.boxtype} risultati={location.state.data_arr.risultati} hashid='box1' />
						</List>
					</Paper>
				</Grow>
				</Grid>


		</Grid>
		</Container>
		</React.Fragment>
		);

}

export default ResultList;