import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Paper, Container, AppBar, Toolbar, Typography, Divider } from '@mui/material';
import { 
  Button,
  Link,
  Box, 
  CardContent,
  Grid } from '@mui/material';
import { useParams } from 'react-router-dom';


// custom import
import theme from '../../assets/theme';
import FullWidthTabs from '../ui/header/FullWidthTabs'
import ApiFunc from '../utilities/apiFunc';
import { API_URL } from '../utilities/apiUrl';
import LoadingSpinner from '../utilities/LoadingSpinner';
import CoverImg from '../ui/bibrecord/CoverImg';
import { generateUniqueKey } from '../utilities/RandomKeyGen';


const ItemId = (props) => {

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let navigate = useNavigate();
    
    const item = params.get("id");
    // console.log('[params.get("id");]: ', item);

    const url = `${API_URL}getrecord?bibid=${item}`;
    const { data, error, loading } = ApiFunc(url);

    // console.log('[PERMALINK} Record data: ',data);

  const GoTosearch = (q,fq,filter,fields,start,sort,ord) => {
    if (data){
    navigate(`/search?q=${q}&fq=${fq}&filter=${filter}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`);
    // window.location.reload();
  } else {

  }
  }

    return (
    <React.Fragment>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} direction="row" align="center"> 
            <Grid item xs={12} display="flex" >
            {/* qui le tabs */}
            <FullWidthTabs />
            </Grid>
        </Grid>
        </Box>

<Box sx={{ 
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.main,
        marginTop: '2rem'
        }} >
    
    {/* 2. qui area sotto appbar dell'intera card */}
    <Container maxWidth="xl" sx={{
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main
      }}>
        
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>

          {/* colonna sx card bibrecord */}
          <Grid item xs={12} md={8}>
          <Paper elevation={3}
          sx={{
          padding: '1rem',
          marginBottom: '4rem'
          }}
          >

            {/* colonna sx divisa per cover, titolo/autore/pubb e sotto metadati bibrecord */}
            <Grid container spacing={4} sx={{
              marginBottom: "1rem",
            }}>
              
              {/* embed col sx, immagine */}
              <Grid 
                item 
                xs={12} 
                md={4} 
                >
                {!loading && <LoadingSpinner />}
                {error && <p>Errore: {error}</p>}
                {/* qui rendering del component CoverImg */}
                <CoverImg bibid={item} size='lc' />
              </Grid>

              {/* embed col a dx della cover titolo/autore/pubblicazione/edizione */}
              <Grid 
              item xs={12} md={8} 
              >
                <CardContent 
                sx={{
                  margin: 0,
                  padding: 0,
                }}
                >


                  {/* ####################################### */}
                  {/* ####################################### */}
                  {/* 1. titolo 245a */}
                  {!loading && <LoadingSpinner />}
                  {error && <p>Errore: {error}</p>}
                  {data?.titoloprincipale && data.titoloprincipale.length > 0 &&
            
                  <Typography 
                  sx={{
                    // color: 'rgba(0,0,0,.87)',
                    color: theme.palette.primary.black,
                    display: 'inline-block',
                    fontWeight: 300,
                    marginX: 0,
                    [theme.breakpoints.down("xs")]: {
                      marginX: "1rem",       
                    },
                    [theme.breakpoints.down("md")]: {
                      marginX: "1rem",         
                    },
                    [theme.breakpoints.down("lg")]: {
                      marginX: 0,
                    },
                    [theme.breakpoints.down("xl")]: {
                      marginX: "1rem",
                    },
                  }}
                    component="div" 
                    variant="h4"
                    >
                    
                    {data['titoloprincipale']} 
                    
                  {/* 2.
                  complemento del titolo tutti i sottocampi 245 tranne 'a' */}
                  {!loading && <LoadingSpinner />}
                  {error && <p>Errore: {error}</p>}
                  {data?.titolocomplemento && data['titolocomplemento'].length > 0 &&
                  <Typography 
                    sx={{
                      // color: 'rgba(0,0,0,.87)',
                      color: theme.palette.primary.black,
                      display: 'inline-block',
                      fontWeight: 300,
                    }}
                    component="div" 
                    variant="h5"
                    // variant="body1"
                    >
                    
                    {data['titolocomplemento']}
                    
                  </Typography>}
                </Typography>}
          

          {/* 3. */}
          {/* AUTORI 100,110,111 */}
          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.autoreprincipale.print && data.autoreprincipale.print.length > 0 &&
          <div>
            <Typography 
            sx={{
              color: theme.palette.primary.black,
              marginTop: "2rem",
              fontWeight: 500,
              marginX: 0,
                  [theme.breakpoints.down("xs")]: {
                    marginX: "1rem",       
                  },
                  [theme.breakpoints.down("md")]: {
                    marginX: "1rem",         
                  },
                  [theme.breakpoints.down("lg")]: {
                    marginX: 0,
                  },
                  [theme.breakpoints.down("xl")]: {
                    marginX: "1rem",
                  },
            }}
            component="div" 
            // variant="subtitle1"
            >
              Autore principale
            </Typography>
            </div>}

          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.autoreprincipale.print && data.autoreprincipale.print.length > 0 &&
          <div>
            {/* link alla ricerca per autoreprincipale */}
            <Link
            component="button"
            onClick={() => GoTosearch(data.autoreprincipale.search.replace(/\s/g, '+'),'all','5','autoreprincipale,autorisecondari','0','_score','desc')}
            underline="hover" 
            >

            <Typography 
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 300,
              marginX: 0,
                  [theme.breakpoints.down("xs")]: {
                    marginX: "1rem",       
                  },
                  [theme.breakpoints.down("md")]: {
                    marginX: "1rem",         
                  },
                  [theme.breakpoints.down("lg")]: {
                    marginX: 0,
                  },
                  [theme.breakpoints.down("xl")]: {
                    marginX: "1rem",
                  },
                }}
            component="div"
            align='left'
             >
            {/* AUTORE PRINCIPALE */}
            {data.autoreprincipale.print}
            {/* link: {data['autoreprincipalesearch']} */}
            </Typography>
            </Link>
          </div>}

            {/* 4. */}
            {/* Pubblicazione, distribuzione, stampa 260 */}
            {!loading && <LoadingSpinner />}
            {error && <p>Errore: {error}</p>}
            {data?.pubblicazione && data.pubblicazione.length > 0 &&
            <div>
            <Typography 
            key={generateUniqueKey()}
            sx={{
            color: theme.palette.primary.black,
            fontWeight: 500,
            marginTop: "2rem",
            marginX: 0,
              [theme.breakpoints.down("xs")]: {
                marginX: "1rem",       
              },
              [theme.breakpoints.down("md")]: {
                marginX: "1rem",         
              },
              [theme.breakpoints.down("lg")]: {
                marginX: 0,
              },
              [theme.breakpoints.down("xl")]: {
                marginX: "1rem",
              },
            }}
            component="div" 
            variant="subtitle1"
            align='left'
            >
            Pubblicazione, distribuzione, stampa
            </Typography>

            {data.pubblicazione.map((name) => (
              <div
              key={generateUniqueKey()} >
            <Link 
            key={generateUniqueKey()}
            component="button"
            onClick={() => GoTosearch(name.search.replace(/\s/g, '+'),'all','5','tag260,tag264','0','tag008date','desc')}
            underline="hover" 
            >
              <Typography 
              key={generateUniqueKey()}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 300,
                marginX: 0,
                [theme.breakpoints.down("xs")]: {
                  marginX: "1rem",       
                },
                [theme.breakpoints.down("md")]: {
                  marginX: "1rem",         
                },
                [theme.breakpoints.down("lg")]: {
                  marginX: 0,
                },
                [theme.breakpoints.down("xl")]: {
                  marginX: "1rem",
                },
              }}
              align='left'
              component="div" 
              variant="body1"
              >
              {/* Pubblicazione, distribuzione, stampa 260 */}
              {name.print}
              </Typography>
            </Link>
            </div>
            ))}
            </div>}

          

          {/* 4. */}
            {/* EDIZIONE */}
            {!loading && <LoadingSpinner />}
            {error && <p>Errore: {error}</p>}
            {data?.edizione && data.edizione.length > 0 &&
            <div>
            <Typography 
            key={generateUniqueKey()}
            sx={{
            color: theme.palette.primary.black,
            fontWeight: 500,
            marginTop: "2rem",
            marginX: 0,
              [theme.breakpoints.down("xs")]: {
                marginX: "1rem",       
              },
              [theme.breakpoints.down("md")]: {
                marginX: "1rem",         
              },
              [theme.breakpoints.down("lg")]: {
                marginX: 0,
              },
              [theme.breakpoints.down("xl")]: {
                marginX: "1rem",
              },
            }}
            component="div" 
            variant="subtitle1">
            Edizione
            </Typography>

            {data.edizione.map((name) => (
              <div
              key={generateUniqueKey()}
              >
            <Typography 
            key={generateUniqueKey()}
            sx={{
              color: theme.palette.primary.black,
              fontWeight: 300,
              marginX: 0,
              [theme.breakpoints.down("xs")]: {
                marginX: "1rem",       
              },
              [theme.breakpoints.down("md")]: {
                marginX: "1rem",         
              },
              [theme.breakpoints.down("lg")]: {
                marginX: 0,
              },
              [theme.breakpoints.down("xl")]: {
                marginX: "1rem",
              },
            }}
            align='left'
            component="div" 
            variant="body1">
            {/* Edizione */}
            {name.print}
            </Typography>
            </div>
            ))}
            </div>}
            </CardContent>
          {/* chiude grid item embed col dx */}
          </Grid>
        </Grid>


        
        {/* siamo sempre nella colonna sx MA (!) */}
        {/* parte sotto cover e intestazione */}
        <Grid container spacing={4}>
          
          {/* blocco sotto copertina/titolo/pubblicazione/edizione fino a COPIE */}
          <Grid item xs={12} md={12}
          sx={{
            [theme.breakpoints.down("xs")]: {
              marginX: "1rem",       
            },
            [theme.breakpoints.down("md")]: {
              marginX: "1rem",         
            },
            [theme.breakpoints.down("lg")]: {
              marginX: "1rem",
            },
            [theme.breakpoints.down("xl")]: {
              marginX: "1rem",
            },
          }}
          >
          
          {/* altrititoli */}
          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.altrititoli && data.altrititoli.length > 0 &&
          <div>
          <Divider 
          sx={{
            marginY: "2rem"
          }}
          />
          <Typography 
          sx={{
            color: theme.palette.primary.black,
            fontWeight: 500,
            marginTop: "1rem"
          }}
          component="div" 
          align='left'
          >
            ALTRI TITOLI
          </Typography>

          {data.altrititoli.map((name) => (
            <div
            key={generateUniqueKey()} >
            <Link 
            key={generateUniqueKey()}
            component="button"
            onClick={() => GoTosearch(name.search.replace(/\s/g, '+'),'all','5','titoloprincipale,titolosecondario','0','_score','desc')}
            underline="hover"
            >
            <Typography 
            key={generateUniqueKey()}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 300
            }}
            align='left'
            component="div" 
            >
            {/* ALTRI TITOLI */}
            {name.print}
          </Typography>
          </Link>
          </div>
          ))}
          </div>}


          {/* SOGGETTI */}
          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.soggetti && data.soggetti.length > 0 &&
          <div>
            <Divider 
            sx={{
              marginY: "2rem"
            }}
            />
            <Typography 
            sx={{
              color: theme.palette.primary.black,
              fontWeight: 500,
              marginTop: "2rem"
            }}
            component="div" 
            // variant="subtitle2"
            >
              SOGGETTI
            </Typography>
            
            {data.soggetti.map((name) => (
              <div
              key={generateUniqueKey()}
              >
              <Link 
              key={generateUniqueKey()}
              component="button"
              onClick={() => GoTosearch(name.search.replace(/\s/g, '+'),'all','5','soggetti','0','_score','desc')}
              underline="hover"
              >
                <Typography 
                key={generateUniqueKey()}
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 300,
                }}
                align='left'
                component="div" 
                >
                  {/* SOGGETTI */}
                  {name.print}
                </Typography>
            </Link>
            </div>
            ))}
          </div>}


          {/* GENERE */}
          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.genere && data.genere.length > 0 &&
          <div>
            <Divider 
            sx={{
              marginY: "2rem"
            }}
            />
            <Typography 
            sx={{
              color: theme.palette.primary.black,
              fontWeight: 500,
              marginTop: "2rem"
            }}
            component="div" 
            // variant="subtitle2"
            >
              GENERE
            </Typography>
            
            {data.genere.map((name) => (
              <div
              key={generateUniqueKey()}
              >
                <Link 
                key={generateUniqueKey()}
                component="button"
                onClick={() => GoTosearch(name.search.replace(/\s/g, '+'),'all','5','tag655','0','_score','desc')}
                underline="hover" 
                >
                  <Typography 
                  key={generateUniqueKey()}
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 300
                  }}
                  align='left'
                  component="div" >
                  {/* GENERE */}
                  {name.print}
                  </Typography>
              </Link>
            </div>
            ))}
          </div>}



          {/* ALTRI AUTORI */}
          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.altriautori && data.altriautori.length > 0 &&
          <div>
            <Divider 
            sx={{
              marginY: "2rem"
            }}
            />
            <Typography 
            sx={{
              color: theme.palette.primary.main.black,
              fontWeight: 500,
              marginTop: "2rem"
            }}
            component="div" 
            // variant="subtitle2"
            >
              ALTRI AUTORI
            </Typography>
            
            {data.altriautori.map((name) => (
              <div
              key={generateUniqueKey()} >
              <Link 
              key={generateUniqueKey()}
              component="button"
              onClick={() => GoTosearch(name.search.replace(/\s/g, '+'),'all','5','autoreprincipale,autorisecondari','0','_score','desc')}
              underline="hover" 
              >
              <Typography 
              key={generateUniqueKey()}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 300
              }}
              component="div"
              align='left'
              >
              {/* altriautori */}
              {name.print}
            </Typography>
            </Link>
            </div>
            ))}
          </div>}
          
          {/* COLLANA */}
          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.collana && data.collana.length > 0 &&
          <div>
            <Divider 
            sx={{
              marginY: "2rem"
            }}
            />
            <Typography 
            sx={{
              color: theme.palette.primary.black,
              fontWeight: 500,
              marginTop: "2rem"
            }}
            component="div" 
            >
              COLLANA
            </Typography>
            
            {data.collana.map((name) => (
              // tag440,tag490,tag830
              <div
              key={generateUniqueKey()}
              >
              <Link 
              key={generateUniqueKey()}
              component="button"
              onClick={() => GoTosearch(name.search.replace(/\s/g, '+'),'all','5','collana','0','_score','desc')}
              underline="hover" 
              >
              <Typography 
              key={generateUniqueKey()}
              sx={{
                marginRight: '1rem',
                color: theme.palette.primary.main,
                fontWeight: 300
              }}
              component="div"
              align='left'
               >
              {/* collana */}
              {name.print}
            </Typography></Link>
            </div>
            ))}
          </div>}

          
          {/* NOTE */}
          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.note && data.note.length > 0 &&
          <div>
            <Divider 
            sx={{
              marginY: "2rem"
            }}
            />
            <Typography 
            sx={{
              color: theme.palette.primary.black,
              fontWeight: 500,
              marginTop: "2rem"
            }}
            component="div" 
            // variant="subtitle2"
            >
              NOTE
            </Typography>
            
            {data.note.map((name) => (
              <div
              key={generateUniqueKey()}
              >
              <Typography 
              key={name}
              sx={{
                color: theme.palette.primary.black,
                fontWeight: 300
              }}
              component="div" 
              align='left'
              >
              {/* collana */}
              {name}
            </Typography>
            </div>
            ))}
          </div>}

          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.altreinfo && data.altreinfo.length > 0 &&
          <div>
            <Divider 
            sx={{
              marginY: "2rem"
            }}
            />
            <Typography 
            sx={{
              color: theme.palette.primary.black,
              fontWeight: 500,
              marginTop: "2rem"
            }}
            component="div" 
            // variant="subtitle2"
            >
              ALTRE INFORMAZIONI
            </Typography>
            
            {data.altreinfo.map((name) => (
              <div
              key={generateUniqueKey()} >
              <Typography 
              key={name}
              sx={{
                color: theme.palette.primary.black,
                fontWeight: 300
              }}
              component="div" 
              align='left'
              >
              {/* collana */}
              {name}
            </Typography>
            </div>
            ))}

          </div>}





              {!loading && <LoadingSpinner />}
              {error && <p>Errore: {error}</p>}
              {data?.online && data.online.length > 0 &&
              <div>
                <Divider 
                sx={{
                  marginY: "2rem"
                }}
                />
                <Typography 
                sx={{
                  color: theme.palette.primary.black,
                  fontWeight: 500,
                  marginTop: "2rem",
                }}
                component="div" 
                // variant="subtitle2"
                >
                  TESTO ONLINE
                </Typography>
                
                {data.online.map((name) => (
                  <Link key={name['u']} href={name['u']} underline="hover" target="_blank">
                    <Button sx={{
                      marginY: '1rem'
                    }} variant="outlined">
                    <Typography 
                    key={name}
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 300
                    }}
                    component="div" 
                    // variant="body1"
                    >
                    {/* testo online */}
                    {name['z']}
                  </Typography>
                  </Button>
                </Link>
                  
                ))}
              </div>}



              {!loading && <LoadingSpinner />}
              {error && <p>Errore: {error}</p>}
              {data?.richiedi === 1 &&
              <div>
                <Divider 
                sx={{
                  marginY: "2rem"
                }}
                />
                <Typography 
                sx={{
                  color: theme.palette.primary.black,
                  fontWeight: 500,
                  marginTop: "2rem",
                }}
                component="div" 
                // variant="subtitle2"
                >
                  COPIE
                </Typography>
                
                  <Link 
                  href={`https://prestitolibri.unicatt.it/${item}`}
                  underline="hover" 
                  target="_blank">

                    <Button sx={{
                      marginY: '1rem'
                    }} variant="outlined">
                    <Typography 
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 300
                    }}
                    component="div" 
                    // variant="body1"
                    >
                    {/* collana */}
                    Richiedi/Prenota
                  </Typography>
                  </Button>
                </Link>
              </div>
              }

    {/* chiude il blocco sotto copertina/titolo fino a COPIE */}
      </Grid>
  </Grid>


  </Paper>
{/* closing column sx card bibrecord */}
</Grid>


  {/* ################################################### */}
  {/* colonna dx altri titoli */}
  {/* <Grid item xs={12} md={4}>
    <Paper elevation={3}
      sx={{
      padding: '1rem'
      }}
      >
    </Paper>
  </Grid> */}
  
  {/* ################################################### */}

  {/* chiude global grid */}
  </Grid>
  </Box>
</Container>


</Box>
</React.Fragment>
);

}

export default ItemId;