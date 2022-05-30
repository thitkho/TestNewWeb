
// Home function that is reflected across the site
export default function Home() {
  return (
    <div>
      <label>Tan dep trai</label>
      <FullApp />
    </div>
  );
}
// test
import React, { forwardRef, useEffect, useState } from "react";
import { 
  createContext, 
  useContext, 
  useMemo, 
  useReducer 
} from "react";

import { 
  BrowserRouter, 
  Route, 
  Routes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"
import { 
  Box, Button, Card, Container, createTheme, CssBaseline, Grid,
  // Link,
  styled, Typography, Switch, Input
  // useTheme
} from "@mui/material";
import MuiLink from "@mui/material/Link";
// @mui material components
import { green } from '@mui/material/colors';
// import Icon from '@mui/material/Icon';
import { PropTypes } from "prop-types";
import chroma from "chroma-js";
// import Favorite from '@mui/icons-material'
// react-router-dom components
import { Link } from "react-router-dom";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
//icon
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import FourKIcon from '@mui/icons-material/FourK';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import Favorite from '@mui/icons-material/Favorite'
//resouces
const bgImage = require("../assets/images/bg-sign-in-basic.jpeg");

export const ChildApp = () => {

  const [UiController] = useUiControl();
  const { darkMode } = UiController;

  console.log("test childApp");
  return(
    <ThemeProvider theme={darkMode?themeDark:themeDefault}>
      <Routes>
        <Route path="*" element={<HomePage />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </ThemeProvider>
  )
}
//full app
const FullApp = () => {
  
  console.log("test Full App")

  return(
    <RootProvider>
        <ChildApp />
    </RootProvider>
    
  )
}


//to test component, color, theme, ...everything
const HomePage = () => {

  const [UiController, dispatch] = useUiControl();
  const { layout, darkMode } = UiController;
  // const { palette, functionT } = useTheme();
  
  // console.log("test pxToRem: ", functionT.pxToRem(10));
  // console.log("test hxToRbg: ", functionT.hxToRgb("#AAAAAA"));
  // console.log("test hexToRbg: ");
  // console.log("")
  // const linear =  functionT.linearGradient("#515", "#ffffff");

  useEffect(()=>{
    setLayout(dispatch, "page")
  },[dispatch]);
  return(
    <Box>
      <Typography>{layout}-{darkMode.toString()}</Typography>
      <Button
        
        sx={{position: 'absolute',zIndex: 5}} 
        color="success">test
      </Button>
      
      <Button 
        variant="contained"
        // color="success"
        // sx={{color:base.primary.main}}
        onClick={()=>{
          dispatch({type: "LAYOUT", value: "value"});
          setDarkMode(dispatch, !darkMode)}}
        >test layout
      </Button>
        <Box
          height={500}
          sx={{
            backgroundImage: `url(${bgImage})`,
          }}>
            
          </Box>
          <Box
            
            sx={{
              boxShadow: 1,
              width: '8rem',
              height: '5rem',
              // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              // color: (theme) =>
              //   theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '700',
            }}
          >
        {/* <Icon>add_circle</Icon>
        <Icon color="primary">add_circle</Icon>
        <Icon sx={{ color: green[500] }}>add_circle</Icon>
        <Icon fontSize="small">add_circle</Icon>
        <Icon sx={{ fontSize: 30 }}>add_circle</Icon> */}
      </Box>
      <Box>
        <Button>test BOx</Button>
        {/* <Favorite/> */}
      </Box>
      <Grid container sx={{ color: 'text.primary' }}>
      <Grid item xs={4}>
        <Typography>Filled</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteIcon />
        <DeleteForeverIcon />
      </Grid>
      <Grid item xs={4}>
        <Typography>Outlined</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteOutlinedIcon />
        <DeleteForeverOutlinedIcon />
      </Grid>
      <Grid item xs={4}>
        <Typography>Rounded</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteRoundedIcon />
        <DeleteForeverRoundedIcon />
      </Grid>
      <Grid item xs={4}>
        <Typography>Two Tone</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteTwoToneIcon />
        <DeleteForeverTwoToneIcon />
      </Grid>
      <Grid item xs={4}>
        <Typography>Sharp</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteSharpIcon />
        <DeleteForeverSharpIcon />
      </Grid>
      <Grid item xs={4}>
        <Typography>Edge-cases</Typography>
      </Grid>
      <Grid item xs={8}>
        <ThreeDRotationIcon />
        <FourKIcon />
        <ThreeSixtyIcon />
      </Grid>
    </Grid>
    </Box>
  )
}

//TTComponent
// super box
const TTBox = forwardRef(
  ({
    variant, bgColor, color, opacity, 
    borderRadius, shadow, coloredShadow, ...rest
  }, ref)=>(
    <BoxStyle
      {...rest}
      ref={ref}
      ownerState={{
        variant, bgColor, color, opacity,
        borderRadius, shadow, coloredShadow
      }}
    />
  )
);
TTBox.defaultProps={
  variant: "contained",
  bgColor: "transparent",
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  shadow: "none",
  coloredShadow: "none",
}
TTBox.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "none",
  ]),
};
const BoxStyle = styled(Box)(({theme, ownerState})=>{
  //TODO
  const { palette, borders, shadows, functionT } = theme;
  const { variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow } = ownerState;
  
  //
  const { gradients, grey, white } = palette;
  const { lnGradient } = functionT;
  const { borderRadius: radius } = borders;
  const { colored } = shadows

  const greyColors = {
    "grey-100": grey[100],
    "grey-200": grey[200],
    "grey-300": grey[300],
    "grey-400": grey[400],
    "grey-500": grey[500],
    "grey-600": grey[600],
    "grey-700": grey[700],
    "grey-800": grey[800],
    "grey-900": grey[900],
  }
  const validBorderRadius = ["xs", "sm", "md", "lg", "xl", "xxl", "section"];
  const validBxShadows =    ["xs", "sm", "md", "lg", "xl", "xxl", "inset"];      //opacityValue
  const validGradients = [
    "primary",    "secondary",    "info",    "success",    "warning",    "error",    "dark",    "light",
  ];
  const validColors = [
    "transparent",    "white",    "black",    "text",
    "primary",    "secondary",    "info",    "success",    "warning",    "error",    "light",    "dark",
    "grey-100",
    "grey-200",
    "grey-300",
    "grey-400",
    "grey-500",
    "grey-600",
    "grey-700",
    "grey-800",
    "grey-900",
  ];

  //opacity value
  let opacityValue = opacity
  //background value
  let backgroundValue = bgColor;
  if(variant === "gradient"){
    backgroundValue = validGradients.find((el)=>el===bgColor)
      ?lnGradient(gradients[bgColor].main, gradients[bgColor].state)
      :white.main;
  }else if(validColors.find((el)=>el === bgColor)){
    backgroundValue = palette[bgColor]?palette[bgColor].main:greyColors[bgColor]
  }else{
    backgroundValue = bgColor;
  }

  //border radius value
  let borderRadiusValue = borderRadius
  if(validBorderRadius.find((el)=>el===borderRadius)){
    borderRadiusValue = radius[borderRadius]
  }
  //color value
  let colorValue = color;
  if(validColors.find((el)=>el===color)){
    colorValue=palette[color]?palette[color].main : greyColors[color];
  }
  //boxShadow value
  let boxShadowValue = "none";
  if(validBxShadows.find((el)=>el===shadow)){
    boxShadowValue = shadows[shadow];
  }else if(coloredShadow){
    boxShadowValue = colored[coloredShadow]?colored[coloredShadow]:"none";
    // console.log("boxShadowValue-coloredShadow:",coloredShadow, boxShadowValue)
  }
  
  return{
    opacity: opacityValue,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
  }
})

const PageLayout = ({background, children}) =>{

  const [, dispatch] = useUiControl();
  const { pathname } = useLocation();
  

  useEffect(() => {
    setLayout(dispatch, "page");
  },[dispatch, pathname]);

  return(
    <TTBox
      width={"100vw"}
      height={"100%"}
      minHeight={"100vh"}           //set min height for component.
      bgColor={background}
      sx={{
        overflowX: "hidden"         //when width of child > parent
      }}    
    >
      {children}
    </TTBox>
  )
}
const BackgroundPage = ({image, children}) => {
  return(
    <TTBox
      // position={"absolute"}
      width="100%"
      minHeight="100vh"
      // opacity = "0.5"
      // zIndex= "-1"
      sx={{
        // backgroundImage: ({functionT:{lnGradient, clToRgba},palette:{gradients}}) => {
        //   return`url(${image})` && image && lnGradient(clToRgba(gradients.dark.main, 0.1),clToRgba(gradients.dark.state, 0.6))
        // },
        backgroundImage: ({functionT:{lnGradient, clToRgba}, palette: {gradients}})=>
        image && `${lnGradient(clToRgba(gradients.dark.main, 0.1),clToRgba(gradients.dark.state, 0.6))}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </TTBox>
  )
}
const ContentPage = ({content}) => {
  return(
    <TTBox
      width={"100%"} height={"100vh"}
      px={1} mx="auto"
    >
      <Grid container spacing={1} justifyContent="center" alignItems={"center"} height="100%">
        <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
          {content}
        </Grid>
      </Grid>
    </TTBox>
  )
}
const FooterSign = ({light}) => {

  const {size} = myText;

  return(
    <TTBox
      position={"absoulte"} 
      width={"100%"} 
      bottom={500} 
      py={4}
    >
      <Container>
        {/* intro */}
        {/* <TTBox 
          width={"100%"}
          display="flex"
          flexDirection={{xs: "column", sm:"row"}}
          justifyContent="space-between"
          px={1.5}
          >
          <TTBox>
            <Typography>&copy; {new Date().getFullYear()}, made width</Typography>
          </TTBox>
          <TTBox>
            <Favorite />
            <Icon color="primary">add_circle</Icon>
            <Icon color="inherit" fontSize="inherit"> favorite</Icon>
          </TTBox>

          <Typography>by</Typography>
          <Link>
            <Typography>&nbsp;Tan Tan&nbsp;</Typography>
          </Link>
          <Typography>for a better web.</Typography>
        </TTBox> */}
        {/* link */}
        {/* <TTBox
          bgColor={"blue"}
          component="ul"
          sx={({breakpoints})=>({
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            listStyle: "none",
            mt: 3,
            mb: 0,
            p: 0,
            [breakpoints.up("lg")]: {
              mt: 0,
            },
          })}
        >
          <TTBox>
            <Link>
              <Typography>Thanh Tan</Typography>
            </Link>
          </TTBox>
          <TTBox>
            <Link>
              <Typography>About Us</Typography>
            </Link>
          </TTBox>
          <TTBox>
            <Link>
              <Typography>Blog</Typography>
            </Link>
          </TTBox>
          <TTBox>
            <Link>
              <Typography>License</Typography>
            </Link>
          </TTBox>
        </TTBox> */}
      </Container>
    </TTBox>
  )
}
// FooterSign.defaultProps = {
//   light: false,
// }
// FooterSign.propTypes={
//   light: PropTypes.bool,
// }
const DefaultNavbar = () => {

  return(
    <TTBox
      position={"absolute"}
      bgColor={"grey-400"}
      top={10}
    >
      <Typography>tan dep trai</Typography>
    </TTBox>
  )
}
const BasicLayout = ({
  bgImage, children,
  DefaultNavbar,
  BackgroundPage,
  ContentPage,
  Footer
}) => {
  return(
    <PageLayout>
      {/* DefaultNavbar */}
      <DefaultNavbar />
      {/* BackGroundImage */}
      <BackgroundPage image={bgImage}/>

      {/* Content */}
      {/* <ContentPage content={children}/> */}

      {/* Footer */}
      <Footer light={false}/>
    </PageLayout>
  )
}

//
const SignUp = ({image, children}) => {

  return(
    <Box>
      <Basic />
    </Box>
  )
}
const SignIn = () => {
  return(
    <BasicLayout 
      bgImage={bgImage}
      DefaultNavbar={DefaultNavbar}
      BackgroundPage={BackgroundPage}
      ContentPage={ContentPage}
      Footer={FooterSign}
      >
      <Card>
        {/* //area icon */}
        <TTBox
          //theme of config
          bgColor="info"
          variant="gradient"
          borderRadius="lg"
          coloredShadow="info"
          // color="info"
          //mui of config
          mx={2} mt={-3} mb={1}
          p={2} 
          textAlign="center"
        >
          <Typography color={"yellow"} variant="h2">SignIn</Typography>
          <Grid container>
            <Grid item xs={2}>Icon</Grid>
            <Grid item>Icon</Grid>
            <Grid item>Icon</Grid>
          </Grid>
        </TTBox>
        {/* /area form register/ */}
        <TTBox
        >
          <Typography color={"yellow"} variant="h2">SignIn</Typography>
          <Grid container>
            <Grid item xs={2}>Icon</Grid>
            <Grid item xs={2}>Icon</Grid>
            <Grid item xs={2}>Icon</Grid>
          </Grid>
        </TTBox>
      </Card>
    </BasicLayout>
  )
}
function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <TTBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </Typography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <Typography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </Typography>
            </Grid>
          </Grid>
        </TTBox>
        <TTBox pt={4} pb={3} px={3}>
          <TTBox component="form" role="form">
            <TTBox mb={2}>
              <Input type="email" label="Email" fullWidth />
            </TTBox>
            <TTBox mb={2}>
              <Input type="password" label="Password" fullWidth />
            </TTBox>
            <TTBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </Typography>
            </TTBox>
            <TTBox mt={4} mb={1}>
              <Button variant="gradient" color="info" fullWidth>
                sign in
              </Button>
            </TTBox>
            <TTBox mt={3} mb={1} textAlign="center">
              <Typography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <Typography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </Typography>
              </Typography>
            </TTBox>
          </TTBox>
        </TTBox>
      </Card>
    </BasicLayout>
  );
}
//root provider
const RootProvider = ({children}) => {
  console.log("test RootProvide");
  return(
    <BrowserRouter>
      <UiProvider>
        <CssBaseline/>
        {children}
      </UiProvider>
    </BrowserRouter>
  )
}
//theme
const myColors = {

  //common color
  //common:{
    background: {
      default: "#f0f2f5",
    },
  
    text: {
      main: "#7b809a",
      focus: "#7b809a",
    },
  
    transparent: {
      main: "transparent",
    },
  
    white: {
      main: "#ffffff",
      focus: "#ffffff",
    },
  
    black: {
      light: "#000000",
      main: "#000000",
      focus: "#000000",
    },
  //},
  
  //clone sx of material color
  //base:{
    primary: {
      main: "#e91e63",
      focus: "#e91e63",
    },
  
    secondary: {
      main: "#7b809a",
      focus: "#8f93a9",
    },
  
    info: {
      main: "#1A73E8",
      focus: "#1662C4",
    },
  
    success: {
      main: "#4CAF50",
      focus: "#67bb6a",
    },
  
    warning: {
      main: "#fb8c00",
      focus: "#fc9d26",
    },
  
    error: {
      main: "#F44335",
      focus: "#f65f53",
    },
  
    light: {
      main: "#f0f2f5",
      focus: "#f0f2f5",
    },
  
    dark: {
      main: "#344767",
      focus: "#2c3c58",
    },
    grey: {
      100: "#f8f9fa",
      200: "#f0f2f5",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#6c757d",
      700: "#495057",
      800: "#343a40",
      900: "#212529",
    },
  //},

  //advances
  gradients: {
    primary: {
      main: "#EC407A",
      state: "#D81B60",
    },

    secondary: {
      main: "#747b8a",
      state: "#495361",
    },

    info: {
      main: "#49a3f1",
      state: "#1A73E8",
    },

    success: {
      main: "#66BB6A",
      state: "#43A047",
    },

    warning: {
      main: "#FFA726",
      state: "#FB8C00",
    },

    error: {
      main: "#EF5350",
      state: "#E53935",
    },

    light: {
      main: "#EBEFF4",
      state: "#CED4DA",
    },

    dark: {
      main: "#42424a",
      state: "#191919",
    },
  },

  //SNS 
  socialMediaColors: {
    facebook: {
      main: "#3b5998",
      dark: "#344e86",
    },

    twitter: {
      main: "#55acee",
      dark: "#3ea1ec",
    },

    instagram: {
      main: "#125688",
      dark: "#0e456d",
    },

    linkedin: {
      main: "#0077b5",
      dark: "#00669c",
    },

    pinterEst: {
      main: "#cc2127",
      dark: "#b21d22",
    },

    youtube: {
      main: "#e52d27",
      dark: "#d41f1a",
    },

    vimeo: {
      main: "#1ab7ea",
      dark: "#13a3d2",
    },

    slack: {
      main: "#3aaf85",
      dark: "#329874",
    },

    dribble: {
      main: "#ea4c89",
      dark: "#e73177",
    },

    github: {
      main: "#24292e",
      dark: "#171a1d",
    },

    reddit: {
      main: "#ff4500",
      dark: "#e03d00",
    },

    tumblr: {
      main: "#35465c",
      dark: "#2a3749",
    },
  },

  //archive
  badgeColors: {
    primary: {
      background: "#f8b3ca",
      text: "#cc084b",
    },

    secondary: {
      background: "#d7d9e1",
      text: "#6c757d",
    },

    info: {
      background: "#aecef7",
      text: "#095bc6",
    },

    success: {
      background: "#bce2be",
      text: "#339537",
    },

    warning: {
      background: "#ffd59f",
      text: "#c87000",
    },

    error: {
      background: "#fcd3d0",
      text: "#f61200",
    },

    light: {
      background: "#ffffff",
      text: "#c7d3de",
    },

    dark: {
      background: "#8097bf",
      text: "#1e2e4a",
    },
  },

  //
  coloredShadows: {
    primary: "#e91e62",
    secondary: "#110e0e",
    info: "#00bbd4",
    success: "#4caf4f",
    warning: "#ff9900",
    error: "#f44336",
    light: "#adb5bd",
    dark: "#404040",
  },

  //colors of component
  //element:{
    inputBorderColor: "#d2d6da",

    tabs: {
      indicator: { bxShadow: "#ddd" },
    },
  //}
}

//
const myPoint = {
  device: {
    mobile: 0,
    tablet: 640,
    laptop: 1024,
    desktop: 1200,
  },
  common:{
    xs: 384,    //16*16: 6*4*16   extra-small: 
    sm: 576,    //36*16: 6*6*16   small
    md: 768,    //48*16: 6*8*16   medium
    lg: 992,    //60*16: 6*10*16  large
    xl: 1200,   //72*16: 6*12*16  extra-large
    xxl: 1408,  //84*16: 6*14*16  
  },
  size: {
    xs: 0,      //0*36  
    sm: 576,    //36*16
    md: 768,    //48*16
    lg: 992,    //62*16
    xl: 1200,   //75*16
    xxl: 1408,  //88*16
  },
}
const pxToRem = (number, baseNumber=16)=>{return `${number/baseNumber}rem`}
const hxToRgb = (color) => {
  return chroma(color).rgb().join(", ");
}
const lnGradient = (color, colorState, angle = 195)=>{ 
  // console.log(`linear-gradient(${angle}deg, ${color}, ${colorState})`)
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`
}
const clToRgba = (color, opacity)=>{
  // console.log(`rgba(${hxToRgb(color)}, ${opacity})`);
  
  return `rgba(${hxToRgb(color)}, ${opacity})`
}

const bxShadow = (offset=[], radius=[], color, opacity, inset)=>{
  const [x, y] = offset;
  const [blur, spread] = radius;
  return `${inset} ${x/16}rem ${y/16}rem ${blur/16}rem ${spread/16}rem ${clToRgba(color, opacity)}`
}
// function of theme
const myFunction = {
  //pxToRem: (number, baseNumber=16)=>{return `${number/baseNumber}rem`},    //convert a px unit into a rem uint
  pxToRem,
  //hxToRgb: (colorStr) => {return hexToRgb(colorStr)},     //helps you to change the hex color code to rgb
  hxToRgb,
  //lnGradient: (color, colorState, angle = 195)=>{ return `linear-gradient(${angle}deg, ${color}, ${colorState})`},   //function helps you to create a linear gradient color background
  lnGradient,
  //clToRgba:(color, opacity)=>{return `rgba(${hexToRgb(color)}), ${opacity}`},
  clToRgba,
  //bxShadow: bxShadow
  bxShadow,
}
//border theme
const { grey } = myColors;
const myBorders = {
  borderColor: grey[300],

  borderWidth: {
    0: 0,
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },

  borderRadius: {
    xs: pxToRem(1.6),
    sm: pxToRem(2),
    md: pxToRem(6),
    lg: pxToRem(8),
    xl: pxToRem(12),
    xxl: pxToRem(16),
    section: pxToRem(160),
  },
}

// shadow of theme
const { black, white, tabs, coloredShadows } = myColors;
const myShadow = {
  xs: bxShadow([0, 2], [9, -5], black.main, 0.15),
  sm: bxShadow([0, 5], [10, 0], black.main, 0.12),
  md: `${bxShadow([0, 4], [6, -1], black.main, 0.1)}, 
       ${bxShadow([0, 2], [4, -1], black.main, 0.06)}`,
  lg: `${bxShadow([0,10], [15,-3], black.main, 0.1)}, 
       ${bxShadow([0, 4], [6, -2], black.main, 0.05 )}`,
  xl: `${bxShadow([0,20], [25,-5], black.main, 0.1)}, 
       ${bxShadow([0,10], [10,-5], black.main, 0.04)}`,
  xxl: bxShadow([0, 20], [27, 0], black.main, 0.05),
  inset: bxShadow([0, 1], [2, 0], black.main, 0.075, "inset"),
  colored: {
    primary:   `${bxShadow([0, 4], [20, 0], black.main, 0.14)}, 
                ${bxShadow([0, 7], [10, -5],coloredShadows.primary,0.4)}`,
    secondary: `${bxShadow([0, 4], [20, 0], black.main, 0.14)}, 
                ${bxShadow([0, 7], [10, -5],  coloredShadows.secondary, 0.4 )}`,
    info:      `${bxShadow([0, 4], [20, 0], black.main, 0.14, "")}, 
                ${bxShadow([0, 7], [10, -5],  coloredShadows.info, 0.4 , "")}`,
    success:   `${bxShadow([0, 4], [20, 0], black.main, 0.14)}, 
                ${bxShadow([0, 7], [10, -5],  coloredShadows.success, 0.4 )}`,
    warning:   `${bxShadow([0, 4], [20, 0], black.main, 0.14)}, 
                ${bxShadow([0, 7], [10, -5],  coloredShadows.warning, 0.4 )}`,
    error:     `${bxShadow([0, 4], [20, 0], black.main, 0.14)}, 
                ${bxShadow([0, 7], [10, -5],  coloredShadows.error, 0.4 )}`,
    light:     `${bxShadow([0, 4], [20, 0], black.main, 0.14)}, 
                ${bxShadow([0, 7], [10, -5],  coloredShadows.light, 0.4 )}`,
    dark:      `${bxShadow([0, 4], [20, 0], black.main, 0.14)}, 
                ${bxShadow([0, 7], [10, -5],  coloredShadows.dark, 0.4 )}`,
  },
  navbarBxShadow: `${bxShadow([0, 0], [1, 1], white.main, 0.9, "inset")}, 
                   ${bxShadow([0, 20],[27, 0], black.main, 0.05 )}`,
  sliderBxShadow: {
    thumb: bxShadow([0, 1], [13, 0], black.main, 0.2),
  },
  tabsbxShadow: {
    indicator: bxShadow([0, 1], [5, 1], tabs.indicator.bxShadow, 1),
  },
}
// text of theme
const { dark } = myColors;
const baseProperties = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLighter: 100,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  fontSizeXXS: pxToRem(10.4),
  fontSizeXS: pxToRem(12),
  fontSizeSM: pxToRem(14),
  fontSizeMD: pxToRem(16),
  fontSizeLG: pxToRem(18),
  fontSizeXL: pxToRem(20),
  fontSize2XL: pxToRem(24),
  fontSize3XL: pxToRem(30),
}
const baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightBold,
}
const baseDisplayProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightLight,
  lineHeight: 1.2,
}
const myText = {

  //base
  fontFamily: baseProperties.fontFamily,
  fontWeightLighter: baseProperties.fontWeightLighter,
  fontWeightLight: baseProperties.fontWeightLight,
  fontWeightRegular: baseProperties.fontWeightRegular,
  fontWeightMedium: baseProperties.fontWeightMedium,
  fontWeightBold: baseProperties.fontWeightBold,

  //html component
  h1: {
    fontSize: pxToRem(48),
    lineHeight: 1.25,
    ...baseHeadingProperties,
  },

  h2: {
    fontSize: pxToRem(36),
    lineHeight: 1.3,
    ...baseHeadingProperties,
  },

  h3: {
    fontSize: pxToRem(30),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h4: {
    fontSize: pxToRem(24),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h5: {
    fontSize: pxToRem(20),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h6: {
    fontSize: pxToRem(16),
    lineHeight: 1.625,
    ...baseHeadingProperties,
  },

  //material
  subtitle1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.625,
  },

  subtitle2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.6,
  },

  body1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.625,
  },

  body2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.6,
  },

  button: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeSM,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.5,
    textTransform: "uppercase",
  },

  caption: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXS,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.25,
  },

  overline: {
    fontFamily: baseProperties.fontFamily,
  },

  // display me
  d1: {
    fontSize: pxToRem(80),
    ...baseDisplayProperties,
  },

  d2: {
    fontSize: pxToRem(72),
    ...baseDisplayProperties,
  },

  d3: {
    fontSize: pxToRem(64),
    ...baseDisplayProperties,
  },

  d4: {
    fontSize: pxToRem(56),
    ...baseDisplayProperties,
  },

  d5: {
    fontSize: pxToRem(48),
    ...baseDisplayProperties,
  },

  d6: {
    fontSize: pxToRem(40),
    ...baseDisplayProperties,
  },

  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL,
    "2xl": baseProperties.fontSize2XL,
    "3xl": baseProperties.fontSize3XL,
  },

  lineHeight: {
    sm: 1.25,
    md: 1.5,
    lg: 2,
  },
}

//overide style component of theme
const myComponent = {
  
}

//container component
const { size: {sm, md, lg, xl, xxl} } = myPoint;
const SM = `@media (min-width: ${sm}px)`;
const MD = `@media (min-width: ${md}px)`;
const LG = `@media (min-width: ${lg}px)`;
const XL = `@media (min-width: ${xl}px)`;
const XXL = `@media (min-width: ${xxl}px)`;
const sharedClasses = {
  paddingRight: `${pxToRem(24)} !important`,
  paddingLeft: `${pxToRem(24)} !important`,
  marginRight: "auto !important",
  marginLeft: "auto !important",
  width: "100% !important",
  position: "relative",
}
const container = {
  [SM]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "540px !important",
    },
  },
  [MD]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "720px !important",
    },
  },
  [LG]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "960px !important",
    },
  },
  [XL]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "1140px !important",
    },
  },
  [XXL]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "1320px !important",
    },
  },
}

//global styleOverrides for html
//TODO: 
const { info } = myColors;
const myGlobals = {
  html: { scrollBehavior: "smooth"},
  "*, *::before, *::after":{ margin: 0, padding: 0},
  "a, a:link, a:visited":{ textDecoration: "none !important"},
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited":{
    color: `${dark.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.main} !important`,
  },
}

//theme default - light
const themeDefault = createTheme({
  palette:{...myColors},      //palette
  breakpoints:{...myPoint},   //breakpoint
  functionT:{...myFunction},  //function
  shadows:{...myShadow, "1":1},      //shadow
  components:{...myComponent,
    MuiCssBaseline: {
      styleOverrides: {
        ...myGlobals,
        ...container,
      }
    }
  }, //components
  borders:{...myBorders},
  typography:{...myText},
});
const themeDark = createTheme({
  ...myColors,      //palatte
  ...myPoint,       //breakpoint
  ...myFunction,    //function
  ...myShadow,      //shadow
});
// const themeGlass = createTheme({});

//uiContext
const UiContext = createContext();
UiContext.displayName = "UiController";
const UI_CONSTANT = {
  LAYOUT: "LAYOUT",
  DARK_MODE: "DARK_MODE"
}
const UiReducer = (state, action) => {
  switch(action.type){
    case UI_CONSTANT.LAYOUT: return{...state, layout: action.value};
    case UI_CONSTANT.DARK_MODE: return{...state, darkMode: action.value};
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
const UiProvider = ({children}) => {

  const UiInit = {
    layout: "dashboard",
    darkMode: false,
  }
  const [UiController, dispatch] = useReducer(UiReducer, UiInit)
  const value = useMemo(()=>[UiController, dispatch],[UiController, dispatch])
  return(
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  )
}
//hook ui
const useUiControl = () => {
  const context = useContext(UiContext);
  
  if (!context) {
    throw new Error(
      "useUiControl should be used inside the UiProvider."
    );
  }
  return context;
}
const setLayout = (dispatch, value) => dispatch({ type: UI_CONSTANT.LAYOUT, value });
const setDarkMode = (dispatch, value) => dispatch({type: UI_CONSTANT.DARK_MODE, value})
//export default FullApp;

import { 
  createContext, 
  useContext, 
  useMemo, 
  useReducer,
  useState,
  useEffect,
  forwardRef,
} from "react";

import { 
  BrowserRouter, 
  Route, 
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
// @mui material components
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles"
import Icon from "@mui/material/Icon";
import { 
  Box, Button, Card, CssBaseline, Grid,
  // Link,
  styled, Typography, Switch, Input
  // useTheme
} from "@mui/material";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
// chroma-js is a library for all kinds of color conversions and color scales.
import chroma from "chroma-js";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
//resouces
const bgImage = require("../assets/images/bg-sign-in-basic.jpeg");
const Home = () => {
  console.log("home")
  return(
    <Box>Home</Box>
  )
}
const BoxStyle = styled(Box)(({ theme, ownerState }) => {
  const { palette, functions, borders, boxShadows } = theme;
  const { variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow } = ownerState;

  const { gradients, grey, white } = palette;
  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  const { colored } = boxShadows;

  const greyColors = {
    "grey-100": grey[100],
    "grey-200": grey[200],
    "grey-300": grey[300],
    "grey-400": grey[400],
    "grey-500": grey[500],
    "grey-600": grey[600],
    "grey-700": grey[700],
    "grey-800": grey[800],
    "grey-900": grey[900],
  };

  const validGradients = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ];

  const validColors = [
    "transparent",
    "white",
    "black",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "grey-100",
    "grey-200",
    "grey-300",
    "grey-400",
    "grey-500",
    "grey-600",
    "grey-700",
    "grey-800",
    "grey-900",
  ];

  const validBorderRadius = ["xs", "sm", "md", "lg", "xl", "xxl", "section"];
  const validBoxShadows = ["xs", "sm", "md", "lg", "xl", "xxl", "inset"];

  // background value
  let backgroundValue = bgColor;

  if (variant === "gradient") {
    backgroundValue = validGradients.find((el) => el === bgColor)
      ? linearGradient(gradients[bgColor].main, gradients[bgColor].state)
      : white.main;
  } else if (validColors.find((el) => el === bgColor)) {
    backgroundValue = palette[bgColor] ? palette[bgColor].main : greyColors[bgColor];
  } else {
    backgroundValue = bgColor;
  }

  // color value
  let colorValue = color;

  if (validColors.find((el) => el === color)) {
    colorValue = palette[color] ? palette[color].main : greyColors[color];
  }

  // borderRadius value
  let borderRadiusValue = borderRadius;

  if (validBorderRadius.find((el) => el === borderRadius)) {
    borderRadiusValue = radius[borderRadius];
  }

  // boxShadow value
  let boxShadowValue = "none";

  if (validBoxShadows.find((el) => el === shadow)) {
    boxShadowValue = boxShadows[shadow];
  } else if (coloredShadow) {
    boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : "none";
  }

  return {
    opacity,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
  };
});
const TTBox = forwardRef(
  ({ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow, ...rest }, ref) => (
    <BoxStyle
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);

// Setting default values for the props of TTBox
TTBox.defaultProps = {
  variant: "contained",
  bgColor: "transparent",
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  shadow: "none",
  coloredShadow: "none",
};

// Typechecking props for the TTBox
TTBox.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "none",
  ]),
};

function PageLayout({ background, children }) {

  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  console.log("pageLayout");

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);

  return (
    <TTBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </TTBox>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};
function Footer({ light }) {
  const { size } = typography;

  return (
    <TTBox position="absolute" width="100%" bottom={0} py={4}>
      <Container>
        <TTBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <TTBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "white" : "text"}
            fontSize={size.sm}
          >
            &copy; {new Date().getFullYear()}, made with
            <TTBox fontSize={size.md} color={light ? "white" : "dark"} mb={-0.5} mx={0.25}>
              <Icon color="inherit" fontSize="inherit">
                favorite
              </Icon>
            </TTBox>
            by
            <Link href="https://www.creative-tim.com/" target="_blank">
              <Typography variant="button" fontWeight="medium" color={light ? "white" : "dark"}>
                &nbsp;Creative Tim&nbsp;
              </Typography>
            </Link>
            for a better web.
          </TTBox>
          <TTBox
            component="ul"
            sx={({ breakpoints }) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
            <TTBox component="li" pr={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/" target="_blank">
                <Typography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Creative Tim
                </Typography>
              </Link>
            </TTBox>
            <TTBox component="li" px={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/presentation" target="_blank">
                <Typography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  About Us
                </Typography>
              </Link>
            </TTBox>
            <TTBox component="li" px={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/blog" target="_blank">
                <Typography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Blog
                </Typography>
              </Link>
            </TTBox>
            <TTBox component="li" pl={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/license" target="_blank">
                <Typography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  License
                </Typography>
              </Link>
            </TTBox>
          </TTBox>
        </TTBox>
      </Container>
    </TTBox>
  );
}

// Setting default props for the Footer
Footer.defaultProps = {
  light: false,
};

// Typechecking props for the Footer
Footer.propTypes = {
  light: PropTypes.bool,
};
function BasicLayout({ image, children }) {

  console.log("Basic layout");
  return (
    <PageLayout>
      {/* <DefaultNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/material-dashboard-react",
          label: "free download",
          color: "dark",
        }}
      /> */}
      <TTBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <TTBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </TTBox>
      <Footer light />
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
const SignIn = () => {

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <TTBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </Typography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              {/* <Typography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </Typography> */}
            </Grid>
            <Grid item xs={2}>
              {/* <Typography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </Typography> */}
            </Grid>
            <Grid item xs={2}>
              {/* <Typography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </Typography> */}
            </Grid>
          </Grid>
        </TTBox>
        <TTBox pt={4} pb={3} px={3}>
          <TTBox component="form" role="form">
            <TTBox mb={2}>
              {/* <MDInput type="email" label="Email" fullWidth /> */}
            </TTBox>
            <TTBox mb={2}>
              {/* <MDInput type="password" label="Password" fullWidth /> */}
            </TTBox>
            <TTBox display="flex" alignItems="center" ml={-1}>
              {/* <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </Typography> */}
            </TTBox>
            <TTBox mt={4} mb={1}>
              {/* <MDButton variant="gradient" color="info" fullWidth> */}
                sign in
              {/* </MDButton> */}
            </TTBox>
            <TTBox mt={3} mb={1} textAlign="center">
              <Typography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <Typography
                  // component={Link}
                  // to="/authentication/sign-up"
                  // variant="button"
                  // color="info"
                  // fontWeight="medium"
                  // textGradient
                >
                  Sign up
                </Typography>
              </Typography>
            </TTBox>
          </TTBox>
        </TTBox>
      </Card>
    </BasicLayout>
  );
}
const SignUp = () => {
  return(<TTBox>SignUp</TTBox>)
}
const Profile = () => {
  return(
    <TTBox>Profile</TTBox>
  )
}
const Notifications = () => {
  return(
    <TTBox>Notifications</TTBox>
  )
}
const Tables = () => {
  return(
    <TTBox>Tables</TTBox>
  )
}
const Dashboard = () => {
  return(
    <TTBox>
      Dashboard
    </TTBox>
  )
}
const ChildApp = () => {

  console.log("child app")
  return(
    // direction === "rtl" ? (
    //   <CacheProvider value={rtlCache}>
    //     <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
    //       <CssBaseline />
    //       {layout === "dashboard" && (
    //         <>
    //           <Sidenav
    //             color={sidenavColor}
    //             brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
    //             brandName="Material Dashboard 2"
    //             routes={routes}
    //             onMouseEnter={handleOnMouseEnter}
    //             onMouseLeave={handleOnMouseLeave}
    //           />
    //           <Configurator />
    //           {configsButton}
    //         </>
    //       )}
    //       {layout === "vr" && <Configurator />}
    //       <Routes>
    //         {getRoutes(routes)}
    //         <Route path="*" element={<Navigate to="/dashboard" />} />
    //       </Routes>
    //     </ThemeProvider>
    //   </CacheProvider>
    // ) : (
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        {/* {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Material Dashboard 2"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />} */}
        <Routes>
          {/* {getRoutes(routes)} */}
          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
          <Route path="*" element={<Home />}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </ThemeProvider>
  )
}
const FullAppUi = () => {
  console.log("full app")
  return(
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <ChildApp />
      </MaterialUIControllerProvider>
  </BrowserRouter>
  )

}
// Material context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

// Theme
const colors = {
  background: {
    default: "#f0f2f5",
  },

  text: {
    main: "#7b809a",
    focus: "#7b809a",
  },

  transparent: {
    main: "transparent",
  },

  white: {
    main: "#ffffff",
    focus: "#ffffff",
  },

  black: {
    light: "#000000",
    main: "#000000",
    focus: "#000000",
  },

  primary: {
    main: "#e91e63",
    focus: "#e91e63",
  },

  secondary: {
    main: "#7b809a",
    focus: "#8f93a9",
  },

  info: {
    main: "#1A73E8",
    focus: "#1662C4",
  },

  success: {
    main: "#4CAF50",
    focus: "#67bb6a",
  },

  warning: {
    main: "#fb8c00",
    focus: "#fc9d26",
  },

  error: {
    main: "#F44335",
    focus: "#f65f53",
  },

  light: {
    main: "#f0f2f5",
    focus: "#f0f2f5",
  },

  dark: {
    main: "#344767",
    focus: "#2c3c58",
  },

  grey: {
    100: "#f8f9fa",
    200: "#f0f2f5",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },

  gradients: {
    primary: {
      main: "#EC407A",
      state: "#D81B60",
    },

    secondary: {
      main: "#747b8a",
      state: "#495361",
    },

    info: {
      main: "#49a3f1",
      state: "#1A73E8",
    },

    success: {
      main: "#66BB6A",
      state: "#43A047",
    },

    warning: {
      main: "#FFA726",
      state: "#FB8C00",
    },

    error: {
      main: "#EF5350",
      state: "#E53935",
    },

    light: {
      main: "#EBEFF4",
      state: "#CED4DA",
    },

    dark: {
      main: "#42424a",
      state: "#191919",
    },
  },

  socialMediaColors: {
    facebook: {
      main: "#3b5998",
      dark: "#344e86",
    },

    twitter: {
      main: "#55acee",
      dark: "#3ea1ec",
    },

    instagram: {
      main: "#125688",
      dark: "#0e456d",
    },

    linkedin: {
      main: "#0077b5",
      dark: "#00669c",
    },

    pinterest: {
      main: "#cc2127",
      dark: "#b21d22",
    },

    youtube: {
      main: "#e52d27",
      dark: "#d41f1a",
    },

    vimeo: {
      main: "#1ab7ea",
      dark: "#13a3d2",
    },

    slack: {
      main: "#3aaf85",
      dark: "#329874",
    },

    dribbble: {
      main: "#ea4c89",
      dark: "#e73177",
    },

    github: {
      main: "#24292e",
      dark: "#171a1d",
    },

    reddit: {
      main: "#ff4500",
      dark: "#e03d00",
    },

    tumblr: {
      main: "#35465c",
      dark: "#2a3749",
    },
  },

  badgeColors: {
    primary: {
      background: "#f8b3ca",
      text: "#cc084b",
    },

    secondary: {
      background: "#d7d9e1",
      text: "#6c757d",
    },

    info: {
      background: "#aecef7",
      text: "#095bc6",
    },

    success: {
      background: "#bce2be",
      text: "#339537",
    },

    warning: {
      background: "#ffd59f",
      text: "#c87000",
    },

    error: {
      background: "#fcd3d0",
      text: "#f61200",
    },

    light: {
      background: "#ffffff",
      text: "#c7d3de",
    },

    dark: {
      background: "#8097bf",
      text: "#1e2e4a",
    },
  },

  coloredShadows: {
    primary: "#e91e62",
    secondary: "#110e0e",
    info: "#00bbd4",
    success: "#4caf4f",
    warning: "#ff9900",
    error: "#f44336",
    light: "#adb5bd",
    dark: "#404040",
  },

  inputBorderColor: "#d2d6da",

  tabs: {
    indicator: { boxShadow: "#ddd" },
  },
};
const { grey } = colors;
const borders = {
  borderColor: grey[300],

  borderWidth: {
    0: 0,
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },

  borderRadius: {
    xs: pxToRem(1.6),
    sm: pxToRem(2),
    md: pxToRem(6),
    lg: pxToRem(8),
    xl: pxToRem(12),
    xxl: pxToRem(16),
    section: pxToRem(160),
  },
};
const { black, white, tabs, coloredShadows } = colors;

const boxShadows = {
  xs: boxShadow([0, 2], [9, -5], black.main, 0.15),
  sm: boxShadow([0, 5], [10, 0], black.main, 0.12),
  md: `${boxShadow([0, 4], [6, -1], black.main, 0.1)}, ${boxShadow(
    [0, 2],
    [4, -1],
    black.main,
    0.06
  )}`,
  lg: `${boxShadow([0, 10], [15, -3], black.main, 0.1)}, ${boxShadow(
    [0, 4],
    [6, -2],
    black.main,
    0.05
  )}`,
  xl: `${boxShadow([0, 20], [25, -5], black.main, 0.1)}, ${boxShadow(
    [0, 10],
    [10, -5],
    black.main,
    0.04
  )}`,
  xxl: boxShadow([0, 20], [27, 0], black.main, 0.05),
  inset: boxShadow([0, 1], [2, 0], black.main, 0.075, "inset"),
  colored: {
    primary: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.primary,
      0.4
    )}`,
    secondary: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.secondary,
      0.4
    )}`,
    info: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.info,
      0.4
    )}`,
    success: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.success,
      0.4
    )}`,
    warning: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.warning,
      0.4
    )}`,
    error: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.error,
      0.4
    )}`,
    light: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.light,
      0.4
    )}`,
    dark: `${boxShadow([0, 4], [20, 0], black.main, 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      coloredShadows.dark,
      0.4
    )}`,
  },

  navbarBoxShadow: `${boxShadow([0, 0], [1, 1], white.main, 0.9, "inset")}, ${boxShadow(
    [0, 20],
    [27, 0],
    black.main,
    0.05
  )}`,
  sliderBoxShadow: {
    thumb: boxShadow([0, 1], [13, 0], black.main, 0.2),
  },
  tabsBoxShadow: {
    indicator: boxShadow([0, 1], [5, 1], tabs.indicator.boxShadow, 1),
  },
};
const breakpoints = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
};

const { info, dark } = colors;

const globals = {
  html: {
    scrollBehavior: "smooth",
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${dark.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.main} !important`,
  },
};
// const { dark } = colors;

const baseProperties = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLighter: 100,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  fontSizeXXS: pxToRem(10.4),
  fontSizeXS: pxToRem(12),
  fontSizeSM: pxToRem(14),
  fontSizeMD: pxToRem(16),
  fontSizeLG: pxToRem(18),
  fontSizeXL: pxToRem(20),
  fontSize2XL: pxToRem(24),
  fontSize3XL: pxToRem(30),
};

const baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightBold,
};

const baseDisplayProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightLight,
  lineHeight: 1.2,
};

const typography = {
  fontFamily: baseProperties.fontFamily,
  fontWeightLighter: baseProperties.fontWeightLighter,
  fontWeightLight: baseProperties.fontWeightLight,
  fontWeightRegular: baseProperties.fontWeightRegular,
  fontWeightMedium: baseProperties.fontWeightMedium,
  fontWeightBold: baseProperties.fontWeightBold,

  h1: {
    fontSize: pxToRem(48),
    lineHeight: 1.25,
    ...baseHeadingProperties,
  },

  h2: {
    fontSize: pxToRem(36),
    lineHeight: 1.3,
    ...baseHeadingProperties,
  },

  h3: {
    fontSize: pxToRem(30),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h4: {
    fontSize: pxToRem(24),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h5: {
    fontSize: pxToRem(20),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h6: {
    fontSize: pxToRem(16),
    lineHeight: 1.625,
    ...baseHeadingProperties,
  },

  subtitle1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.625,
  },

  subtitle2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.6,
  },

  body1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.625,
  },

  body2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.6,
  },

  button: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeSM,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.5,
    textTransform: "uppercase",
  },

  caption: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXS,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.25,
  },

  overline: {
    fontFamily: baseProperties.fontFamily,
  },

  d1: {
    fontSize: pxToRem(80),
    ...baseDisplayProperties,
  },

  d2: {
    fontSize: pxToRem(72),
    ...baseDisplayProperties,
  },

  d3: {
    fontSize: pxToRem(64),
    ...baseDisplayProperties,
  },

  d4: {
    fontSize: pxToRem(56),
    ...baseDisplayProperties,
  },

  d5: {
    fontSize: pxToRem(48),
    ...baseDisplayProperties,
  },

  d6: {
    fontSize: pxToRem(40),
    ...baseDisplayProperties,
  },

  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL,
    "2xl": baseProperties.fontSize2XL,
    "3xl": baseProperties.fontSize3XL,
  },

  lineHeight: {
    sm: 1.25,
    md: 1.5,
    lg: 2,
  },
};
function boxShadow(offset = [], radius = [], color, opacity, inset = "") {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
    color,
    opacity
  )}`;
}
// function gradientChartLine(chart, color, opacity = 0.2) {
//   const ctx = chart.getContext("2d");
//   const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
//   const primaryColor = rgba(color, opacity).toString();

//   gradientStroke.addColorStop(1, primaryColor);
//   gradientStroke.addColorStop(0.2, "rgba(72, 72, 176, 0.0)");
//   gradientStroke.addColorStop(0, "rgba(203, 12, 159, 0)");

//   return gradientStroke;
// }
function hexToRgb(color) {
  return chroma(color).rgb().join(", ");
}
function linearGradient(color, colorState, angle = 195) {
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
}
function pxToRem(number, baseNumber = 16) {
  return `${number / baseNumber}rem`;
}
function rgba(color, opacity) {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}

const {
  values: { sm, md, lg, xl, xxl },
} = breakpoints;

const SM = `@media (min-width: ${sm}px)`;
const MD = `@media (min-width: ${md}px)`;
const LG = `@media (min-width: ${lg}px)`;
const XL = `@media (min-width: ${xl}px)`;
const XXL = `@media (min-width: ${xxl}px)`;

const sharedClasses = {
  paddingRight: `${pxToRem(24)} !important`,
  paddingLeft: `${pxToRem(24)} !important`,
  marginRight: "auto !important",
  marginLeft: "auto !important",
  width: "100% !important",
  position: "relative",
};

const container = {
  [SM]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "540px !important",
    },
  },
  [MD]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "720px !important",
    },
  },
  [LG]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "960px !important",
    },
  },
  [XL]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "1140px !important",
    },
  },
  [XXL]: {
    ".MuiContainer-root": {
      ...sharedClasses,
      maxWidth: "1320px !important",
    },
  },
};
const icon = {
  defaultProps: {
    baseClassName: "material-icons-round",
    fontSize: "inherit",
  },

  styleOverrides: {
    fontSizeInherit: {
      fontSize: "inherit !important",
    },

    fontSizeSmall: {
      fontSize: `${pxToRem(20)} !important`,
    },

    fontSizeLarge: {
      fontSize: `${pxToRem(36)} !important`,
    },
  },
};
const themeDark = createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },
})
const themeLight = createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    // MuiDrawer: { ...sidenav },
    // MuiList: { ...list },
    // MuiListItem: { ...listItem },
    // MuiListItemText: { ...listItemText },
    // MuiCard: { ...card },
    // MuiCardMedia: { ...cardMedia },
    // MuiCardContent: { ...cardContent },
    // MuiButton: { ...button },
    // MuiIconButton: { ...iconButton },
    // MuiInput: { ...input },
    // MuiInputLabel: { ...inputLabel },
    // MuiOutlinedInput: { ...inputOutlined },
    // MuiTextField: { ...textField },
    // MuiMenu: { ...menu },
    // MuiMenuItem: { ...menuItem },
    // MuiSwitch: { ...switchButton },
    // MuiDivider: { ...divider },
    // MuiTableContainer: { ...tableContainer },
    // MuiTableHead: { ...tableHead },
    // MuiTableCell: { ...tableCell },
    // MuiLinearProgress: { ...linearProgress },
    // MuiBreadcrumbs: { ...breadcrumbs },
    // MuiSlider: { ...slider },
    // MuiAvatar: { ...avatar },
    // MuiTooltip: { ...tooltip },
    // MuiAppBar: { ...appBar },
    // MuiTabs: { ...tabs },
    // MuiTab: { ...tab },
    // MuiStepper: { ...stepper },
    // MuiStep: { ...step },
    // MuiStepConnector: { ...stepConnector },
    // MuiStepLabel: { ...stepLabel },
    // MuiStepIcon: { ...stepIcon },
    // MuiSelect: { ...select },
    // MuiFormControlLabel: { ...formControlLabel },
    // MuiFormLabel: { ...formLabel },
    // MuiCheckbox: { ...checkbox },
    // MuiRadio: { ...radio },
    // MuiAutocomplete: { ...autocomplete },
    // MuiPopover: { ...popover },
    // MuiButtonBase: { ...buttonBase },
    // MuiIcon: { ...icon },
    // MuiSvgIcon: { ...svgIcon },
    // MuiLink: { ...link },
    // MuiDialog: { ...dialog },
    // MuiDialogTitle: { ...dialogTitle },
    // MuiDialogContent: { ...dialogContent },
    // MuiDialogContentText: { ...dialogContentText },
    // MuiDialogActions: { ...dialogActions },
  },
});

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];
//export default FullAppUi;
