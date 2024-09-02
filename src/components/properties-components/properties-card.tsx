'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled as styledd } from '@mui/material/styles';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';

interface Offer {
    id: number;
    name: string;
    email: string;
    description: string;
    propertyId: number;
  }
  
  interface Property {
    id: number;
    image: string;
    price: number;
    description: string;
    characteristics: string[];
    offers: Offer[];
  }
  
  interface PropertiesProps {
    property: Property;
  }

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }


  const ExpandMore = styledd((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  const Card_Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 2rem 0;
  `;
  const Typography_Details = styled(Typography)`
  margin-top:1rem;
  `;

  const Typography_Property_Text = styled(Typography)`
  word-wrap: break-word;
  `;

  const Typography_Property_Price = styled(Typography)`
  font-size: 1.2rem; /* Larger font size to make the price more prominent */
  font-weight: bold; /* Bold font to emphasize the price */
  text-align: center; /* Center-align the text */
  color: #333; 
  margin-top: 0.5rem; 
  `;
  const Container_Property_Price = styled.div`
  display:flex;
  justify-content:center;
  `;
  const List_Item_Details = styled(ListItem)`
  padding-top:0;
  padding-bottom:0;
  `;
  const CardActions_Button = styled(CardActions)`
  display:flex;
  justify-content:center;
  `;
  const CardContent_Custom = styled(CardContent)`
  padding: 1rem 2rem 0 2rem;
  `;
  const Details_Div = styled.div`
  display:flex;
  `;
  
  export default function Properties_Card({ property }: PropertiesProps) {

    const [expanded, setExpanded] = React.useState(false);
    const router = useRouter();

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleMakeOffer = () => {    
      router.push(`/contact/${property.id}`);
    };


    return (
        <div>
            <Card_Container>
                <Card sx={{ width: 340 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={property.image}
                        title="Property title"
                        />
                    <CardContent_Custom>
                        <Typography_Property_Text variant="body1" color="text.secondary">
                            {property.description }
                        </Typography_Property_Text>
                        <Details_Div>
                            <Typography_Details gutterBottom variant="subtitle1" >
                                Detalhes 
                            </Typography_Details>
                            <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                                <ExpandMoreIcon/>
                            </ExpandMore>
                        </Details_Div>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Typography variant="body2" color="text.secondary" component="div">
                                {property.characteristics.length > 0 && (
                                    <List>      
                                    {property.characteristics.map((characteristic) => (
                                        <List_Item_Details key={characteristic}>
                                        <ListItemText primary={'• '+ characteristic} />
                                    </List_Item_Details>
                                    ))}
                                </List>
                                )}
                            </Typography>
                        </Collapse>
                        <Container_Property_Price>
                          <Typography_Property_Price variant="body1" color="text.secondary">
                              R$: {property.price}
                          </Typography_Property_Price>
                        </Container_Property_Price>
                    </CardContent_Custom>
                    <CardActions_Button>
                        <Button variant="contained" onClick={handleMakeOffer}>
                          Ofertar
                        </Button>       
                    </CardActions_Button>              
                </Card>
            </Card_Container>
        </div>
    )
  }

// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import styled from "styled-components";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import { styled as styledd } from '@mui/material/styles';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import Collapse from '@mui/material/Collapse';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useRouter } from 'next/navigation';

// interface Offer {
//   id: number;
//   name: string;
//   email: string;
//   description: string;
//   propertyId: number;
// }

// interface Property {
//   id: number;
//   image: string;
//   price: number;
//   description: string;
//   characteristics: string[];
//   offers: Offer[];
// }

// interface PropertiesProps {
//   property: Property;
// }

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styledd((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// const Card_Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0 0 2rem 0;
// `;

// const Typography_Details = styled(Typography)`
//   margin-top: 1rem;
// `;

// const Typography_Property_Text = styled(Typography)`
//   word-wrap: break-word;
// `;

// const Typography_Property_Price = styled(Typography)`
//   font-size: 1.2rem;
//   font-weight: bold;
//   text-align: center;
//   color: #333;
//   margin-top: 0.5rem;
// `;

// const Container_Property_Price = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const List_Item_Details = styled(ListItem)`
//   padding-top: 0;
//   padding-bottom: 0;
// `;

// const CardActions_Button = styled(CardActions)`
//   display: flex;
//   justify-content: center;
// `;

// const CardContent_Custom = styled(CardContent)`
//   padding: 1rem 2rem 0 2rem;
// `;

// const Details_Div = styled.div`
//   display: flex;
// `;

// const Properties_Card = React.memo(function Properties_Card({ property }: PropertiesProps) {
//   const [expanded, setExpanded] = React.useState(false);
//   const router = useRouter();

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const handleMakeOffer = () => {
//     router.push(`/contact/${property.id}`);
//   };

//   return (
//     <div>
//       <Card_Container>
//         <Card sx={{ width: 340 }}>
//           <CardMedia
//             sx={{ height: 140 }}
//             image={property.image}
//             title="Property title"
//           />
//           <CardContent_Custom>
//             <Typography_Property_Text variant="body1" color="text.secondary">
//               {property.description}
//             </Typography_Property_Text>
//             <Details_Div>
//               <Typography_Details gutterBottom variant="subtitle1">
//                 Detalhes
//               </Typography_Details>
//               <ExpandMore
//                 expand={expanded}
//                 onClick={handleExpandClick}
//                 aria-expanded={expanded}
//                 aria-label="show more"
//               >
//                 <ExpandMoreIcon />
//               </ExpandMore>
//             </Details_Div>
//             <Collapse in={expanded} timeout="auto" unmountOnExit>
//               <Typography variant="body2" color="text.secondary" component="div">
//                 {property.characteristics.length > 0 && (
//                   <List>
//                     {property.characteristics.map((characteristic) => (
//                       <List_Item_Details key={characteristic}>
//                         <ListItemText primary={'• ' + characteristic} />
//                       </List_Item_Details>
//                     ))}
//                   </List>
//                 )}
//               </Typography>
//             </Collapse>
//             <Container_Property_Price>
//               <Typography_Property_Price variant="body1" color="text.secondary">
//                 R$: {property.price}
//               </Typography_Property_Price>
//             </Container_Property_Price>
//           </CardContent_Custom>
//           <CardActions_Button>
//             <Button variant="contained" onClick={handleMakeOffer}>
//               Ofertar
//             </Button>
//           </CardActions_Button>
//         </Card>
//       </Card_Container>
//     </div>
//   );
// });

// export default Properties_Card;
